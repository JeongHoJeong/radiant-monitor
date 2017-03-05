import { browserHistory } from 'react-router';

Database = React.createClass({
  getInitialState() {
    return {
      isLoaded: false,
      error: false
    };
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getRestaurants', 0, 100, true, (err, result) => {
      if (!err && result.payload && result.numItems) {
        self.setState({
          rows: result.payload,
          numItems: result.numItems,
          isLoaded: true,
          error: false
        });
      } else {
        self.setState({
          error: true
        });
      }
    });
  },

  handleClickRestaurant(id) {
    browserHistory.push(`/database/restaurant/${id}`);
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
      );
    });
  },

  renderChildren() {
    return React.cloneElement(
      this.props.children,
      {
        rows: this.state.rows,
        numItems: this.state.numItems,
        isLoaded: this.state.isLoaded
      }
    );
  },

  render() {
    if (this.state.error) {
      return <Error />;
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
      <Loader />;
  }
});
