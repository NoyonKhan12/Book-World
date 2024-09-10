const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        // default: null,
        // required: true,
    },
    avatar: {
        type: String,
        // default: "https://img.icons8.com/?size=100&id=492ILERveW8G&format=png&color=000000",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        refs: "books"
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        refs: "books"
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        refs: "order"
    }],
},
{timestamps: true}
)

module.exports = mongoose.model("user", user);