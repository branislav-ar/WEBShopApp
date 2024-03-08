const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Konekcija sa DB uspešna!"))
    .catch((err) => { console.log(err); });

app.use(cors());
app.use(express.json());
app.use("/shop/users", userRoute);
app.use("/shop/products", productRoute);
app.use("/shop/orders", orderRoute);
app.use("/shop/auth", authRoute);
app.use("/shop/cart", cartRoute);
app.use("/shop/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Back-end server uspešno funkcioniše!")
});

