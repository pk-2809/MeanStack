const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const foodRoutes = require("./routes/routes");

mongoose.connect('mongodb+srv://host:9oYClyBfDVKuMq5z@db-cluster-1.vigbkhs.mongodb.net/MeanStack?retryWrites=true&w=majority').then((res) => {
    console.log('--------- DB SUCCESS --------');
}).catch((err) => {
    console.log('Database Connection Failed! '+ err.message);
})

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static("images"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    next();
});

app.use(foodRoutes);

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});