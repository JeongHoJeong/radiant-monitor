import { browserHistory } from 'react-router';

RestaurantTable = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    numItems: React.PropTypes.number,
    isLoaded: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      isLoaded: false
    };
  },

  handleClickRestaurant(id) {
    browserHistory.push(`/database/restaurant/${id}`);
  },

  renderRestaurants() {
    return this.props.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='row'
          onClick={this.handleClickRestaurant.bind(null, row.id)}
        >
          <div
            className='row-content'
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
        </div>
      );
    });
  },

  render() {
    return this.props.isLoaded ?
      (
        <div>
          <InfoPanel>
            <NumOfItems
              name='RESTAURANTS'
              numItems={this.props.numItems}
            />
          </InfoPanel>
          <div
            className='restaurant-table'
          >
            {this.renderRestaurants()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
