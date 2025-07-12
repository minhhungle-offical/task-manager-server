import { getMe } from './getMe.js'
import { loginByEmail } from './loginByEmail.js'
import { loginByPhone } from './loginByPhone.js'
import { updateMe } from './updateMe.js'
import { verifyOtpByEmail } from './verifyOtpByEmail.js'
import { verifyOtpByPhone } from './verifyOtpByPhone.js'

export const authController = {
  loginByPhone,
  loginByEmail,
  verifyOtpByPhone,
  verifyOtpByEmail,

  getMe,
  updateMe,
}
