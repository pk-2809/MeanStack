const express = require('express');
const bodyParser = require('body-parser');
const FoodModel = require('./models/db-model');

const app = express();
const PORT = 3000;


const comments = [
    { id: '101', foodName: 'XYZ', comment: 'This is my favourite food.' },
    { id: '102', foodName: 'PQR', comment: 'This is my another favourite food.' }
];

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
        foodName: req.body.name,
        comment:req.body.comment
    });

    comments.push(data);
    res.json({
        message: 'Added Successfully!'
    });
})

app.use('/comments', (req, res, next) => {
    
    
    res.status(200).json({
        status: true,
        data:comments
    });
});







app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});