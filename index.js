const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')

const {MONGODB_URI} = require('./Security.js')
const typeDefs = require('./Graphql/Typedef.js')
const resolvers = require('./Graphql/Resolvers')

const server = new ApolloServer({
    typeDefs,  
    resolvers, 
    context:({req})=>({req})
  });



  mongoose.connect(MONGODB_URI,()=>{
    console.log('connected to DB')
    server.listen(5000,(res)=>{
        console.log('listening at port '+ res)
      })
  })