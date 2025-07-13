import express from 'express'
import { taskController } from './controllers/index.js'

const taskRouter = express.Router()

taskRouter.get('/', taskController.getAllTasks)
export default taskRouter
