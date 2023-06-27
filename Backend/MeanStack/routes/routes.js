const express = require("express");
const multer = require("multer");
const path = require('path');
const { FoodModel, RestaurantModel } = require('../models/db-model');

const router = express.Router();
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const valid = MIME_TYPE[file.mimetype];
        let err = new Error("Invalid file Format!");
        if (valid)
            err = null;
        const filePath = path.join(__dirname, '..', 'images');
        console.log(filePath)
        callback(err, filePath);
    }, filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileExt = MIME_TYPE[file.mimetype];
        callback(null, Date.now() + '-' + fileExt + fileName);
    }
});


router.post('/comments', multer({ storage: fileStorage }).single("file"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const data = new FoodModel({
        foodName: req.body.foodName,
        comment: req.body.comment,
        filePath: url + '/images/' + req.file.filename
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

router.post('/restaurants', multer({ storage: fileStorage }).single("file"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const data = new RestaurantModel({
        restName: req.body.restName,
        restRating: parseInt(req.body.restRating),
        imagePath:url + "/images/" + req.file.filename
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

router.use('/restaurants', (req, res, next) => {
    RestaurantModel.find().then(docs => {
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

router.use('/comments', (req, res, next) => {
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

module.exports = router;