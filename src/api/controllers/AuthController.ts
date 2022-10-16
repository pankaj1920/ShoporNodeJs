
import BaseController from "./base/BaseController";
import { NextFunction, Request, Response } from 'express';
import AuthService from "../services/AuthService";
import { encryptData, decryptData } from "../helpers/Encyptions"
import { randomNumber } from "../helpers/Utils";


class AuthController extends BaseController {

    register() {

        return this.asyncWrapper(async (req: Request, res: Response) => {
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
                const response: any = await AuthService.register(data)
                const { otp, password, ...userData } = response._doc

                this.SuccessResponseData({ res: res, message: 'User Register Successfully', data: userData })
            }

        })


    }

    login() {
        return this.asyncWrapper(async (req: Request, res: Response) => {
            const data = {
                mobile: req.body.mobile,
                password: req.body.password
            }

            // checkUser
            const checkUser: any = await AuthService.getUserByMobile(data.mobile)


            if (checkUser) {

                const validPassword = decryptData(checkUser.password)

                if (validPassword != data.password) {
                    this.ErrorResponse({ res: res, message: "Invalid Credentials" })
                } else {
                    const { password, otp, ...loginData } = checkUser._doc;

                    this.SuccessResponseData({
                        res: res,
                        message: "Logged In Successfully",
                        data: loginData
                    })
                }

            } else {
                this.ErrorResponse({ res: res, message: "User not found" })
            }
        })
    }

    getOtp() {
        return this.asyncWrapper(async (req: Request, res: Response) => {
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
        return this.asyncWrapper(async (req: Request, res: Response) => {
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