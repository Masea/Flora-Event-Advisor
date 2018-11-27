import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '10px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );
  
  class SimpleMap extends Component {
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 7
    };
  
    render() {
      return (
        <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{ key: 'AIzaSyBYs1DUU-Za2ZQ7wBu2LIWvdcX4qbeGSvU' }}
          >
            <AnyReactComponent 
              lat={59.955413} 
              lng={30.337844}  
            />
          </GoogleMapReact>
      );
    }
  }

  export default SimpleMap;