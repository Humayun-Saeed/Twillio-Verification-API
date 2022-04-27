var express=require('express')
require('dotenv').config()
var client=require('twilio')(process.env.Account_SID,process.env.Auth_Token)
var app=express()
app.use(express.json())

app.post('/signup',(req,res)=>{
    
client.verify.services(process.env.ServiceSID).verifications.create({
    to:req.body.phone,
    channel:'sms',
}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})
})
app.get('/verify',(req,res)=>{
    client.verify.services(process.env.ServiceSID).verificationChecks.create({
        to:req.body.phone,
        code:req.body.code
    }).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err);
    })
})
app.listen(3000,()=>{
    console.log("connected to server: ");
})