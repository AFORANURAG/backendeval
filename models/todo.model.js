const mongoose=require("mongoose")
const todoSchema=mongoose.Schema({
taskname:String,
status:String,
tag:String,
userid:String
},{
    versionKey:false
})
const TodoModel=mongoose.model("todos",todoSchema)
module.exports={TodoModel}