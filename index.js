
const express=require("express")
const { connection } = require("./config/db")
const {userRouter}=require("./routes/user.routes")
const {todoRouter}=require("./routes/todo.route")


const app=express()
app.use("/user",userRouter)

app.use("/todos",todoRouter)

app
app.get("/",(req,res)=>{
res.send({"message":"welcome"})
})

app.listen(8000,async()=>{
try {
    await connection
    console.log("connected to db successfully")
} catch (error) {
    console.log(error)
}
console.log(`listening on port ${8000}`)
})