const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://images7.alphacoders.com/783/thumb-1920-783839.jpg",
        set: (v) => v === "" ? "https://images7.alphacoders.com/783/thumb-1920-783839.jpg" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;