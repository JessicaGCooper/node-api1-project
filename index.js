// implement your API here
const express = require("express");

const db = require("./data/db.js")

const server = express();

server.use(express.json());


//POST
server.post("/api/users", (req, res) => {
    const userData = req.body

    if (userData !== "name" && "bio")
    
    db.add(userData)
    .then()
    .catch(error => {
        
    })
})





const port = 6000;
server.listen(port, () => 
  console.log(`\n ** API running on ${port} **\n`)
);