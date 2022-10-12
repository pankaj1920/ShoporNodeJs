import { check } from 'express-validator';
import BaseValidator from "./BaseValidator";


class CartValidator extends BaseValidator {

    static getCartItem() {
        const error = [
            check('userId', "userId is required").exists({ checkFalsy: true })
        ]

        return this.sendError(error)
    }

    static addCartItem() {
        const error = [
            check('userId', "userId is required").exists({ checkFalsy: true }),
            check('productId', "productId is required").exists({ checkFalsy: true })
        ]

        return this.sendError(error)
    }
}

export default CartValidator