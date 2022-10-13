import CartItemModel from "../models/CartModel";
var ObjectId = require('mongodb').ObjectID;

class CartService {

    static async getCartItem(userId) {
        const data = CartItemModel.find({ userId: ObjectId(userId) })
        return data
    }

    static async addToCart(cartItem: {}) {
        const data = new CartItemModel(cartItem)
        const result = data.save()
        return result
    }


    static async updateCart(data: {}) {

    }
}

export default CartService