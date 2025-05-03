interface Data {
  files: string[];
  json: {
    formId: string;
    companyId: string;
    userId: string;
    answers: Answer[];
  };
}

interface Answer {
  questionId: string;
  text: string;
  imageUrl: string;
}

export function updateImageInJSON(data: Data): { formId: string; companyId: string; userId: string; answers: Answer[] } {
  if (data.files && data.files.length > 0 && data.json && data.json.answers && data.json.answers.length > 0) {
    data.json.answers[0].imageUrl = data.files[0];
  }
  return data.json;
}