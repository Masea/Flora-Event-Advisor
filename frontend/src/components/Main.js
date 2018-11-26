import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
//import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import Signup from './SignUp/SignUp';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import HomePage from './HomePage/HomePage';
import UserProfile from './UserProfile/UserProfile';

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={Login}/>
            <Route exact path = '/Login' component={Login}/>
            <Route exact path = '/Signup' component={Signup}/>
            <Route exact path = '/UserProfile' component={UserProfile}/>
            <Route exact path = '/SearchResultPage' component={SearchResultPage}/>
            <Route exact path = '/HomePage' component={HomePage}/>
        </Switch>
    </BrowserRouter>
)

export default Main;