const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    foodName: { type: String, required: true },
    comment: { type: String, required: true }
});

const restaurantSchema = mongoose.Schema({
    restName: { type: String, required: true },
    restRating: { type: Number, required: true }
});

const FoodModel = mongoose.model('FoodModel', foodSchema);
const RestaurantModel = mongoose.model('RestaurantModel', restaurantSchema);

module.exports = {
    FoodModel: FoodModel,
    RestaurantModel: RestaurantModel
};
