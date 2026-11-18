# API REST com Node.js e MySQL

- **Aluno:** SEU NOME AQUI
- **Turma:** SUA TURMA AQUI
- **Disciplina:** Programação Web III (PW3)

API REST com Express e MySQL (driver `mysql2`, sem ORM), usando queries parametrizadas contra SQL Injection.

## Pré-requisitos
- Node.js 18+
- MySQL em execução

## Instalação
1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/SEU-USUARIO/nome-do-aluno-API-node-com-sql.git
   cd nome-do-aluno-API-node-com-sql
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o banco e a tabela executando o script:
   ```bash
   mysql -u root -p < schema.sql
   ```
4. Copie `.env.example` para `.env` e preencha com suas credenciais:
   ```bash
   cp .env.example .env
   ```
   Use `DB_NAME=api_usuarios`.
5. Inicie o servidor:
   ```bash
   npm start
   ```

## Rotas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/usuarios` | Cria usuário (`{ "nome": "...", "email": "..." }`) |
| GET | `/usuarios` | Lista todos os usuários |
| PUT | `/usuarios/:id` | Atualiza nome e email do usuário |
| DELETE | `/usuarios/:id` | Remove o usuário |

Códigos HTTP: 200, 201, 400, 404 e 500.

## Exemplo
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos","email":"carlos@email.com"}'
```
