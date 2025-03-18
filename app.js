require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
mongoose.set("debug", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

// const MONGO_URL = "mongodb://localhost:27017/wanderlust";
// const MONGO_URL = "mongodb+srv://dipak_2505:Dipakatmongoatlas@rcpit.1akhdo3.mongodb.net/wanderlust";

main()
.then(() => {
    console.log("MongoDB connection established!");
})
.catch((err) => {
    console.log(err);
})


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
    res.redirect("/listings");
});


// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings });
});

// Search Button
app.get("/listings/search",  async (req, res) => {
    let { location } = req.query;
    if(location === ""){
        res.redirect("/listings");
    } else {
        const specificListings = await Listing.find({ location: { $regex: location, $options: "i" } });
        res.render("listings/index", { allListings : specificListings});
    }
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Update Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});