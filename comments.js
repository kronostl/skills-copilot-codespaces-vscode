// Create web server application with Express
// Import express module
const express = require('express');
// Create express application
const app = express();
// Import path module
const path = require('path');
// Import body-parser module
const bodyParser = require('body-parser');

// Import comments data
const comments = require('./data/comments');

// Import products data
const products = require('./data/products');

// Import products data
const vehicles = require('./data/vehicles');

// Import contacts data
const contacts = require('./data/contacts');

// Set up server port
const port = process.env.PORT || 4001;

// Use body-parser
app.use(bodyParser.json());

// Use static files in public folder
app.use(express.static('public'));

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const found = comments.some(comment => comment._id == req.params.id);

  if (found) {
    res.json(comments.filter(comment => comment._id == req.params.id));
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  const newComment = {
    _id: comments.length + 1,
    body: req.body.body,
    postId: 1
  };

  if (!newComment.body) {
    return res.status(400).json({ msg: 'Please include a body' });
  }

  comments.push(newComment);
  res.json(comments);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const found = comments.some(comment => comment._id == req.params.id);

  if (found) {
    const updateComment = req.body;
    comments.forEach(comment => {
      if (comment._id == req.params.id) {
        comment.body = updateComment.body ? updateComment.body : comment.body;
        res.json({ msg: 'Comment updated', comment });
      }
    });
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
