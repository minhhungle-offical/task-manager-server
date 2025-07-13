export async function getAllTasks(req, res) {
  try {
  } catch (error) {
    console.error('getAllTasks error:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
