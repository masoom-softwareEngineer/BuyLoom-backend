import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: String,
    priceCents: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        stars: Number,
        count: Number
    }
})
export const Product = mongoose.model('product',productSchema)