// mongodb package to interface node.js with our mongo software
// client for mongo server
// import db CRUD methods
const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

// define path and name of mongodb server.  The port on our local machine where db server is running
const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

// connect Node to our db server
// location
// useUnifiedTopology prevents deprecation warnings

// attempt to connect to monogodb server. connect returns promise
MongoClient.connect(url, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected correctly to server');

        // get entire database object
        const db = client.db(dbname);

        // DELETE attempt for everything in the specified collection. d
        db.dropCollection('campsites')
            // log results if passed
            .then(result => {
                console.log('Dropped Collection:', result);
            })
            // log message if collection was not found
            .catch(err => console.log('No collection to drop.'));

        // SINGE PROMISE CHAIN
        // POST attempt to add document to a collection
        dboper.insertDocument(db, {
                name: "Breadcrumb Trail Campground",
                description: "Test"
            }, 'campsites')
            // if it passes attempt to GET all documents in the database.
            // returns promise
            .then(result => {
                console.log('Insert Document:', result.ops);

                return dboper.findDocuments(db, 'campsites');
            })
            // first log the promise then attempt to PUT a specific doc with name of ...
            .then(docs => {
                console.log('Found Documents:', docs);

                return dboper.updateDocument(db, {
                    name: "Breadcrumb Trail Campground"
                }, {
                    description: "Updated Test Description"
                }, 'campsites');
            })
            // if update passes then log some info and attwmpt to GET all of the documents
            .then(result => {
                console.log('Updated Document Count:', result.result.nModified);

                return dboper.findDocuments(db, 'campsites');
            })
            //if get passes log the documents and then attempt to DELETE a specific doc
            .then(docs => {
                console.log('Found Documents:', docs);

                return dboper.removeDocument(db, {
                        name: "Breadcrumb Trail Campground"
                    },
                    'campsites');
            })
            // if delete was successful log deleted count and end the server
            .then(result => {
                console.log('Deleted Document Count:', result.deletedCount);

                return client.close();
            })
            // CATCH any errors from the start of the client start method
            .catch(err => {
                console.log(err);
                client.close();
            });
    })
    .catch(err => console.log(err));