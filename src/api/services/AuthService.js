const UserSchema = require('../models/UserModel');

class AuthService {
  static async register(data) {
    var user = new UserSchema(data);
    const result = await user.save();

    return result;
  }

  static async login(data) {
    const result = await UserSchema.findOne(data);
    return result;
  }

  static async getUserByEmail(email){
    var checkUser = await UserSchema.findOne({ email: email });
    return checkUser;
  }
}

module.exports = AuthService;
