const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server');
const {TOKEN_KEY} = require('../Security')
const Validatetoken = (context)=>{
    var Authheader = context.req.headers.authorization;
    if(Authheader){
        const token = Authheader.split('Bearer ')[1];
        console.log(token)
       if(token){
        try{
            const user = jwt.verify(token,TOKEN_KEY)
            console.log(user)
            return user;
        }catch(err){
            throw new AuthenticationError('Invalid token')
        }
       }
        throw new AuthenticationError('Token Must be Beare[Token]')
    }
    throw new AuthenticationError('No Auth Header')
    
}
module.exports = Validatetoken