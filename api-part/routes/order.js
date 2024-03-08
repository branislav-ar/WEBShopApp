const router = require("express").Router();
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const { 
        verifyToken, 
        verifyTokenAndAuthorization, 
        verifyTokenAndAdmin
} = require("./verifyToken");


//CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//UPDATE ORDER
router.post("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {   
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedOrder);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Porudžbina uspešno obrisana!");
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const wantedOrders = await Order.findOne({ userId: req.params.userId });        
        res.status(200).json(wantedOrders);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const wantedOrders = await Order.find();
        res.status(200).json(wantedOrders);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


//STATS - MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    
    const date = new Date(); 
    //date -> SEPTEMBER, mesec ovog trenutka 
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    //lastMonth -> AVGUST
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
    //previousMonth -> JUL

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, 
                        ...(productId && { products:{ $elemMatch:{productId: productId } },
            }) } },
            { 
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ])
        res.status(200).json(income);

        /* 
        značenje povratne vrednosti: 
        "Ukupno postoji porudžbina od 5399 u 1. mesecu (JAN),
        i porudžbina od 2200 u 2. mesecu (FEB)!"
        [
            {
                "_id": 1,
                "total": 5399
            },
            {
                "_id": 2,
                "total": 2200
            }
        ]
        
        */

    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;