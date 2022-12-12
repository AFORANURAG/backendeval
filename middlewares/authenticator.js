const JWT=require("jsonwebtoken")
const authenticator=(req,res,next)=>{
// this middlware is going to be used for every protected path
console.log(req.headers)
let token=req.headers.authorization.split(" ")[1]
try {
    let decoded=JWT.verify(token,"secret")
    if(decoded){
    if(!req.body.userid){
        req.body.userid=decoded.userid
    }
    next()
    } 
} catch (error) {
    console.log(error)
    res.send({"message":"not authenticated please login "})
}

}



module.exports={authenticator}