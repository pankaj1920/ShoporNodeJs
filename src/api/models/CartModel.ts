import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    productId: { type: Array<mongoose.Schema.Types.ObjectId>, required: true, ref: 'product' }
})

cartSchema.set('timestamps', {
    'updatedAt': 'updated_at',
    'createdAt': 'created_at'
})

const CartItemModel = mongoose.model('carts', cartSchema)
export default CartItemModel