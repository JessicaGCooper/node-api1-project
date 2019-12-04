// implement your API here
const express = require("express");

const db = require("./data/db.js")

const server = express();

server.use(express.json());


//POST
server.post("/api/users", (req, res) => {
    let {name, bio} = req.body

    console.log(req.body)
    
    db.insert(req.body)
    .then(user => { 
      if (!req.body.name || !req.body.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else {
      db.findById(user.id)  
      .then(userData => {
        res.status(201).json(userData)
      })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
       })
    });
});


//GET USER ARRAY (success in insomnia)
server.get("/api/users", (req, res) => {
    db.find()
      .then(users => {
          res.status(200).json(users)
      })
      .catch (error => {
          console.log("error on GET /users", error);
          res
          .status(500)
          .json({ errorMessage: "The users information could not be retrieved" })
      });
});

//GET USER BY ID "/api/users/:id" (success in insomnia)
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    db.findById(id)
      .then(users => {
        if(users) {
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: "The User with the specified ID does not exist." })
        }
      })
      .catch (error => {
          console.log("error on GET /users/:id", error);
          res
          .status(500)
          .json({ error: "The user information could not be retrieved." })
      });
});

//PUT
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id
  const {name, bio} = req.body

  db.update(id, req.body)
  .then(users => { if (!users){
    res.status(404)
    .json({ message: "The User with the specified ID does not exist." })
    } else if (!req.body.name || !req.body.bio){
    res.status(400)
    .json({ errorMessage: "Please provide name and bio for the user." })
    } else {
    db.findById(id)  
    .then(users => {
      res.status(200)
      .json(users)
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: "There was an error while saving the user to the database"
     })
  });
});






const port = 6000;
server.listen(port, () => 
  console.log(`\n ** API running on ${port} **\n`)
);