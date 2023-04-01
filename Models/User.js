const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
  username: String,
  password:String,
  email:String,
  createdAt:String,
  Token:String
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel