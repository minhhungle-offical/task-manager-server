import { v4 as uuid } from 'uuid'
import { AccessCode } from '../../../config/db.collections.js'
import { db } from '../../../config/db.js'
import { generateOtp } from '../../../utils/generateCode.js'
import { getOtpExpiry } from '../../../utils/optExpiry.js'
import { sendSMS } from '../../../utils/sendSMS.js'

const seconds = 30

// =================== PHONE ===================
export async function hasRecentPhoneOtp(phone, role) {
  const snapshot = await AccessCode.where('phone', '==', phone)
    .where('role', '==', role)
    .where('type', '==', 'sms')
    .where('isUsed', '==', false)
    .get()

  const cutoff = getOtpExpiry(seconds)

  return snapshot.docs.some((doc) => {
    const createdAt = doc.data()?.createdAt
    return createdAt && createdAt.toDate() >= cutoff
  })
}

export async function sendOtpByPhone(phone, role) {
  const otp = generateOtp()
  const id = uuid()

  await AccessCode.doc(id).set({
    phone,
    otp,
    isUsed: false,
    createdAt: new Date(),
    role,
    type: 'sms',
  })

  // sendSMS({ to: phone, text: `Your OTP code is ${otp}` })

  return { otp, id }
}

// =================== EMAIL ===================

export async function hasRecentEmailOtp(email, role) {
  const snapshot = await db
    .collection('accessCodes')
    .where('email', '==', email)
    .where('role', '==', role)
    .where('type', '==', 'email')
    .where('isUsed', '==', false)
    .get()

  const cutoff = getOtpExpiry(seconds)

  return snapshot.docs.some((doc) => {
    const createdAt = doc.data()?.createdAt
    return createdAt && createdAt.toDate() >= cutoff
  })
}

export async function sendOtpByEmail(email, role) {
  const otp = generateOtp()
  const id = uuid()

  await db.collection('accessCodes').doc(id).set({
    email,
    otp,
    isUsed: false,
    createdAt: new Date(),
    role,
    type: 'email',
  })

  // TODO: sendEmail(email, `Your OTP code is ${otp}`)

  return { otp, id }
}
