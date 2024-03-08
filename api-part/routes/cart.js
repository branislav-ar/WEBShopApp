const router = require("express").Router();
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const { 
        verifyToken, 
        verifyTokenAndAuthorization, 
        verifyTokenAndAdmin
} = require("./verifyToken");


//CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//UPDATE CART
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {   
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedCart);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Korpa uspešno obrisana!");
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const wantedCart = await Cart.findOne({ userId: req.params.userId });        
        res.status(200).json(wantedCart);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const wanterCarts = await Cart.find();
        res.status(200).json(wanterCarts);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;