import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text, bg_color }) => (
    <div style={{
      color: 'white', 
      background: bg_color,
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
      center: {lat: 37.3352, lng: -121.8811},
      zoom: 10
    };
  
    render() {
      let map_markers = this.props.events.map((event) => {
        return <AnyReactComponent 
                lat={event.latitude} 
                lng={event.longitude}
                text={event.event_type === 'recommended' ? 'R' : 'S'}
                bg_color={event.event_type === 'recommended' ? '#0168AC' : '#17A2B8' }
              />
      });
      return (
        <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{ key: 'AIzaSyBYs1DUU-Za2ZQ7wBu2LIWvdcX4qbeGSvU' }}
          >
          <AnyReactComponent 
            lat={37.3352} 
            lng={-121.8811} 
            text="T"
            bg_color='gray' 
          />
          {map_markers}
        </GoogleMapReact>
      );
    }
  }

  export default SimpleMap;