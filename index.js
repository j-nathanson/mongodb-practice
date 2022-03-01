// mongodb package to interface node.js with our mongo software
// clinet for mongo server
// assert shorthand error checking object
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

// define path and name of mongodb server.  The port on our local machine where db server is running
const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

// connect Node to our db server
// location
// useUnifiedTopology prevents deprecation warnings
// callback
MongoClient.connect(url, {
    useUnifiedTopology: true
}, (err, client) => {

    // check if error is NOT null
    // if it fails it will throw an error and terminate application
    assert.strictEqual(err, null);

    // mongodb server
    console.log('Connected correctly to server');

    // connect to the mongodb server
    const db = client.db(dbname);

    // delete all the documents in the campsites collection
    // 'drop' rather than delete
    // deletes campsite collection does ansyc check
    db.dropCollection('campsites', (err, result) => {
        // check if error is NOT null and log resulting connections
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        // recreate campsite collection
        const collection = db.collection('campsites');

        // insert a doc into the collection
        collection.insertOne({
                name: "Breadcrumb Trail Campground",
                description: "Test"
            },
            (err, result) => {
                // check if errors are NOT null
                // for 'insertOne()' result.ops will contain array that the doc was inserted in
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);

                // print all docs in collection
                // find() empty for all docs. 
                // toArray convert doc to array of objects
                collection.find().toArray((err, docs) => {
                    // check if not null
                    assert.strictEqual(err, null);
                    console.log('Found Documents:', docs);

                    //close client connect to the mongodb server
                    client.close();
                });
            });
    });
});