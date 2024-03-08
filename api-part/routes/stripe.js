const router = require("express").Router();
const STRIPE_KEY_local = "sk_test_51KRggmDnRo04eT00WJolZSG1zzZgvAXj59C9Cyhz3gWvsHDDY63itrH0xdGqcg2anXaejyvUqsHb67byfHsBg39700A8GpOntP";


const stripe = require("stripe")(STRIPE_KEY_local);

router.post("/payment", (req, res) => {
    stripe.charges.create(
    {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, 
    (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr);
        }
        else {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;