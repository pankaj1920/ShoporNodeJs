import BaseController from "./base/BaseController";
import CryptoJs from 'crypto-js';
import AuthService from "../services/AuthService";
import { randomNumber, encryptData, decryptData } from "../helpers/Utils"

class AuthController extends BaseController {

    register() {
        return this.asyncWrapper(async (req, res) => {
            const data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile: req.body.mobile,
                gender: req.body.gender,
                password: encryptData(req.body.password)
            }

            //Check if this user already exists
            const checkUser = await AuthService.getUserByMobile(data.mobile)

            if (checkUser) {
                this.ErrorResponse({ res: res, message: 'User Already Exist.' })
            } else {
                const response = await AuthService.register(data)
                this.SuccessResponseData({ res: res, message: 'User Register Successfully', data: response })
            }

        })
    }

    login() {
        return this.asyncWrapper(async (req, res) => {
            const data = {
                mobile: req.body.mobile,
                password: req.body.password
            }

            // checkUser
            const checkUser = await AuthService.getUserByMobile(data.mobile)


            if (checkUser) {

                const validPassword = decryptData(checkUser.password)

                if (validPassword != data.password) {
                    this.ErrorResponse({ res: res, message: "Invalid Credentials" })
                } else {
                    const { password, ...loginData } = checkUser

                    this.SuccessResponseData({
                        res: res,
                        message: "Logged In Successfully",
                        data: password
                    })
                }

            } else {
                this.ErrorResponse({ res: res, message: "User not found" })
            }
        })
    }

    getOtp() {
        return this.asyncWrapper(async (req, res) => {
            const data = {
                username: req.body.username
            }

            const checkUser = await AuthService.getUserByEmailMobile(data.username)
            const otp = randomNumber(4);
            if (checkUser.length != 0) {
                const result = await AuthService.getOtp(data.username, otp)
                this.SuccessResponseData({
                    res: res, message: "Otp Sent Successfully", data: otp
                })
            } else {
                this.ErrorResponse({ res: res, message: "User not found" })
            }
        })
    }

    updatePassword() {
        return this.asyncWrapper(async (req, res) => {
            const data = {
                username: req.body.username,
                otp: req.body.otp,
                password: encryptData(req.body.password),
            }

            const response = await AuthService.updatePassword(data.username, data.otp, data.password)
            this.SuccessResponse({ res: res, message: response })
        })
    }
}

const authController = new AuthController(AuthService)
export default authController