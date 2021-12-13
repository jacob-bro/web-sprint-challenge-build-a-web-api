const express = require('express');

const server = express();

server.use(express.json());

const project = require('./projects/projects-model');

server.get('/api/projects', (req, res) =>{
    project.get(req.query)
      .then(project => {
          res.status(200).json(project)
      })
      .catch(error => {
          res.status(500).json({message: error.message})
      });

});

server.get("/api/projects/:id", (req,res)=>{
    const idPro = req.params.id
    project.get(idPro)
       .then(project =>{
        if(!dog){
            res.status(404).json(`${idPro} does not exist`)
          }else{
            res.status(200).json(project)
          }
      })
           .catch(error => {
            res.status(500).json({message: error.message})
        });
});

server.post("/api/projects", (req,res)=>{
    const newProject = req.body
    project.insert(newProject)
          .then(project=>{
              res.json(project)
          })
          .catch(error => {
            res.status(500).json({message: error.message})
        });
});

server.put('/api/projects/:id', async (req,res)=>{
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes){
            res.status(400).json({message: "Information Required"})
        }else{
            const insertedProject = await project.update(id,changes)
            if(!insertedProject){
                res.status(404).json({"project does not exist"})
            }else{
                res.status(200).json(insertedProject)
            }
        }
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
});

server.remove("/api/projects/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deleteProject = await project.remove(id)
        res.status(200).json(deleteProject)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
});



server.use("*",(req,res)=>{
    res.status(404).json({message:"404 not found"})
});