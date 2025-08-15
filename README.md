### Teddy Microfrontends

Este monorepo contém 3 microfrontends e uma biblioteca de design system compartilhado.

Estrutura sugerida:
- @teddy/design-system: biblioteca compartilhada (build-only)
- @teddy/container: aplicação shell (host)
- @teddy/customers: microfrontend de clientes
- @teddy/seleted: microfrontend adicional (porta 5002 em dev)

Pré-requisitos: Node 18+, pnpm 10.14.0+

### Infelizmente não tive tempo hábil suficiente pra configurar o docker e testes unitários

# Obs a vercel limita a quantidade de visitas a página no plano gratuito será possível abrir uma vez e depois será necessário que eu gere outro link

(video da aplicação rodando)[https://www.loom.com/share/f448e14a6a0b4b9582d55f780931f12a?sid=9ce7a7c5-9870-41ac-8188-ceff42ffae73]

(Link da aplicação rodando na vercel)[https://teddy-mfe-container.vercel.app/login]

## Começo Rápido:

1- pnpm install

2- pnpm build:all

3 - pnpm start

Desenvolvimento:
- pnpm run dev — inicia container, customers e seleted em paralelo (hot-reload)
- pnpm start — alias para dev

Build:
- pnpm run build:design-system — builda apenas o design system
- pnpm run build:container — builda design-system e depois container
- pnpm run build:customers — builda design-system e depois customers
- pnpm run build:seleted — builda design-system e depois seleted
- pnpm run build:all — builda design-system e depois container, customers e seleted em paralelo

Utilitários:
- pnpm run clean — limpa builds de todos os pacotes
- pnpm run install:all — reinstala dependências

Notas:
- @teddy/design-system não roda em dev, apenas build. Os outros três apps rodam em paralelo em dev.
