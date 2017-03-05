import React from 'react'
import { browserHistory } from 'react-router'
import Header from 'Header'

const AppLayout = React.createClass({
  getInitialState() {
    return {
      currentPath: window.location.pathname
    }
  },

  componentWillMount() {
    this.pathChangeListener = browserHistory.listen((ev) => {
      this.setState({
        currentPath: ev.pathname
      })
    })
  },

  componentWillUnmount() {
    if (this.pathChangeListener) {
      this.pathChangeListener.unlisten()
      this.pathChangeListener = null
    }
  },

  render() {
    const isFullscreen = this.state.currentPath === '/'

    return (
      <div
        className={`layout ${isFullscreen ? 'fullscreen' : ''}`}
      >
        <Header
          currentPath={this.state.currentPath}
        />
        <div
          className='content'
        >
          <div
            className='design-by'
          >
            WEB DESIGN BY DEL
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default AppLayout