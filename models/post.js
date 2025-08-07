/**
 * Moment 4 DT207G
 * Webbtjänst för att hantera användare
 * Skapad av: Ramona Reinholdz, rare2400
 */

const mongoose = require("mongoose");

//user schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Fyll i titel"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Fyll i innehåll"],
    },
    sign: {
        type: String,
        required: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;