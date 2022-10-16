import CartItemModel from "../models/CartModel";
var ObjectId = require('mongodb').ObjectID;

class CartService {

    static async getCartItem(userId) {
        // const data = CartItemModel.find({ userId: ObjectId(userId) }).populate('product')
        const data = CartItemModel.find({ userId: ObjectId(userId) }).populate('userId').populate("products.productId")
        return data
    }

    static async checkCartItem(userId, productId) {
        const data = CartItemModel.find({ $and: [{ userId: ObjectId(userId) }, { product: ObjectId(productId) }] })
        return data
    }

    static async addToCart(cartItem: {}) {
        const data = new CartItemModel(cartItem)
        const result = data.save()
        return result
    }


    static async updateCart(cartId, productsList) {
        const result = await CartItemModel.findOneAndUpdate({ id: cartId }, { $set: { products: productsList } })
        const cartList = this.getCartItem(result.userId)
        return cartList
    }
}

export default CartService