import { verifyToken } from '../utils/jwt.js'

export function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid authorization' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token)

    req.user = decoded
    next()
  } catch (err) {
    console.error('Check auth error:', err.message)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
