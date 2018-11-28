import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 

class NavBar extends Component {
    constructor(props){
        super(props);
    this.state = {
        isLoggedIn: true,
        startDate: undefined,
        endDate: undefined,
        city: undefined,
    }
    this.onChange   = this.onChange.bind(this);
    this.startDateChange   = this.startDateChange.bind(this);
    this.endDateChange   = this.endDateChange.bind(this);

    this.handleSignOut = this.handleSignOut.bind(this);

}

handleSignOut(){
    //e.preventDefault();
    console.log("You will be logged out");
}

startDateChange(date){
    this.setState({
        startDate: date,
    });
}

endDateChange(date){
    this.setState({
        endDate: date,
    });
}

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}

    render() {
        
        return(
            <div>
                <nav className ="navbar navbar-expand-lg" id="mainNav" >
                    <div className='navbar-brand text-white'>
                        <Link to="/"><img alt="Flora" src="./images/flora-logo.png" className="align-self-center px-2" height="52px"/>Flora</Link>
                    </div>
                    <button className="navbar-toggler bg-info" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse"  id="navbarSupportedContent">
                        <div className="flex-fill align-items-center">
                            <form className="form-inline justify-content-center searchForm" action="./searchResultPage">
                                <div className='input-group input-group-sm mx-2'>
                                    {/* <input type='date' className='form-control input-sm' name='startDate' placeholder='From' value={this.state.startDate} onChange={this.onChange} /> */}
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.startDateChange}
                                        className='text-right'
                                        name='startDate'
                                        minDate={new Date()}
                                        selectsStart
                                        placeholderText="From Date"
                                        dateFormat="YYYYMMdd"
                                    />
                                </div> 
                                <div className='input-group input-group-sm mx-2'>
                                    {/* <input type='date' className='form-control input-sm' name='toDate' placeholder='To' value={this.state.toDate} onChange={this.onChange} /> */}
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.endDateChange}
                                        className='text-right'
                                        name='endDate'
                                        minDate={this.state.startDate}
                                        selectsEnd
                                        placeholderText="To Date"
                                        dateFormat="YYYYMMdd"
                                    />
                                </div> 
                                <div className='input-group input-group-sm mr-1'>
                                    <input type='search'  className='form-control' name='city' placeholder='City' value={this.state.city} onChange={this.onChange}/>
                                </div>
                                <div className='input-group-btn'>                                
                                    <button type='submit' className='btn btn-outline-light btn-sm' data-effect='ripple'><i className="fas fa-search fa-1x"></i></button>
                                </div>
                            </form>
                        </div>
                           
                        <div className='align-self-center align-items-md-end align-items-sm-left'>
                            {/* Logged out NavBar */}
                            <ul className="navbar-nav" style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                                <li className="nav-item mx-3">
                                    <Link to="/login"><span className='icon-text'><i className="fas fa-sign-in-alt fa-2x"></i><br />Sign In</span></Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link to="/signup"><span className='icon-text'><i className="fas fa-user-plus fa-2x"></i><br />Sign Up</span></Link>
                                </li>
                            </ul>

                            {/* Logged in NavBar */}
                            <ul className='navbar-nav' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>   
                                <li className="nav-item mx-3">
                                    <Link to="/UserProfile"><span className='icon-text'><i className="fas fa-user fa-2x"></i><br />Me</span></Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link to="/SavedEvents"><span className='icon-text'><i className="fas fa-heart fa-2x"></i><br/>Events</span></Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <button type="button" className='btn btn-danger' onClick={this.handleSignOut()}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>                  
                </nav>

                {/* snackbar div */}
                <div id="d-flex-inline mx-auto">
                    <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                        <p id="alert_text"></p>
                    </div>
                    <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                        <p id="success_text"></p>
                    </div>
                </div>
            </div>
        );
    }


}

export default NavBar;