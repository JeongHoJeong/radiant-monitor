import { browserHistory } from 'react-router';

AppLayout = React.createClass({
  getInitialState() {
    return {
      currentPath: window.location.pathname
    };
  },

  componentWillMount() {
    this.pathChangeListener = browserHistory.listen((ev) => {
      this.setState({
        currentPath: ev.pathname
      });
    });
  },

  componentWillUnmount() {
    if (this.pathChangeListener) {
      this.pathChangeListener.unlisten();
      this.pathChangeListener = null;
    }
  },

  render() {
    const isFullscreen = this.state.currentPath === '/';

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
    );
  }
});
