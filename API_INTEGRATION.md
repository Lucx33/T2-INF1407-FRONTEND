# Guia de Integração com a API

Este documento explica como usar as funções de API criadas para integrar o frontend com o backend.

## Estrutura de APIs

Todas as funções de API estão em `src/lib/api/`:

- **auth.ts** - Login e registro
- **client.ts** - Helper para requisições autenticadas
- **players.ts** - Buscar jogadores do mercado
- **team.ts** - Gerenciar time do usuário
- **leaderboard.ts** - Rankings e leaderboard
- **dashboard.ts** - Dados do dashboard

## Autenticação Automática

Todas as requisições que usam as funções em `client.ts` (`apiGet`, `apiPost`, `apiPut`, `apiDelete`) automaticamente:
- Incluem o token de autenticação no header `Authorization`
- Redirecionam para `/login` se receber 401 (não autorizado)
- Tratam erros de forma consistente

## Exemplos de Uso

### 1. Dashboard - Carregar dados do usuário

```typescript
<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchDashboard } from '$lib/api/dashboard';
  import type { DashboardData } from '$lib/api/dashboard';

  let dashboardData: DashboardData | null = null;
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      dashboardData = await fetchDashboard();
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Carregando...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if dashboardData}
  <div class="stats">
    <p>Total Points: {dashboardData.stats.totalPoints}</p>
    <p>Rank: {dashboardData.stats.rank}</p>
  </div>
{/if}
```

### 2. Market - Buscar jogadores com filtros

```typescript
<script lang="ts">
  import { fetchPlayers } from '$lib/api/players';
  import type { Player } from '$lib/api/players';

  let players: Player[] = [];
  let searchTerm = '';
  let selectedPosition = '';
  let loading = false;

  async function loadPlayers() {
    loading = true;
    try {
      const response = await fetchPlayers({
        search: searchTerm,
        position: selectedPosition,
        sortBy: 'points',
        sortOrder: 'desc',
        page: 1,
        pageSize: 20
      });
      players = response.players;
    } catch (err: any) {
      console.error('Erro ao carregar jogadores:', err);
    } finally {
      loading = false;
    }
  }

  // Carrega jogadores quando filtros mudam
  $: if (searchTerm || selectedPosition) {
    loadPlayers();
  }
</script>

<input type="text" bind:value={searchTerm} placeholder="Buscar jogador..." />

<select bind:value={selectedPosition}>
  <option value="">Todas as posições</option>
  <option value="PG">Point Guard</option>
  <option value="SG">Shooting Guard</option>
  <option value="SF">Small Forward</option>
  <option value="PF">Power Forward</option>
  <option value="C">Center</option>
</select>

{#each players as player}
  <PlayerCard {player} />
{/each}
```

### 3. My Team - Gerenciar jogadores do time

```typescript
<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUserTeam, addPlayerToTeam, removePlayerFromTeam } from '$lib/api/team';
  import type { UserTeam } from '$lib/api/team';

  let team: UserTeam | null = null;
  let loading = true;

  onMount(async () => {
    await loadTeam();
  });

  async function loadTeam() {
    try {
      team = await fetchUserTeam();
    } catch (err: any) {
      console.error('Erro ao carregar time:', err);
    } finally {
      loading = false;
    }
  }

  async function handleAddPlayer(playerId: string) {
    try {
      team = await addPlayerToTeam(playerId);
      // Time atualizado automaticamente
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleRemovePlayer(playerId: string) {
    if (!confirm('Remover jogador do time?')) return;

    try {
      team = await removePlayerFromTeam(playerId);
    } catch (err: any) {
      alert(err.message);
    }
  }
</script>

{#if team}
  <div>
    <h2>{team.teamName}</h2>
    <p>Orçamento: ${team.budget}M / ${team.totalBudget}M</p>
    <p>Formação: {team.formation}</p>

    {#each team.players as player}
      <div>
        <p>{player.name} - {player.position}</p>
        <button on:click={() => handleRemovePlayer(player.id)}>Remover</button>
      </div>
    {/each}
  </div>
{/if}
```

### 4. Leaderboard - Mostrar rankings

```typescript
<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchLeaderboard, fetchUserPosition } from '$lib/api/leaderboard';
  import type { LeaderboardEntry } from '$lib/api/leaderboard';

  let leaderboard: LeaderboardEntry[] = [];
  let userPosition: LeaderboardEntry | null = null;
  let loading = true;

  onMount(async () => {
    try {
      const [leaderboardData, userPos] = await Promise.all([
        fetchLeaderboard(1, 50),
        fetchUserPosition()
      ]);

      leaderboard = leaderboardData.leaderboard;
      userPosition = userPos;
    } catch (err: any) {
      console.error('Erro ao carregar leaderboard:', err);
    } finally {
      loading = false;
    }
  });
</script>

{#if userPosition}
  <div class="user-position">
    <p>Sua posição: #{userPosition.rank}</p>
    <p>Pontos: {userPosition.points}</p>
  </div>
{/if}

{#each leaderboard as entry}
  <div class="leaderboard-entry">
    <span>#{entry.rank}</span>
    <span>{entry.username}</span>
    <span>{entry.teamName}</span>
    <span>{entry.points} pts</span>
  </div>
{/each}
```

## Variáveis de Ambiente

Configure a URL da API em `.env`:

```bash
PUBLIC_API_URL=http://localhost:8000
```

## Tratamento de Erros

Todas as funções de API lançam erros que você pode capturar:

```typescript
try {
  const data = await fetchUserTeam();
} catch (err: any) {
  // err.message contém a mensagem de erro do backend
  console.error(err.message);
  // ou mostrar para o usuário
  alert(err.message);
}
```

## Autenticação

- O token é salvo automaticamente no localStorage após login/registro
- Todas as requisições incluem o token automaticamente
- Se o token expirar (401), o usuário é redirecionado para `/login`
- Para fazer logout: use `authStore.logout()`

## Rotas Protegidas

As seguintes rotas requerem autenticação:
- `/dashboard`
- `/market`
- `/my-team`
- `/leaderboard`

Se o usuário não estiver autenticado, será redirecionado para `/login`.
