const { UserInputError, AuthenticationError } = require('apollo-server');
const PostModel = require('../../Models/Posts')
const Validatetoken = require('../../utils/Validatetoken.js')
const resolvers = {
    Query: {
        Posts: async() =>{
           const posts = await PostModel.find({}).sort({createdAt:-1});
           return posts
        }, 
        async Post(_,{id}){
            try{
                const post = await PostModel.findById(id)
                if(post) return post;
                throw new error('Post not found')
 
            }catch(err){
              throw new Error('Post not found')
            }
        }
   }, 
   Mutation:{
    async createPost(_,{body},context,info){
        const user = Validatetoken(context)
        const newPost = new PostModel({
            body,
            user:user.id,
            username:user.username,
            createdAt:new Date().toISOString()
        })
        const post = await newPost.save();
        return post;
    },
    async deletePost(_,{postId},context,info){
               const user = Validatetoken(context);
               const post = await PostModel.findById(postId)
               console.log(postId)
               if(post){
                if(user.username==post.username){
                    await PostModel.findByIdAndDelete(postId)
                    return {
                        msg:'post delete successfully'
                    }
                }

               }
                throw new UserInputError('Error Occured',{error:'incorrect post id/post not found'})
               
    }
    ,
    async addComment(_,{postId,body},context,info){
        var user = Validatetoken(context)
        if(body.trim()==''){
            throw new UserInputError('Error Occured',{error:'username is required and cannot be empty'})
        }
        var Post = await PostModel.findById(postId)
        if(Post){
         Post.comments.unshift({
             body,
             username:user.username,
             createdAt:new Date().toISOString()
            })
            await Post.save()
        return Post
        }else{
            throw new UserInputError('Error Occured',{error:'invalid PostId'})
        }
    },
    async deleteComment(_,{postId,commentId},context,info){
        var user = Validatetoken(context)
        var Post = await PostModel.findById(postId)
        if(Post){
            const commentIndex = Post.comments.findIndex(c=>c._id==commentId);
            if(Post.comments[commentIndex].username==user.username){
                Post.comments.splice(commentIndex,1)
                await Post.save()
                return Post
            }
            throw new AuthenticationError('Not Authorized to Perform this action')
        }else{
            throw new UserInputError('Error Occured',{error:'Post Not found'})
        }
    },
    async addLike(_,{postId},context){
        const user = Validatetoken(context)
        if( user){
                const post = await PostModel.findById(postId)
                if(post.likes.find(p=>p.username==user.username)){
                    post.likes = post.likes.filter(p=>p.username!==user.username)
                }else{
                       post.likes.push({
                        username:user.username,
                        createdAt:new Date().toISOString()
                       })
                }
                await post.save()
                return post
        }
        throw new AuthenticationError('Not Authorized to Perform this action')
    }
   }
   
  }
  module.exports = resolvers;