var express = require("express")
var authRouter = require('../routes/auth')

const routes = app =>{
    const apiPrefix = '/api';

    app.use(apiPrefix,authRouter);
   
      
    return app;
}
module.exports = routes