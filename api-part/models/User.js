const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {   
        name: { type: String, required: true },
        surname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        img: { type: String }
    }, { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);