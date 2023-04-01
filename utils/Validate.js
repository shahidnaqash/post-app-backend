module.exports.validateRegistrationfields = ({username,password,confirmpassword,email})=>{
    const error = {};
    if(username.trim() ==''){
       error.username = 'username is required and cannot be empty'
    }
    if(email.trim() ==''){
        error.email = 'email is required and cannot be empty'
     }else{
        const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regx)){
            error.email = 'Email format incorrect'
        }
     }
     if(password.trim()==''){
        error.password = 'password is required and cannot be empty'
     }
     if(confirmpassword.trim()==''){
        error.confirmpassword = 'password is required and cannot be empty'
     }
     else{
        if(confirmpassword!=password){
            error.confirmpassword = 'password must match'
        }
     }
     return {
        error,
        valid:Object.keys(error).length < 1
     }
}

module.exports.validateLoginfields = ({username,password})=>{
    const error = {};
    if(username.trim() ==''){
       error.username = 'username is required and cannot be empty'
    }
     if(password.trim()==''){
        error.password = 'password is required and cannot be empty'
     }
     return {
        error,
        valid:Object.keys(error).length < 1
     }
}