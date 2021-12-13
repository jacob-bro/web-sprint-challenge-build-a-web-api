const project = require('./projects-model');
const express = require("express")
const router = express.Router()
const pmw = require("./projects-middleware");

router.get('/', (req, res) =>{
    project.get(req.query)
      .then(project => {
          res.status(200).json(project)
      })
      .catch(error => {
          res.status(500).json({message: error.message})
      });

});

router.get("/:id", (req,res)=>{
    const idPro = req.params.id
    project.get(idPro)
       .then(project =>{
        if(!project){
            res.status(404).json(`${idPro} does not exist`)
          }else{
            res.status(200).json(project)
          }
      })
           .catch(error => {
            res.status(500).json({message: error.message})
        });
});

router.post("/",pmw, (req,res)=>{
    const newProject = req.body
    project.insert(newProject)
          .then(project=>{
              res.json(project)
          })
          .catch(error => {
            res.status(400).json({message: error.message})
        });
});

router.put('/:id', async (req,res)=>{
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes){
            res.status(400).json({message: "Information Required"})
        }else{
            const insertedProject = await project.update(id,changes)
            if(!insertedProject){
                res.status(400).json("project does not exist")
            }else{
                res.status(400).json(insertedProject)
            }
        }
    }catch(error){
        res.status(400).json({message: error.message}) 
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deleteProject = await project.remove(id)
        res.status(404).json(deleteProject)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
});



router.use("*",(req,res)=>{
    res.status(404).json({message:"404 not found"})
});

module.exports = router