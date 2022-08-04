# Teste Veiculos
---

API feita com NodeJs + Typescript (NestJS), banco de dados MongoDb

> ## Instalação
* É preciso ter instalado nodejs 16 (LTS Version)
* Extraia o zip e execute npm install dentro do projeto
* O projeto sera executado em localhost:3000
* O swagger está em localhost:3000/doc
* Para rodar em produção execute npm run build e depois execute npm run start:prod
* Para rodar em desenvolvimento npm run start:dev
* Para rodar os testes npm run test
* cobertura de teste npm run test:cov

> ## Observações
Evitado usar dotenv para poder usar as url do mongo que criei
Ao autenticar é gerado um token, para acessar as rotas privadas é necessario colocar no header: x-access-token o token recebido 

> ## Faltou fazer
* Refatorar Middleware para autenticação
* Finalizar testes unitários

> ## Princípios
* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)

> ## Design Patterns
* Factory
* Adapter

> ## Metodologias e Designs
* Clean Architecture
* Conventional Commits

> ## Features de Testes
* Testes Unitários
* Cobertura de Testes
