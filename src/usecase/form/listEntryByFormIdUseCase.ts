import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

export class ListEntryByFormIdUseCase {
  constructor(
    private readonly formRepository: FormRepository
  ) {}

  async execute(formId: string) {
    const result = await this.formRepository.listEntryByFormId(formId);
    if(!result) {
      throw new NotFoundError("Formulário não encontrado");
    }
    
    // // const entries = [];
		// const formEntries = result.formEntries.map(e => (
		// 	{
		// 		userId: e.userId,
		// 		question: e.formTemplate.question.map(a => ({ //aqui
		// 			id: a.questionId,
		// 			text: a.text,
		// 			imageUrl: a.imageUrl
		// 		})),
		// 		answer: e.answers.map(a => ({
		// 			id: a.id,
		// 			text: a.text,
		// 			imageUrl: a.imageUrl
		// 		})),
		// 	}
		// ))

    // const entries = {
    //   id: result.id,
    //   companyId: result.companyId,
		// 	formType: result.formType,
		// 	createdAt: result.createdAt,
    //   formEntries
    // }
    
    
    return {entries: result};
  }
}


/*
{
	"id": "8237bcc3-fcf6-4800-b013-bc7135565ff8",
	"createdAt": "2025-04-14T16:53:37.822Z",
	"formType": "DELIVERER",
	"companyId": "238aee3e-c857-4620-95ba-3f38a7a5a234",
	"formEntries": [
		{
			"id": "92cf5748-6d33-44ed-81e2-cef231d89187",
			"createdAt": "2025-04-14T16:54:45.043Z",
			"taskId": null,
			"userId": "3bcc0d17-e9d8-4c6e-89e8-30377aa4c181",
			"formTemplateId": "8237bcc3-fcf6-4800-b013-bc7135565ff8",
			"companyId": "238aee3e-c857-4620-95ba-3f38a7a5a234",
			"answers": [
				{
					"id": "8d70dbff-25d3-4f11-a421-13b85a1336cd",
					"text": "teste resposta 2",
					"imageUrl": "",
					"createdAt": "2025-04-14T16:54:45.043Z",
					"questionId": "479b99ec-6669-431b-9059-828c5866c5b1",
					"formEntryId": "92cf5748-6d33-44ed-81e2-cef231d89187"
				}
			],
			"formTemplate": {
				"id": "8237bcc3-fcf6-4800-b013-bc7135565ff8",
				"createdAt": "2025-04-14T16:53:37.822Z",
				"formType": "DELIVERER",
				"companyId": "238aee3e-c857-4620-95ba-3f38a7a5a234",
				"questions": [
					{
						"id": "dceefb33-12e4-4bfe-8e5a-22001d2c6e7c",
						"text": "teste",
						"required": true,
						"type": "YES_NO",
						"formTemplateId": "8237bcc3-fcf6-4800-b013-bc7135565ff8"
					}
				]
			}
		},
		{
			"id": "2941b1a5-e5a9-44ba-afb0-c3ef50f183a9",
			"createdAt": "2025-04-14T16:54:54.386Z",
			"taskId": null,
			"userId": "3bcc0d17-e9d8-4c6e-89e8-30377aa4c181",
			"formTemplateId": "8237bcc3-fcf6-4800-b013-bc7135565ff8",
			"companyId": "238aee3e-c857-4620-95ba-3f38a7a5a234",
			"answers": [
				{
					"id": "7190ac25-297e-4823-80bc-770647864253",
					"text": "teste resposta 1",
					"imageUrl": "",
					"createdAt": "2025-04-14T16:54:54.386Z",
					"questionId": "479b99ec-6669-431b-9059-828c5866c5b1",
					"formEntryId": "2941b1a5-e5a9-44ba-afb0-c3ef50f183a9"
				}
			],
			"formTemplate": {
				"id": "8237bcc3-fcf6-4800-b013-bc7135565ff8",
				"createdAt": "2025-04-14T16:53:37.822Z",
				"formType": "DELIVERER",
				"companyId": "238aee3e-c857-4620-95ba-3f38a7a5a234",
				"questions": [
					{
						"id": "dceefb33-12e4-4bfe-8e5a-22001d2c6e7c",
						"text": "teste",
						"required": true,
						"type": "YES_NO",
						"formTemplateId": "8237bcc3-fcf6-4800-b013-bc7135565ff8"
					}
				]
			}
		}
	]
}
*/