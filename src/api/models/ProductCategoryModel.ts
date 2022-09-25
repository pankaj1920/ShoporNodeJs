import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true }
})

productCategorySchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ProductCategorySchema = mongoose.model('Product', productCategorySchema)

export default ProductCategorySchema