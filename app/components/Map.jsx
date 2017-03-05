import React from 'react'
import { browserHistory } from 'react-router'

let GoogleMapLoaded = false
let map = null

function fromLatLngToPoint(latLng, map) {
  let topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast())
  let bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest())
  let scale = Math.pow(2, map.getZoom())
  let worldPoint = map.getProjection().fromLatLngToPoint(latLng)
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale)
}

const Map = React.createClass({
  propTypes: {
    restaurants: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      isMapReady: false
    }
  },

  componentDidMount() {
    if (GoogleMapLoaded) {
      this.handleScriptOnLoad()
    } else {
      let scriptTag = document.createElement('script')
      scriptTag.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCf9LEFx4-NkNFr-WnbVP-DnIVAndzSF04')
      scriptTag.onload = this.handleScriptOnLoad
      GoogleMapLoaded = true

      document.body.appendChild(scriptTag)
    }
  },

  handleMapCenterChanged() {
    if (this.state.isMapReady) {
      // Force update markers
      this.setState({})
    }
  },

  componentWillUnmount() {
    google.maps.event.clearListeners(map, 'center_changed')
  },

  handleScriptOnLoad() {
    const self = this

    map = new google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 36.363246, lng: 127.358279},
      zoom: 19,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      disableDefaultUI: true,
      disableDoubleClickZoom: true
    })

    map.addListener('center_changed', self.handleMapCenterChanged)

    google.maps.event.addListenerOnce(map, 'idle', () => {
      self.setState({
        isMapReady: true
      })
    })
  },

  handleOnSelectMarker(id) {
    if (this.props.restaurantId != id) {
      browserHistory.push(`/database/restaurant/${id}`)
    }
  },

  renderMarkers() {
    if (this.state.isMapReady) {
      return this.props.restaurants.map((row, idx) => {
        let point = {x: 0, y: 0}
        let hidden = true

        if (row.latitude && row.longitude) {
          let latLng = new google.maps.LatLng(row.latitude, row.longitude)
          point = fromLatLngToPoint(latLng, map)
          hidden = false
        }

        return (
          <Map.Marker
            key={idx}
            restaurantId={row.id}
            x={point.x}
            y={point.y}
            name={row.name}
            hidden={hidden}
            selected={this.props.restaurantId === row.id}
            onSelect={this.handleOnSelectMarker.bind(null, row.id)}
          />
        )
      })
    }
  },

  render() {
    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          id='google-map'
        />
        {this.renderMarkers()}
      </div>
    )
  }
})

Map.Marker = React.createClass({
  propTypes: {
    restaurantId: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    hidden: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      hidden: false,
      selected: false
    }
  },

  getInitialState() {
    return {
      hover: false
    }
  },

  handleMouseEnter() {
    this.setState({
      hover: true
    })
  },

  handleMouseLeave() {
    this.setState({
      hover: false
    })
  },

  handleOnClick() {
    if (this.props.onSelect) {
      this.props.onSelect()
    }
  },

  render() {
    const size = this.state.hover ? 70 : 25
    const style = {
      container: {
        left: `${this.props.x}px`,
        top: `${this.props.y}px`,
        width: `${size}px`,
        height: `${size}px`
      },
      circle: {
        borderRadius: `${size / 2}px`,
        left: `-${size / 2}px`,
        top: `-${size / 2}px`,
        width: `${size}px`,
        height: `${size}px`
      }
    }

    return (
      this.props.hidden ? null :
      <div
        className='map-marker-container'
        style={style.container}
      >
        <div
          className={`map-marker ${this.state.hover ? 'hover' : ''} ${this.props.selected ? 'selected' : ''}`}
          style={style.circle}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleOnClick}
        >
          <span
            className={`text ${this.state.hover ? '' : 'hidden'}`}
          >
            {this.props.name}
          </span>
        </div>
      </div>
    )
  }
})

export default Map