import express from 'express'
import ProductController from '../../controllers/ProductController'
import ProductValidator from '../../validations/ProductValidator'

const router = express.Router()

router.post('/add_categories', ProductController.addCategories())

export default router