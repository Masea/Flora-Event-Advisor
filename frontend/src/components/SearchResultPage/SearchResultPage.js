import React, {Component} from 'react';
import './SearchResultPage.css';
import SimpleMap from '../GoogleMap/GoogleMap';
import EventCard from '../EventCard/EventCard';
import NavBar from '../NavBar/NavBar';
// import axios from 'axios';
// import cookie from 'react-cookies';
// import {Redirect} from 'react-router';

class SearchResultPage extends Component{

    constructor(props){
        super(props);
    }

    render(){
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
                            <h5>We recommend...</h5>
                            <div className="container-fluid">
                                <div className='d-flex flex-row flex-nowrap'>                                 
                                    <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/>
                                    <EventCard cardType = 'recommended' eventid='1'/>

                                </div>
                            </div>
                            
                            <div className='searched-results mt-2'>
                                <EventCard cardType = 'searched' eventid='2'/>
                                <EventCard cardType = 'searched' eventid='4'/>
                                <EventCard cardType = 'searched' eventid='6'/>
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