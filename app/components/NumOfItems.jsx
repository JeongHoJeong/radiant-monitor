NumOfItems = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    numItems: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <span
        className='num-of-items'
      >
        {'TOTAL '}
        <span
          className='number'
        >
          {this.props.numItems}
        </span>
        {` ${this.props.name}`}
      </span>
    );
  }
});
