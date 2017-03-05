import React from 'react'

const Error = React.createClass({
  propTypes: {
    message: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      message: 'Some error occured during execution. Please refresh this page or check your URL.'
    }
  },

  render() {
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
})

export default Error