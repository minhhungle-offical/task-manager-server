import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { User } from '../../../config/db.collections.js'
import { Timestamp } from 'firebase-admin/firestore'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
})

export async function createEmployee(req, res) {
  try {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      return res.status(400).json({ success: false, errors })
    }

    const data = result.data
    const id = uuid()

    const newEmployee = {
      ...data,
      createdAt: Timestamp.now(),
    }

    await User.doc(id).set(newEmployee)

    return res.status(201).json({
      success: true,
      data: { id, ...newEmployee },
      message: 'Employee created successfully',
    })
  } catch (err) {
    console.error('create-employee error:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
