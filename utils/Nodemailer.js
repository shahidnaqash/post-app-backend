var nodemailer = require('nodemailer'); 

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d138f013d9c9a2",
      pass: "75995317a1c185"
    }
  });

  var mailOptions = {
    from: 'aasdasd',
    to: 'sdasdsd@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

const sendMail = async()=>{
    const mailStatus =await transport.sendMail(mailOptions);
    if(mailStatus){
        console.log(mailStatus)
    }
    else{
        console.log(mailStatus)
    }
}
module.exports ={
    sendMail:sendMail
}