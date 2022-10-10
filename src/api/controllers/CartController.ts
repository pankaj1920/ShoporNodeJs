import CartService from "../services/CartService";
import BaseController from "./base/BaseController";


class CartController extends BaseController {

    getCartItem() {
        return this.asyncWrapper(async (req: Request, res: Response) => {

        })
    }

    addCartItem() {
        return this.asyncWrapper(async (req: Request, res: Response) => {

        })
    }
}

const cartController = new CartController(CartService)
export default cartController