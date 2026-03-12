# CatGallery — Angular Test App

Aplicação Angular que consome a **The Cat API** para mostrar uma galeria de gatos com filtro por raça, utilizando componentes standalone e a sintaxe moderna de control flow (`@if`, `@for`).

## Funcionalidades

- **3 páginas**: Home, Gatos e Sobre
- **Home**: hero com call‑to‑action e cartão de gato em destaque, com refresh de imagem
- **Página Gatos**: seleção de raça, carregamento de imagem e detalhes da raça (origem, descrição, temperamento, esperança de vida)
- **Página Sobre**: explicação da arquitetura, tecnologias e endpoints usados
- **Navbar fixa**: com menu responsivo (desktop/mobile)
- **Footer**: com navegação rápida e créditos
- **Integração com API externa**: consumo da [The Cat API](https://thecatapi.com/) via `HttpClient`
- **Standalone Components**: app sem NgModules, usando componentes standalone (Angular 18+)

## Estrutura do Projeto

```text
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   └── footer/
│   ├── pages/
│   │   ├── home/
│   │   ├── cats/
│   │   └── about/
│   ├── services/
│   │   └── cat.service.ts
│   ├── models/
│   │   └── cat.model.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.css
├── index.html
└── main.ts
```

## API — The Cat API

Principais endpoints utilizados pelo `CatService`:

| Método | Endpoint / Exemplo                                     | Descrição                                                                 |
|--------|--------------------------------------------------------|---------------------------------------------------------------------------|
| GET    | `/images/search?limit=6&has_breeds=1`                  | Lista imagens de gatos com informação de raça (preview na Home)          |
| GET    | `/images/search?limit=1&has_breeds=1&breed_ids={id}`   | Busca imagem de gato filtrada por raça selecionada na página de Gatos    |
| GET    | `/breeds`                                             | Lista todas as raças com nome, descrição, temperamento, origem, life span |

## Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm start
# ou
ng serve

# 3. Abrir no browser
# http://localhost:4200
```

## Tecnologias

- **Angular 18** (`@angular/* 18.x`)
- **TypeScript 5.5**
- **RxJS 7.8**
- **HttpClient** para chamadas HTTP
- **CSS3** com variáveis custom, grid, flexbox e animações

## Conceitos Demonstrados

1. **Standalone Components** — `HomeComponent`, `CatsComponent`, `AboutComponent`, `NavbarComponent`, `FooterComponent`
2. **Routing** — `app.routes.ts` com navegação entre Home, Gatos e Sobre
3. **Serviço com DI** — `CatService` injetado via `providedIn: 'root'`
4. **HttpClient + Observables** — consumo da The Cat API com tratamento de loading, erro e cache simples no preview
5. **Interfaces TypeScript** — `CatImage` e `CatBreed` para tipar respostas da API
6. **Control Flow Angular 17+** — uso de `@if` e `@for` em vez de `*ngIf`/`*ngFor`
7. **Design responsivo** — layout adaptável com navbar fixa e componentes estilizados em `styles.css`
