import { NotFoundError } from "@/error/notfound.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { env } from "@/lib/env";
import { UserRepository } from "@/repository/userRepository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

interface SignInInputs {
  email: string,
  password: string
}

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: SignInInputs) {
    const user = await this.userRepository.getByEmail(data.email)
    if(!user){
      throw new NotFoundError("user not found with e-mail")
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("e-mail or password are not correct")
    }

    const payload = {
      userId: user.id
    }

    const signOptions = {
      expiresIn: 60 * 60 * 24 * 7 // 7 days
    }

    const token = jwt.sign(
      payload,
      env.PRIVATE_KEY, 
      signOptions 
    );
    
    return {user, token}
  }
}
