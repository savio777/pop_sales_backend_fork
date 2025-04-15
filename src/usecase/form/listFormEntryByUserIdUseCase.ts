import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListFormEntryByUserIdUseCase {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(userId: string){
    const user = await this.userRepository.getById(userId);
    if(!user){
      throw new NotFoundError("Usuário não encontrado")
    }

    const result = await this.formRepository.listByUserId(userId);

    const entries = result.map(entry => ({
      id: entry.id,
      createdAt: entry.createdAt,
      userId: entry.userId,
      taskId: entry.taskId,
      companyId: entry.companyId,
      questions: entry.formTemplate.questions.map(question => ({
        id: question.id,
				text: question.text,
				required: question.required,
				type: question.type
      })),
      answers: entry.answers.map(answer => ({
        id: answer.id,
        text: answer.text,
        imageUrl: answer.imageUrl,
        questionId: answer.questionId
      })),

    }))

    return {entries}
  }
}