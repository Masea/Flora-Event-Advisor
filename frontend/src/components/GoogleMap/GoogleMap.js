import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';

class MapMarker extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover:  false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver(){
    this.setState({
      hover: true
    });
  }

  onMouseOut(){
    this.setState({
      hover: false
    });
  }

  render(){
    return(
      <div>
        <div style={{
          color: 'white', 
          background: this.state.hover ? 'red' : this.props.bg_color,
          padding: '10px 5px',
          display: 'inline-flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
          transform: 'translate(-50%, -50%)'
        }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          {this.props.text}
        </div>
        <div style={{display: this.state.hover ? 'block': 'none'}} className="tooltip-info">
          {this.props.event.venue_name}<br />
          {this.props.event.venue_address} {this.props.event.city_name} <br /> <br/>
          From: {this.props.event.start_time} <br />
          To: {this.props.event.end_time}
        </div>
      </div>
    );
  }
}
  
class SimpleMap extends Component {

    constructor(props){
      super(props);
      this.state = {
        center: {lat: 37.3352, lng: -121.8811},
        zoom: 10,
      }
    }
  

    render() {
      let map_markers = this.props.events.map((event) => {
        return <MapMarker 
                lat={event.latitude} 
                lng={event.longitude}
                text={event.event_type === 'recommended' ? 'R' : 'S'}
                bg_color={event.event_type === 'recommended' ? '#FF7F02' : '#600473' }
                key={event.id}
                event={event}
              />
      });
      return (
        <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            bootstrapURLKeys={{ key: 'AIzaSyBYs1DUU-Za2ZQ7wBu2LIWvdcX4qbeGSvU' }}
            resetBoundsOnResize={true}
          >
          {map_markers}
        </GoogleMapReact>
      );
    }
  }

  export default SimpleMap;