import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';


class NavBar extends Component {
    constructor(props){
        super(props);
    this.state = {
        isLoggedIn: false,
    }}

    render() {
        
        return(
            <div>
                <nav className ="navbar navbar-expand-sm" id="mainNav" >
                    <div className="container">
                        <div className="d-flex w-100">

                            {/* Landing Page Navbar */}
                            <div className='navbar-brand'>
                                <img alt="Flora" src="./favicon.ico" className="align-self-center" height="30px"/>
                            </div>

                            {/* <form className="navbar-form navbar-right ml-auto form-inline"  onSubmit={this.onSubmit}>
                                <div className='input-group input-group-sm'>
                                    <input type='email'    className='form-control' name='email'    placeholder='Email' value={this.state.email} onChange={this.onChange}/>
                                </div>
                                <div className='input-group input-group-sm mx-2'>
                                    <input type='password' className='form-control input-sm' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange} />
                                </div>  
                                <button type='submit' className='btn btn-outline-light btn-sm'>Sign In</button>
                            </form> */}
                            

                            {/* Logged In Navbar Additions */}
                            <div className='align-self-center align-items-end ml-auto'>
                                <ul className='navbar-nav' style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                                    
                                    <li className="nav-item nav-link mx-4 py-0 dropdown">
                                        <a className="dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                            <span className='icon-text'><i className="fas fa-user fa-2x"></i><br/>Me</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                            <div className='dropdown-item' >
                                                <div className='navbar-profile-name'>Jane Doe</div>
                                                <br/>
                                                <Link to="/login"><span className='text-info'>Your Profile</span></Link><br/><br/>
                                                <Link to="/login"><span className='icon-text'><i className="fas fa-heart fa-2x"></i><br/> Saved Events</span></Link>                                 
                                 

                                            </div>
                                            <span className='dropdown-item text-secondary'><button className='btn btn-danger' >Sign Out</button></span>                            
                                        </div>
                                    </li>
                                    
                                </ul>
        </div>
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