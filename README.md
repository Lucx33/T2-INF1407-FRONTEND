# NBA Fantasy Game - Frontend

Frontend developed in Svelte/SvelteKit for an NBA Fantasy Basketball application.

## Technologies Used

- **SvelteKit** - Modern and performant web framework
- **Svelte 5** - Reactive library for building user interfaces
- **TypeScript** - Typed programming language for better development experience
- **Vite** - Build tool and dev server

## Features

### Pages
- **Home Page**: Landing page with game presentation
- **Dashboard**: User overview with statistics and recent activity
- **My Roster**: Lineup management with visual basketball court formation
- **Player Market**: Search and sign players with advanced filters
- **Leaderboard**: Manager rankings and podium of top performers

### Authentication
- **Login**: User authentication with email/password and social login options
- **Register**: New user registration with team name creation
- **Forgot Password**: Password reset request flow
- **Change Password**: Secure password update for authenticated users

## Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable components
│   │   ├── Formation.svelte
│   │   ├── PlayerCard.svelte
│   │   └── StatsCard.svelte
│   └── stores/          # State management (TypeScript)
│       ├── players.ts
│       ├── team.ts
│       └── user.ts
├── routes/              # Application pages
│   ├── dashboard/
│   ├── leaderboard/
│   ├── market/
│   ├── my-team/
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── forgot-password/  # Password reset request
│   ├── change-password/  # Password change
│   └── +page.svelte (Home)
├── app.css             # Global styles
├── app.html            # Base HTML template
└── +layout.svelte      # Main layout

static/                 # Static files
tsconfig.json          # TypeScript configuration
```

## Main Components

### Formation
Visual component that displays the basketball court with 5 player positions (PG, SG, SF, PF, C).

### PlayerCard
Player card showing photo, statistics, position, team, and salary.

### StatsCard
Reusable statistics card for displaying user metrics.

## Stores (Global State)

All stores are written in TypeScript with proper type definitions:

- **players.ts**: List of available players in the market with full TypeScript interfaces
- **team.ts**: User's team, formation, and salary cap management
- **user.ts**: User data, points, ranking, and authentication state

## How to Run

### Option 1: With Docker (Recommended)

**Advantage**: No need to install Node.js or local dependencies!

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Run in Development

```bash
# Build and start the container
docker-compose up dev

# Or in background
docker-compose up -d dev
```

The application will be available at `http://localhost:5173`

**Hot reload is active**: Code changes will be automatically reflected!

#### Run in Production

```bash
# Build and start the production container
docker-compose up prod

# Or in background
docker-compose up -d prod
```

The application will be available at `http://localhost:3000`

#### Useful Docker Commands

```bash
# Stop the containers
docker-compose down

# Rebuild containers (after Dockerfile changes)
docker-compose up --build dev

# View logs
docker-compose logs -f dev

# Access container shell
docker-compose exec dev sh
```

---

### Option 2: Local Installation (without Docker)

#### Prerequisites
- Node.js 18+ installed
- npm or pnpm

#### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Color Configuration (CSS Variables)

The project uses a dark theme with the following main colors:
- **Primary**: Orange (#ff6b35)
- **Secondary**: Orange-Yellow (#f7931e)
- **Background**: Black (#0f1419)
- **Surface**: Dark gray (#1a1f29)

All colors can be customized in the `src/app.css` file.

## Available Formations

- **Standard** (2-2-1): 2 Guards, 2 Forwards, 1 Center
- **Small Ball** (3-2-0): 3 Guards, 2 Forwards, no Center
- **Twin Towers** (2-1-2): 2 Guards, 1 Forward, 2 Centers

## NBA Player Positions

- **PG (Point Guard)**: Primary ball handler and playmaker
- **SG (Shooting Guard)**: Perimeter scorer
- **SF (Small Forward)**: Versatile wing player
- **PF (Power Forward)**: Inside/outside threat
- **C (Center)**: Rim protector and rebounder

## Backend Integration

This is the frontend of the application. The backend should be developed in a separate repository.

### Documentation for Backend Development

Three comprehensive documentation files are provided for backend developers:

1. **[API_SPECIFICATION.md](API_SPECIFICATION.md)** - Complete API specification
   - All required endpoints with request/response formats
   - TypeScript interfaces for data models
   - Authentication flow (JWT)
   - Business rules and validations

2. **[BACKEND_INTEGRATION_GUIDE.md](BACKEND_INTEGRATION_GUIDE.md)** - Step-by-step integration guide
   - Django models structure
   - Settings configuration (CORS, JWT, DRF)
   - Frontend service layer examples
   - Deployment instructions

3. **[BACKEND_README_TEMPLATE.md](BACKEND_README_TEMPLATE.md)** - Template README for backend repo
   - Installation instructions
   - Docker configuration
   - Testing guidelines

### Next Steps for Backend Connection

To connect this frontend with the backend:
1. Copy the three documentation files to your backend repository
2. Implement the API endpoints as specified in API_SPECIFICATION.md
3. Replace mock data in stores with actual API calls
4. Add environment variable for API URL (VITE_API_URL)
5. Test authentication flow end-to-end

### Future Enhancements

- Private league system
- Real-time score updates via WebSockets
- Trade and waiver wire functionality
- Push notifications for player updates
- Integration with live NBA stats API

## License

This project was developed for educational purposes.
