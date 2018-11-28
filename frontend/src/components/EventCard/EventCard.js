import React, {Component} from 'react';
import './EventCard.css';

class EventCard extends Component{

    constructor(props){
        super(props);
        this.state = {
            eventTitle          : 'Test Event',
            eventDescription    : this.props.description || 'This is a test event description',
            imgURL              : this.props.thumbnail || '',
            address             : this.props.venue_address || '',
            url                 : this.props.url || '',
        }
    }

    render(){
        return(
            <div>
               <div className='card card-body m-2 eventCard'>
                    {/* Recommended Events Card */}
                    
                    <div className='recommended mx-0 bg-white' style={{display: this.props.cardType === 'recommended' ? 'block':'none'}}>
                        <div className='row flex-row'>
                            <div className="col-3 px-0 border-0 align-self-center recommendedImg">
                                <img src={this.state.imgURL} alt="Recommended Event" className='w-100'/>
                            </div>
                            <div className="col-8 pl-2 recommendedData">
                                <p>{this.state.eventDescription}</p>
                                <p>{this.state.address}</p>
                                <a className="btn btn-info p-1" href={this.state.url} target="_blank" rel="noopener noreferrer">View</a>
                                {/* <p>Photos with your Pet for $20.</p>
                                <p>Photos with your Pet for $40.</p>
                                <p>{this.state.eventTitle}</p><br/>
                                <p>{this.state.eventCity}</p><br/> */}
                            </div>
                        </div>
                    </div>

                    {/* Searched Image Card */}
                    <div className='searched mx-0' style={{display: this.props.cardType === 'searched' ? 'block':'none'}}>
                        <div className='row flex-row'>
                            <div className="col-3 px-0 border-0 align-self-center searchedImg">
                                <img src={this.state.imgURL} alt="Searched Event" className='w-100'/>
                            </div>
                            <div className="col-8 pl-2 searchedData">
                                <p>{this.state.eventDescription}</p>
                                <p>{this.state.address}</p>
                                <a className="btn btn-info" href={this.state.url} target="_blank" rel="noopener noreferrer">View Event</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

}

export default EventCard;
