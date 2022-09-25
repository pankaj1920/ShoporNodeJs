import { check } from 'express-validator';
import BaseValidator from './BaseValidator';


class ProductValidator extends BaseValidator {



    //Admin
    static addCategories() {
        const errors = [
            check('category_name', "category_name is required").exists({ checkFalsy: true }),
        ]

        return this.sendError(errors)
    }
}

export default ProductValidator