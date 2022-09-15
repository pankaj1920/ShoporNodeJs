import express from 'express'
import Print from '../helpers/Print'
import AuthValidator from '../validations/AuthValidator'
import AuthController from '../controllers/AuthController'

let router = express.Router()

router.post('/register', AuthValidator.register(), AuthController.register())
router.post('/login', AuthValidator.login(), AuthController.login())
router.post('/generateOtp', AuthValidator.generateOtp(), AuthController.getOtp())
router.post('/updatePassword', AuthValidator.updatePassword(), AuthController.updatePassword())

/* router.post("/register",(req,res)=>{
    Print.log("Register Api is working")
})
 */
export default router