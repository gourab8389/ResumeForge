import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.use("*", logger());

app.onError((err, c) => {
    if(err instanceof HTTPException){
        return err.getResponse();
    }
    return c.json({ error: " internal error "});
})

const routes = app.route("/", app).route("/", app)

app.get("/", (c) => {
    return c.json({
        message: "Hello from Ai Resume!",
    })
})

export type AppType = typeof routes

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
