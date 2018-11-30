import React, {Component} from 'react';
import './SearchResultPage.css';
import SimpleMap from '../GoogleMap/GoogleMap';
import EventCard from '../EventCard/EventCard';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import * as qs from 'query-string';
import cookie from 'react-cookies';
// import {Redirect} from 'react-router';

class SearchResultPage extends Component{

    constructor(props){
        super(props);

        const parsed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        this.state = {
            isLoading:  false,
            startDate   : parsed.startDate || undefined,
            endDate     : parsed.endDate  || undefined,
            city        : parsed.city  || undefined,
            event       : parsed.event || undefined,
            eventful_api_key    : process.env.EVENTFUL_API_KEY || 'Zdpcf9VpbnwdCxTF',
            searchResults : [ ],
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

    componentWillMount(){
            this.fetchSearchResults();
            //this.getRecommendations();
    }

    getRecommendations()
    {
        console.log("Fetching recommendations");
        this.setState({
            isLoading: true,
        });
        axios.get('http://localhost:3001/api/get-recommendations' , {
            params: {   
                //username    : username,
                app_key     : this.state.eventful_api_key,
                keywords    : this.state.event,
                location    : this.state.city,
                date        : this.state.startDate && this.state.endDate ? this.state.startDate + '-' + this.state.endDate : 'Future'           
            }
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            if(response.count > 0){
                this.setState({
                    recommendationResults   : response.data,
                });
            }
        })
        .catch( (error) => {
            //document.getElementById("loadingDiv").style.setProperty('display', 'none');
            //document.getElementById("search-results").innerText = "Error fetching search results - " + error;
        });

        axios.get('http://localhost:3001/api/fetch_events' , {
            params: {
                app_key     : this.state.eventful_api_key,
                keywords    : this.state.event,
                location    : this.state.city,
                date        : this.state.startDate && this.state.endDate ? this.state.startDate + '-' + this.state.endDate : 'Future',
            }
        })
        .then((response) => {
            console.log(JSON.stringify(response.data.event));
            if(response.data.total_items > 0){
                this.setState({
                    searchResults   : response.data.events.event,
                });
            }
        })
        .catch( (error) => {
            //document.getElementById("loadingDiv").style.setProperty('display', 'none');
            //document.getElementById("search-results").innerText = "Error fetching search results - " + error;
        });
        this.setState({
            isLoading: false
        });

    }

    fetchSearchResults(){
        console.log("Fetching search results");
        this.setState({
            isLoading: true,
        });
        axios.get('http://localhost:3001/api/fetch_events' , {
            params: {
                app_key     : this.state.eventful_api_key,
                keywords    : this.state.event,
                location    : this.state.city,
                date        : this.state.startDate && this.state.endDate ? this.state.startDate + '-' + this.state.endDate : 'Future',
            }
        })
        .then((response) => {
            console.log(JSON.stringify(response.data.event));
            if(response.data.total_items > 0){
                this.setState({
                    searchResults   : response.data.events.event,
                });
            }
        })
        .catch( (error) => {
            //document.getElementById("loadingDiv").style.setProperty('display', 'none');
            //document.getElementById("search-results").innerText = "Error fetching search results - " + error;
        });
        this.setState({
            isLoading: false
        });
    }

    render(){
        
        let searchResults = this.state.searchResults.map( (result) => {
            return <EventCard 
                        cardType="searched" 
                        event={result} 
                        thumbnail={ "./images/loading.gif"}
                    />
        });

        let recommendedResults = this.state.recommendedResults.map( (event) => {
            return <EventCard cardType="recommended" event={event} />
        /*let recommendedResults = this.state.recommendedResults.map( (result) => {
            return <EventCard 
                        cardType="recommended" 
                        event={result} 
                        description={result.description} 
                        id={result.id} 
                        thumbnail={result.image.thumb.url} 
                        venue_address={result.venue_address} 
                        url={result.url}
                    />*/
        });

        return(
            <div>
                <NavBar/>
                <div className='search-result-page'>
                    <div className='container w-100 p-0'>
                    <div className='row justify-content-center'>
                        <div className='search-result-map col-md-7 col-sm-12 col-lg-7' id='locationMap'>
                            <SimpleMap 
                                events={this.state.searchResults.concat( this.state.recommendedResults )}
                            />
                           
                        </div>
                        <div className='results col-12 col-md-5 col-sm-12 col-lg-5'>
                            <div className="container-fluid">
                            <h5>Recommended for you</h5>
                                <div className='d-flex flex-row flex-nowrap result-carousel'> 
                                    {recommendedResults}                                
                                </div>
                            </div>
                            <br />
                            <div className="container-fluid">
                                <h5>Search Results</h5>
                                <div id="loadingDiv" style={{display: this.state.isLoading ? 'block' : 'none'}}>
                                    <img src="./images/loading.gif" alt="loading"/>
                                </div>
                                <div className='d-flex flex-column flex-nowrap searched-results' id="search-results" style={{display: this.state.isLoading ? 'none' : 'flex'}}>
                                    {searchResults}
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