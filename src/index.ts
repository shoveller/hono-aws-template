import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import helloRouter from '@/routes/hello'
import { swaggerUI } from '@hono/swagger-ui'
import { openAPISpecs } from 'hono-openapi'

const app = new Hono()

app.use('*', logger())
app.use(secureHeaders())

app.route('/hello', helloRouter)

app.get('/', swaggerUI({ url: '/docs' }))

app.get(
  '/docs',
  openAPISpecs(app, {
    documentation: {
      info: {
        version: '1.0.0',
        title: 'hono-template'
      }
    }
  })
)

export const handler = handle(app)
export default app
