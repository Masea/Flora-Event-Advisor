import React, {Component} from 'react';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';
import Select from 'react-select';
import {BACKEND_HOST} from '../host_config';


const categories = [
    {value: "music",label: "Music"},
    {value: "conference",label:"Conference"},
    {value:"comedy",label:"Comedy",},
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


class UserProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: cookie.load('name'),
            category: '',
        };
        this.handleSave = this.handleSave.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    }

    changeHandler(e){    
        this.setState({
            [e.target.name] : e.target.value,
      });   
    }

    handleSave = (e) =>{
        axios.post( BACKEND_HOST + '/updateProfile', {
            params: {
                firstname: document.getElementById('input_fname').value,
                lastname: document.getElementById('input_lname').value,
                username: document.getElementById('input_email').value,
                phone: document.getElementById('input_phone').value,
                aboutme: document.getElementById('input_aboutMe').value,
                company: document.getElementById('input_company').value,
                school: document.getElementById('input_school').value,
                home: document.getElementById('input_home').value,
                role: document.getElementById('input_role').value,
                language: document.getElementById('input_language').value,
                gender: document.getElementById('profileGender').value,
                category: this.state.company
            }            
        })
        .then((res) =>{
            if(res.status === 200){
                console.log("Successful update!");
                document.getElementById("success_text").innerHTML = "Successfully updated your profile!";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    document.getElementById("success_snackbar").style.setProperty('display', 'none');
                    
                }, 10000);              
            }
            else{
                console.log("Err in updating the user profile.");
                document.getElementById("alert_text").innerHTML = "ERROR: Could not update your profile.";
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        })
    }

    componentDidMount () {
        console.log('Inside component did mount')
        axios.get(BACKEND_HOST + '/userDetails')
        .then((res) => {
            console.log(res.data);
            this.setState({
                firstname: res.data.user.firstname,
                lastname: res.data.user.lastname,
                email: res.data.user.username,
                phone: res.data.user.phone,
                city: res.data.user.city,
                company: res.data.user.company,
                aboutMe: res.data.user.aboutme,
                hometown: res.data.user.home,
                language: res.data.user.language,
                gender: res.data.user.gender,
                school: res.data.user.school,
                role: res.data.user.role,
                category: res.data.user.category
            });
        })
        .catch((err) => {
            console.log("Error: " + err);
        });
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to="/login" />;
        }
        return(
            <div >
                {redirectVar}
                <NavBar />
                <div className = "d-block w-100">
                    <div className = "container-fluid travellerProfile mt-2 pt-2">
                        {/* <div className= "container col-md-5  mt-4 pt-4">
                            <div className="profile-photo text-center" >
                                <div className="align-center">
                                    <img className="rounded-circle" src={this.state.photoURL === null? "img/profile-clipart.jpg" : this.state.photoURL} height="80px" width="80px" alt="profile photo"/>
                                </div>
                                <input 
                                    type = "file"
                                    name = "images"
                                    onChange = {this.fileUploadHandler}
                                    style = {{display: 'none'}}
                                    ref = {fileInput => this.fileInput = fileInput} />
                                <button className="btn btn-default edit-btn" title="Add photo" type="button" onClick={() => this.fileInput.click()} >
                                        <i className="icon-edit fas fa-pen"></i>
                                </button>
                            </div>
                            <h3 className = "userName text-center">{this.state.name}</h3>
                        </div> */}
                        <div>
                            <div className="container col-md-5  mt-3 pt-3 border rounded">
                                <div className= "profile-details ">
                                    <h3>Profile Information</h3><br/>
                                    {/* <form class="profiledetails" id="input_updateForm" method="post" action="/updateProfile"> */}
                                        <div class="form-group col-md-10">
                                            <input id="input_fname" name="fname" class="form-control" defaultValue={this.state.firstname} type="text" placeholder="First Name"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_lname" name="lname" class="form-control" defaultValue={this.state.lastname} type="text" placeholder="Last Name"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_email" name="email" class="form-control" defaultValue={this.state.email} type="text" placeholder="Email"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_phone" name="phone" class="form-control" defaultValue={this.state.phone} type="text" placeholder="Phone"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_aboutMe" name="aboutMe" class="form-control" defaultValue={this.state.aboutMe} type="text" placeholder = "About me"/>                                     
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_city" name="city" class="form-control" defaultValue={this.state.city} type="text" placeholder = "City"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_school" name="school" class="form-control" defaultValue={this.state.school} type="text" placeholder = "School"/>
                                        </div>                                            
                                        <div class="form-group col-md-10">
                                            <input id="input_home" name="home" class="form-control" defaultValue={this.state.home} type="text" placeholder = "Hometown"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_company" name="company" class="form-control" defaultValue={this.state.company} type="text" placeholder = "Company"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_role" name="role" class="form-control" defaultValue={this.state.role} type="text" placeholder = "Role"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_language" name="language" class="form-control" defaultValue={this.state.language} type="text" placeholder = "Language"/>
                                        </div>                                   
                                        <div className="col-md-10">
                                        <select id="profileGender" name="gender" form="input_updateForm" class="form-control">
                                            <option value="female" selected={this.state.gender === 'female' ? 'selected' : ''}>Female</option>
                                            <option value="male" selected={this.state.gender === 'male' ? 'selected' : ''}>Male</option>
                                            <option value="other" selected={this.state.gender === 'other' ? 'selected' : ''}>Other</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-10"> 
                                            <label>What kind of events do you prefer? Select one or more.</label>
                                            <Select isMulti options={categories} name="category" 
                                                onChange={this.handleChange('category')} defaultValue={this.props.category}></Select>
                                        </div>
                                        {/* <input type = "hidden" name = "photoURL" value = {this.state.photoURL}/> */}
                                        <div className=" row col-md-8 mt-2 pt-2">
                                            <button class="btn btn-info mx-2"  type="reset" >Reset</button>
                                            <button class="btn btn-primary mx-2" onClick={this.handleSave}>Save</button>
                                        </div>
                                    {/* </form> */}
                                </div>
                            </div>
                            {/* <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                                <p id="alert_text"></p>
                            </div>
                            <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                                <p id="success_text"></p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;