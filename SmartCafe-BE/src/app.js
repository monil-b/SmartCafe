const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req,res) => {
    res.send("SmartCafe API Running");
});

module.exports = app;