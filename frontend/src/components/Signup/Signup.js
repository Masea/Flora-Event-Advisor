import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from '../NavBar/NavBar';
import Select from 'react-select';

const categories = [

    {value: "music",label: "Music"},
    {value: "conference",label:"Conference"},
    {value:"comedy",label:"comedy",},
    {value:"learning_education",label:"Learning Education",},
    {value:"family_fun_kids",label:"Family Fun ",},
    {value: "festivals_parades",label: "Festivals Parades",},
    {value:"movies_film",label: "Movies",},
    {value:"food",label: "Food",},
    {value: "fundraisers",label: "Fundraisers",},
    {value:"art",label:"Art",},
    {value:"support",label: "Support",},
    {value: "holiday",label:"Holiday",},
    {value: "books",label: "Books",},
    {value: "attractions",label: "Attractions",},
    {value: "community",label: "Community",},
    {value: "business",label:"Business",},
    {value: "singles_social",label: "Singles Social",},
    {value:"schools_alumni",label: "Schools Alumni",},
    {value: "clubs_associations",label:"Clubs Associations",},
    {value: "outdoors_recreation",label:"Outdoors Recreation",},
    {value: "performing_arts",label:  "Performing Arts",},
    {value:  "animals",label: "Animals",},
    {value: "politics_activism",label:"Politics Activism",},
    {value: "sales",label: "Sales",},
    {value: "science",label: "Science",},
    {value:  "religion_spirituality",label: "Religion Spirituality",},
    {value:  "sports",label:  "Sports",},
    {value:  "technology",label: "Technology",},
    {value:  "other", label: "Other"}

]

   

//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : '',
            lastname: "",
            password : "",
            email : "",
            category : '',
            registerflag: false,
            errorflag: false,
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        
    }
  

        
   
  
    
    handleChange = name => value => {
    
  
        this.setState({
          [name]: value,
          errorflag : false,
         
        });
    }     


    changeHandler(e){
    
            this.setState({
              [e.target.name] : e.target.value,
              errorflag : false,
          })
         
           
        }

    //submit Login handler to send a request to the node backend
    submitRegister = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.email,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
            category : this.state.category,
        }
        console.log("Register Request Data", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup',data)
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
        console.log("Login Request Completed")   
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
                                <input onChange = {this.changeHandler} type="text" className="form-control"  name="firstname" required={true} placeholder="First Name"/>
                            </div> 
                                <div className="form-group" >
                                <input onChange = {this.changeHandler} type="text" className="form-control"  name="lastname" required={true} placeholder="Last Name"/>
                            </div>  
                        
                           
                            <div className="form-group">
                            <input onChange = {this.changeHandler} type="email" className="form-control" name="email" required="true" placeholder="Email Address" pattern=".com" size="30" title="Must be a valid email address" />
                              </div>
                              
                            <div className="form-group">  
                                <input onChange = {this.changeHandler} type="password" className="form-control" name="password" required="true" placeholder="Password"/>
                                
                            </div>
                            <div className="form-group"> 
                             <label>What kind of events do you prefer? Select one or more.</label>
                            <Select isMulti options={categories} name="category" 
              onChange={this.handleChange('category')} defaultValue={this.props.category}></Select>
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