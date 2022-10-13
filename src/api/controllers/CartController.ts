import CartService from "../services/CartService";
import BaseController from "./base/BaseController";
import { Request, Response } from 'express';


class CartController extends BaseController {

    getCartItem() {
        return this.asyncWrapper(async (req: Request, res: Response) => {

            const result = await CartService.getCartItem(req.body.userId)
            if (result.length > 0) {
                this.SuccessResponseData({ res: res, message: "Cart item fetch successful", data: result })
            } else {
                this.ErrorResponse({ res: res, message: "No Item in Cart" })
            }
        })
    }

    addCartItem() {
        return this.asyncWrapper(async (req: Request, res: Response) => {
            const data = {
                userId: req.body.userId,
                product: req.body.productId
            }

            const result = await CartService.addToCart(data)
            if (result) {
                this.SuccessResponseData({ res: res, message: "Item added to cart successfully", data: result })
            } else {
                this.ErrorResponse({ res: res, message: "Error while adding item to cart" })
            }
        })
    }
}

const cartController = new CartController(CartService)
export default cartController