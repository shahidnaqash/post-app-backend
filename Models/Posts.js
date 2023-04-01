const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema= new Schema({
  body: String,
  username:String,
  createdAt:String,
  comments:[
    {
        username:String,
        createdAt:String,
        body:String
    }
  ],
  likes:[
    {
        username:String,
        createdAt:String
    }
  ],
  user:{
    type:Schema.Types.ObjectId,
    ref:'users'
  }
});
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel