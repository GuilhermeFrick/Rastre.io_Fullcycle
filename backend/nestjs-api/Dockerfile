FROM node:22.8.0-slim

# Use o usuário root temporariamente para instalar pacotes do sistema
USER root

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala dependências do sistema operacional e do Node.js
RUN apt update && \
    apt install -y --no-install-recommends \
    openssl \
    procps \
    && npm install && \
    npm install -g @nestjs/cli@10.4.9 && \
    npm cache clean --force && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Copia o restante do código da aplicação
COPY . .

# Altere de volta para o usuário node
USER node

# Exponha a porta 3000 para a aplicação
EXPOSE 3000

# Comando padrão para manter o container ativo
CMD ["tail", "-f", "/dev/null"]
