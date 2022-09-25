import mongoose from "mongoose";

enum GENDER {
    MALE,
    FEMALE,
    OTHER
}

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    country_code: { type: String, default: "+91" },
    mobile: { type: String, required: true },
    otp: { type: String, length: 4, default: "" },
    gender: {
        type: String, required: true, enum: {
            values: ['male', 'female', 'other'],
            message: 'Gender must be male, female, other'
        }
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
})

//below line will automatically generate createdAt and updatedAt fields
// userSchema.set('timestamps',true)

userSchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_time'
})


export default mongoose.model('user', userSchema)