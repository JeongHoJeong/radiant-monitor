import React from 'react'
import { browserHistory } from 'react-router';
import Util from 'clientUtil'
import Section from 'Section'
import NumOfItems from 'NumOfItems'
import Loader from 'Loader'

const BundleTable = React.createClass({
  propTypes: {
    onLoad: React.PropTypes.func
  },

  getInitialState() {
    return {
      isSamplesLoaded: false,
      error: false
    }
  },

  componentWillMount() {
    this.loadSamples(this.props.params.bundleId)
  },

  componentWillUpdate(nextProps) {
    if (nextProps.params.bundleId != this.props.params.bundleId) {
      this.loadSamples(nextProps.params.bundleId)
    }
  },

  computeStatistics(payload) {
    let rows = payload ? payload : this.state.rows
    let aps = {}

    rows.forEach((row) => {
      row.sample.forEach((sample) => {
        const BSSID = sample.BSSID

        if (!aps[BSSID]) {
          aps[BSSID] = {}
          aps[BSSID].SSID = sample.SSID
          aps[BSSID].sum = 0
          aps[BSSID].count = 0
        }

        aps[BSSID].count++
        aps[BSSID].sum += sample.level
      })
    })

    let result = []

    Object.keys(aps).map((BSSID) => {
      const ap = aps[BSSID]

      ap.BSSID = BSSID
      ap.averageLevel = (ap.sum / ap.count)
      delete ap.sum

      result.push(ap)
    })

    result.sort((ap1, ap2) => {
      return ap2.averageLevel - ap1.averageLevel
    })

    this.setState({
      aps: result
    })
  },

  loadSamples(bundleId) {
    var self = this

    self.setState({
      isSamplesLoaded: false
    })

    Meteor.call('getSamples', bundleId, 0, 100, true, (err, result) => {
      if (!err && result.payload && result.numItems && result.bundle) {
        result.payload = result.payload.map((row) => {
          let result = row
          result.sample = JSON.parse(row.sample)

          return result
        })

        this.computeStatistics(result.payload)

        self.setState({
          rows: result.payload,
          numItems: result.numItems,
          bundle: result.bundle,
          isSamplesLoaded: true,
          error: false
        })

        if (self.props.onLoad) {
          self.props.onLoad()
        }
      } else {
        self.setState({
          error: true
        })
      }
    })
  },

  renderAPs(sample) {
    sample.sort((ap1, ap2) => {
      return ap2.level - ap1.level
    })

    return sample.map((ap, idx) => {
      return (
        <div
          key={idx}
          className='ap'
        >
          <span
            className={`ssid ${ap.SSID ? '' : 'no-ssid'}`}
          >
            {ap.SSID ? ap.SSID : '(NO SSID)'}
          </span>
          <span
            className='bssid'
          >
            {ap.BSSID}
          </span>
          <span
            className='level'
          >
            {ap.level}
          </span>
        </div>
      )
    })
  },

  renderSamples() {
    return this.state.rows.map((row, idx) => {
      const apList = row.sample

      return (
        <div
          className='column'
          key={idx}
        >
          <div
            className='header'
          >
            <span>
              {Util.dateFormat(row.clientTimestamp)}
            </span>
            <div
              className='num-of-aps'
            >
              {`${apList.length} AP${apList.length > 1 ? 's' : ''}`}
            </div>
          </div>
          <div
            className='ap-list'
          >
            {this.renderAPs(apList)}
          </div>
        </div>
      )
    })
  },

  render() {
    if (this.state.error) {
      return <Error />
    }

    return this.state.isSamplesLoaded ?
      (
        <div>
          <InfoPanel>
            <div
              className='bundle'
            >
              <span>
                BUNDLE
              </span>
              <i
                className='material-icons'
              >
                keyboard_arrow_right
              </i>
              <span
                className='bundle-description'
              >
                {this.state.bundle.description}
              </span>
              <span
                className='bundle-id'
              >
                {`(Bundle ID: ${this.props.params.bundleId})`}
              </span>
            </div>
            <NumOfItems
              name='SAMPLES'
              numItems={this.state.numItems}
            />
          </InfoPanel>
          <Section
            name='STATISTICS'
          >
            {this.state.aps ?
              <BundleTable.Statistics
                rows={this.state.aps}
                numTotalSamples={this.state.numItems}
              /> : <Loader />}
          </Section>
          <Section
            name='SAMPLES'
          >
            <div
              className='sample-table'
            >
              {this.renderSamples()}
            </div>
          </Section>
        </div>
      ) :
      <Loader
        marginOnly={true}
        margin100vh={true}
      />
  }
})

BundleTable.Statistics = React.createClass({
  propTypes: {
    rows: React.PropTypes.array.isRequired,
    numTotalSamples: React.PropTypes.number.isRequired
  },

  renderRows() {
    var self = this

    return this.props.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='content row'
        >
          <div
            className={`ssid ${row.SSID ? '' : 'no-ssid'}`}
          >
            {row.SSID ? row.SSID : '(NO SSID)'}
          </div>
          <div
            className='bssid-text'
          >
            {row.BSSID}
          </div>
          <div>
            {row.averageLevel.toFixed(2)}
          </div>
          <div
            className='count-of-appearance'
          >
            <span
              className='appearance-count'
            >
              {row.count}
            </span>
            <span
              className='appearance-ratio'
            >
              {`(${(row.count / self.props.numTotalSamples * 100).toFixed(1)}%)`}
            </span>
          </div>
        </div>
      )
    })
  },

  render() {
    return (
      <div
        className='statistics'
      >
        <div
          className='table'
        >
          <div
            className='header row'
          >
            <div>
              SSID
            </div>
            <div>
              BSSID
            </div>
            <div>
              AVERAGE LEVEL
            </div>
            <div>
              COUNT OF APPEARANCE
            </div>
          </div>
          {this.renderRows()}
        </div>
      </div>
    )
  }
})

export default BundleTable