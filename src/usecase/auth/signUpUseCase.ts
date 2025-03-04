import { ConflictError } from "@/error/conflict.error";
import { UserRepository } from "@/repository/userRepository";
import bcrypt from 'bcrypt';

interface SignUpInputs {
  name: string,
  phone?: string,
  email: string,
  password: string
}

export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: SignUpInputs) {
    const userWithEmailAlredyExist = await this.userRepository.getByEmail(data.email)
    if(userWithEmailAlredyExist){
      throw new ConflictError("There is already a user registered with this email")
    }

    const saltRounds = 10; 
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const { password, ...userWithoutPassword } = await this.userRepository.create({
      ...data,
      password: passwordHash
    });
  
    return {user: userWithoutPassword}
  }
}
