import React from 'react'
import { browserHistory } from 'react-router';
import Util from 'clientUtil'
import Loader from 'Loader'
import Map from 'Map'
import Error from 'Error'

const Database = React.createClass({
  getInitialState() {
    return {
      isLoaded: false,
      error: false
    }
  },

  componentWillMount() {
    Util.xhrGet('/api/restaurants', {
      offset: 0,
      limit: 100
    }, (err, result) => {
      if (!err && result.payload && result.totalCount) {
        this.setState({
          rows: result.payload,
          numItems: result.totalCount,
          isLoaded: true,
          error: false
        })
      } else {
        this.setState({
          error: true
        })
      }
    })
  },

  handleClickRestaurant(id) {
    browserHistory.push(`/database/restaurant/${id}`)
  },

  renderRestaurants() {
    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='row'
          onClick={this.handleClickRestaurant.bind(null, row.id)}
        >
          <div
            className='entry id'
          >
            {idx + 1}
          </div>
          <div
            className='entry'
          >
            {row.displayName || row.name}
          </div>
        </div>
      )
    })
  },

  renderChildren() {
    return React.cloneElement(
      this.props.children,
      {
        rows: this.state.rows,
        numItems: this.state.numItems,
        isLoaded: this.state.isLoaded
      }
    )
  },

  render() {
    if (this.state.error) {
      return <Error />
    }

    return this.state.isLoaded ?
      (
        <div>
          <Map
            restaurants={this.state.rows}
            restaurantId={parseInt(this.props.params.restaurantId)}
          />
          {this.renderChildren()}
        </div>
      ) :
      <Loader />
  }
})

export default Database