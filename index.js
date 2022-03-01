// mongodb package to interface node.js with our mongo software
// clinet for mongo server
// assert shorthand error checking object
// import db CRUD methods
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

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

        // try to delete doc and log infor about deletion
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        // POST a document to campsites and log the result
        dboper.insertDocument(db, {
                name: "Breadcrumb Trail Campground",
                description: "Test"
            },
            'campsites', result => {
                console.log('Insert Document:', result.ops);

                // GET documents in campsites and log them
                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);

                    // PUT update the document and log updated doc
                    // first arg get document to update by giving it a key/value we are looking for
                    // new property to change
                    dboper.updateDocument(db, {
                            name: "Breadcrumb Trail Campground"
                        }, {
                            description: "Updated Test Description"
                        }, 'campsites',
                        result => {
                            // log count
                            console.log('Updated Document Count:', result.result.nModified);

                            // GET documents in campsites and log them
                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents:', docs);

                                // DELETE the doc by name and log how many items were delteted
                                dboper.removeDocument(db, {
                                        name: "Breadcrumb Trail Campground"
                                    },
                                    'campsites', result => {
                                        console.log('Deleted Document Count:', result.deletedCount);

                                        // close app
                                        client.close();
                                    });
                            });
                        });
                });
            });
    });
});