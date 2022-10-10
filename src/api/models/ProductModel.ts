import mongoose from "mongoose";
import ProductCategorySchema from "./ProductCategoryModel";
import ReviewSchema from "./ReviewModel";


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true, default: "published" },
    images: { type: Array<String>, required: true },
    quantity: { type: Number, require: true },
    is_featured: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories' },
    sale_type: { type: String, default: "none" },
    price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    start_date: { type: String, default: "0" },
    end_date: { type: String, default: "0" },
    stock_status: { type: String, required: true, default: "in_stock" },
    num_review: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 }
})

productSchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ProductSchema = mongoose.model('product', productSchema)
export default ProductSchema