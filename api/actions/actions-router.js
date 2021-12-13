const action = require('./actions-model');
const express = require("express")
const router = express.Router()
const amw = require("./actions-middlware.js")

router.get('/', (req, res) =>{
    action.get(req.query)
      .then(action => {
          res.status(200).json(action)
      })
      .catch(error => {
          res.status(500).json({message: error.message})
      });

});

router.get("/:id", (req,res)=>{
    const idAct = req.params.id
    action.get(idAct)
       .then(action =>{
        if(!action){
            res.status(404).json(`${idAct} does not exist`)
          }else{
            res.status(200).json(action)
          }
      })
           .catch(error => {
            res.status(500).json({message: error.message})
        });
});

router.post("/",amw, (req,res)=>{
    const newAction = req.body
    action.insert(newAction)
          .then(action=>{
              res.json(action)
          })
          .catch(error => {
            res.status(500).json({message: error.message})
        });
});

router.put('/:id', async (req,res)=>{
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes){
            res.status(400).json({message: "Information Required"})
        }else{
            const insertedAction = await action.update(id,changes)
            if(!insertedAction){
                res.status(404).json("Action does not exist")
            }else{
                res.status(200).json(insertedAction)
            }
        }
    }catch(error){
        res.status(400).json({message: error.message}) 
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const deleteAction = await action.remove(id)
        res.status(200).json(deleteAction)
    }catch(error){
        res.status(404).json({message: error.message}) 
    }
});



router.use("*",(req,res)=>{
    res.status(404).json({message:"404 not found"})
});

module.exports = router