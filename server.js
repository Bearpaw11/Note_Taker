const express = require("express");
const path = require("path");
const fs = require('fs')
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const notes =[]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });


  app.post("/api/notes", function(req, res) {
   
    const newNote = req.body;

   
    newNote.routeName = newNote.id.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
    
        fs.writeFile('./Develop/db/db.json', JSON.stringify(newNote), (err) => {
        console.log('you file was written')
  })
  });
  

  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

