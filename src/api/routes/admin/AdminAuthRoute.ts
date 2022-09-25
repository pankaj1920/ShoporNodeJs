import express from 'express'
import Print from '../../helpers/Print'
import AuthValidator from '../../validations/AuthValidator'
import AuthController from '../../controllers/AuthController'

let router = express.Router()


/* router.post("/register",(req,res)=>{
    Print.log("Register Api is working")
})
 */
export default router