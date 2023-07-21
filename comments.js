// create a web server using express
// create a router to handle different routes
// create a route to handle comments
// create a route to handle likes
// create a route to handle dislikes
// export the router
const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

router.get('/', (req, res) => {
    res.json(comments);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({error: "No comment id provided"});
    const comment = comments.find(comment => comment._id === Number(id));
    if (!comment) return res.status(404).json({error: "No comment found with that id"});
    res.json(comment);
});

router.post('/', (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({error: "No comment data provided"});
    if (!body.comment) return res.status(400).json({error: "No comment text provided"});
    const newComment = {
        _id: comments.length + 1,
        postId: 1,
        name: "Anonymous",
        comment: body.comment
    };
    comments.push(newComment);
    res.json(comments);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({error: "No comment id provided"});
    const body = req.body;
    if (!body) return res.status(400).json({error: "No comment data provided"});
    if (!body.comment) return res.status(400).json({error: "No comment text provided"});
    const comment = comments.find(comment => comment._id === Number(id));
    if (!comment) return res.status(404).json({error: "No comment found with that id"});
    comment.comment = body.comment;
    res.json(comment);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({error: "No comment id provided"});
    const comment = comments.find(comment => comment._id === Number(id));
    if (!comment) return res.status(404).json({error: "No comment found with that id"});
    const index = comments