import React from 'react'

const InfoPanel = React.createClass({
  render() {
    return (
      <div
        className='info-panel'
      >
        {this.props.children}
      </div>
    )
  }
})

export default InfoPanel