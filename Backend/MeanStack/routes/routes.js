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
        callback(err, filePath);
    }, filename: (req, file, callback) => {
        const originalFileName = file.originalname.toLowerCase();
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const newFileName = originalFileName.replace(/(\.[^.]+)$/, `-${currentDate}$1`);
        callback(null, newFileName);
    }
});

router.get('/comments', (req, res, next) => {
    FoodModel.find().then(docs => {
        res.status(200).json({
            status: true,
            data:docs
        });
    }).catch(err => {
            res.status(500).json({
                error: err.message
            });
    })
});

router.delete('/comments/:id', (req, res, next) => {
    const documentId = req.params.id;
    FoodModel.findByIdAndDelete(documentId)
        .then((deletedDocument) => {
        if (deletedDocument) {
            res.status(200).json({
              status:true,
            message: 'Food deleted successfully',
          });
        } else {
            res.status(404).json({
              status:false,
            message: 'Food not found',
          });
        }
      })
      .catch((error) => {
          res.status(500).json({
            status:false,
          message: error.message,
        });
      });
  });  

router.post('/comments', multer({ storage: fileStorage }).single("imagePath"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const data = new FoodModel({
        foodName: req.body.foodName,
        comment: req.body.comment,
        imagePath: url + '/images/' + req.file.filename
    });
    data.save()
    .then(() => {
        res.json({
            status:true,
            message: 'Food Added Successfully!'
        });
    })
    .catch((error) => {
        res.status(500).json({
            status:false,
            error: error.message
        });
    });
})

router.put('/comments/:id',multer({ storage: fileStorage }).single("imagePath"), (req, res, next) => {
    const documentId = req.params.id;
    const url = req.protocol + "://" + req.get("host");
    let imgPath = "";
    if (req.file) {
        imgPath = url + '/images/' + req.file.filename;
    }
    else {
        imgPath = req.body.imagePath;
    }
    const data = new FoodModel({
        _id:req.params.id,
        foodName: req.body.foodName,
        comment: req.body.comment,
        imagePath: imgPath
    });
    FoodModel.updateOne({ _id: documentId }, data)
      .then(updatedDocument => {
        if (updatedDocument) {
          res.status(200).json({
            message: 'Document updated successfully',
              data: updatedDocument,
              status:true,
          });
        } else {
            res.status(404).json({
                status:false,
            message: 'Document not found',
          });
        }
      })
      .catch(error => {
        res.status(500).json({
            error: error.message,
            status:false,
        });
      });
  });



router.post('/restaurants', multer({ storage: fileStorage }).single("imagePath"), (req, res, next) => {
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

router.get('/restaurants', (req, res, next) => {
    RestaurantModel.find().then(docs => {
        res.status(200).json({
            status: true,
            data:docs
        });
    }).catch(err => {
        console.log(err.message);
            res.status(500).json({
                error: err.message,
                status:false
            });
    })
});

router.put('/restaurants/:id', multer({ storage: fileStorage }).single("imagePath"), (req, res, next) => {
    const documentId = req.params.id;
    const url = req.protocol + "://" + req.get("host");
    let imgPath = "";
    if (req.file) {
        imgPath = url + '/images/' + req.file.filename;
    }
    else {
        imgPath = req.body.imagePath;
    }
    const updateReq = new RestaurantModel({
        _id: documentId,
        restName: req.body.restName,
        restRating: parseInt(req.body.restRating),
        imagePath:imgPath
    })
    RestaurantModel.updateOne({_id:documentId}, updateReq)
      .then(updatedDocument => {
        if (updatedDocument) {
          res.status(200).json({
            message: 'Restaurant updated successfully',
              data: updatedDocument,
              status:true,
          });
        } else {
          res.status(404).json({
              message: 'Restaurant not found',
              status:false,
          });
        }
      })
      .catch(error => {
        res.status(500).json({
            error: error.message,
            status:false,
        });
      });
  });

router.delete('/restaurants/:id', (req, res, next) => {
    const documentId = req.params.id;
    RestaurantModel.findByIdAndDelete(documentId)
        .then((deletedDocument) => {
        if (deletedDocument) {
            res.status(200).json({
              status:true,
            message: 'Restaurant deleted successfully',
          });
        } else {
            res.status(404).json({
              status:false,
            message: 'Restaurant not found',
          });
        }
      })
      .catch((error) => {
          res.status(500).json({
            status:false,
          message: error.message,
        });
      });
  });  

module.exports = router;