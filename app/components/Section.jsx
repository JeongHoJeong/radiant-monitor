Section = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    folded: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      folded: false
    };
  },

  getInitialState() {
    return {
      folded: this.props.folded
    };
  },

  handleToggleCollapse() {
    this.setState({
      folded: !this.state.folded
    });
  },

  renderArrow() {
    const arrow = this.state.folded ? 'keyboard_arrow_right' : 'keyboard_arrow_down';

    return (
      <i
        className='material-icons'
      >
        {arrow}
      </i>
    );
  },

  render() {
    return (
      <div
        className='section'
      >
        <div
          className='name'
          onClick={this.handleToggleCollapse}
        >
          {this.renderArrow()}
          {this.props.name}
        </div>
        <div
          className={`content ${this.state.folded ? 'folded' : ''}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
});
