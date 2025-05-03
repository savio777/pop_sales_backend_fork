import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateFormEntryUseCase } from "@/usecase/form/createFormEntryUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { uploadFile } from "@/utils/uploadFile";
import { updateImageInJSON } from "@/utils/updateImageInJSON";

export class CreateFormEntryController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const filePath = path.resolve("public", "images");
    const data = await uploadFile({ req, res, filePath });
    
    const createFormEntryRequestBody = z.object({
      companyId: z.string().uuid(),
      formId: z.string().uuid(),
      taskId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      answers: z.array(
        z.object({
          questionId: z.string().uuid(),
          text: z.string(),
          imageUrl: z.string().optional(),
        })
      )
    })

    const dataJson =  updateImageInJSON(data);

    const { companyId, formId, userId, answers, taskId } = createFormEntryRequestBody.parse(dataJson)

    const formRepository = new PrismaFormRepository()
    const companyRepository = new PrismaCompanyRepository()
    const userRepository = new PrismaUserRepository()

    const createFormEntry = new CreateFormEntryUseCase(
      formRepository,
      companyRepository,
      userRepository
    );

    try{ //se a requisição falhar remove os arquivos salvos
      const formEntry = await createFormEntry.execute({
        userId, answers, companyId, formId, taskId
      })
      return res.status(201).send(formEntry)
    }catch(err){
      for (let file of data.files){
        fs.unlink(path.resolve("public", "images", file), (err) => {
          if (err) {
            console.error('Erro ao excluir o arquivo:', err);
            return;
          }
          console.log('Arquivo excluído com sucesso!');
        });
      }
      return err
    }
  }
}