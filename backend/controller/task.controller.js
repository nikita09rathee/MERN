const express = require("express");
const taskController = express.Router();
const { TaskModel } = require("../models/task.model");

//get request
taskController.get("/", async (req, res) => {
    
    try {
        const{ tasks } = await TaskModel.find();
        res.send(tasks);
        console.log(tasks);

    }
    catch (error) {
        res.send(error);
    }
})
//post request
taskController.post("/create", async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body);
        if (!title || !description) {
            throw new Error("Title and description are required");
        }

        await TaskModel.create(req.body);
        res.send({ message: "your task is created" });
    }
     catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating task" });
  }
});

//update
taskController.patch("/:taskId",async(req,res)=>{
      const {taskId}=req.params;
     
      const payload=req.body;
      console.log(payload+" "+taskId );
   
     
      const task=TaskModel.find({_id:taskId});
      console.log(task);
      try{
await TaskModel.findByIdAndUpdate(taskId,payload);
res.send({message:"task updated"});
      }
      catch(error){
      res.send({message:"task not updated"});
      }
}

);

//delete
taskController.delete("/:taskId",async(req,res)=>{
      const {taskId}=req.params;
      const task=TaskModel.find({_id:taskId});
    //   console.log(task);
      try{
await TaskModel.findByIdAndDelete(taskId);
res.send({message:"task deleted"});
      }
      catch(error){
      res.send({message:"task not deleted"});
      }
}

);
module.exports = { taskController };