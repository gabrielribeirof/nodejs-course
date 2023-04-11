import express from 'express'
import { router } from './router'

const app = express()

app.use(router)

app.use('*', (_, response) => {
  response.status(404).json({ message: '404 Not Found' })
})

app.listen('3000', () => console.log('Aplicação rodando em http://localhost:3000'))
