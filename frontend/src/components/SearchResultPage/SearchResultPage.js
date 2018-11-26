import React, {Component} from 'react';
import './SearchResultPage.css';
import SimpleMap from '../GoogleMap/GoogleMap';
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
                <div className='search-result-page'>
                    <div className='container w-100'>
                    <div className='row justify-content-center'>
                        <div className='search-result-map col-md-7 col-sm-12 col-lg-7' id='locationMap'>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                            <SimpleMap/> 
                           
                        </div>
                        <div className='results col-md-5 col-sm-12 col-lg-5'>
                            <div className='recommended-results mb-2'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div className='searched-results mt-2'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

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