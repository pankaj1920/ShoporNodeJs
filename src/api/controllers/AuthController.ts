import BaseController from "./base/BaseController";
import CryptoJs from 'crypto-js'
import AuthService from "../services/AuthService";

class AuthController extends BaseController {
    register() {
        return this.asyncWrapper(async (req, res) => {
            const data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile: req.body.password,
                gender: req.body.gender,
                password: CryptoJs.AES.encrypt(
                    req.body.password,
                    process.env.CRYPTO_KEY
                ),
            }

            //Check if this user already exists
            const checkUser = await AuthService.getUserByEmail(data.mobile)

            if (checkUser) {
                this.ErrorResponse({ res: res, message: 'User Already Exist.' })
            } else {
                const response = await AuthService.register(data)
                this.SuccessResponseData({ res: res, message: 'User Register Successfully', data: response })
            }

        })
    }
}

const authController = new AuthController(AuthService)
export default authController