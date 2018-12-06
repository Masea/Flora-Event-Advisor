var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
const URL = require('url').URL;
const URLSearchParams = require('url').URLSearchParams;

var cookieParser = require('cookie-parser');
var cors = require('cors');
var {Profiles} = require('./models/profile');

var recommender = require('./recommender');
var request = require('request');

var crypt = require('./crypt');
var {mongoose} = require('./mongoose');


const EVENTFUL_APP_KEY = 'Zdpcf9VpbnwdCxTF';

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
    console.log('Request received to fetch user details: ', req.session.user);

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
    console.log('Request received to update details for user:', req.session.user);
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
    console.log("Inside recommender");

    const app_key   = EVENTFUL_APP_KEY;
    const from_date = req.query.from_date;
    const to_date   = req.query.to_date;
    const city      = req.query.city;
    const keywords  = req.query.keywords;
    //const pSize     = req.query.page_size;
    //const sortBy    = req.query.sort_order;

    const username = req.query.username;
    //var searchResults = params.data;
    //var keywords = params.keywords;
    // console.log("username");
    // console.log(username);
    // console.log("searchResults");
    // console.log(searchResults);
    // console.log("keywords");
    // console.log(keywords);
    
    var url = new URL('http://api.eventful.com/json/events/search');
    var params1 = {
        app_key : app_key,
        location    : city || "",
        keywords: keywords || "",
        date    : from_date && to_date ? from_date + '-' + to_date : 'Future',
        page_size: 500,
        sort_order: "popularity"
    }
    var params2 = {}

    for (var key in params1)
    {
        if (params1[key] != undefined && params1[key] != null )
        {
            params2[key] = params1[key];
        }
    }
    var params = new URLSearchParams(params2)
    url.search = params;

    request(url, {json: true}, function(error, response, body){
        if(!error && response.statusCode === 200){
            console.log("recom: Successfule response from Eventful API for " + url);
            //console.log("Response from Eventful API : ", body);

            const eventsArray = body.events.event;

            console.log("eventsArray[0]");
            console.log(eventsArray[0]);
            var searchResults;
            if (eventsArray)
            {
                searchResults = eventsArray.map( (element) => 
                { return {id: element.id, 
                    title: element.title,// + " " + 
                    description: ( element.description == null ? "" : element.description ), //+ " " +
                    city: (element.city_name == null ? "" : element.city_name),
                    //( element.tags == null ? "" : JSON.Stringify(element.tags) ) +
                    startDate: element.start_time,
                    endDate: element.stop_time,
                    url: element.url,
                    }; } 
                );
                console.log("searchResults[0]");
                console.log(searchResults[0]);
            }

            // get user favorite cetegories array from db
            Profiles.findOne(
                {username: username}, {username: 1, category: 1}
            , function(err,user){
                if (err || !eventsArray) {   
                    res.code = "400";
                    res.value = "Something happened. Try Again !!";
                    console.log(res.value);
                    res.sendStatus(400).end();
                } else if(user){
                    var cats = user.category;
                    var userCategories = [];
                    console.log("user:");
                    console.log(user.username);
                    //console.log(cats);

                    cats.forEach((cat) => { userCategories.push(cat.label); });
                    console.log("userCategories");
                    console.log(userCategories);

                    var recommendedResults;
                    recommender.recommend(username, userCategories, keywords,  searchResults, function (response) {
                    recommendedResults = response;    
                        console.log("Recommendation results: ", recommendedResults);
                    });

                    res.status(200).send({auth: true, recommendedResults});
                }  
                else{
                    console.log("User not found, cannot do recommendation.")
                    res.sendStatus(400).end();
                }          
            })  

           
            //res.status(200).send(body);
        }
        else{
            //console.log("Error in fetching results from " + url + " : " + JSON.stringify(error));
            //console.log("Response from Eventful API : " + JSON.stringify(response));
            //console.log("Body from eventful API : " + JSON.stringify(body));
            console.log("recom: Error in response");
            res.status(500).send("recom: Error in fetching search results from Eventful API");
        }
    })
    
});
 
//fetch_events API endpoint to get search results
app.get('/api/fetch_events', function(req, res){
    const app_key   = EVENTFUL_APP_KEY;
    const from_date = req.query.from_date;
    const to_date   = req.query.to_date;
    const city      = req.query.city;
    const keywords  = req.query.keywords;
    
    var url = new URL('http://api.eventful.com/json/events/search');
    var params = new URLSearchParams({
        app_key : app_key,
        location    : city || "",
        keywords: keywords || "",
        date    : from_date && to_date ? from_date + '-' + to_date : 'Future'
    })
    url.search = params;

    request(url, {json: true}, function(error, response, body){
        if(!error && response.statusCode === 200){
            console.log("Successfule response from Eventful API for " + url);
            console.log("Response from Eventful API : ", body);
           
            res.status(200).send(body);
        }
        else{
            //console.log("Error in fetching results from " + url + " : " + JSON.stringify(error));
            //console.log("Response from Eventful API : " + JSON.stringify(response));
            //console.log("Body from eventful API : " + JSON.stringify(body));
            console.log("Error in response");
            res.status(500).send("Error in fetching search results from Eventful API");
        }
    })
})


//start the server on port defined in env or 3001
const port = process.env.PORT || 3001 ;
app.listen(port);
console.log("Server listening on port " + port);