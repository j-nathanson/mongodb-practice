// import assert module strict
const assert = require('assert').strict;

// if you dont specify a callbback and promise will be returned

// add a methods to exports, all need callback functions

//POST a document to a collection,
exports.insertDocument = (db, document, collection) => {
    // find collection we want to add to
    const coll = db.collection(collection);

    // insertOne attempt to add the document, will return a promise of resolved or not
    return coll.insertOne(document);
};

// GET all documents in  collection
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    // attempt to find all documents and convert to an array. return promise of result
    return coll.find().toArray();
};

// DELETE a document in a collection
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    // attempt to delete document from collection, first error check then callback on the result(info on what was deleted)
    return coll.deleteOne(document);
};

// PUT a document in a collection
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    //  attempt to update a document with new info (update)
    // $set: update use update object to overwrite the document existing info.  update operator for Mongodb
    //null for configs we dont need
    //  return promise of result
    return coll.updateOne(document, {
        $set: update
    }, null);
};