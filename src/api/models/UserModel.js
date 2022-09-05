var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  first_ame: { type: String },
  last_ame: { type: String},
  dob: { type: String },
  country_code: { type: Number },
  mobile: { type: Number },
  email: { type: String, required: true },
  password: { type: String,required: true  },
  gender: { type: String },
});

//below line will automatically generate createdAt and updatedAt fields
// userSchema.set('timestamps',true)

userSchema.set('timestamps', {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = mongoose.model('user', userSchema);
