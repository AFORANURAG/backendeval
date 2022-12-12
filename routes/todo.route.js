const {TodoModel}=require("../models/todo.model")
const express=require("express");
const {authenticator}=require("../middlewares/authenticator")
const todoRouter=express.Router()
todoRouter.use(express.json())
todoRouter.use(authenticator)




todoRouter.post("/create",async(req,res)=>{
let payload=req.body
try {
    let query=new TodoModel(payload)
    await query.save()
    res.send({"message":"todo created successfully"})
} catch (error) {
    console.log(error)
    res.send({"message":"problem in creating your todo, not authenticated"
})
}
})

todoRouter.patch("/update/:noteid",async(req,res)=>{
try {
let nodeid=req.params.noteid
let userid=req.body.userid
let payload=req.body
// find todo with that user id and noteid , noteid will be sended by front end 
let query=await TodoModel.findOne({_id:nodeid,userid:userid})
if(query){
    let data=await TodoModel.findByIdAndUpdate({_id:nodeid},payload)
   
    res.send({"message":"updated successfully"})
}else{
    res.send({"message":"not authorised"})
}

} catch (error) {
    console.log(error)
    req.send({"message":"not authorised"})

}

})
///-----------------------------------------------------------------------------------------------------    
todoRouter.delete("/delete/:noteid",async(req,res)=>{
    try {
    let nodeid=req.params.noteid
    let userid=req.body.userid
    
    // find todo with that user id and noteid , noteid will be sended by front end 
    let query=await TodoModel.findOne({_id:nodeid,userid:userid})
    if(query){
        let data=await TodoModel.findByIdAndDelete({_id:nodeid})
    
        res.send({"message":"deleted successfully"})
    }else{
        res.send({"message":"not authorised"})
    }
    
    } catch (error) {
        console.log(error)
        req.send({"message":"not authorised"})
    
    }
    
})
//.....................................................................................................

todoRouter.get("/:todoID",async(req,res)=>{
let todoId=req.params.todoID
    
   let query=await TodoModel.findById({_id:todoId})
   if(query){
    res.send(query)
   } else{
    res.send({"message":"notfound"})
   }
})


   todoRouter.get("/",async(req,res)=>{
    let todoId=req.params.todoID
        
       let query=await TodoModel.find({})
       if(query){
        res.send(query)
       } else{
        res.send({"message":"notfound"})
       }
    
    //    /todos?status=done&tag=personal



})




todoRouter.get("/",async(req,res)=>{
    let todoId=req.params.todoID
        
       let query=await TodoModel.find({status:req.query.status,tag:req.query.personal})
       if(query){
        res.send(query)
       } else{
        res.send({"message":"notfound"})
       }
    
       



})


todoRouter.get("/",async(req,res)=>{
    let todoId=req.params.todoID
        
       let query=await TodoModel.find({status:req.query.status})
       if(query){
        res.send(query)
       } else{
        res.send({"message":"notfound"})
       }
    
       



})







module.exports={todoRouter}