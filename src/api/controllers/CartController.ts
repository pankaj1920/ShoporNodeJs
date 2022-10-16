import '../helpers/extension/StringExtension'
import '../helpers/extension/ArrayExtension'
import CartService from "../services/CartService";
import BaseController from "./base/BaseController";
import { Request, Response } from 'express';
import { parse } from 'dotenv';


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
            var result
            const data = {
                userId: req.body.userId,
                products: req.body.products
            }


            const checkUserCart = (await CartService.getCartItem(data.userId)).first()
            //checking if cart exist for user
            if (checkUserCart) {
                let cartProductList = checkUserCart.products
                const itemIndex = cartProductList.findIndex(item => item.productId == data.products.productId)

                if (itemIndex > -1) {
                    let productItem = cartProductList[itemIndex]
                    let productPrice = this.getOneProductPrice(productItem.price, productItem.quantity)
                    productItem.quantity = data.products.quantity
                    productItem.price = parseInt(data.products.quantity) * productPrice
                    cartProductList[itemIndex] = productItem
                } else {
                    cartProductList.push(data.products)
                }
                const updateCart = await CartService.updateCart(cartProductList.id, cartProductList)
                this.SuccessResponseData({ res: res, message: "Cart Updated Successfully", data: updateCart })
            } else {
                result = await CartService.addToCart(data)
                if (result) {
                    this.SuccessResponse({ res: res, message: "Product added to your cart successfully" })
                } else {
                    this.ErrorResponse({ res: res, message: "Error while adding item to cart" })
                }
            }


        })
    }

    getOneProductPrice(price: string, quantity: string): number {
        return parseInt(price) / parseInt(quantity)
    }
}

const cartController = new CartController(CartService)
export default cartController