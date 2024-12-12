FROM node:22.8.0-slim

# Use o usuário root temporariamente
USER root

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia os arquivos e ajusta permissões
COPY . .
RUN chown -R node:node /home/node/app

# Instala dependências do sistema operacional e do Node.js
RUN apt update && \
    apt install -y --no-install-recommends \
    openssl \
    procps && \
    npm install && \
    npm install -g @nestjs/cli@10.4.9 && \
    npx prisma generate && \
    npm cache clean --force && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Altere de volta para o usuário node


# Exponha a porta 3000 para a aplicação
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
