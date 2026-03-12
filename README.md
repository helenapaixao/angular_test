# Angular Demo App

Projeto de demonstração Angular com 3 páginas, routing, componentes reutilizáveis e integração com API REST.

## Funcionalidades

- **3 Páginas**: Home, Utilizadores e Sobre
- **Routing**: Navegação com `RouterLink`, `RouterLinkActive` e wildcard redirect
- **Navbar**: Fixa no topo com menu mobile responsivo
- **Footer**: Com links de navegação e créditos
- **Chamadas API**: Integração com [JSONPlaceholder](https://jsonplaceholder.typicode.com) via `HttpClient`
- **Standalone Components**: Sem NgModules — abordagem moderna Angular 18+
- **TypeScript Interfaces**: Modelos `User` e `Post` com tipagem forte
- **Control Flow**: Nova sintaxe `@if`, `@for`, `@else` do Angular 17+

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── navbar/         # Barra de navegação
│   │   └── footer/         # Rodapé
│   ├── pages/              # Páginas da aplicação
│   │   ├── home/           # Homepage com posts recentes
│   │   ├── users/          # Lista de utilizadores (API)
│   │   └── about/          # Documentação do projeto
│   ├── services/           # Serviços (lógica de dados)
│   │   └── user.service.ts # Chamadas HTTP à API
│   ├── models/             # Interfaces TypeScript
│   │   └── user.model.ts   # User e Post
│   ├── app.component.ts    # Componente raiz
│   ├── app.config.ts       # Configuração (providers)
│   └── app.routes.ts       # Definição de rotas
├── environments/           # Configuração por ambiente
├── styles.css              # Estilos globais
├── index.html              # HTML de entrada
└── main.ts                 # Bootstrap da aplicação
```

## Endpoints API Utilizados

| Método | Endpoint                       | Descrição                          |
|--------|--------------------------------|------------------------------------|
| GET    | `/users`                       | Lista de todos os utilizadores     |
| GET    | `/users/{id}`                  | Detalhes de um utilizador          |
| GET    | `/posts?userId={id}`           | Posts de um utilizador específico   |
| GET    | `/posts?_limit=6`              | Primeiros 6 posts (homepage)       |

## Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
ng serve

# 3. Abrir no browser
# http://localhost:4200
```

## Tecnologias

- Angular 18
- TypeScript 5.5
- RxJS 7.8
- CSS3 (variáveis custom, grid, flexbox, animações)

## Conceitos Demonstrados

1. **Standalone Components** — Cada componente declara as suas dependências
2. **Routing** — `provideRouter()`, `RouterLink`, `RouterLinkActive`
3. **Serviços com DI** — `UserService` injetado via `providedIn: 'root'`
4. **HttpClient** — Chamadas GET com Observables e tratamento de erros
5. **Interfaces TypeScript** — Type safety nos dados da API
6. **Control Flow** — `@if`, `@for` em vez de `*ngIf`, `*ngFor`
7. **Componentes reutilizáveis** — Navbar e Footer partilhados entre páginas
8. **Design responsivo** — Layout adaptável a mobile e desktop
