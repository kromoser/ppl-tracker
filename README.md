# PPL Workout Tracker

A lightweight Progressive Web App (PWA) for tracking your personalized push/pull/leg workout routine. Built with SvelteKit for optimal performance and mobile experience.

## Features

- 📅 **Weekly Calendar View** - See your scheduled workouts (default: Monday, Wednesday, Thursday, Saturday)
- 💪 **Workout Tracking** - Log exercises, sets, reps, and weights
- ⚡ **Quick Exercise Selection** - Fast exercise entry with quick buttons
- 📚 **Exercise Resources** - Access to form videos for all exercises
- 📊 **Progress Checkpoints** - Track your progress against 4, 8, 12, and 16-week milestones
- 🥗 **Nutrition Tips** - Quick reference for nutrition and recovery
- 💾 **Data Export** - Export all your data as JSON for backup
- 🔄 **Data Migration** - Safe updates that preserve all your data

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended) and npm
- For best compatibility, use Node 20 or Node 22+ (avoid odd-numbered versions like 21, 23)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `build/` directory, ready to be deployed to any static hosting service.

## Data Storage

All data is stored locally in your browser using IndexedDB. Your workouts, exercises, and settings are never sent to any server - everything stays on your device.

### Data Migration

The app includes a migration system that automatically updates your data when you update the app. Your existing workouts and data will be preserved across updates.

### Exporting Data

You can export all your data from the Nutrition page. This creates a JSON file with all your workouts, exercises, and settings that you can use for backup or migration.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components
│   ├── stores/         # Svelte stores for state
│   ├── db/             # Database layer with migrations
│   └── data/           # Program data (templates, checkpoints, etc.)
└── routes/             # SvelteKit routes
```

## Technology Stack

- **SvelteKit** - Framework
- **IndexedDB** - Local data storage
- **Vite** - Build tool
- **PWA** - Progressive Web App capabilities

## Development

The app uses SvelteKit's file-based routing. Key routes:
- `/` - Calendar view (home)
- `/workout` - Create new workout
- `/workout/[id]` - View/edit existing workout
- `/resources` - Exercise form videos
- `/progress` - Progress checkpoints
- `/nutrition` - Nutrition tips and data export

## Deployment

This app can be deployed to any static hosting service. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick deploy to Netlify**:
```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or connect your GitHub repo to [Netlify](https://app.netlify.com) for automatic deployments.

## License

Personal use project.
