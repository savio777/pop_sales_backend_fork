import { FastifyRequest } from 'fastify';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

type UploadedFile = {
  filename: string;
  filepath: string;
  mimetype: string;
};

export async function uploadImagens(req: FastifyRequest): Promise<UploadedFile[]> {
  const files: UploadedFile[] = [];
  const uploadDir = path.resolve('public/images');
  await fs.mkdir(uploadDir, { recursive: true });

  const parts = req.parts();

  for await (const part of parts) {
    if (!part.file || !part.mimetype.startsWith('image/')) {
      continue; // ignora se não for imagem
    }

    const ext = path.extname(part.filename || '.png');
    const data = new Date().toISOString().split('T')[0];
    const filename = `${randomUUID()}_${data}${ext}`;
    const filepath = path.join(uploadDir, filename);

    const buffer = await part.toBuffer();
    await fs.writeFile(filepath, buffer);

    files.push({
      filename,
      filepath,
      mimetype: part.mimetype,
    });
  }

  return files;
}
