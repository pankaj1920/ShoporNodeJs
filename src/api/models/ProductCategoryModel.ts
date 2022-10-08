import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    icon_url: { type: String, required: true },
    position: { type: Number, required: true },
    status: { type: String, required: true, default: "enable" },
})

productCategorySchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ProductCategorySchema = mongoose.model('categories', productCategorySchema)

export default ProductCategorySchema