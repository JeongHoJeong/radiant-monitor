import { browserHistory } from 'react-router';

BundleListTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false,
      isSamplesLoaded: false,
      error: false
    };
  },

  componentWillMount() {
    this.loadBundles(this.props.params.restaurantId);
  },

  componentWillUpdate(nextProps) {
    if (nextProps.params.restaurantId != this.props.params.restaurantId) {
      this.loadBundles(nextProps.params.restaurantId);
    }

    if (nextProps.params.bundleId && nextProps.params.bundleId != this.props.params.bundleId) {
      this.setState({
        isSamplesLoaded: false
      });
    }
  },

  loadBundles(restaurantId) {
    var self = this;

    self.setState({
      isLoaded: false
    });

    Meteor.call('getBundles', restaurantId, 0, 100, true, (err, result) => {
      if (!err && result.payload && result.numItems && result.restaurantName) {
        self.setState({
          rows: result.payload,
          numItems: result.numItems,
          isLoaded: true,
          restaurantName: result.restaurantName,
          error: false
        });
      } else {
        self.setState({
          error: true
        });
      }
    });
  },

  handleClickBundle(id) {
    browserHistory.push(`/database/restaurant/${this.props.params.restaurantId}/bundle/${id}`);
  },

  renderLoader(bundleId) {
    if (this.props.params.bundleId == bundleId && !this.state.isSamplesLoaded) {
      return (
        <span
          className='loader'
        >
          <Loader
            size={20}
          />
        </span>
      );
    }

    return null;
  },

  renderBundles() {
    var self = this;

    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className={`row ${parseInt(self.props.params.bundleId) === row.id ? 'selected' : ''}`}
          onClick={self.handleClickBundle.bind(null, row.id)}
        >
          <div
            className='row-content'
          >
            <div
              className='entry id'
            >
              {row.id}
            </div>
            <div
              className='entry name'
            >
              {row.description}
            </div>
          </div>
          {this.renderLoader(row.id)}
        </div>
      );
    });
  },

  handleOnLoadSamples() {
    this.setState({
      isSamplesLoaded: true
    });
  },

  renderChildren() {
    if (this.props.children) {
      return (
        React.cloneElement(this.props.children,
          {
            onLoad: this.handleOnLoadSamples
          }
        )
      );
    }

    return null;
  },

  render() {
    if (this.state.error) {
      return <Error />;
    }

    return this.state.isLoaded ?
      (
        <div>
          <InfoPanel>
            <div
              className='restaurant-name'
            >
              {this.state.restaurantName}
            </div>
            <NumOfItems
              name='BUNDLES'
              numItems={this.state.numItems}
            />
          </InfoPanel>
          <div
            className='bundle-table'
          >
            {this.renderBundles()}
          </div>
          {this.renderChildren()}
        </div>
      ) :
      <Loader />;
  }
});
