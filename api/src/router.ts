import { Router } from "express"
import { UsersController } from './UsersController'

export const router = Router()

const usersController = new UsersController()

router.get('/users', usersController.index)

router.get('/users/:id', usersController.get)

router.post('/users', usersController.create)

router.patch('/users/:id', usersController.update)

router.delete('/users/:id', usersController.delete)
