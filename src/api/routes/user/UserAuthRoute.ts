import express from 'express'
import Print from '../../helpers/Print'
import AuthValidator from '../../validations/AuthValidator'
import AuthController from '../../controllers/AuthController'
import productController from '../../controllers/ProductController'
import ProductValidator from '../../validations/ProductValidator'
import CartValidator from '../../validations/CartValidator'
import cartController from '../../controllers/CartController'

let router = express.Router()

// Auth Api
router.post('/register', AuthValidator.register(), AuthController.register())
router.post('/login', AuthValidator.login(), AuthController.login())
router.post('/generateOtp', AuthValidator.generateOtp(), AuthController.getOtp())
router.post('/updatePassword', AuthValidator.updatePassword(), AuthController.updatePassword())

// Product Apis
router.post("/home", productController.getDashboard())
router.post("/productDetail", ProductValidator.productDetail(), productController.getProductDetail())
router.post('/getProductCategory', productController.getCategoryList())
router.post('/productlist', ProductValidator.productListByCategory(), productController.getProductListByCategories())


//Cart Apis
router.post('/getCartItem', CartValidator.getCartItem(), cartController.getCartItem())
router.post('/addToCart', CartValidator.addCartItem(), cartController.addCartItem())
router.post('/removeCartItem', CartValidator.removeCartItem(), cartController.removeCartItem())
/* router.post("/register",(req,res)=>{
    Print.log("Register Api is working")
})
 */
export default router