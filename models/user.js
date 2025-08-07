/**
 * Moment 4 DT207G
 * Webbtjänst för att hantera användare
 * Skapad av: Ramona Reinholdz, rare2400
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Fyll i användarnamn"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Fyll i lösenord"],
    },
    email: {
        type: String,
        required: [true, "Fyll i e-post"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Fyll i förnamn"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Fyll i efternamn"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//hash password
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();

    } catch (error) {
        next(error);
    }
});

//register user
userSchema.statics.register = async function (username, password, email, firstName, lastName) {
    try {
        const user = new this({ username, password, email, firstName, lastName });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//compare hashed passwords
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//login user
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });
        // If the user does not exist, throw an error
        if (!user) {
            throw new Error("incorrect username or password");
        }

        const isPasswordMatch = await user.comparePassword(password);

        //if the password does not match, throw an error
        if (!isPasswordMatch) {
            throw new Error("incorrect username or password");
        }

        //correct username and password
        return user;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;