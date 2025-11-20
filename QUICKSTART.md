# Quick Start Guide - NBA Fantasy Game

## Start in 3 steps (with Docker)

### 1. Make sure you have Docker installed

Check if Docker is installed:
```bash
docker --version
docker-compose --version
```

If not installed, download at: https://www.docker.com/get-started

### 2. Clone the repository (if you haven't already)

```bash
git clone <repository-url>
cd T2-INF1407-FRONTEND
```

### 3. Start the application

```bash
docker-compose up dev
```

**Done!** Access http://localhost:5173 in your browser

---

## Essential Commands

```bash
# Start in development mode
docker-compose up dev

# Start in background (doesn't occupy the terminal)
docker-compose up -d dev

# Stop the application
docker-compose down

# View logs in real-time
docker-compose logs -f dev

# Restart after Dockerfile changes
docker-compose up --build dev
```

---

## Application Navigation

After starting, you can access:

- **Home**: http://localhost:5173/
- **Dashboard**: http://localhost:5173/dashboard
- **My Roster**: http://localhost:5173/my-team
- **Market**: http://localhost:5173/market
- **Leaderboard**: http://localhost:5173/leaderboard

---

## Troubleshooting

### Port 5173 is already in use
```bash
# Find which process is using the port
# Windows
netstat -ano | findstr :5173

# Linux/Mac
lsof -i :5173

# Then stop the container and try again
docker-compose down
docker-compose up dev
```

### Container won't start
```bash
# Clean everything and rebuild
docker-compose down -v
docker-compose up --build dev
```

### View detailed errors
```bash
docker-compose logs dev
```

---

## Development

Docker is configured with **hot reload**, so:

1. Edit any `.svelte`, `.js`, or `.css` file
2. Save the file
3. The browser will update automatically

No need to restart the container!

---

## Production Mode

To test the production build:

```bash
docker-compose up prod
```

Access: http://localhost:3000

---

## Game Features

### Build Your Roster
- Sign up to 5 NBA players
- Manage a $200M salary cap
- Choose from multiple formations (Standard, Small Ball, Twin Towers)

### Compete
- Earn points based on real NBA player performances
- Track PPG, rebounds, assists, steals, and blocks
- Climb the leaderboard rankings

### Manage Your Team
- View your roster on an interactive basketball court
- Monitor player statistics and team performance
- Trade players to optimize your lineup

---

## Need Help?

Consult the complete [README.md](./README.md) for more information.
