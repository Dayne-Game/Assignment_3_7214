// Schema definition for Posts
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a Schema Desc for Posts
const postsSchema = new Schema(
    {
        "_id": String,
        "uid": String,
        "title": String,
        "date": {type: Date, default: Date.now},
        "author": String,
        "content": String,
    },
    {collection: "posts"},
    {versionKey: false}
);

module.exports = Posts = mongoose.model('Posts', postsSchema);