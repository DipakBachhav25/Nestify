const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb+srv://dipak_2505:Dipakatmongoatlas@rcpit.1akhdo3.mongodb.net/wanderlust";

main()
.then(() => {
    console.log("MongoDB connection established!");
})
.catch((err) => {
    console.log(err);
})


async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}

initDB()
.then(() => {
    console.log("Data initialized");
})
.catch((err) => {
    console.log(err);
})