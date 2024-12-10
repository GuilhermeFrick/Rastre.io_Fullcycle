#preparando ambiente do linux

sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

#instalando docker

sudo apt install -y docker-ce docker-ce-cli containerd.io

Aqui está o passo a passo para instalar o Docker em uma distribuição Linux baseada em Debian, como Ubuntu:

1. Atualizar o sistema
Atualize os pacotes existentes no sistema:

sudo apt update
sudo apt upgrade -y

2. Instalar dependências
Instale pacotes necessários para adicionar repositórios:

sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

3. Adicionar a chave GPG do Docker
Adicione a chave GPG oficial do Docker:

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

4. Adicionar o repositório do Docker
Adicione o repositório do Docker à lista de fontes do sistema:

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


5. Atualizar novamente os pacotes
Atualize a lista de pacotes com o novo repositório:

sudo apt update

6. Instalar o Docker
Instale o Docker Engine, o Docker CLI e o containerd:

sudo apt install -y docker-ce docker-ce-cli containerd.io

7. Verificar a instalação
Confirme que o Docker foi instalado corretamente:

docker --version


8. Crie um repositorio git , clone e altere as permissoues para salvar (nome do meu Repo Rastre.io)

sudo chown -R ubuntu:ubuntu /home/ubuntu/Rastre.io

