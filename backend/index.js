const express=require("express")
const app=express()
const cors=require("cors")
const todoTiitle=require("./model/Todo")
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Suryakant:Suryadas@cluster0.mydbwj6.mongodb.net/Todo-app?retryWrites=true&w=majority")
    .then(()=>{console.log("Connected to mongoDb")})

app.use(cors())
app.use(express.json())
app.get("/show",(req,resp)=>{
    resp.send({msf:"showing in 5000"})
})
app.post("/",async(req,resp)=>{
    try{
        console.log(req.body)
        let title=new todoTiitle(req.body)
        let result=await title.save()
        result=result.toObject()
        resp.send(result)
        console.log(result)
    }
    catch{
        resp.status(400).json({msg:"failed"})
    }
})

app.get("/",async(req,resp)=>{
    try{
        let allTask=await todoTiitle.find();
        console.log(allTask)
        if(allTask.length>0){
            resp.send(allTask)
            console.log(allTask)
        }
        else{
            resp.status(404).send({result:"no task to do"})
        }
    }catch{
            resp.status(400).json({msg:"faild to get from db"})
    }
})
app.delete("/:id", async(req,resp)=>{
    try{
        let result=await todoTiitle.deleteOne({_id:req.params.id})
        resp.send(result)
    }catch{
        resp.status(400).json({msg:"Nothing to delete"})
    }
})

app.put("/:id",async(req,resp)=>{
    try{
        let result=await todoTiitle.updateOne({_id:req.params.id}
            ,
            {$set :req.body})
    resp.send(result)

    }
    catch{
resp.status(400).json({msg:"faild"})
    }
})
app.get("/:id",async(req,resp)=>{
    try{
        let result=await todoTiitle.findOne({_id:req.params.id})
    resp.send(result)

    }
    catch{
resp.status(400).json({msg:"faild"})
    }
})



app.listen(5001,()=>{console.log("app is running at 5000")})

