var { param, body, validationResult } = require('express-validator');
var BaseValidation = require('../validations/BaseValidation')

class AuthValidator extends BaseValidation {
  static register() {
    var err = [
      body('email', 'Email is required').isEmail(),
      body(
        'password',
        'Password is required and must be exceed for 4 character'
      ).isLength(5),
    ];

    return this.sendError(err)
  }

  static login(){
    var err = [
      body('email','Email is required').isEmail(),
      body('password','Password is required')
    ]

    return this.sendError(err)
  }

}



module.exports = AuthValidator;
