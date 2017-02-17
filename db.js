'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = process.env.MONGO_URI;

// Connect using MongoClient
// MongoClient.connect(MONGO_URI, function(err, db) {
//     const col = db.collection('users');
//     // Show that duplicate records got dropped
//     col.insertOne({
//         username: 'most-super-new-guy',
//         gcgScore: 1,
//         stcScore: 1,
//         mtmScore: 1
//     }).then(() => {
//         db.close();
//     });
// });

// Connect using MongoClient
// MongoClient.connect(MONGO_URI, function(err, db) {
//     const col = db.collection('users');
//     // Show that duplicate records got dropped
//     col.find({ gcgScore: { $gt: 100 }, mtmScore: { $gt: 100 } })
//         .sort({gcgScore: 1})
//         .project({username:1, gcgScore:1, mtmScore:1})
//         .limit(6)
//         .toArray().then((res) => {
//             console.log(res);
//             db.close();
//         });
// });


// --- Count all users with a given name
// MongoClient.connect(MONGO_URI, function(err, db) {
//     const col = db.collection('users');
//     // Show that duplicate records got dropped
//     col.find({ username: 'most-super-new-guy'})
//         .project({username:1, gcgScore:1, mtmScore:1})
//         .count().then((res) => {
//             console.log(res);
//             db.close();
//         });
// });

// MongoClient.connect(MONGO_URI, function(err, db) {
//     const col = db.collection('users');
//     // Show that duplicate records got dropped
//     col.deleteMany({ username: 'most-super-new-guy' }).then((res) => {
//             console.log(res);
//             db.close();
//         });
// });

const createNewUser = (username) => {
    const newDoc = {
        username: username,
        gtScore: 0,
        _created_at: new Date(),
        _updated_at: new Date()
    };

    return getDbAndCollectionHandle('users').then(({collection, db}) => {
        return collection.insertOne(newDoc, { returnOriginal: false }).then(res => {
            console.log('inserted!', username);
            db.close();
            return updateUser(username);
        })
    });
};

const updateUser = (username) => {
    // assuming usernames are unique...
    return getDbAndCollectionHandle('users').then(({collection, db}) => {
        return collection.findOneAndUpdate({username: username}, {$inc: {gtScore: 1}, $set: {_updated_at: new Date()}}, { returnOriginal: false })
            .then(res => {
                db.close();

                if (!res.value) { return createNewUser(username) }

                console.log('not inserting');

                return res;
            })
    });
};

const updateAndReportBlogViewCount = () => {
    return getDbAndCollectionHandle('page-counts').then(({collection, db}) => {
        return collection.findOneAndUpdate({ pagename : 'blog' }, {$inc: {count: 1}}, { returnOriginal: false })
            .then((res) => {
                db.close();
                return res.value.count;
            });
    });
};

const db = {
    updateAndReportBlogViewCount,
    updateUser
};

module.exports = db;

function getDbAndCollectionHandle(collectionName) {
    return MongoClient.connect(MONGO_URI)
        .then(db => ({
            collection: db.collection(collectionName),
            db
        }));
}
