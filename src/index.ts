import { handle } from 'hono/aws-lambda'
import helloRouter from '@/routes/hello'
import app from '@/app'

app.route('/hello', helloRouter)

export const handler = handle(app)
export default app
