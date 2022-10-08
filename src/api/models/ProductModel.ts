import mongoose from "mongoose";

const productSchema = new mongoose.Schema([{
    name: {},
    description: {},
    content: {},
    status: {},
    images: {},
    quantity: {},
    is_featured: {},
    category_id: {},
    sale_type: {},
    price: {},
    sale_price: {},
    start_date: {},
    end_date: {},
    stock_status: {}
}])

productSchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ProductSchema = mongoose.model('product', productSchema)
export default ProductSchema