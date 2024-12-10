1. Crie um dockerfile:

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




2. construa a imagem 

docker build -t nest-backend .

3. crie um projeto manualmente:

docker run -it --rm -v $(pwd):/usr/src/app nextjs-app sh

npx @nestjs/cli new nestjs-api


da um exit 


4. criando uam rede 

docker network create fullcycle-network

5. executando container nestJS na porta 3000

cd um cd na pasta nestjs-api 

e execute:

docker run -d \
  --name nestjs-app \
  --network fullcycle-network \
  -p 3000:3000 \
  -v $(pwd):/usr/src/app \
  -w /usr/src/app \
  nextjs-app npm run start:dev


6. verifique se está rodando:

curl http://localhost:3000

ou va no navegador e cole a url com o ip do host na porta 3000







