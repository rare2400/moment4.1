/**
 * Moment 4 DT207G
 * Webbtjänst för att hantera användare
 * Skapad av: Ramona Reinholdz, rare2400
 */


const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
require("dotenv").config();

const Post = require("../models/post");

//create post
router.post("/", authenticateToken, async (req, res) => {
    const { title, content, sign } = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            sign
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//read all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//read post by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update post by id
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete post by id
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;