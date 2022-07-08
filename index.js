const express = require('express');
const conn=require("./config")
const app = express();
app.use(express.json())  //this is to parse the body data in json formatter

app.get("/",(req,res)=>{
   conn.query("select * from employeetable",(err,result)=>{
     if(err) {
        res.send(err)
     }
     else{
        res.send(result)
     }
   })
})

app.post("/post",(req,res)=>{
   let data=req.body;
   conn.query('insert into employeetable set?',data,(error,result,fields)=>{
      if(error)error;
      res.send(result);
   })
})
app.put("/:name",(req,res)=>{
    const data=[req.body.name,req.body.age,req.params.name]
    conn.query("update employeetable set name=?,age=? where name=?",data,(err,result,fields)=>{
        if(err)err;
        res.send(result);
    })
    
})
app.delete("/:name",(req,res)=>{
    const data=[req.params.name]
    conn.query(`delete from employeetable where name=?`,data,(err,result,fields)=>{
        if(err) err;
        res.send("Deleted");
    })
})

app.listen(5000)