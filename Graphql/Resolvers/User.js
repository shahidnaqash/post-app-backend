const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
var randomstring = require("randomstring");

const UserModel = require('../../Models/User')
const {sendMail} = require('../../utils/Nodemailer')

const {TOKEN_KEY} = require('../../Security')
const {validateRegistrationfields,validateLoginfields} = require('../../utils/Validate')

const saltRounds = 10;

function createToken(user){
    return token = jwt.sign({ id:user._id,username:user.username}, TOKEN_KEY, { expiresIn: '1h' });
}
const resolvers = {
    Mutation: {
        async register(_, {registerinput: {username,password,confirmpassword,email}},context,info){
          const {error,valid} = validateRegistrationfields({username,email,password,confirmpassword})
         if(!valid){
            throw new UserInputError('Error Occured',{error})
         }


            const userExists =await  UserModel.findOne({username});
            if(userExists){
                throw new UserInputError('username taken',{
                    error:{
                     username:'username taken'
                }})
            } 
            const hashPassword = await bcrypt.hash(password, saltRounds)
            const newuser = new UserModel({
                username:username,
                password:hashPassword,
                email:email,
                createdAt:new Date().toISOString()
            })
            const response = await newuser.save()
            const token = createToken(response)
            return {
                ...response._doc,
                id:response._id,
                token
            }
        },
        async login(_, {logininput: {username,password}},context,info){
            const {error,valid} = validateLoginfields({username,password})
            if(!valid){
               throw new UserInputError('Error Occured',{error})
            }
            const userExists =await  UserModel.findOne({username});
            if(!userExists){
                error.general = 'Wrong Credentials'
                throw new UserInputError('username doesn\'t exists',{error})
            }
            const passwordMatch = await bcrypt.compare(password,userExists.password);
            if(!passwordMatch) {
                error.general = 'Wrong Credentials'
                throw new UserInputError('Wrong Credentials',{error})
            }
            const token = createToken(userExists)
            return {
                ...userExists._doc,
                id:userExists._id,
                token
            } 

        },
        async forgetPassword(_,{email},_1,_2){
            const user  = await UserModel.findOne({email:email});
            if(user){
                const TokenString = randomstring.generate();
                const updateUser = await UserModel.updateOne({email:email},{Token:TokenString})
            //    sendMail()
               return {
                msg:'check your mail'
               }
            }else{
                throw new UserInputError('Invalid Email',{
                    error:{
                     email:'Invalid Email'
                }})
            }

        }
   }, 
  }
  module.exports = resolvers;