const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { 
        verifyToken, 
        verifyTokenAndAuthorization, 
        verifyTokenAndAdmin
} = require("./verifyToken");


//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const passowrd_bcrypted = await bcrypt.hash(req.body.password, salt);

        req.body.password = passowrd_bcrypted;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedUser);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Korisnik uspešno obrisan!");
    }
    catch(err) {
        res.status(500).json(err);
    }
})


//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const wantedUser = await User.findById(req.params.id);
        const { password, ...others} = wantedUser._doc;
        
        res.status(200).json(others);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//GET ALL USERS

/* 
http://localhost:5000/shop/users/
http://localhost:5000/shop/users?new=true

*/

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const wantedUsers = query ? await User.find().sort({_id: -1}).limit(2) : await User.find();        
        res.status(200).json(wantedUsers);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { 
                $project: {
                    month: { $month: "$createdAt" }
                    //month dobija mm (dve cifre meseca) datuma!
                },
            },
            {
                $group: {
                    _id: "$month", 
                    total: { $sum: 1 }
                }
            }
        ]);

        /* 
        značenje povratne vrednosti: "Ukupno ima 4 korisnika koji su unešeni 2. meseca (februara)!"
        [
            {
                "_id": 2,
                "total": 4
            }
        ]

        */


        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json(err);
    }

})



module.exports = router;