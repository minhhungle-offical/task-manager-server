import express from 'express'
import { authController } from './controller/index.js'
import { checkAuth } from '../../middlewares/checkAuth.js'
import { uploadMiddleware } from '../../middlewares/upload.js'
const authRouter = express.Router()

// by phone
authRouter.post('/login-by-phone', authController.loginByPhone)
authRouter.post('/verify-otp-by-phone', authController.verifyOtpByPhone)

// by mail
authRouter.post('/login-by-email', authController.loginByEmail)
authRouter.post('/verify-otp-by-mail', authController.verifyOtpByEmail)

// profile
authRouter.get('/me', checkAuth, authController.getMe)
authRouter.put(
  '/update-me',
  checkAuth,
  uploadMiddleware({
    fieldName: 'avatar',
    folder: 'users/avatars',
    width: 300,
    square: true,
  }),
  authController.updateMe,
)

export default authRouter
