// import assert module strict
const assert = require('assert').strict;

// add a methods to exports, all need callback functions

//POST a document to a collection,
exports.insertDocument = (db, document, collection, callback) => {
    // find collection we want to add it "campsites"
    const coll = db.collection(collection);
    // add document to collection, first error check then if passed do a callback function with the results
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

// GET all documents in  collection
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    // find all documents and convert to an array. error check, then use callback on the docs array
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

// DELETE a document in a collection
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    // delete document from collection, first error check then callback on the result(info on what was deleted)
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

// PUT a document in a collection
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    //  update a document with new info (update)
    // $set: update use update object to overwrite the document existing info.  update operator for Mongodb
    //null for configs we dont need
    // then error check and callback
    coll.updateOne(document, {
        $set: update
    }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};