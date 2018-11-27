import React, {Component} from 'react';
import './SearchResultPage.css';
import SimpleMap from '../GoogleMap/GoogleMap';
import EventCard from '../EventCard/EventCard';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import * as qs from 'query-string';
// import cookie from 'react-cookies';
// import {Redirect} from 'react-router';

class SearchResultPage extends Component{

    constructor(props){
        super(props);

        const parsed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        this.state = {
            startDate   : parsed.startDate || undefined,
            endDate     : parsed.endDate  || undefined,
            city        : parsed.city  || undefined,
            eventful_api_key    : process.env.EVENTFUL_API_KEY || 'Zdpcf9VpbnwdCxTF',
            searchResults : [],
        }

        axios.get('https://cors-escape.herokuapp.com/http://api.eventful.com/json/events/search' , {
            params: {
                app_key     : this.state.eventful_api_key,
                //keywords    : 'books',
                location    : this.state.city,
                date        : this.state.startDate.replace(/-/g, '') + '-' + this.state.endDate.replace(/-/g, '') || 'Future'
            }
        })
        .then((response) => {
            console.log(response.data);
            if(response.data.total_items > 0){
                this.setState({
                    searchResults   : response.data.events.event,
                });
            }
        })
    }

    render(){
        let searchResults = this.state.searchResults.map( (result) => {
            return <EventCard cardType="searched" event={result} description={result.description} id={result.id} thumbnail={result.image.thumb.url} venue_address={result.venue_address} url={result.url}/>
        });
        return(
            <div>
                <NavBar/>
                <div className='search-result-page'>
                    <div className='container w-100 p-0'>
                    <div className='row justify-content-center'>
                        <div className='search-result-map col-md-7 col-sm-12 col-lg-7' id='locationMap'>
                            <SimpleMap/> 
                           
                        </div>
                        <div className='results col-12 col-md-5 col-sm-12 col-lg-5'>
                            <h5>Recommended for you</h5>
                            <div className="container-fluid">
                                <div className='d-flex flex-row flex-nowrap result-carousel'>                                 
                                    <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/>

                                </div>
                            </div>
                            <br />
                            <div className="container-fluid">
                                <div className='d-flex flex-column flex-nowrap searched-results'>
                                    {searchResults}
                                    {/* <EventCard cardType = 'searched' eventid='2'/>
                                    <EventCard cardType = 'searched' eventid='4'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/>
                                    <EventCard cardType = 'searched' eventid='6'/> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>                
                </div>
            </div>
        )
    }
}

export default SearchResultPage;