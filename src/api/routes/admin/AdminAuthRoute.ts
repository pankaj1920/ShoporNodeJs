import express from 'express'
import Print from '../../helpers/Print'
import AuthValidator from '../../validations/AuthValidator'
import AuthController from '../../controllers/AuthController'
import ProductController from '../../controllers/ProductController'
import ProductValidator from '../../validations/ProductValidator'

let router = express.Router()


router.post('/add_categories', ProductValidator.addCategories(), ProductController.addCategories())
router.post('/addProduct', ProductValidator.addProduct(), ProductController.addProduct())

export default router