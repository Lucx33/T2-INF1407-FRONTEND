#!/bin/bash

echo "========================================"
echo "  Fantasy Game - Setup Automático"
echo "========================================"
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Por favor, instale o Docker: https://www.docker.com/get-started"
    exit 1
fi

echo "✅ Docker encontrado: $(docker --version)"

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado!"
    echo "Por favor, instale o Docker Compose"
    exit 1
fi

echo "✅ Docker Compose encontrado: $(docker-compose --version)"
echo ""

# Verificar se Docker está rodando
if ! docker info &> /dev/null; then
    echo "❌ Docker não está rodando!"
    echo "Por favor, inicie o Docker Desktop"
    exit 1
fi

echo "✅ Docker está rodando"
echo ""

# Perguntar qual modo iniciar
echo "Como deseja iniciar a aplicação?"
echo "1) Desenvolvimento (porta 5173)"
echo "2) Produção (porta 3000)"
echo -n "Escolha (1 ou 2): "
read choice

echo ""

case $choice in
    1)
        echo "🚀 Iniciando em modo DESENVOLVIMENTO..."
        echo ""
        docker-compose up dev
        ;;
    2)
        echo "🚀 Iniciando em modo PRODUÇÃO..."
        echo ""
        docker-compose up prod
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac
