// import BaseController from "./base/BaseController";
const BaseController = require('../controllers/base/BaseController');
const AuthService = require('../services/AuthService');

class AuthController extends BaseController {
  register() {
    return this.asyncWrapper(async (req, res) => {
      const data = {
        email: req.body.email,
        password: req.body.password,
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

      const response = await AuthService.login(data);

      this.SuccessResponseData({
        res: res,
        message: 'LoggedIn Successfully',
        data: response,
      });
    });
  }
}

const authController = new AuthController(AuthService);
module.exports = authController;
