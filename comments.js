// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Use CORS
app.use(cors());
// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    }
    res.json(JSON.parse(data));
  });
});

// Post a new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
      res.status(201).send('Created');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});