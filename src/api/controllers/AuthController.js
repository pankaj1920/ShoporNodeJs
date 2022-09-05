// import BaseController from "./base/BaseController";
const BaseController = require('../controllers/base/BaseController');
const AuthService = require('../services/AuthService');
const CryptoJs = require('crypto-js');

class AuthController extends BaseController {
  register() {
    return this.asyncWrapper(async (req, res) => {
      const data = {
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_KEY
        ),
      };

      //Check if this user already exists
      const checkUser = await AuthService.getUserByEmail(data.email);
      if (checkUser) {
        this.ErrorResponse({ res: res, message: 'User Already Exist' });
      } else {
        const response = await AuthService.register(data);
        this.SuccessResponseData({
          res: res,
          message: 'User Registered Successfully',
          data: response,
        });
      }
    });
  }

  login() {
    return this.asyncWrapper(async (req, res) => {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      // const response = await AuthService.login(data);
      const checkUser = await AuthService.getUserByEmail(data.email);

      if (checkUser) {
        const hashPassword = CryptoJs.AES.decrypt(
          checkUser.password,
          process.env.CRYPTO_KEY
        );

        const validPassword = hashPassword.toString(CryptoJs.enc.Utf8);

        validPassword != data.password &&
          this.ErrorResponse({ res: res, message: 'Invalid Credentials' });

        const { password, ...loginData } = checkUser._doc;

        this.SuccessResponseData({
          res: res,
          message: 'LoggedIn Successfully',
          data: { ...loginData },
        });
      } else {
        this.ErrorResponse({ res: res, message: 'User not found' });
      }
    });
  }
}

const authController = new AuthController(AuthService);
module.exports = authController;
