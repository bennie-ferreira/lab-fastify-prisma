import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usercases/contact.usercase";
import { Contact, ContactCreate } from "../interfaces/contact.interface";

export async function contactRouter(fastify: FastifyInstance){
    const contactUseCase = new ContactUseCase

    fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {
        const { name, email, phone, userEmail } = req.body;
        try {
            const data = await contactUseCase.create({ name, email, phone, userEmail });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', async (req, reply) => {
        try {
          const data = await contactUseCase.listAllContacts();
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      
      fastify.put<{ Body: Contact; Params: { id: string } }>(
        '/:id',
        async (req, reply) => {
          const { id } = req.params;
          const { name, email, phone } = req.body;
          try {
            const data = await contactUseCase.updateContact({
              id,
              name,
              email,
              phone,
            });
            return reply.send(data);
          } catch (error) {
            reply.send(error);
          }
        },
      );

      fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
          const data = await contactUseCase.delete(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
}