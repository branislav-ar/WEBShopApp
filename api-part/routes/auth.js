const router = require("express").Router();
const User = require("../models/User");
/* const CryptoJS = require("crypto-js"); */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const passowrd_bcrypted = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: passowrd_bcrypted,
        img: req.body.img
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if(!user) {
            res.status(401).json("POGREŠNO KORISNIČKO IME!");
            return;
        }

        /* const verify = async function(user) {
            return await bcrypt.compare(req.body.password, user.password);
        }

        if(!verify) {
            res.status(401).json("POGREŠNA ŠIFRA!");
            return;
        } */

        if (!(await bcrypt.compare(req.body.password, user.password))) {
            res.status(401).json("POGREŠNA ŠIFRA!");
            return;
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
            { expiresIn: "90d" }
        );

        const { /* password,  */...others } = user._doc;
        res.status(200).json({ ...others, accessToken } );
        return;
    
    }
    catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;