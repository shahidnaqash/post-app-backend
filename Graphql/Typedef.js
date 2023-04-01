const {gql } = require('apollo-server');

const typeDefs = gql`
type Comment{
  id:String,
  username:String!,
  body:String!,
  createdAt:String!
 }
type Like{
  id:String!,
  username:String!,
  createdAt:String!
 }

type Post {
  body: String!
  username: String!
  id:String!,
  comments:[Comment],
  likes:[Like],
  likeCount:Int!,
  commentCount:Int!,
  createdAt:String!
}
type Query {
  Posts: [Post],
  Post(id:String!):Post
}
 input RegisterInput{
  username:String!,
  password:String!,
  confirmpassword:String!,
  email:String!

 }

 input LoginInput{
  username:String!,
  password:String!,
 }
 
type User{
    username:String!,
    token:String!,
    createdAt:String!,
    id:String!,
    email:String!
 }
 
 type DeleteMsg{
  msg:String!
 }

type Mutation{
  register(registerinput:RegisterInput):User,
  login(logininput:LoginInput):User,
  createPost(body:String!):Post,
  deletePost(postId:String!):DeleteMsg!,
  addComment(postId:String!,body:String!):Post!,
  deleteComment(postId:String!,commentId:String):Post!
  addLike(postId:String!):Post!
  forgetPassword(email:String!):DeleteMsg!
}
`;
module.exports = typeDefs