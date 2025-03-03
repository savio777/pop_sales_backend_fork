import { UserRepository } from "@/repository/userRepository";

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
    
  }
}
