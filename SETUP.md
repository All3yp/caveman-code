# Caveman Code — Setup, Build & Configuration Guide

Guia completo para instalação, compilação e configuração do **Caveman Code** em ambientes **Windows**, **Linux** e **macOS**.

---

## 1. Pré-requisitos

Certifique-se de ter instalado:
- **Node.js**: versão >= 20.0.0 ([nodejs.org](https://nodejs.org))
- **npm**: versão >= 9.0.0
- **Git**: ([git-scm.com](https://git-scm.com))

---

## 2. Passo 1: Instalar o RTK (Recomendado)

O Caveman Code é otimizado para executar comandos de terminal via **RTK**, economizando até 90% dos tokens de contexto.

- **Windows (PowerShell)**:
  `powershell
  npm install -g @juliusbrussee/rtk
  `
- **Linux / macOS (Bash / Zsh)**:
  `ash
  npm install -g @juliusbrussee/rtk
  `
- **Verificar instalação**:
  `ash
  rtk --version
  `

---

## 3. Passo 2: Clonar, Compilar e Vincular

### No Windows (PowerShell):
`powershell
# 1. Clonar o repositório
git clone https://github.com/All3yp/caveman-code.git
cd caveman-code

# 2. Instalar dependências
npm install

# 3. Compilar todos os pacotes
npm run build

# 4. Vincular o binário globalmente (disponibiliza 'caveman' e 'cave')
npm link --workspace=@juliusbrussee/caveman-code

# 5. Testar
caveman --version
cave --version
`

### No Linux / macOS (Bash / Zsh):
`ash
# 1. Clonar o repositório
git clone https://github.com/All3yp/caveman-code.git
cd caveman-code

# 2. Instalar dependências
npm install

# 3. Compilar todos os pacotes
npm run build

# 4. Vincular o binário globalmente
npm link --workspace=@juliusbrussee/caveman-code
# Nota: se houver erro de permissão (EACCES), use: sudo npm link --workspace=@juliusbrussee/caveman-code

# 5. Testar
caveman --version
cave --version
`

---

## 4. Passo 3: Configurar o Diretório `.cave`

O Caveman Code armazena configurações e sessões em `~/.cave/`. Para inicializar o seu ambiente automaticamente em qualquer sistema operacional (Windows, Linux ou macOS):

```bash
npm run setup:cave
```

Esse comando:
1. Cria a pasta `~/.cave/agent` no diretório do seu usuário.
2. Copia os templates pré-configurados (`models.json`, `settings.example.json`, `auth.example.json`, `mcp.example.json`).
3. Cria o seu `~/.cave/.env` a partir do template (se já não existir, garantindo que nada seja sobrescrito).

Agora basta editar o arquivo `~/.cave/.env` adicionando as chaves dos provedores que deseja utilizar (ex: `CMD_API_KEY`, `NVIDIA_API_KEY`, etc.). O Caveman carrega automaticamente o arquivo `~/.cave/.env` na inicialização.

---

## 5. Passo 4: Autenticação e Provedores

Para verificar quais provedores estão configurados e ativos:

`ash
caveman login --list
`

### Login com GitHub Copilot:
`ash
caveman login --provider github-copilot
`
*O terminal exibirá a URL e o código de dispositivo. Acesse o navegador, autorize e o Caveman ativará automaticamente todos os 22 modelos suportados do Copilot.*

### Login com Outros Provedores:
`ash
# Anthropic Claude Pro/Max (OAuth via navegador)
caveman login --provider anthropic

# OpenAI Codex / ChatGPT
caveman login --provider openai-codex

# Provedores via Chave de API
caveman login --provider xai --api-key <sua-chave>
caveman login --provider commandcode --api-key <sua-chave>
`

---

## 6. Passo 5: Uso e Modos Especiais

### Modo Interativo Padrão:
`ash
caveman
# ou:
cave
`

### Modo Estritamente GitHub Copilot (--copilot-only ou --copilot):
Ideal para ambientes corporativos que exigem isolamento estrito:
`ash
caveman --copilot-only
# ou:
caveman --copilot
`
*Garante que apenas os modelos oficiais do GitHub Copilot sejam carregados para seleção e ciclo Ctrl+P, ignorando APIs de terceiros.*

### Comandos Úteis Dentro da Sessão:
- /models: abre o seletor inteligente de modelos com colunas alinhadas e filtros por nome, id, :free, :reasoning e :vision.
- /scoped-models: permite habilitar ou desabilitar modelos específicos para alternância via Ctrl+P.
- Ctrl+P: alterna rapidamente entre seus modelos favoritos ou scoped.

---

## 7. Solução de Problemas

- **Comando não encontrado após `npm link`**:
  Verifique se o diretório de binários globais do npm está no seu `PATH`:
  - Windows: `%APPDATA%\npm`
  - Linux / macOS: `/usr/local/bin` ou `~/.npm-global/bin`
- **Recompilar após alterações**:
  Se você fizer modificações no código-fonte, basta rodar `npm run build` na raiz do projeto.

---

## 8. Roadmap & Próximos Passos
Veja o arquivo [`ROADMAP.md`](./ROADMAP.md) para a lista de melhorias planejadas (incluindo generalização do isolamento para outros provedores como `--grok-only`, `--anthropic-only`, etc.).
