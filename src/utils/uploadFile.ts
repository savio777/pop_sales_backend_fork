import util from 'util'
import { pipeline } from 'stream'
import path from "path";
import fs from 'fs'
import { FastifyReply, FastifyRequest } from 'fastify';

export async function uploadFile(
  {req, res, filePath}:
  {req: FastifyRequest, res: FastifyReply, filePath: string}
) {
  const parts = req.parts();
  const pump = util.promisify(pipeline);

  const files = [];
  let formData;

  for await (const part of parts) {
    if (part.type === 'file') {
      const extension = path.extname(part.filename);
      const originalName = path.basename(part.filename, extension);
      const nameFile = `${originalName}_${Date.now()}${extension}`;
      await pump(part.file, fs.createWriteStream(path.resolve(filePath, nameFile)));
      files.push(nameFile);
    } else if (part.type === 'field' && part.fieldname === 'json') {
      try {
        formData = typeof part.value === 'string' 
          ? JSON.parse(part.value)
          : part.value;
      } catch (error) {
        throw new Error('Invalid JSON data provided');
      }
    }
  }

  return { files, json: formData };
}