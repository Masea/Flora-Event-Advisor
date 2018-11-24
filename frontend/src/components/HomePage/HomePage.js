import React, {Component} from 'react';
import './HomePage.css';
import {Redirect} from 'react-router';

import { Carousel } from "react-responsive-carousel";
import Artist from "../images/artists.jpg"
import Athletics from "../images/athletics.jpg"
import Audi from "../images/auditorium.jpg"
import Art from "../images/Art-Gallery.jpg"


//Define a Login Component
class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
        }
        this.handleclicks = this.handleclicks.bind(this);
    }
    
 handleclicks = () => {
    
     this.setState({redirect:true});
 }

    render(){
        let redirectVar = null;

    if (this.state.redirect){
        redirectVar = <Redirect to= "/login"/>
    }
    return (
             <div>
             
             {redirectVar}
            <Carousel  onClickItem={this.handleclicks} infiniteLoop autoPlay interval={1000} showArrows={false} 
            showStatus={false} showIndicators={false} showThumbs={false}>
            
            <div class="imagestyle" style={{backgroundImage:`url(${Artist})`}}>
            <h1 class="heading">Concerts </h1>
            
            </div>

            <div class="imagestyle" style={{backgroundImage:`url(${Athletics})`}}>
            <h1 class="heading">Sports</h1>
            
            </div>

            <div class="imagestyle" style={{backgroundImage:`url(${Audi})`}}> 
            <h1 class="heading">Talks</h1>
            
            </div>

            <div class="imagestyle" style={{backgroundImage:`url(${Art})`}}>
            <h1 class="heading">Art Gallery</h1>
            
            </div>
            
           
            
          </Carousel>

            </div> 

       
        
       
        )
    }
}

export default HomePage;