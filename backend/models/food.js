const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
    {
        name: String,
        image: String,
        price: String,
        description: String

    },
    {
      collection: "FoodItems",
    }
);

module.exports = mongoose.model("FoodItems", FoodSchema);