import express from 'express'
import Print from '../../helpers/Print'
import AuthValidator from '../../validations/AuthValidator'
import AuthController from '../../controllers/AuthController'
import productController from '../../controllers/ProductController'
import ProductValidator from '../../validations/ProductValidator'

let router = express.Router()

router.post('/register', AuthValidator.register(), AuthController.register())
router.post('/login', AuthValidator.login(), AuthController.login())
router.post('/generateOtp', AuthValidator.generateOtp(), AuthController.getOtp())
router.post('/updatePassword', AuthValidator.updatePassword(), AuthController.updatePassword())

router.post("/home", productController.getDashboard())
router.post("/productDetail", ProductValidator.productDetail(), productController.getProductDetail())
router.post('/getProductCategory', productController.getCategoryList())
router.post('/productlist', ProductValidator.productListByCategory(), productController.getProductListByCategories())
router.post('')
/* router.post("/register",(req,res)=>{
    Print.log("Register Api is working")
})
 */
export default router