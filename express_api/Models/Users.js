// Schema definition for Users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a Schema Desc for Users
const usersSchema = new Schema(
    {
        "name": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            required: true,
            unique: true
        },
        "password": {
            type: String,
            required: true
        }
    },
    {collection: "users"},
    {versionKey: false}
);

module.exports = Users = mongoose.model('Users', usersSchema);