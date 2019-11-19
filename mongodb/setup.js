// Create Database for Dayne_Assignment_03_DB
var db = connect('127.0.0.1:27017/Dayne_Assignment_03_DB'),
Dayne_Assignment_03_DB = null;

// Create Admin User
db.createUser({user:"admin", pwd:"admin123", roles:[{role: "readWrite", db: "Dayne_Assignment_03_DB"}]})

// Create DB Collections for Posts and Users
db.createCollection('posts')
db.createCollection('users')