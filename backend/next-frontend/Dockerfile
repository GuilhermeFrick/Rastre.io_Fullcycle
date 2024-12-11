FROM node:22.8.0-slim

# Use o usuário root temporariamente para instalar pacotes do sistema
USER root

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia os arquivos de dependência para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Altere de volta para o usuário node
USER node

# Exponha a porta 5000 para a aplicação
EXPOSE 5000

# Comando para rodar o servidor Next.js na porta 5000
CMD ["npm", "run", "dev", "--", "--port", "5000"]
