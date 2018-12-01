var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
const proxy = require('http-proxy-middleware');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var {Profiles} = require('./models/profile');
//var mysql = require('mysql');

var recommender = require('./recommender');
var request = require('request');

var crypt = require('./crypt');
var {mongoose} = require('./mongoose');
//var pool = require('./pool');
//var db = require('./db');
//app.use(cookieParser);
//use cors for cross origin resourse sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use express-session to maintain session data
app.use(session({
    secret              : 'cmpe280_react_express',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


//allow access control 
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");

  var username = req.body.username;
  var password = req.body.password;

  Profiles.findOne({
    username:username
}, function(err,user){
    if (err) {
        
        res.status(400).json({
                
            user: user.username ,
            message:"Db connect Error. Try Again !!",
            success: false,
            
        });
        res.end("Db connect Error. Try Again !!");

        
    } else if(user){
        console.log("user from mongo", user);
        crypt.compareHash(password, user.password, function (err, isMatch) {
        if (isMatch && !err) {
            
            res.cookie('cookie',user.username,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.status(200).json({
                
                user:user.username ,
                message:'Login Successful',
                success: true,
                
            });

            //res.end("Login Successful");
             
        }
        else{
                
            res.status(401).json({
                
                user:user.username ,
                message:"Password did not match.",
                success: false,
                
            });
            res.end("Password did not match.");
        } 
        }) 
     
    }
    else{
        console.log("user from mongo", user);
        res.status(404).json({
            message:"User not found. Try Again !!",
            success: false,
            
        });
        res.end("User not found. Try Again !!");

    }
    
})


   
  
    console.log("Outside Login Post Request");

    
});


//signup

app.post('/signup',function(req,res){
    
    console.log("Inside Register User Handler");
    
     var username = req.body.username;
     var password = req.body.password;
     var firstname = req.body.firstname;
     var lastname = req.body.lastname;
     var email = req.body.email;
     

    var passwordHash;
    crypt.createHash(password, function (response) {
    passwordHash = response;
    
    console.log("Encrypted Password id : ", passwordHash );
     
    var profile = new Profiles({
        username: username,
        password: passwordHash,
        firstname: firstname,
        lastname : lastname,
        email : email,

    })
    
    
    Profiles.findOne({
        username:username
    }, function(err,user){
        if (err) {
              
            res.code = "400";
            res.value = "Something happened. Try Again !!";
            console.log(res.value);
            res.sendStatus(400).end();
            
       
        } else if(user){

            res.code = "406";
            res.value = "Username already exist. Try Again !!";
            console.log(res.value);
            res.sendStatus(406).end();
     
        
        }  
        else{

            console.log("User not found, Create a new profile")
            profile.save().then((profile)=>{
                console.log("User created : ",profile);
                res.sendStatus(200).end();
            },(error)=>{
                console.log("Error Creating User");
                res.sendStatus(400).end();
            })
        }          
    })  
})
});

//fetch user details from the database
app.get('/userDetails', function(req, res){
    console.log('Request received for user: ', req.session.user);

    Profiles.findOne({username: req.session.user.username}, function(err, user){
        if(err) {
            res.status(500).send({err});
        }
        if(!user){
            console.log("User not found");
            res.status(500).send({auth: false, message:"User not found"});
        }
        else{
            res.status(200).send({auth: true, user});
        }
    });
}
)

//update user details in the database
app.post('/updateProfile', function(req, res){
    console.log('Request received for user:', req.session.user);
    var params = req.body.params;

    user = {
        firstname:params.firstname,
        lastname: params.lastname,
        gender: params.gender,
        phone: params.phone,
        home: params.home,
        city: params.city,
        school: params.school,
        language: params.language,
        aboutme: params.aboutme,
        company: params.company,
        category: params.category,
    }

    console.log(user);

    Profiles.findByIdAndUpdate(req.session.user, user, function(err, result){
        if(err) throw err;
        if(!result){
            console.log("User not found");
            res.status(500).send({auth: false, status: "ERROR", message:"User not found"});
        }
        res.status(200).send({auth: true, status: "SUCCESS", user});
    })
});

// Recommendation api
app.get('/api/get-recommendations', (req, res) => {
    console.log(req.body);
    console.log("Inside recommender");
    
    var username = req.body.username;
    var app_key = req.body.app_key;
    var keywords = req.body.keywords;
    var location = req.body.location;
    var date = req.body.date;
    
    /*
    // get user favorite cetegories array from db
    Profiles.findOne({
        username:username
    }, function(err,user){
        if (err) {   
            res.code = "400";
            res.value = "Something happened. Try Again !!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else if(user){
            res.code = "406";
            res.value = "Username already exist. Try Again !!";
            console.log(res.value);
            res.sendStatus(406).end();
        }  
        else{
            console.log("User not found, Create a new profile")
            profile.save().then((profile)=>{
                console.log("User created : ",profile);
                res.sendStatus(200).end();
            },(error)=>{
                console.log("Error Creating User");
                res.sendStatus(400).end();
            })
        }          
    })  */

    // get data from eventful api
    /*<script type="text/javascript" src="http://api.eventful.com/js/api/json"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    */
    const APP_KEY = "57VcTrmddt9v2nbJ";
    var oArgs = {
          app_key: APP_KEY,
          q: "music",
          where: "New York", 
          "date": "2018102700-2018102800",
          page_size: 10,
          sort_order: "popularity",
       };

    var searchResults = [];
    /*EVDB.API.call("http://api.eventful.com/js/api/json/events/search/events/search", oArgs, function(oData) {
      // Note: this relies on the custom toString() methods below
      //var dt = jQuery.parseJSON(oData);
      if (oData.events.event != null)
      {
        searchResults = oData.events.event;
      }

    });*/
    
    var url = 'http://api.eventful.com/api/json/events/search';
    url += oArgs
    request('http://api.eventful.com/api/json/events/search', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage. 
      }
    });

    var recommendedResults;
    //recommender.recommend(userCategories, searchResults, function (response) {
     //   recommendedResults = response;    
       // console.log("Recommendation results: ", recommendedResults);
       // });

    res.send( { recommendedResults }
    //`I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});
        

// //Add middleware for http proxying 
var proxy_options = {
    target: 'http://api.eventful.com/json/events/search', // http://api.eventful.com/js/api/json/events/search
    router: {
        '/api/fetch_events' :   'http://api.eventful.com/json/events/search', 
        '/events'           :   'http://www.eventful.com/events',
    }
}
var apiProxy = proxy(proxy_options);
app.use(apiProxy);

//routes



//start the server on port 3001
app.listen(3001);
console.log("Server listening on port # 3001");