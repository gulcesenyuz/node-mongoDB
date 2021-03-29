const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperation = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dboperation.insertDocument(db, { name: 'Donat', description: 'Strawberry sauce' }, 'dishes', (result) => {

        console.log('Insert Document:\n', result.ops);
        dboperation.findDocument(db, 'dishes', (docs) => {
            console.log('Found Document:\n', docs);
            dboperation.updateDocument(db, { name: 'Donat' }, { description: 'çikolata eklendi' }, 'dishes', (result) => {
                console.log("Updated Document:\n", result.result);
                dboperation.findDocument(db, 'dishes', (docs) => {
                    console.log('Found Document:\n', docs);
                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection ', result);
                        client.close();
                    });

                });

            })
        })


    });


});