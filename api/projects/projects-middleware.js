const checkProject = (req,res,next)=>{
    if(req.query.word && req.query.word === "badword"){
      res.json("You used a badword")
}else{
    next() 
  }
}


module.exports = checkProject;