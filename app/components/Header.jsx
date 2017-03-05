import React from 'react'
import { Link, browserHistory } from 'react-router'

const Header = React.createClass({
  handleClickTitle() {
    browserHistory.push('/')
  },

  render() {
    const isFullscreen = this.props.currentPath === '/'

    return (
      <div
        className={`header ${isFullscreen ? 'fullscreen' : ''}`}
      >
        <div
          className='hide-overflow'
        >
          <div
            className='black-layer'
          />
        </div>
        <div
          className='height-maximizer'
        >
          <div
            className='title'
            onClick={this.handleClickTitle}
          >
            TEAM RADIANT
          </div>
          <div
            className='no-title'
          >
            <div
              className='text'
            >
              <div>
                We're researching Wi-Fi localization and this is our monitor web page for data analysis.
              </div>
              <div>
                Please feel free to look around!
              </div>
            </div>
            <div
              className='links'
            >
              <Header.Item
                to='/database'
                name='DATABASE'
              />
              <Header.Item
                file='/docs/radiant_report.pdf'
                fileName='Radiant Final Report.pdf'
                name='FINAL REPORT'
              />
              <Header.Item
                to='/about'
                name='ABOUT US'
              />
            </div>
          </div>
        </div>
        <div
          className='filler'
        />
      </div>
    )
  }
})

Header.Item = React.createClass({
  renderLinkOrFile() {
    if (this.props.to) {
      return (
        <Link
          to={this.props.to}
        >
          {this.props.name}
        </Link>
      )
    } else if (this.props.file) {
      return (
        <a
          href={this.props.file}
          download={this.props.fileName}
        >
          {this.props.name}
        </a>
      )
    }

    return null
  },

  render() {
    return (
      <span
        className='item'
      >
        {this.renderLinkOrFile()}
      </span>
    )
  }
})

export default Header