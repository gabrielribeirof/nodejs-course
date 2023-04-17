import { Router } from 'express'
import { z } from 'zod'
import { prisma } from './database/client'

export const router = Router()

router.get('/users', async (request, response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  })

  response.send(users)
})

router.get('/users/:user_id', async (request, response) => {
  const user_id = z.number().parse(Number(request.params.user_id))

  const user = await prisma.user.findFirst({
    where: { id: user_id },
    select: { id: true, name: true, email: true }
  })

  response.send(user)
})

router.post('/users', async (request, response) => {
  const { name, email, password } = z.object({
    name: z.string().min(3).max(64),
    email: z.string().email(),
    password: z.string().min(8).max(128),
  }).parse(request.body)

  const user = await prisma.user.create({
    data: { name, email, password },
    select: { id: true, name: true, email: true }
  })

  response.send(user)
})

router.patch('/users/:user_id', async (request, response) => {
  const user_id = z.number().parse(Number(request.params.user_id))

  const { name, email, password } = z.object({
    name: z.string().min(3).max(64),
    email: z.string().email(),
    password: z.string().min(8).max(128),
  }).parse(request.body)

  const user = await prisma.user.update({
    data: { name, email, password },
    where: { id: user_id },
    select: { id: true, name: true, email: true }
  })

  response.send(user)
})

router.delete('/users/:user_id', async (request, response) => {
  const user_id = z.number().parse(Number(request.params.user_id))

  const user = await prisma.user.delete({
    where: { id: user_id },
    select: { id: true, name: true, email: true }
  })

  response.send(user)
})
