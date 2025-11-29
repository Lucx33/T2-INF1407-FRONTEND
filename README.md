# INF1407 — ProgWeb

https://t2-inf-1407-frontend.vercel.app/

Trabalho Final — NBA Fantasy Game

Bruno Wolf - 2212576

Luca Oliveira Lima - 2210831

## Escopo do Projeto
Este projeto foi desenvolvido para a disciplina **INF1407 — Programação Web**, com o objetivo de criar uma aplicação web moderna em **SvelteKit** para gerenciamento de times de basquete fantasy da NBA.

O sistema permite que usuários montem seus times, contratem jogadores, acompanhem estatísticas e compitam em rankings.

O foco foi explorar os principais recursos do SvelteKit, incluindo:
- Estruturação de **componentes reutilizáveis**
- Criação de **rotas** e **páginas**
- Gerenciamento de estado com **stores TypeScript**
- Interface responsiva e moderna
- Sistema de autenticação completo

## Integração com Backend

O backend da aplicação foi desenvolvido separadamente utilizando o framework Django (com Django REST Framework) e já está integrado ao frontend por meio de chamadas HTTP autenticadas via JWT (JSON Web Tokens).

A arquitetura adotada segue o padrão frontend SvelteKit + backend Django, garantindo separação de responsabilidades e fácil manutenção futura.

---

## Funcionalidades Implementadas
- **Autenticação completa** com login, registro, recuperação de senha e troca de senha
- **Dashboard** com visão geral de estatísticas e atividades recentes
- **Gerenciamento de elenco** com formação tática em quadra de basquete
- **Mercado de jogadores** com busca e filtros avançados para contratação
- **Sistema de ranking** com pódio dos melhores gerentes
- **Três formações táticas** disponíveis (Standard, Small Ball, Twin Towers)
- **Controle de teto salarial** para montagem do time
- **Interface responsiva** com tema escuro moderno
- **Componentes reutilizáveis** (PlayerCard, StatsCard, Formation)

---

## Manual do Usuário

1. **Página de Login**
   - Permite que o usuário faça login com email e senha.
   - Opções de login social disponíveis.
   - Link para recuperação de senha caso o usuário esqueça.

2. **Página de Registro**
   - Permite que novos usuários se cadastrem.
   - Durante o cadastro, o usuário cria o nome do seu time.

3. **Recuperação de Senha**
   - Usuário solicita redefinição de senha informando o email cadastrado.

4. **Home**
   - Página inicial com apresentação do jogo.
   - Explicação das principais funcionalidades.

5. **Dashboard**
   - Visão geral do desempenho do usuário.
   - Estatísticas do time.
   - Atividades recentes.

6. **My Roster (Meu Elenco)**
   - Visualização da formação do time em quadra de basquete.
   - Cinco posições: PG (Point Guard), SG (Shooting Guard), SF (Small Forward), PF (Power Forward), C (Center).
   - Possibilidade de alterar a formação tática.
   - Controle visual do teto salarial disponível.

7. **Player Market (Mercado)**
   - Listagem de todos os jogadores disponíveis.
   - Filtros por posição, time NBA e faixa salarial.
   - Sistema de busca por nome.
   - Contratação de jogadores respeitando o teto salarial.

8. **Leaderboard (Ranking)**
   - Classificação dos gerentes por pontuação.
   - Pódio visual destacando os três primeiros colocados.
   - Estatísticas dos melhores times.

9. **Troca de Senha**
   - Usuário autenticado pode alterar sua senha de forma segura.

---

## Como rodar com Docker

### Desenvolvimento

```bash
# Iniciar container de desenvolvimento
docker-compose up dev

# Ou em segundo plano
docker-compose up -d dev
```

A aplicação estará disponível em:
**http://localhost:5173**

O hot reload está ativo, mudanças no código serão refletidas automaticamente.

### Produção

```bash
# Iniciar container de produção
docker-compose up prod

# Ou em segundo plano
docker-compose up -d prod
```

A aplicação estará disponível em:
**http://localhost:3000**

### Comandos Úteis

```bash
# Parar os containers
docker-compose down

# Reconstruir containers (após mudanças no Dockerfile)
docker-compose up --build dev

# Ver logs
docker-compose logs -f dev

# Acessar shell do container
docker-compose exec dev sh
```

---

## Como rodar sem Docker

