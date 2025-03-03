# Use Node 22.14.0 como base
FROM node:22.14.0

# Definir diretório de trabalho
WORKDIR /app

# Copiar as dependências do package.json
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo o código-fonte
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "run", "dev"]
