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

#Ciracao de rotas

-/places - Capturar place id de um lugar no Google maps
-/directions -Traçar trajeto entre 2 lugares
-/routes - Pegar rotas cadastradas iu cadastrar novas rotas

9. criar modulos no container:

sudo docker exec -it nestjs-app sh

##Estudo:

A estrutura de chamadas que você está utilizando no NestJS organiza o fluxo de execução da sua aplicação, seguindo o padrão MVC (Model-View-Controller) combinado com Inversão de Controle (IoC) e Injeção de Dependência (DI). Vamos explorar como cada parte funciona e como ela contribui para o fluxo geral:

1. Controller: O Ponto de Entrada
   O controller é responsável por lidar com as requisições HTTP que chegam à aplicação. Ele recebe os dados do cliente e delega a lógica de negócios para o serviço correspondente.

Função do Controller:
O endpoint /places é definido no controlador com o método @Get().
Ele recebe o parâmetro text da query string, que representa o texto a ser pesquisado no Google Maps.
O controller invoca o método findPlaces no service (PlacesService) e retorna sua resposta diretamente.

2. Service: A Lógica de Negócios
   O service encapsula a lógica de negócios e interage com recursos externos, como APIs de terceiros, bancos de dados ou outros serviços.

Função do Service:
Ele é decorado com @Injectable(), tornando-o elegível para ser injetado em outros componentes via injeção de dependência.
A lógica de busca pelo Google Maps é encapsulada no método findPlaces.
Ele utiliza o cliente GoogleMapsClient para fazer a chamada à API do Google Maps, garantindo que o controlador não tenha que lidar com detalhes de implementação.

3. Módulo: Organização e Configuração
   O módulo (MapsModule) organiza os controladores e serviços em um contexto lógico e configura os provedores necessários, como o GoogleMapsClient.

Função do Módulo:
Declara o PlacesController e o PlacesService.
Configura o GoogleMapsClient como um provedor, permitindo que ele seja injetado no PlacesService.
Agrupa componentes logicamente relacionados (ex.: busca de lugares).

4. Fluxo Completo de Chamadas
   Quando o Cliente Faz uma Requisição:
   Rota Registrada no Controller:

O cliente faz uma chamada HTTP para GET /places?text=New York.
O NestJS direciona a requisição para o método findPlaces no PlacesController.
Controller Invoca o Service:

O controller recebe o parâmetro text (New York neste caso) e chama o método findPlaces do PlacesService.
Service Executa a Lógica de Negócios:

O service usa o cliente GoogleMapsClient (injetado via DI) para fazer a chamada à API do Google Maps, enviando o texto como entrada.
Service Retorna o Resultado:

O service processa a resposta da API e a retorna ao controller.
Controller Retorna a Resposta HTTP:

O controller envia a resposta do service diretamente para o cliente que fez a requisição.

Por Que Essa Estrutura É Boa?
Separação de Responsabilidades:

O controller lida apenas com o roteamento e entrada/saída de dados.
O service é responsável pela lógica de negócios.
O módulo organiza e configura os componentes necessários.
Reutilização e Testabilidade:

O service pode ser reutilizado em outros controladores ou módulos.
A injeção de dependência permite que o service seja mockado para testes unitários.
Facilidade de Manutenção:

Componentes bem definidos tornam o código mais fácil de entender, estender e depurar.
Escalabilidade:

A organização modular facilita a adição de novos recursos sem impactar outras partes da aplicação.
