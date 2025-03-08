import { BadRequestError } from "@/error/badRequest.error";
import { ConflictError } from "@/error/conflict.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";
import bcrypt from 'bcrypt';

interface SignUpInputs {
  name: string,
  phone?: string,
  email: string,
  password: string,
  companyId: string
}

export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userCompanyRepository: UserCompanyRepository
  ) {}

  async execute(data: SignUpInputs) {
    const company = await this.companyRepository.getById(data.companyId)
    if(!company){
      throw new BadRequestError("company not exist")
    }

    const userWithEmailAlredyExist = await this.userRepository.getByEmail(data.email)
    if(userWithEmailAlredyExist){
      throw new ConflictError("There is already a user registered with this email")
    }

    const saltRounds = 10; 
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const { password, ...userWithoutPassword } = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      phone: data.phone
    });

    await this.userCompanyRepository.create({
      companyId: data.companyId,
      userId: userWithoutPassword.id
    })
  
    return {user: userWithoutPassword}
  }
}
