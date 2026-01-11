# Quick Start Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

## Using the App

### Calendar View
- The default schedule is Monday, Wednesday, Thursday, Saturday
- Click on a scheduled day to start a workout
- Click on any other day to add a custom workout
- Click on a completed workout to view/edit it

### Tracking a Workout
1. Select or create a workout from the calendar
2. Use the quick exercise buttons to add exercises
3. Enter sets, reps, and weights as you complete them
4. Click the exercise name to expand and see set details
5. Click the video icon (📹) next to exercises to see form videos
6. Save when done

### Progress Tracking
1. Go to the Progress page
2. Set your program start date (first time only)
3. View your checkpoints and workout history

### Data Export
1. Go to the Nutrition page
2. Click "Export Data" to download a JSON backup
3. Keep this file safe - you can use it to restore data if needed

## Building for Production

```bash
npm run build
```

Deploy the `build/` directory to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## PWA Icons

To complete the PWA setup, add icons to `static/icons/`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

The app works without these, but they're needed for a complete PWA experience.

## Data Safety

- All data is stored locally in your browser
- Use the export feature regularly for backups
- The migration system ensures your data survives app updates
- No data is ever sent to any server
