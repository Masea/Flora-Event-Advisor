'use strict';
// npm install content-based-recommender --save
const ContentBasedRecommender = require('content-based-recommender')

var recommender = {};

recommender.recommend = function(userId, userCategories, keywords, eventData, successCallback)
{
    console.log("inside recommend function");
    const recommender = new ContentBasedRecommender({
        maxVectorSize: 700,
        minScore: 0,
        maxSimilarDocuments: 10
    });

    // prepare documents data
    var documents = [];
    //var eventDataJSON = JSON.parse(eventData);
    //console.log("eventData");
    //console.log(eventData);

    const associativeEventData = {};

    //if (eventData !== undefined && eventData !== null)
    //{
        // push event contents
        eventData.forEach( (e) => { var ejson = e;//JSON.parse(e);
            documents.push({id: ejson["id"], content: ejson["title"]+" "+ejson["description"] }); 
            associativeEventData[ejson["id"]] = ejson;
       });
        // push user contents
        documents.push({id: userId, content: userCategories.join(' ')+(keywords != "" ? " "+keywords : "")});

        //console.log("documents");
        //console.log(documents);

        // start training
        recommender.train(documents);

        //get top 5 similar items to document 1000002
        const similarDocuments = recommender.getSimilarDocuments(userId, 0, 5);
        const similarEventData = similarDocuments.map( item => { return associativeEventData[item.id]; } );
        //const similarEventData = eventData.filter(item => similarDocIds.includes(item.id) );

        console.log("similarDocuments");
        console.log(similarDocuments);
        //console.log("similarDocIds");
        //console.log(similarDocIds);
        console.log("similarEventData");
        console.log(similarEventData);
        
        successCallback(similarEventData);
    //}

    /*
      the higher the score, the more similar the item is
      documents with score < 0.1 are filtered because options minScore is set to 0.1
      [
        { id: '1000004', score: 0.5114304586412038 },
        { id: '1000009', score: 0.45056313558918837 },
        { id: '1000005', score: 0.37039308109283564 },
        { id: '1000003', score: 0.10896767690747626 }
      ]
    */
}

module.exports = recommender;