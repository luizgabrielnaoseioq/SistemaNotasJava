# SistemaNotasJava

SistemaNotasJava é uma aplicação web para gerenciamento de notas, composta por um backend em Java Spring Boot e um frontend em React (pasta `frontnotas`). O sistema permite criar, listar, editar e excluir notas.

## Tecnologias Utilizadas

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Hibernate, MySQL
- **Frontend:** React (ver instruções na pasta `frontnotas`)
- **Banco de Dados:** MySQL

## Pré-requisitos

- Java 21+
- Maven 3.8+
- MySQL 5.7+ ou 8+
- Node.js 14+ e npm (para o frontend)

## Configuração do Banco de Dados

1. Crie um banco de dados chamado `notasdb` no MySQL:
   ```sql
   CREATE DATABASE notasdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Ajuste o usuário e senha do banco no arquivo `src/main/resources/application.properties` se necessário.

## Como Rodar o Backend

1. Clone o repositório e navegue até a raiz do projeto.
2. Instale as dependências e compile:
   ```bash
   mvn clean install
   ```
3. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```
   O backend estará disponível em `http://localhost:8080`.

## Como Rodar o Frontend

Siga as instruções detalhadas no arquivo [`frontnotas/README.md`](frontnotas/README.md):

1. Navegue até a pasta do frontend:
   ```bash
   cd frontnotas
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   O frontend estará disponível em `http://localhost:3000`.

## Endpoints Principais da API

- `GET /api/notas` — Lista todas as notas
- `GET /api/notas/{id}` — Busca nota por ID
- `POST /api/notas` — Cria uma nova nota
- `PUT /api/notas/{id}` — Atualiza uma nota existente
- `DELETE /api/notas/{id}` — Remove uma nota

## Observações

- O CORS está habilitado para `http://localhost:5173` (ajuste se necessário).
- O banco de dados é atualizado automaticamente pelo Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

---

Sinta-se à vontade para contribuir ou abrir issues!
