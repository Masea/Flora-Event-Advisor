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
            isLoadingSearch:  false,
            isLoadingRecs: false,
            startDate   : parsed.startDate || undefined,
            endDate     : parsed.endDate  || undefined,
            city        : parsed.city  || undefined,
            event       : parsed.event || undefined,
            searchResults : [],
            recommendedResults: [
                                /*{
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
                                }*/

            ]
        }
    }

    componentWillMount(){
            this.fetchSearchResults();
            this.getRecommendations();
    }


    deepCopy(aObject) {
      if (!aObject) {
        return aObject;
      }

      let v;
      let bObject = Array.isArray(aObject) ? [] : {};
      for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? this.deepCopy(v) : v;
      }

      return bObject;
    }

    getRecommendations()
    {
        console.log("Fetching recommendations");
        /*this.setState({
            isLoading: true,
        });*/

        //console.log("eventData");
        //console.log(eventData);
        console.log("username");
        console.log(cookie.load('cookie'));//this.props.location.state && this.props.location.state.referrer);
        
        /*axios.get('http://localhost:3001/api/get-recommendations' , {
            params: {   
                username    : cookie.load('cookie'),//this.props.location.state && this.props.location.state.referrer,//Cookie.load('cookie'),
                data        : eventData,
                keywords    : this.state.event,            }
        })*/
        if (cookie.load('cookie'))
        {
            axios.get('http://localhost:3001/api/get-recommendations' , {
                params: {
                    username    : cookie.load('cookie'),
                    keywords    : this.state.event,
                    city        : this.state.city,
                    from_date   : this.state.startDate,
                    to_date     : this.state.endDate
                }
            })
            .then((response) => {
                //var resJson = JSON.parse(response);
                console.log(JSON.stringify(response));
                console.log(response["data"]["recommendedResults"]);
                
                if(response["data"]["recommendedResults"] !== {}){
                    this.setState({
                        recommendedResults   : response["data"]["recommendedResults"],
                    });
                     console.log("JSON.stringify(this.state.recommendedResults)");
                    console.log(this.state.recommendedResults);
                }
            })
            .catch( (error) => { 
                //document.getElementById("loadingDiv").style.setProperty('display', 'none');
                //document.getElementById("search-results").innerText = "Error fetching search results - " + error;
            });
        }

        /*this.setState({
            isLoading: false
        });*/
    }

    fetchSearchResults(){
        console.log("Fetching search results");
        this.setState({
            isLoadingSearch: true,
        });
        axios.get('http://localhost:3001/api/fetch_events' , {
            params: {
                keywords    : this.state.event,
                city        : this.state.city,
                from_date   : this.state.startDate,
                to_date     :  this.state.endDate
            }
        })
        .then((response) => {
            console.log(JSON.stringify(response.data.event));
            if(response.data.total_items > 0){
                this.setState({
                    searchResults   : this.deepCopy(response.data.events.event),
                });
                //this.getRecommendations(this.state.searchResults);
            }
        })
        .catch( (error) => {
            //document.getElementById("loadingDiv").style.setProperty('display', 'none');
            //document.getElementById("search-results").innerText = "Error fetching search results - " + error;
        });
        this.setState({
            isLoadingSearch: false
        });
    }

    render(){
        
        let searchResults = this.state.searchResults.map( (result,index) => {
            return <EventCard  key={index}
                        cardType="searched" 
                        event={result} 
                        thumbnail={result.image?result.image.url:"http:////d1marr3m5x4iac.cloudfront.net/store/skin/no_image/categories/250x250/other.jpg"}
                    />
        });
        
        let recommendedResults = this.state.recommendedResults.map( (result,index) => {
            return <EventCard  key={index}
                        cardType="recommended" 
                        event={result} 
                        thumbnail={result.image?result.image.url:"http:////d1marr3m5x4iac.cloudfront.net/store/skin/no_image/categories/250x250/other.jpg"}
                    />
        });

        return(
            <div>
                <NavBar/>
                <div className='search-result-page'>
                    <div className='container-fluid w-100 p-0'>
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
                                <div id="loadingDiv" style={{display: this.state.isLoadingSearch ? 'block' : 'none'}}>
                                    <img src="./images/loading.gif" alt="loading"/>
                                </div>
                                <div className='d-flex flex-column flex-nowrap searched-results' id="search-results" style={{display: this.state.isLoadingSearch ? 'none' : 'flex'}}>
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