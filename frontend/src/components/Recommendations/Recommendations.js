// import React, {Component} from 'react';
// import './Recommendations.css';
// //import SimpleMap from '../GoogleMap/GoogleMap';
// import EventCard from '../EventCard/EventCard';
// //import NavBar from '../NavBar/NavBar';
// // import axios from 'axios';
// // import cookie from 'react-cookies';
// // import {Redirect} from 'react-router';

// var requireLib = function(src, success, failure){
//     !function(source, success_cb, failure_cb){
//             var script = document.createElement('script');
//             script.async = true; script.type = 'text/javascript'; script.src = source;
//             script.onload = success_cb || function(e){};
//             script.onerror = failure_cb || function(e){};
//             (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
//     }(src, success, failure);
// }

// requireLib('http://api.eventful.com/js/api/json', function(){
//     console.log('Eventful is ready to use');
// }, function(){
//     console.log("Something went wrong loading this script");
// });

// class Recommendations extends Component{

//     constructor(props){
//         super(props);
//     }

//     getRecommendations(userId, searchQuery)
//     {
//         switch (recommenderType)
//         {
//             case 'recently-viewed': // last viewed items

//             break;
//             case 'similar-users-also-viewed': // collaborative filtering; based on users' browsing history

//             break;
//             case 'top-10': // user-item content-based recommendation

//             break;
//             case 'search-results': // unfiltered search results from API call; most popular
//             default: 

//             break;

//         }

//         var nlpContentBasedRecommendations = nlpContentBased(userId, searchQuery);
//         var UserUserContentBasedRecommendations = UserUserContentBased(userId, searchQuery);
//         var UserItemContentBasedRecommendations = UserItemContentBased(userId, searchQuery);
//         var CFBrowsingRecommendations = CFBrowsingHistory(userId, searchQuery);
//         var GraphBasedRecommendations = GraphBasedBrowsingHistory(userId, searchQuery);
//     }

//     /// https://github.com/stanleyfok/content-based-recommender
//     nlpContentBased(userId, searchQuery)
//     {
//         const ContentBasedRecommender = require('content-based-recommender')
//         const recommender = new ContentBasedRecommender({
//             maxVectorSize: 50,
//             minScore: 0.5,
//             maxSimilarDocuments: 10
//         });

//         // prepare documents data

//         const documents = [];

//         documents.push({event.Id, event.title + " " + event.description});
//           { id: '1000001', content: 'Why studying javascript is fun?' },
//           { id: '1000002', content: 'The trend for javascript in machine learning' },
//           { id: '1000003', content: 'The most insightful stories about JavaScript' },
//           { id: '1000004', content: 'Introduction to Machine Learning' },
//           { id: '1000005', content: 'Machine learning and its application' },
//           { id: '1000006', content: 'Python vs Javascript, which is better?' },
//           { id: '1000007', content: 'How Python saved my life?' },
//           { id: '1000008', content: 'The future of Bitcoin technology' },
//           { id: '1000009', content: 'Is it possible to use javascript for machine learning?' }
//         ];

//         // start training
//         recommender.train(documents);

//         //get top 10 similar items to document 1000002
//         const similarDocuments = recommender.getSimilarDocuments('1000002', 0, 5);

//         console.log(similarDocuments);
//         /*
//           the higher the score, the more similar the item is
//           documents with score < 0.1 are filtered because options minScore is set to 0.1
//           [
//             { id: '1000004', score: 0.5114304586412038 },
//             { id: '1000009', score: 0.45056313558918837 },
//             { id: '1000005', score: 0.37039308109283564 },
//             { id: '1000003', score: 0.10896767690747626 }
//           ]
//         */
//     }
    
//     /// https://github.com/axiomzen/Alike
//     knnContentBased(userId, stopDate)
//     {
//         var categorieIds = [
//             "music",
//             "conference",
//             "comedy",
//             "learning_education",
//             "family_fun_kids",
//             "festivals_parades",
//             "movies_film",
//             "food",
//             "fundraisers",
//             "art",
//             "support",
//             "holiday",
//             "books",
//             "attractions",
//             "community",
//             "business",
//             "singles_social",
//             "schools_alumni",
//             "clubs_associations",
//             "outdoors_recreation",
//             "performing_arts",
//             "animals",
//             "politics_activism",
//             "sales",
//             "science",
//             "religion_spirituality",
//             "sports",
//             "technology",
//             "other"
//         ];

//         knn = require('alike');

//         options = {
//           k: 10,
//           weights: {
//             music: 0.8,
//             conference: 0.8,
//             comedy: 0.8,
//             learning_education: 0.8,
//             family_fun_kids: 0.8,
//             festivals_parades: 0.8,
//             movies_film: 0.8,
//             food: 0.8,
//             fundraisers: 0.8,
//             art: 0.8,
//             support: 0.8,
//             holiday: 0.8,
//             books: 0.8,
//             attractions: 0.8,
//             community: 0.8,
//             business: 10.8,
//             singles_social: 0.8,
//             schools_alumni: 0.8,
//             clubs_associations: 0.8,
//             outdoors_recreation: 0.8,
//             performing_arts: 0.8,
//             animals: 0.8,
//             politics_activism: 0.3,
//             sales: 0.5,
//             science: 0.8,
//             religion_spirituality: 0.8,
//             sports: 0.8,
//             technology: 0.8,
//             other: 0.5
//           },
//           filter:   function(o) {
//                         return (o.stopTimestamp >= new Date(searchQuery.startDate) &&
//                             o.stopTimestamp <= new Date(searchQuery.endDate);
//                     }   

