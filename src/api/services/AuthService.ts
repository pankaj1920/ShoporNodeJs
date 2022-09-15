import Print from "../helpers/Print";
import UserSchema from "../models/UserModel";

class AuthService {
    static async register(data: {}) {
        const user = new UserSchema(data)
        const result = user.save()
        return result
    }

    static async getUserByMobile(mobile) {
        const checkUser = await UserSchema.findOne({ mobile: mobile })
        return checkUser
    }

    static async getUserByEmailMobile(username) {
        const checkUser = await UserSchema.find({ $or: [{ email: username }, { mobile: Number(username) }] })
        return checkUser
    }

    static async getOtp(username, otp) {
        const data = await UserSchema.updateOne({ $or: [{ email: username }, { mobile: Number(username) }] },
            { $set: { otp: otp } })

        return data
    }


    static async updatePassword(username, otp, pass) {

        const data = await UserSchema.find({
            $and: [
                { otp: otp },
                { $or: [{ email: username }, { mobile: Number(username) }] }
            ]
        })

        if (data.length != 0) {
            const result = await UserSchema.updateOne({ $or: [{ email: username }, { mobile: username }] },
                { $set: { password: pass.toString() } })
            return "Password Updated Successfully"
        } else {
            return "Invalid Otp"
        }


    }
}

export default AuthService