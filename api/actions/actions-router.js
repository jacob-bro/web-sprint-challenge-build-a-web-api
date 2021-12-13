const express = require('express');

const server = express();

server.use(express.json());

const action = require('./actions/actions-model');

server.get('/api/actions', (req, res) =>{
    action.get(req.query)
      .then(action => {
          res.status(200).json(action)
      })
      .catch(error => {
          res.status(500).json({message: error.message})
      });

});

server.get("/api/actions/:id", (req,res)=>{
    const idAct = req.params.id
    action.get(idAct)
       .then(action =>{
        if(!dog){
            res.status(404).json(`${idAct} does not exist`)
          }else{
            res.status(200).json(action)
          }
      })
           .catch(error => {
            res.status(500).json({message: error.message})
        });
});

server.post("/api/actions", (req,res)=>{
    const newAction = req.body
    action.insert(newAction)
          .then(action=>{
              res.json(action)
          })
          .catch(error => {
            res.status(500).json({message: error.message})
        });
});

server.put('/api/actions/:id', async (req,res)=>{
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes){
            res.status(400).json({message: "Information Required"})
        }else{
            const insertedAction = await action.update(id,changes)
            if(!insertedAction){
                res.status(404).json({"Action does not exist"})
            }else{
                res.status(200).json(insertedAction)
            }
        }
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
});

server.remove("/api/actions/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deleteAction = await action.remove(id)
        res.status(200).json(deleteAction)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
});



server.use("*",(req,res)=>{
    res.status(404).json({message:"404 not found"})
});