//         userTaste = {
//             music: 0.8,
//             conference: 0.8,
//             comedy: 0.8,
//             science: 0.8,
//             learning_education: 0.8
//         }

//         var results = knn(movieTaste, movies, options);

//         return results;
//     }


//     UserUserContentBased(userId, searchQuery)
//     {

//     }

//     UserItemContentBased(userId, searchQuery)
//     {

//     }

//     ///< provide collaborative filtering recommendations based on users browsing history
//     ///< using number of clicks on each event to deduce user 'ratings' for events
//     ///< using KNN to classify events (past and future) based on all features except timestamps
//     ///< sort events in recommended category by start time
//     ///< recommend the one that is closest to start time in user search
//     CFBrowsingHistory(userId)
//     {
//         /*var words="Hi there and hello there. Welcome and hello there.";

//         var wordcnt = words.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
//             map[word] = (map[word]||0)+1;
//             return map;
//         }, Object.create(null));*/

//         var clickEventLog={userId,eventid,timestamp}; // fetch log data from db

//         ///< reduce log array to dedct user "ratings" for events
//         var clickEventLogReduced = clickEventLog.reduce((reduced, (item, i)) => { 
//             clickEventLogReduced[item.userId][item.eventId] = {((clickEventLogReducedap[item.userId][item.eventId]||0)+1)};
//             return clickEventLogReduced;
//         }, {});

//         var reducedLogArray = {};
//         var i = 0;
//         for(var uid in clickEventLogReduced) {
//           for(var eid in clickEventLogReduced) {  
//             reducedLogArray[i] = eid, uid, clickEventLogReduced[uid][eid];
//         }

//         ///< build recommender
//         var jsrecommender = require("js-recommender");
 
//         var recommender = new jsrecommender.Recommender();
//         /// configure recommender
//         var recommender = new jsrecommender.Recommender({
//             alpha: 0.01, // learning rate
//             lambda: 0.0, // regularization parameter
//             iterations: 500, // maximum number of iterations in the gradient descent algorithm
//             kDim: 2 // number of hidden features for each event
//         });
              
//         var table = new jsrecommender.Table();
         
//         // table.setCell('[movie-name]', '[user]', [score]);
//         for (var uid in clickEventLogReduced) {
//           for (var eid in clickEventLogReduced) {  
//             table.setCell(eid, uid, clickEventLogReduced[uid][eid]);
//           }
//         }
         
//         var model = recommender.fit(table);
//         console.log(model);
         
//         predicted_table = recommender.transform(table);
         
//         console.log(predicted_table);
         
//         for (var i = 0; i < predicted_table.columnNames.length; ++i) {
//             var user = predicted_table.columnNames[i];
//             console.log('For user: ' + user);
//             for (var j = 0; j < predicted_table.rowNames.length; ++j) {
//                 var event = predicted_table.rowNames[j];
//                 console.log('Event [' + event + '] has actual rating of ' + Math.round(table.getCell(event, user)));
//                 console.log('Event [' + event + '] is predicted to have rating ' + Math.round(predicted_table.getCell(event, user)));
//             }
//         }
        
//     }

//     GraphBasedBrowsingHistory(userId, searchQuery)
//     {

//     }

//     function search()
//     {
//        var oArgs = {
//           app_key: APP_KEY,
//           q: "music",
//           where: "New York", 
//           "date": "2018102700-2018102800",
//           page_size: 10,
//           sort_order: "popularity",
//        };

//        EVDB.API.call("/events/search", oArgs, function(oData) {
//         $(document).ready(function () {
//           //your code here
//           // Note: this relies on the custom toString() methods below
//           //var dt = jQuery.parseJSON(oData);
//           if (oData.events.event != null)
//           {
//             $('#q1').html(JSON.stringify(oData.events));
//             $.each(oData.events.event, function(i, item){
//             $("#q1").append("<div>" + item.tags + "</div>");
//           });
//             $('#q2').html(oData.events.event[0].url); // JSON.stringify(oData.events)
//           }
//           else
//           {
//             $('#q2').html("No results");
//           }

//         });
//       });
//   // cancel the default action of the link by returning false
//   return false;
// }

//     render(){
        
//         return (
//             {/* Recommended Events Card */}
//             <EventCard cardType = 'recommended' eventid='1'/>
//             <EventCard cardType = 'recommended' eventid='1'/>
//             <EventCard cardType = 'recommended' eventid='1'/>
//             <EventCard cardType = 'recommended' eventid='1'/>
//             <EventCard cardType = 'recommended' eventid='1'/>

            
//              /*       
//             <div className='recommended mx-0 bg-white' style={{display: this.props.cardType === 'recommended' ? 'block':'none'}}>
//                 <div className='row flex-row'>
//                     <div className="col-3 px-0 border-0 align-self-center recommendedImg">
//                         <img src='images/eventImage.jpeg' alt="Recommended Event" className='w-100'/>
//                     </div>
//                     <div className="col-8 pl-2 recommendedData">
//                         <p>Event Title</p>
//                         <p>San Francisco, California</p>
//                         {/* <p>{this.state.eventTitle}</p><br/>
//                         <p>{this.state.eventCity}</p><br/>
//                         <p>{this.state.startTimestamp} - {this.state.stopTimestamp}</p><br/>*}
//                     </div>
//                 </div>
//             </div>*/
                        
//         )
//     }
// }

// export default Recommendations;