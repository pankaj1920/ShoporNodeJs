import express, { Express } from 'express'
import userAuthRouter from './user/UserAuthRoute'
import adminAuthRouter from './admin/AdminAuthRoute'

const routes = (app: Express) => {
  const apiPrefix = '/api';
  const userPrefix = `${apiPrefix}/user`
  const adminPrefix = `${apiPrefix}/admin`

  app.use(userPrefix, userAuthRouter)

  // Admin Route
  app.use(adminPrefix, adminAuthRouter)

  return app;
};
export default routes
