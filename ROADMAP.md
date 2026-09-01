# Caveman Code — Roadmap & TODOs

Lista de melhorias planejadas e tarefas futuras para o projeto:

## 1. Modos de Isolamento por Provedor (--<provider>-only)
- [ ] Generalizar o suporte para flags de isolamento por provedor, estendendo o conceito do --copilot-only:
  - --grok-only: limita a sessão estritamente aos modelos xAI Grok (grok/*).
  - --anthropic-only: limita a sessão apenas aos modelos Anthropic Claude (nthropic/*).
  - --commandcode-only: limita a sessão apenas ao catálogo do Command Code (commandcode/*).
  - Flag genérica --only <provider> (ex: caveman --only grok ou caveman --only nvidia).

## 2. Model Selector & Gerenciamento de Modelos
- [ ] Adicionar atalho de teclado para alternar rapidamente entre provedores dentro do /models.
- [ ] Persistência de filtros favoritos por projeto (em .cave/settings.json local).
- [ ] Exibição de latência e saúde de API em tempo real no detalhe do modelo selecionado.

## 3. Integração Avançada com RTK
- [ ] Adicionar suporte a telemetria de tokens economizados via RTK em cada rodada de comandos bash.
- [ ] Auto-instalação interativa do tk via caveman doctor caso não esteja presente no sistema.

---
