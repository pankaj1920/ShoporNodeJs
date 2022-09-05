var express = require('express')
var AuthController = require('../controllers/AuthController')
var AuthValidator = require('../validations/AuthValidation')

var router = express.Router()

router.post("/register",AuthValidator.register(),AuthController.register())
router.post("/login",AuthValidator.login(),AuthController.login())

module.exports = router