const moongoose = require("mongoose")





const Products = moongoose.model("Products", {

    title: { type: String },
    details: { type: String },
    price: { type: String },
    imageUrl: { type: String },
    category: { type: String, enum: ["New Collection", "Trending", "Mens", "Womens"] },
    type:{type:String}
})




module.exports = Products;
