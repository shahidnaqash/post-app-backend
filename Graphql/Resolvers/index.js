
const postresolvers = require('./Posts.js')
const userresolver = require('./User.js')
const resolvers = {
    Post:{
        likeCount(parent){
        return parent.likes.length;
        },
        commentCount(parent){
            return parent.comments.length;
            }
    }
    ,
    Query: {
    ...postresolvers.Query,         
   },
   Mutation:{
    ...userresolver.Mutation,
    ...postresolvers.Mutation
   } 
  }
  module.exports = resolvers