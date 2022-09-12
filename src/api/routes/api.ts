import express,{Express} from 'express'
import authRouter from '../routes/auth'

const routes = (app:Express) => {
  const apiPrefix = '/api';

  app.use(apiPrefix,authRouter)
  
  return app;
};
export default routes
