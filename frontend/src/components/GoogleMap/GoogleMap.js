import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const MapMarker = ({ text, bg_color }) => (
    <div className="hint hint--html hint--info hint--top" style={{
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
      <div>
        {text}
      </div>
    </div>
  );
  
class SimpleMap extends Component {
    // static defaultProps = {
    //   center: {lat: 37.3352, lng: -121.8811},
    //   zoom: 10
    // };

    constructor(props){
      super(props);
      this.state = {
        center: {lat: 37.3352, lng: -121.8811},
        zoom: 10,
        hoverKey: null,
      }
    }
  
  
    _onChildMouseEnter = (key /*, childProps */) => {
      //this.props.onHoverKeyChange(key);
      this.setState({
        hoverKey: key,
      });
    }
  
    _onChildMouseLeave = (/* key, childProps */) => {
      //this.props.onHoverKeyChange(null);
      this.setState({
        hoverKey: null,
      });
    }

    render() {
      let map_markers = this.props.events.map((event) => {
        return <MapMarker 
                lat={event.latitude} 
                lng={event.longitude}
                text={event.event_type === 'recommended' ? 'R' : 'S'}
                bg_color={event.event_type === 'recommended' ? '#FF7F02' : '#600473' }
                key={event.id}
                hover={this.state.hoverKey === event.id}
              />
      });
      return (
        <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            bootstrapURLKeys={{ key: 'AIzaSyBYs1DUU-Za2ZQ7wBu2LIWvdcX4qbeGSvU' }}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            hoverDistance={20}
            resetBoundsOnResize={true}
          >
          {map_markers}
        </GoogleMapReact>
      );
    }
  }

  export default SimpleMap;