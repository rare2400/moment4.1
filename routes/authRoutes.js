/**
 * Moment 4 DT207G
 * Webbtjänst för att hantera användare
 * Skapad av: Ramona Reinholdz, rare2400
 */

require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");

//import User model
const User = require("../models/user");


//connect to database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err)
});


//router to get all users
router.get("/users", authenticateToken, async (req, res) => {
    try {
        const result = await User.find({}, { password: 0 });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

//router to get user by id
router.get("/users/:id", authenticateToken, async (req, res) => {
    try {
        const result = await User.findById({ _id: req.params.id }, { password: 0 });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//router to update user by id
router.put("/users/:id", authenticateToken, async (req, res) => {
    try {
        let result = await User.findOneAndUpdate({ _id: req.params.id }, req.body);

        result = await User.findOne({ _id: req.params.id }, { password: 0 });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//register user
router.post("/register", async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        //validate input
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ error: "Alla fält måste fyllas i" });
        }

        const user = new User({ username, password, email, firstName, lastName });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});


//login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        let user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Incorrect username or password" });
        }

        //check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect username or password" });
        } else {
            //generate JWT token
            const payload = { username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            user = await User.findOne({ user: username }, { password: 0 });
            const response = {
                message: "user logged in",
                user: username,
                token: token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;