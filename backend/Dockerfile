# Use uma imagem base com Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Instale o Nest.js CLI globalmente
RUN npm install -g @nestjs/cli

# Crie um projeto vazio (se o código ainda não existir)
RUN nest new backend --skip-install --package-manager npm --directory .

# Copie os arquivos necessários (se houverem arquivos locais)
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta padrão do Nest.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
