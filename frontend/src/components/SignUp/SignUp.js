import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from '../NavBar/NavBar';

//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname: "",
            password : "",
            email : "",
            
            registerflag: false,
            errorflag: false,
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        
        this.submitRegister = this.submitRegister.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
    //     })
    // }
    // //username change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value,
            errorflag : false,
            
        })
    }

    rolechangeHandler(e) {

        this.setState({
            role : e.target.value,
            errorflag : false,
            
        })

    }

        
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value,
            errorflag : false,
        })
    }
    // //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value,
            errorflag : false,
        })
    }
    // //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value,
            errorflag : false,
        })
    }
    //submit Login handler to send a request to the node backend
    submitRegister = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username:this.state.email,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
            role : this.state.role
        }
        console.log("Register Request Data", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/register',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        registerflag : true
                    })
                    console.log("Success Post");
                }else{
                    
                    this.setState({
                        errorflag : true
                    })
                    console.log("Failure Post");
                }
            })
            .catch((error) => {
                // Error
                if (error.response) {

                    this.setState({
                        errorflag : true
                    })
                    
                } else if (error.request) {
                    this.setState({
                        errorflag : true
                    })
                    
                    console.log(error.request);
                } else {
                    this.setState({
                        errorflag : true
                    })
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
                this.setState({
                    errorflag : true
                })
            });
        //console.log("Login Request Completed")   
 }

    render(){
        //redirect based on successful login
        
        let redirectVar = null;
        let errorlog = null;
        if(this.state.registerflag){
            //console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= "/login"/>
        }
        
        if(this.state.errorflag)
        {

            errorlog = <div className="alert-danger" > 
                       User Already exist. Try Again !!
                       
                        </div>
        }
        console.log("Rendering to Register Page") 

        
        
         

        return(
    
           <div>
               {redirectVar}
               <NavBar />
               <div className="jumbotron jumbotron-fluid"> 
               {errorlog}
            {/* <div className="container"> */}
         
                <div className="login-form"  >
                
                
                
                    <div className="main-div" style={{"maxWidth": '50%'}}>
                    <h3> Signup to Flora Event Advisor</h3>
                    <br/>   
                            <div className="form-group" >
                                <input onChange = {this.firstnameChangeHandler} type="text" className="form-control"  name="first_name" required={true} placeholder="First Name"/>
                            </div> 
                                <div className="form-group" >
                                <input onChange = {this.lastnameChangeHandler} type="text" className="form-control"  name="last_name" required={true} placeholder="Last Name"/>
                            </div>  
                        
                           
                            <div className="form-group">
                            <input onChange = {this.emailChangeHandler} type="email" className="form-control" name="email" required="true" placeholder="Email Address" pattern=".com" size="30" title="Must be a valid email address" />
                              </div>
                              
                            <div className="form-group">  
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" required="true" placeholder="Password"/>
                                
                            </div>
                           
                    
                    <p font-size = "16px">Already have an account? <Link to="/login" style={{color: 'blue'}}>Login</Link></p>
                            <div style={{"textAlign": 'center'}}>
                            <button onClick = {this.submitRegister} className="btn btn-primary">Sign Me Up</button>                 
                            </div>
                    </div>
                
               </div>
            {/* </div> */}
               
               </div>
           
               
            </div> 
              
       
        )
    }
}

export default Signup;