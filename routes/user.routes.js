const express=require("express")
const userRouter=express.Router();
const JWT=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../models/user.model");
userRouter.use(express.json())

userRouter.get("/",(req,res)=>{
   console.log(req.headers)
   let ip_adress=dns.lookup("localhost",(err,address)=>{
    if(err) throw err
    console.log(address,req.ip)
})
    console.log("done")
    res.send({"message":"done"})
})
//.............................................................................
userRouter.post("/login",async(req,res)=>{
// here we will match and send the token to frontend
let {password,email,ip_address}=req.body;
try {
    let query=await UserModel.findOne({email})
    console.log(query)
    // it will return us an array
    bcrypt.compare(password, query.password, function(err, result) {
        if(err) throw err
        if(result){
      // if hash mathced, then we will give them a token for authorisation.
      var token = JWT.sign({ "userid":query._id }, 'secret');
      res.send({"message":"login successfull",
    "token":token
    })      
        }else{
            res.send({"message":"wrong credentials,Please try again later"})
        }

    });
} catch (error) {
    console.log(error)
    res.send({"message":"wrong credentials please try again",
"statuscode":500
})
}

bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});

})

userRouter.post("/signup",async(req,res)=>{
let {email,password,ip_adress}=req.body;
let query=await UserModel.findOne({email})
if(query){
   res.send({"message":"user already exist"}) 
}else{
    try {
    bcrypt.hash(password, 3, async function(err, hash) {
        if(err) throw err
        console.log(req.ip)
       let ip=req.ip 
        let data=new UserModel({email,password:hash,ipaddress:ip})   
        await data.save()
        
});    
res.send({"message":"congratulations account created successfully"})
       } catch (error) {
        console.log(error)
        res.send({"message":"server error",
    "statuscode":"500"})   
       }
}
})
//signup done




module.exports={userRouter}