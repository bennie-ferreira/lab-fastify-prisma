import fastify, { FastifyInstance } from "fastify";
import { userRouter } from "./routes/user.routes";

const app: FastifyInstance = fastify({logger: false})

app.register(userRouter, {
    prefix: '/users',
})

app.listen({ port: 3100 }, () => console.log('Server is running on port 3100'))