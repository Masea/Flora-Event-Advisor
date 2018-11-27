import React, {Component} from 'react';
import './EventCard.css';

class EventCard extends Component{

    constructor(props){
        super(props);

        this.setState = {
            eventTitle          : 'Test Event',
            eventDescription    : 'This is a test event description',
            city                : 'San Francisco',
            state               : 'California'
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
                                <img src='images/eventImage.jpeg' alt="Recommended Event" className='w-100'/>
                            </div>
                            <div className="col-8 pl-2 recommendedData">
                                <p>Photos with your Pet for $20.</p>
                                <p>Photos with your Pet for $40.</p>
                                {/* <p>{this.state.eventTitle}</p><br/>
                                <p>{this.state.eventCity}</p><br/>*/}
                            </div>
                        </div>
                    </div>

                    {/* Searched Image Card */}
                    <div className='searched mx-0' style={{display: this.props.cardType === 'searched' ? 'block':'none'}}>
                        <div className='row flex-row'>
                            <div className="col-3 px-0 border-0 align-self-center searchedImg">
                                <img src='images/searchedImg.jpg' alt="Searched Event" className='w-100'/>
                            </div>
                            <div className="col-8 pl-2 searchedData">
                                <p>{this.props.eventid} - Photos with your Pet for $20. <br/>Bring your canine and feline friends to Santana Row's Park Valencia (in front of Maggiano's) for a keepsake photo with Santa Claus. Photos are $20 and the proceeds will benefit The Humane Society Silicon Valley. Registration begins at 10:30 a.m.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

}

export default EventCard;
