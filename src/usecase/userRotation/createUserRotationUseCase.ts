import { NotFoundError } from "@/error/notfound.error"
import { db } from "@/lib/prisma"

export class CreateUserRotationUseCase {
  async execute({rotationId, userId}:{userId: string, rotationId: string}) {
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado") 
    }

    const rotation = await db.rotation.findUnique({
      where: {
        id: rotationId
      }
    })

    if (!rotation) {
      throw new NotFoundError("Rota não encontrada")
    }

    const userRotation = await db.userRotation.create({
      data: {
        userId,
        rotationId
      }
    })
    return userRotation
  }
}