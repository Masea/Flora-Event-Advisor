'use strict';
// npm install content-based-recommender --save
const ContentBasedRecommender = require('content-based-recommender')

var recommender = {};

recommender.recommend = function(userId, userCategories, eventData, successCallback)
{
    const recommender = new ContentBasedRecommender({
        maxVectorSize: 50,
        minScore: 0.5,
        maxSimilarDocuments: 10
    });

    // prepare documents data
    var documents = [];
    // push event contents
    documents = eventData.reduce((docs, e, index) => { 
        docs.push({id: e.id, content: e.title + " " + e.description}); return docs; }, []);
    // push user contents
    documents.push(userId, userCategories.join());

    // start training
    recommender.train(documents);

    //get top 5 similar items to document 1000002
    const similarDocuments = recommender.getSimilarDocuments(userId, 0, 5);

    console.log(similarDocuments);
    successCallback(similarDocuments);
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