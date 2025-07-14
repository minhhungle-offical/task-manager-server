import {
  hasRecentEmailOtp,
  hasRecentPhoneOtp,
  sendOtpByEmail,
  sendOtpByPhone,
} from '../service/opt.service.js'

export async function resendOtp(req, res) {
  try {
    const { email, phone } = req.body

    if (!phone || !email) {
      return res.status(400).json({ message: 'Phone or Email is required' })
    }

    if (email) {
      const recentlySent = await hasRecentEmailOtp(email)

      if (recentlySent) {
        return res.status(429).json({ message: 'OTP already sent. Please wait.' })
      }

      const { otp, id } = await sendOtpByEmail(email)
      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: {
          accessCodeId: id,
          email,
          ...(process.env.NODE_ENV === 'dev' && { otp }),
        },
      })
    }

    if (phone) {
      const recentlySent = await hasRecentPhoneOtp(phone)
      if (recentlySent) {
        return res.status(429).json({ message: 'OTP already sent. Please wait.' })
      }

      const { otp, id } = await sendOtpByPhone(phone)
      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: {
          accessCodeId: id,
          phone,
          ...(process.env.NODE_ENV === 'dev' && { otp }),
        },
      })
    }

    return res.status(400).json({ message: 'Email or phone is required' })
  } catch (err) {
    console.error('resendOtp error:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
