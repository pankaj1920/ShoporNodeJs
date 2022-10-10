import { check } from 'express-validator';
import BaseValidator from './BaseValidator';


class ProductValidator extends BaseValidator {



    //Admin
    static addCategories() {
        const errors = [
            check('category_name', "category_name is required").exists({ checkFalsy: true }),
            check('icon_url', "Icon Url is required").exists({ checkFalsy: true })
        ]

        return this.sendError(errors)
    }

    static productListByCategory() {
        const errors = [
            check('category', "category is required").exists({ checkFalsy: true })
        ]

        return this.sendError(errors)
    }

    static addProduct() {
        const error = [
            check('name').exists({ checkFalsy: true }).withMessage("name is required").isLength({ min: 3 }).withMessage("Product Name must be greater then 3 letter"),
            check('description').exists({ checkFalsy: true }).withMessage("decription"),
            check('content'),
            check('status'),
            check('images'),
            check('quantity'),
            check('is_featured'),
            check('category'),
            check('sale_type'),
            check('price'),
            check('sale_price'),
            check('start_date'),
            check('end_date'),
            check('stock_status'),
            check('num_review'),
            check('rating'),
        ]
    }

    static productDetail() {
        const errors = [
            check('product_id', 'product_id is required').exists({ checkFalsy: true })
        ]

        return this.sendError(errors)
    }
}

export default ProductValidator