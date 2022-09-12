import { body, check } from "express-validator";
import BaseValidator from "./BaseValidator";

class AuthValidator extends BaseValidator {

    static register() {
        const error = [

            check('first_name', "First Name is required").exists({ checkFalsy: true }),
            check('last_name', "Last Name is required").exists({ checkFalsy: true }),
            check('email').exists({ checkFalsy: true }).withMessage('Email is required')
                .isEmail().normalizeEmail().withMessage("Invalid Email"),
            check('mobile').exists({ checkFalsy: true }).withMessage('Mobile is required')
                .isMobilePhone("any").withMessage("Invalid Mobile Number"),
            check('gender').exists({ checkFalsy: true }).withMessage('Gender is required'),
            check('password').exists({ checkFalsy: true }).withMessage('Password is required')
                .isLength({ min: 5 }).withMessage('Password should be greater then 4 char'),
        ]

        return this.sendError(error)
    }
}

export default AuthValidator