import CartItemModel from "../models/CartModel";

class CartService {

    static getCartItem(userId) {
        const data = CartItemModel.find({ userId: userId })
        return data
    }

    static addToCart(cartItem: {}) {
        const data = new CartItemModel(cartItem)
        const result = data.save()
        return result
    }


    static updateCart(data: {}) {

    }
}

export default CartService