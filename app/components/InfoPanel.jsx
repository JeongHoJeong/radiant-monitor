InfoPanel = React.createClass({
  render() {
    return (
      <div
        className='info-panel'
      >
        {this.props.children}
      </div>
    );
  }
});
