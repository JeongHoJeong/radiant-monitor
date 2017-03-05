AboutUs = React.createClass({
  render() {
    return (
      <div
        className='about-us'
      >
        <div
          className='title'
        >
          TEAM RADIANT
        </div>
        <div
          className='profile-list'
        >
          <AboutUs.Profile
            name='NAMKUNG HOON'
            description={['Main Android client developer', 'Wireless network research']}
          />
          <AboutUs.Profile
            name='JEONGHO JEONG'
            description={['Web monitor page & server developer', 'Data analysis']}
          />
          <AboutUs.Profile
            name='SANGHYUN KIM'
            description={['Client developer', 'Market & on-site research']}
          />
        </div>
      </div>
    );
  }
});

AboutUs.Profile = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.array.isRequired
  },

  renderDescriptions() {
    return this.props.description.map((row, idx) => {
      return (
        <div
          className='description-row'
          key={idx}
        >
          {row}
        </div>
      );
    });
  },

  render() {
    return (
      <div
        className='profile'
      >
        <div
          className='name'
        >
          {this.props.name}
        </div>
        <div
          className='description'
        >
          {this.renderDescriptions()}
        </div>
      </div>
    );
  }
});
