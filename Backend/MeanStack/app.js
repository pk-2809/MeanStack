const express = require('express');
const bodyParser = require('body-parser');
const { FoodModel, RestaurantModel } = require('./models/db-model');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://host:9oYClyBfDVKuMq5z@db-cluster-1.vigbkhs.mongodb.net/MeanStack?retryWrites=true&w=majority').then((res) => {
    console.log('--------- DB SUCCESS --------');
}).catch((err) => {
    console.log('Database Connection Failed! '+err.message);
})

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    next();
})

app.post('/comments', (req, res, next) => {
    const data = new FoodModel({
        foodName: req.body.foodName,
        comment:req.body.comment
    });
    data.save()
    .then(() => {
        res.json({
            message: 'Food Added Successfully!'
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message
        });
    });
})

app.post('/restaurants', (req, res, next) => {

    const data = new RestaurantModel({
        restName: req.body.restName,
        restRating:parseInt(req.body.restRating)
    });
    data.save()
    .then(() => {
        res.json({
            message: 'Restaurant Added Successfully!'
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message
        });
    });
})

app.use('/comments', (req, res, next) => {
    FoodModel.find().then(docs => {
        res.status(200).json({
            status: true,
            data:docs
        });
    }).catch(err => {
        console.log(err.message);
            res.status(500).json({
                error: err.message
            });
    })
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});