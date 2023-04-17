import express, { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import 'express-async-errors'

import { router } from './router'

const app = express()

app.use(express.json())
app.use(router)

app.use('*', (request, response) => {
  response.status(404).json({ message: '404 Not Found' })
})

app.use((error: any, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return response.status(400).send({ message: 'Validation Error', errors: error })
  }

  response.status(500).json({ message: 'Internal server error' })
})

app.listen('3000', () => console.log('Aplicação rodando em http://localhost:3000'))
