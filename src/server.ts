import fastify, { FastifyInstance } from "fastify";
import { userRouter } from "./routes/user.routes";
import { contactRouter } from "./routes/contact.routes";

const app: FastifyInstance = fastify({logger: false})

app.register(userRouter, {
    prefix: '/users',
})
app.register(contactRouter, {
    prefix: '/contacts'
})

app.listen({ port: 3100 }, () => console.log('Server is running on port 3100'))