### Pré-requisitos
- Node.js 18 ou superior
- npm ou pnpm

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build de produção
npm run preview
```

A aplicação estará disponível em **http://localhost:5173**

---

## Estrutura do Projeto

```
src/
├── lib/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Formation.svelte
│   │   ├── PlayerCard.svelte
│   │   └── StatsCard.svelte
│   └── stores/          # Gerenciamento de estado (TypeScript)
│       ├── players.ts
│       ├── team.ts
│       └── user.ts
├── routes/              # Páginas da aplicação
│   ├── dashboard/
│   ├── leaderboard/
│   ├── market/
│   ├── my-team/
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── change-password/
│   └── +page.svelte (Home)
├── app.css             # Estilos globais
├── app.html            # Template HTML base
└── +layout.svelte      # Layout principal
```

---

## Tecnologias Utilizadas

- **SvelteKit** - Framework web moderno e performático
- **Svelte 5** - Biblioteca reativa para construção de interfaces
- **TypeScript** - Linguagem tipada para melhor experiência de desenvolvimento
- **Vite** - Ferramenta de build e servidor de desenvolvimento
- **Docker** - Containerização para facilitar deployment

---

## Posições NBA

- **PG (Point Guard)**: Armador principal, responsável pela organização do jogo
- **SG (Shooting Guard)**: Ala-armador, focado em pontuação de perímetro
- **SF (Small Forward)**: Ala versátil
- **PF (Power Forward)**: Ala-pivô, joga dentro e fora do garrafão
- **C (Center)**: Pivô, protetor do aro e reboteiro

---

## Formações Disponíveis

- **Standard (2-2-1)**: 2 Armadores, 2 Alas, 1 Pivô
- **Small Ball (3-2-0)**: 3 Armadores, 2 Alas, sem Pivô
- **Twin Towers (2-1-2)**: 2 Armadores, 1 Ala, 2 Pivôs

---

## Configuração de Cores

O projeto utiliza tema escuro com as seguintes cores principais:
- **Primária**: Laranja (#ff6b35)
- **Secundária**: Laranja-Amarelado (#f7931e)
- **Fundo**: Preto (#0f1419)
- **Superfície**: Cinza escuro (#1a1f29)

Todas as cores podem ser personalizadas no arquivo `src/app.css`.

---

## Integração com Backend

Este é o frontend da aplicação. O backend deve ser desenvolvido em repositório separado.

### Documentação para Desenvolvimento do Backend

Três arquivos de documentação completos foram fornecidos:

1. **API_SPECIFICATION.md** - Especificação completa da API
   - Todos os endpoints necessários com formatos de request/response
   - Interfaces TypeScript para modelos de dados
   - Fluxo de autenticação (JWT)
   - Regras de negócio e validações

2. **BACKEND_INTEGRATION_GUIDE.md** - Guia de integração passo a passo
   - Estrutura de models Django
   - Configuração de settings (CORS, JWT, DRF)
   - Exemplos de camada de serviço no frontend
   - Instruções de deployment

3. **BACKEND_README_TEMPLATE.md** - Template de README para repositório backend
   - Instruções de instalação
   - Configuração Docker
   - Guidelines de testes

### Próximos Passos para Conexão com Backend

1. Copiar os três arquivos de documentação para o repositório backend
2. Implementar os endpoints da API conforme especificado em API_SPECIFICATION.md
3. Substituir dados mockados nos stores por chamadas reais de API
4. Adicionar variável de ambiente para URL da API (VITE_API_URL)
5. Testar fluxo de autenticação end-to-end

---

## O que funcionou

- Todas as principais funcionalidades descritas no escopo foram **implementadas e testadas**.
- Sistema de autenticação completo com todas as páginas funcionando corretamente.
- Gerenciamento de elenco com formação visual em quadra de basquete.
- Mercado de jogadores com filtros e busca funcionando perfeitamente.
- Sistema de ranking exibindo corretamente as classificações.
- Interface responsiva e moderna funcionando em diferentes resoluções.
- Stores TypeScript com tipagem completa garantindo segurança de tipos.
- Containerização Docker funcionando tanto em desenvolvimento quanto produção.

---

## O que não funcionou

- A aplicação está utilizando **dados mockados** nos stores, pois o backend ainda não foi implementado.
- **Integração com API real** ainda não foi realizada, aguardando desenvolvimento do backend.
- Não há **validação real de autenticação**, apenas simulação local.
- Sistema de **pontuação em tempo real** não está ativo (requer integração com API de estatísticas NBA).
- Fora dessas limitações relacionadas ao backend, todas as demais funcionalidades do frontend estão operacionais.

---

## Melhorias Futuras

- Sistema de ligas privadas
- Atualizações de pontuação em tempo real via WebSockets
- Funcionalidade de trocas e waiver wire
- Notificações push para atualizações de jogadores
- Integração com API de estatísticas NBA ao vivo

---

## Observações Finais

O projeto foi concluído conforme os requisitos da disciplina.
Todas as funcionalidades principais do frontend foram implementadas com sucesso, e a aplicação encontra-se estável e utilizável.
A arquitetura foi pensada para facilitar a futura integração com o backend, com stores bem definidos e documentação completa da API necessária.
O uso de TypeScript garante segurança de tipos e facilita a manutenção do código.

O projeto está pronto para receber a integração com backend Django seguindo a documentação fornecida.
