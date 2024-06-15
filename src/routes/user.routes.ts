import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usercases/user.usercase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRouter(fastify: FastifyInstance){
    const userUseCase = new UserUseCase
    fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
        const { name, email } = req.body;
        try {
            const data = await userUseCase.create({ name, email });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', (req, reply) => {
        reply.send({ hello: 'world' });
    });
}