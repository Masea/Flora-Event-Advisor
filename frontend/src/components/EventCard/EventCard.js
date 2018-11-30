import React, {Component} from 'react';
import './EventCard.css';

class EventCard extends Component{

    constructor(props){
        super(props);
        this.state = {
            eventTitle          : this.props.event.title || 'Test Event',
            eventDescription    : this.props.event.description || 'This is a test event description',
            imgURL              : this.props.thumbnail || '',
            address             : this.props.event.venue_address || '',
            url                 : this.props.event.url || '',
            startDate           : this.props.event.startDate || '',
            stopDate            : this.props.event.startDate || '',
            category            : this.props.event.category || ''
        }

        this.stripHtml = this.stripHtml.bind(this);
    }

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
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
                                <div className="text-truncate my-2">{this.stripHtml(this.state.eventTitle)}</div>
                                <div className="my-2"><i className="fas fa-map-marker-alt"></i>{this.stripHtml(this.state.address) || "Address not available"}</div>
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
                                <div className=" my-2 text-truncate">{this.stripHtml(this.state.eventTitle)}</div>
                                <div className="my-2"><i className="fas fa-map-marker-alt"></i>{this.stripHtml(this.state.address)  || "Address not available"}</div>
                                <a className="btn" href={this.state.url} target="_blank" rel="noopener noreferrer">View Event</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

}

export default EventCard;
