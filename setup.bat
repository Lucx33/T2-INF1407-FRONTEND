@echo off
echo ========================================
echo   Fantasy Game - Setup Automatico
echo ========================================
echo.

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo X Docker nao esta instalado!
    echo Por favor, instale o Docker: https://www.docker.com/get-started
    pause
    exit /b 1
)

echo OK Docker encontrado
docker --version

REM Verificar se Docker Compose está instalado
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo X Docker Compose nao esta instalado!
    pause
    exit /b 1
)

echo OK Docker Compose encontrado
docker-compose --version
echo.

REM Verificar se Docker está rodando
docker info >nul 2>&1
if errorlevel 1 (
    echo X Docker nao esta rodando!
    echo Por favor, inicie o Docker Desktop
    pause
    exit /b 1
)

echo OK Docker esta rodando
echo.

echo Como deseja iniciar a aplicacao?
echo 1) Desenvolvimento (porta 5173)
echo 2) Producao (porta 3000)
echo.
set /p choice="Escolha (1 ou 2): "

echo.

if "%choice%"=="1" (
    echo Iniciando em modo DESENVOLVIMENTO...
    echo.
    docker-compose up dev
) else if "%choice%"=="2" (
    echo Iniciando em modo PRODUCAO...
    echo.
    docker-compose up prod
) else (
    echo X Opcao invalida!
    pause
    exit /b 1
)
