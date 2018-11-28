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
            searchResults : [
                                {
                                    latitude: 37.3352, 
                                    longitude: -121.9311,
                                    description: "First search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 1",
                                    id: 1,
                                    event_type: 'searched'
                                }, 
                                {
                                    latitude: 37.3752, 
                                    longitude: -121.8311,
                                    description: "Second search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 23",
                                    id: 23,
                                    event_type: 'searched'
                                },
                                {
                                    latitude: 37.3752, 
                                    longitude: -121.9311,
                                    description: "Third search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 3",
                                    id: 3,
                                    event_type: 'searched'
                                },
                                {
                                    latitude: 37.3052, 
                                    longitude: -121.8311,
                                    description: "Fourth search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 5",
                                    id: 5,
                                    event_type: 'searched'
                                },
                                {
                                    latitude: 37.2752, 
                                    longitude: -121.8311,
                                    description: "Fifth search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 53",
                                    id: 53,
                                    event_type: 'searched'
                                },
                                {
                                    latitude: 37.3752, 
                                    longitude: -121.6311,
                                    description: "Sixth search result",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 21",
                                    id: 21,
                                    event_type: 'searched'
                                }
            ],
            recommendedResults: [
                                {
                                    latitude: 37.2852, 
                                    longitude: -121.6311,
                                    description: "Recommendation 1",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 11",
                                    id: 11,
                                    event_type: 'recommended'
                                },
                                {
                                    latitude: 37.2852, 
                                    longitude: -121.5811,
                                    description: "Recommendation 2",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 25",
                                    id: 25,
                                    event_type: 'recommended'
                                },
                                {
                                    latitude: 37.2952, 
                                    longitude: -121.5911,
                                    description: "Recommendation 3",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 42",
                                    id: 42,
                                    event_type: 'recommended'
                                },
                                {
                                    latitude: 37.4252, 
                                    longitude: -121.6711,
                                    description: "Recommendation 4",
                                    image : {
                                        thumb: {
                                            url: "thumbnail"
                                        }
                                    },
                                    url: "http://www.eventful.com",
                                    venue_address: "Address 21",
                                    id: 21,
                                    event_type: 'recommended'
                                }

            ]
        }
    }

    componentDidMount(){
        this.fetchSearchResults();
    }

    fetchSearchResults(){
        console.log("Fetching search results");
        document.getElementById("loading-div").style.setProperty('display', 'block');
        axios.get('http://api.eventful.com/json/events/search' , {
            params: {
                app_key     : this.state.eventful_api_key,
                //keywords    : 'books',
                location    : this.state.city,
                date        : this.state.startDate + '-' + this.state.endDate || 'Future'
            }
        })
        .then((response) => {
            console.log(response.data);
            document.getElementById("loading-div").style.setProperty('display', 'none');
            document.getElementById("search-results").style.setProperty('display', 'block');
            if(response.data.total_items > 0){
                this.setState({
                    searchResults   : response.data.events.event,
                });
            }
        })
        .catch( (error) => {
            document.getElementById("loading-div").style.setProperty('display', 'none');
            document.getElementById("search-results").innerText = "Error fetching search results - " + error;
        });
    }

    render(){
        let searchResults = this.state.searchResults.map( (result) => {
            return <EventCard cardType="searched" event={result} description={result.description} id={result.id} thumbnail={result.image.thumb.url} venue_address={result.venue_address} url={result.url}/>
        });

        let recommendedResults = this.state.recommendedResults.map( (result) => {
            return <EventCard cardType="recommended" event={result} description={result.description} id={result.id} thumbnail={result.image.thumb.url} venue_address={result.venue_address} url={result.url}/>
        });
        return(
            <div>
                <NavBar/>
                <div className='search-result-page'>
                    <div className='container w-100 p-0'>
                    <div className='row justify-content-center'>
                        <div className='search-result-map col-md-7 col-sm-12 col-lg-7' id='locationMap'>
                            <SimpleMap events={this.state.searchResults.concat( this.state.recommendedResults )}/>
                           
                        </div>
                        <div className='results col-12 col-md-5 col-sm-12 col-lg-5'>
                            <h5>Recommended for you</h5>
                            <div className="container-fluid">
                                <div className='d-flex flex-row flex-nowrap result-carousel'> 
                                    {recommendedResults}                                
                                    {/* <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/> */}

                                </div>
                            </div>
                            <br />
                            <div className="container-fluid">
                                <h5>Search Results</h5>
                                <div id="loading-div" style={{display: 'none'}}>
                                    <img src="./images/loading.gif" alt="loading"/>
                                </div>
                                <div className='d-flex flex-column flex-nowrap searched-results' id="search-results" style={{display: 'none'}}>
                                    {searchResults.length > 0 ? searchResults : "Please search for events..."}
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