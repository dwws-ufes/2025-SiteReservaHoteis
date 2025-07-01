# Guia de Implantação

Este documento descreve como configurar o banco de dados usando Docker e executar a aplicação web localmente, composta por:

- *Backend*: .NET (ASP.NET Core)
- *Banco de Dados*: PostgreSQL (via Docker)
- *Frontend*: Angular

---

## 1. Pré-requisitos

Antes de iniciar, verifique se você possui instalado em sua máquina de desenvolvimento:

- *.NET SDK 9.0*
- *Node.js 18.x* (ou superior) e *Angular CLI*
- *Docker*
- *Docker Compose* (opcional, mas recomendado)

---

## 2. Configuração do PostgreSQL com Docker

Em vez de instalar o PostgreSQL localmente, vamos usar um container Docker:

1. Crie um diretório para persistência de dados e um arquivo docker-compose.yml mínimo:

   yaml
   version: '3.8'
   services:
     db:
       image: postgres:14
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: 1234
         POSTGRES_DB: reservaHotel
       volumes:
         - db_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"

   volumes:
     db_data:
   

2. Suba o container:

   bash
   

docker-compose up -d

`

3. Verifique se o banco está acessível:
bash
psql "Host=localhost;Port=5432;Database=reservaHotel;Username=postgres;Password=1234" -c "SELECT version();"
`

---

## 3. Execução da Aplicação Localmente

### 3.1. Backend (.NET)

1. Clone o repositório e acesse a pasta do backend:
   bash
   

git clone [https://github.com/usuario/minha-app.git](https://github.com/usuario/minha-app.git) cd minha-app/Backend

`

2. Configure a connection string em appsettings.Development.json (ou via variável de ambiente) para apontar ao container Docker:
json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=reservaHotel;Username=postgres;Password=1234"
  }
}
`

3. Execute a aplicação em modo de desenvolvimento:
   bash
   

dotnet run

`

O backend ficará disponível em `https://localhost:7099` (ou `http://localhost:5058`).

### 3.2. Frontend (Angular)

1. No terminal, vá para a pasta do cliente:
bash
cd ../ClientApp
`

2. Instale as dependências e inicie o servidor de desenvolvimento:
   bash
   

npm install ng serve --open

`

O Angular CLI abrirá o navegador em http://localhost:4201.

---

## 4. Limpeza

Para parar e remover o container do PostgreSQL:
bash
docker-compose down
`

Se quiser apagar os dados persistidos:

bash
docker volume rm <nome_do_projeto>_db_data


---

Guia gerado em 01/07/2025
