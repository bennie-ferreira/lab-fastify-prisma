import { Contact, ContactCreate, ContactRepository } from "../interfaces/contact.interface";
import { UserRepository } from "../interfaces/user.interface";
import { ContactRepositoryPrisma } from "../repositories/contact.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepositoryPrisma()
        this.contactRepository = new ContactRepositoryPrisma()
    }

    async create({ email, name, phone, userEmail }: ContactCreate){
        const user = await this.userRepository.findByEmail(email);
        if (!user){
            throw new Error('User not found');
        }

        const verifyIContactExists = await this.contactRepository.findByEmailOrPhone(email, phone);
        if (verifyIContactExists) {
            throw new Error('Contact already exists')
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id
        })

        return contact;
    }

    async listAllContacts() {
        const contacts = await this.contactRepository.findAllContacts();
    
        return contacts;
      }

      async updateContact({ id, name, email, phone }: Contact) {
        const data = await this.contactRepository.updateContact({
          id,
          name,
          email,
          phone
        });
    
        return data;
      }

      async delete(id: string) {
        const data = await this.contactRepository.delete(id);
    
        return data;
      }
}

export { ContactUseCase }