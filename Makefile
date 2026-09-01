.PHONY: help install build build-agent setup link all test clean status copilot

help: ## Exibe os comandos disponíveis
	@echo "Caveman Code — Comandos Makefile disponíveis:"
	@echo "  make all          - Instala dependências, compila, configura ~/.cave e cria link global"
	@echo "  make install      - Executa npm install"
	@echo "  make build        - Compila os pacotes do projeto"
	@echo "  make build-agent  - Compila especificamente o pacote coding-agent"
	@echo "  make setup        - Inicializa o diretório ~/.cave a partir dos templates"
	@echo "  make link         - Cria o link global para os comandos 'caveman' e 'cave'"
	@echo "  make status       - Exibe o status de autenticação (caveman login --list)"
	@echo "  make copilot      - Inicia o Caveman no modo restrito ao GitHub Copilot"
	@echo "  make test         - Executa os testes"
	@echo "  make clean        - Limpa os diretórios de build"

all: install build setup link ## Executa o fluxo completo de setup

install:
	npm install

build:
	npm run build

build-agent:
	npm --prefix packages/coding-agent run build

setup:
	node scripts/setup-cave.mjs

link:
	npm link --workspace=@juliusbrussee/caveman-code

status:
	caveman login --list

copilot:
	caveman --copilot-only

test:
	npm test

clean:
	npm run clean
