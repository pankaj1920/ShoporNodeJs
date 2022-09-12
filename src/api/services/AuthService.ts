import UserSchema from "../models/UserModel";

class AuthService {
    static async register(data: {}) {
        const user = new UserSchema(data)
        const result = user.save()
        return result
    }

    static async getUserByEmail(mobile) {
        var checkUser = await UserSchema.findOne({ mobile: mobile })
        return checkUser
    }
}

export default AuthService