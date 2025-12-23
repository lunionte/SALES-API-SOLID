# SALES-API-SOLID

Uma API de vendas construída com princípios **SOLID**, TypeScript e TypeORM, seguindo as melhores práticas de arquitetura limpa.

## 🎯 Características

-   ✅ **Arquitetura em Camadas**: Separação clara entre domain, infra e modules
-   ✅ **Princípios SOLID**: Código desacoplado e testável
-   ✅ **TypeORM**: ORM robusto para gerenciamento de banco de dados
-   ✅ **Validação com Zod**: Validação de variáveis de ambiente e dados
-   ✅ **Testes Unitários**: Jest com cobertura de testes
-   ✅ **Error Handling**: Tratamento centralizado de erros com `AppError`
-   ✅ **In-Memory Repository**: Implementação abstrata reutilizável
-   ✅ **Docker**: Ambiente de desenvolvimento containerizado
-   ✅ **Swagger**: Documentação da API integrada

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Linguagem**: TypeScript
-   **Framework**: Express.js
-   **Banco de Dados**: PostgreSQL
-   **ORM**: TypeORM
-   **Testes**: Jest
-   **Validação**: Zod
-   **Containerização**: Docker & Docker Compose

## 📦 Pré-requisitos

-   Node.js 18+
-   Docker & Docker Compose
-   npm ou yarn

## 🚀 Como Começar

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd SALES-API-SOLID
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Atualize o arquivo `.env` conforme necessário:

```env
NODE_ENV=development
PORT=3000

DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres
DB_TYPE=postgres
DB_HOST=localhost
DB_SCHEMA=public
DB_PORT=5432
```

### 4. Iniciar o banco de dados

```bash
docker-compose up -d
```

### 5. Executar migrações

```bash
npm run typeorm migration:run
```

### 6. Iniciar o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor com hot-reload

# Testes
npm test                    # Executa todos os testes

# Banco de Dados
npm run typeorm             # CLI do TypeORM
```

## 📂 Estrutura do Projeto

```
src/
├── main.ts
├── shared/
│   ├── domain/
│   │   ├── errors/           # Erros customizados
│   │   │   ├── app.error.ts
│   │   │   └── not-found.error.ts
│   │   └── repositories/     # Interfaces e classes abstratas
│   │       ├── IRepository.ts
│   │       └── in-memory.repository.ts
│   ├── infra/
│   │   ├── env/              # Configuração de variáveis
│   │   ├── http/             # Configuração Express
│   │   │   ├── app.ts
│   │   │   ├── routes.ts
│   │   │   ├── server.ts
│   │   │   └── middlewares/
│   │   └── typeorm/          # Configuração do banco
│   │       ├── index.ts
│   │       └── migrations/
│   └── modules/
│       └── products/         # Módulo de produtos
│           ├── infra/
│           ├── models/
│           └── services/
└── ...
```

## 🏗️ Padrões Arquiteturais

### Domain-Driven Design (DDD)

A estrutura segue uma organização por domínio, separando responsabilidades:

-   **domain**: Lógica de negócio, erros e contratos
-   **infra**: Implementações técnicas (HTTP, banco de dados)
-   **modules**: Módulos de features isolados

### Repository Pattern

A classe `InMemoryRepository` fornece uma implementação abstrata e reutilizável com suporte a:

-   CRUD básico (Create, Read, Update, Delete)
-   Busca com filtros, ordenação e paginação
-   Métodos abstratos para customização

### Error Handling

Erros centralizados através da classe `AppError`:

```typescript
// Erro customizado
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(404, message);
    }
}

// Middleware centralizado
app.use(errorHandler);
```

## ✅ Testes

O projeto inclui testes unitários abrangentes com Jest:

```bash
npm test
```

Exemplo de teste:

```typescript
it("should create a new model", () => {
    const result = sut.create(props);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
});
```

## 📚 Documentação da API

A documentação Swagger está disponível em:

```
http://localhost:3000/api/documentation
```

## 🔐 Variáveis de Ambiente

| Variável    | Descrição                                |
| ----------- | ---------------------------------------- |
| `NODE_ENV`  | Ambiente (development, production, test) |
| `PORT`      | Porta do servidor                        |
| `DB_TYPE`   | Tipo de banco (postgres, mongodb)        |
| `DB_USER`   | Usuário do banco                         |
| `DB_PASS`   | Senha do banco                           |
| `DB_NAME`   | Nome do banco                            |
| `DB_HOST`   | Host do banco                            |
| `DB_PORT`   | Porta do banco                           |
| `DB_SCHEMA` | Schema do banco                          |

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

[Seu Nome/Usuário]

---

**Próximos Passos**:

-   [ ] Implementar rotas de produtos
-   [ ] Adicionar autenticação JWT
-   [ ] Criar serviços de negócio
-   [ ] Adicionar mais testes de integração
-   [ ] Documentar endpoints no Swagger
