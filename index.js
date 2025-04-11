var express=require('express');
var mongoose=require('mongoose');
const cors = require('cors');
var app=express();
f
app.use(express.json());
app.use(express.text());
mongoose.connect("mongodb+srv://venumongo:venumongo5498@cluster0.ineko3w.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("connected successfully");
    })
    .catch(()=>{
        console.log("error");
    })

const todoSchema=new mongoose.Schema({
    task:String
});
const Todo=mongoose.model('Todo',todoSchema); 

//let todos=["clean house","write homework","go for a walk","drink water","call a friend"];

//adding new todo
app.post("/addtodos",(req,res)=>{
    const todo=new Todo({task:req.body});
    todo.save()
    .then(()=>Todo.find())
    .then(todos=>res.status(200).json({message:"todo added",todos}))
    .catch(err=>res.status(404).json({error:err.message}));
});

//get the todos
app.get("/todos",(req,res)=>{
    Todo.find()
    .then(tasks=>{
            res.status(200).json(tasks)
        })
    .catch(err=>res.status(400).json({error:err.message}));
});

//update
app.put("/updatetodo/:id",(req,res)=>{
    Todo.findByIdAndUpdate(req.params.id,{task:req.body})
     .then(()=>Todo.find())
     .then(todos=>res.status(200).json({message:"todo updated"}))
     .catch(err=>res.status(400).json({message:"invalid index",error:err.message}));
});

//delete
app.delete("/deletetodos/:id",(req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>Todo.find())
    .then(todos=>res.status(200).json({message:"deleted",todos:todos}))
    .catch(err=>res.status(400).json({message:"invalid index" ,error:err.message}));
});








// //get all tasks
// app.get("/todos",(req,res)=>{
//     if(todos.length>0){
//         res.status(200).json(todos);
//     }
//     else{
//         res.status(404).json({
//             message:"No todos"
//         });
//     }
// });



// //delete todod
// app.delete("/todos/:index", (req, res) => {
//     const index = parseInt(req.params.index);

//     if (isNaN(index) || index < 0 || index >= todos.length) {
//         return res.status(400).json({ message: "Invalid index" });
//     }
//     todos.splice(index,1);
//     res.status(200).json({ todos });
// });


// //add a todo
// app.post("/addtodos",(req,res)=>{
//     let todo=req.body;
//     todos.push(todo);
//     res.status(200).json({
//         message:"Todo added",
//         todos
//     });
// });

// //update a todo
// app.put("/updatetodo/:index",(req,res)=>{
//     const index=parseInt(req.params.index);
//     const updatedtodo=req.body;

//     todos[index]=updatedtodo;
//     res.status(200).json({
//         message:"updated todo",
//         todos
//     });
// });





app.listen(2000,()=>{
    console.log("server started");
});
