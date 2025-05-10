import {
  getSuccessRoute,
  getFailRoute,
  createNumberSchema,
  createSuccessSchema
} from '@/schemas/utility'
import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { validator } from 'hono-openapi/zod'
import { z } from 'zod'

const helloRouter = new Hono()

const reqSchema = z.object({
  count: createNumberSchema()
})

const resSchema = createSuccessSchema(
  z.object({
    message: z.string()
  })
).openapi({ ref: 'HelloResponse' })

type ResType = z.infer<typeof resSchema>

helloRouter.get(
  '/',
  validator('query', reqSchema),
  describeRoute({
    validateResponse: true,
    description: '테스트 라우트',
    responses: {
      200: getSuccessRoute({ resSchema }),
      400: getFailRoute()
    }
  }),
  (c) => {
    const query = c.req.valid('query')
    const res: ResType = {
      success: true,
      data: {
        message: `hello ${query.count} times`
      }
    }

    return c.json(res)
  }
)

export default helloRouter
