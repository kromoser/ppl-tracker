# Architecture Plan: PPL Workout Tracker PWA

## Technology Stack (Svelte-based)

### Core Technologies
- **Svelte**: Lightweight reactive framework (compiles to vanilla JS)
- **SvelteKit**: For routing and build tooling (minimal setup)
- **IndexedDB**: For structured data storage (workouts, exercises, sets)
- **Service Worker**: For offline functionality and caching
- **Web App Manifest**: For PWA installation
- **Vite**: Build tool (comes with SvelteKit)

### Rationale
- **Lightweight**: Svelte compiles to small, efficient vanilla JS
- **Reactive**: Clean, declarative code with minimal overhead
- **Modern Tooling**: SvelteKit provides routing and PWA support
- **Fast Runtime**: No virtual DOM, direct DOM updates
- **Small Bundle Size**: Critical for mobile performance
- **Easy to Maintain**: Component-based architecture

## Project Structure

```
ppl-tracker/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   │   ├── Calendar.svelte
│   │   │   ├── WorkoutTracker.svelte
│   │   │   ├── ExerciseEntry.svelte
│   │   │   ├── Resources.svelte
│   │   │   ├── Progress.svelte
│   │   │   └── Nutrition.svelte
│   │   ├── stores/         # Svelte stores
│   │   │   ├── workouts.js
│   │   │   └── settings.js
│   │   ├── db/             # Database layer
│   │   │   ├── db.js       # IndexedDB setup
│   │   │   ├── migrations.js # Data migration system
│   │   │   └── version.js  # Schema versioning
│   │   └── data/           # Static data
│   │       ├── templates.js
│   │       ├── checkpoints.js
│   │       └── resources.js
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte    # Calendar view (home)
│   │   ├── workout/
│   │   │   ├── +page.svelte
│   │   │   └── [id]/
│   │   │       └── +page.svelte
│   │   ├── resources/
│   │   │   └── +page.svelte
│   │   ├── progress/
│   │   │   └── +page.svelte
│   │   └── nutrition/
│   │       └── +page.svelte
│   ├── app.html
│   └── service-worker.js
├── static/
│   ├── manifest.json
│   └── icons/              # PWA icons
├── package.json
├── svelte.config.js
├── vite.config.js
└── README.md
```

## Data Architecture

### IndexedDB Schema

#### Stores

1. **workouts** (ObjectStore)
   - Key: `id` (auto-increment)
   - Indexes:
     - `date` (unique: false)
     - `type` (unique: false)
   - Structure:
     ```javascript
     {
       id: number,
       date: Date,
       type: string,
       duration: number | null,
       notes: string | null,
       exercises: Exercise[]
     }
     ```

2. **exercises** (ObjectStore) - for custom exercises
   - Key: `id` (auto-increment)
   - Indexes:
     - `name` (unique: true)
   - Structure:
     ```javascript
     {
       id: number,
       name: string,
       equipment: string,
       category: string | null
     }
     ```

3. **settings** (ObjectStore) - user preferences
   - Key: `key` (string)
   - Structure:
     ```javascript
     {
       key: string,
       value: any
     }
     ```

4. **meta** (ObjectStore) - app metadata and versioning
   - Key: `key` (string)
   - Structure:
     ```javascript
     {
       key: string,
       value: any
     }
     ```
   - Keys:
     - `dbVersion`: Current database schema version
     - `appVersion`: Current app version
     - `schedule`: Default workout schedule (Monday/Wednesday/Thursday/Saturday)

### Program Templates (Static Data)

Stored in `src/lib/data/templates.js` as JavaScript objects:
- Workout templates (Day 1, Day 2, Day 3, Day 4)
- Exercise definitions with default sets/reps/rest
- Progress checkpoints
- Nutrition tips
- Video resources

### Data Migration & Versioning Strategy

**Critical Requirement**: App updates must preserve all existing data.

#### Version Management
- **App Version**: Stored in `package.json` and `meta` store
- **DB Schema Version**: Incremented when schema changes
- **Migration System**: Automatic migration on app load

#### Migration Process
1. On app initialization, check current DB version vs. required version
2. If versions differ, run migration scripts sequentially
3. Migrations are idempotent (safe to run multiple times)
4. Each migration updates the version number
5. Backup data before major migrations (export option)

#### Migration Structure
```javascript
// migrations.js
const migrations = [
  {
    version: 1,
    up: async (db) => {
      // Initial schema creation
    }
  },
  {
    version: 2,
    up: async (db) => {
      // Add new field to workouts
      // Migrate existing data
    }
  },
  // Future migrations...
];
```

#### Safety Measures
- **Backup Before Migration**: Export data before major schema changes
- **Rollback Support**: Keep old schema accessible during migration
- **Data Validation**: Verify data integrity after migration
- **Error Handling**: Graceful failure with user notification

## Application Architecture

### Component Structure (Svelte-based)

1. **Layout Component** (`+layout.svelte`)
   - Main app shell
   - Navigation
   - Database initialization
   - Migration checks

2. **Calendar View** (`+page.svelte` / `Calendar.svelte`)
   - Weekly calendar rendering
   - Workout display
   - Date navigation
   - Default schedule: Monday/Wednesday/Thursday/Saturday

3. **Workout Tracker** (`WorkoutTracker.svelte`)
   - Workout creation/editing
   - Exercise entry with quick buttons
   - Set tracking (during or after workout)

4. **Exercise Entry** (`ExerciseEntry.svelte`)
   - Quick exercise selection buttons
   - Set/reps/weight input
   - Equipment type selection

5. **Database Layer** (`db/db.js`)
   - IndexedDB operations
   - CRUD operations for workouts
   - Data queries
   - Migration system

6. **Stores** (`stores/workouts.js`, `stores/settings.js`)
   - Reactive state management
   - Workout data
   - User settings (schedule, preferences)

7. **Data Files** (`data/templates.js`, etc.)
   - Program data
   - Exercise definitions
   - Resources

### Routing (SvelteKit file-based)

- `/` - Calendar view (default)
- `/workout` - Create new workout
- `/workout/[id]` - View/edit workout
- `/resources` - Resources section
- `/progress` - Progress checkpoints
- `/nutrition` - Nutrition tips

## UI/UX Design

### Layout Structure

```
┌─────────────────────────┐
│   Header (Nav)          │
├─────────────────────────┤
│                         │
│   Main Content Area     │
│   (Calendar/Workout/    │
│    Resources/etc)       │
│                         │
├─────────────────────────┤
│   Bottom Nav (Mobile)   │
└─────────────────────────┘
```

### Mobile-First Design Principles

- **Touch Targets**: Minimum 44x44px
- **Typography**: 16px base font size (prevents iOS zoom)
- **Spacing**: Generous padding for thumb-friendly navigation
- **Colors**: High contrast for readability during workouts
- **Loading States**: Clear feedback for all actions

## Service Worker Strategy

### Caching Strategy (Cache First, Network Fallback)

1. **App Shell**: Cache HTML, CSS, JS on install
2. **Static Assets**: Cache icons, manifest
3. **API/Data**: Not applicable (local-only)
4. **Offline Page**: Simple offline indicator

### Cache Versioning
- Version number in service worker
- Clear old caches on update

## Performance Optimizations

1. **Lazy Loading**: Load workout details only when needed
2. **Debouncing**: Debounce rapid data entry
3. **Virtual Scrolling**: For long workout history (if needed)
4. **Minimal Re-renders**: Update only changed DOM elements
5. **CSS Optimization**: Single stylesheet, minimal selectors

## Progressive Enhancement

1. **Core Functionality**: Works without JavaScript (read-only view)
2. **Enhanced Experience**: Full functionality with JavaScript
3. **PWA Features**: Installable, offline-capable with service worker

## Development Approach

### Phase 1: Setup & Core Infrastructure
1. SvelteKit project setup
2. IndexedDB setup with versioning
3. Migration system
4. Basic routing and layout

### Phase 2: Core Functionality
1. Calendar view with default schedule
2. Workout creation/editing
3. Exercise tracking with quick buttons
4. Set/reps/weight entry
5. Data persistence

### Phase 3: PWA Features
1. Service worker
2. Manifest
3. Offline support
4. Install prompt

### Phase 4: Additional Features
1. Resources section
2. Progress tracking
3. Nutrition section
4. Data export functionality

### Phase 5: Polish
1. UI/UX refinements
2. Mobile optimization
3. Performance tuning
4. Testing

## Testing Strategy

- **Manual Testing**: Primary method (lightweight app)
- **Browser DevTools**: For IndexedDB inspection
- **Lighthouse**: For PWA audit
- **Device Testing**: Real mobile devices

## Deployment

- **Build**: SvelteKit builds to static files (`npm run build`)
- **Static Hosting**: Deploy `build/` directory to any static host
- **HTTPS Required**: For PWA features (service worker)
- **Update Strategy**: 
  - Deploy new build
  - Service worker handles cache updates
  - Migration system ensures data compatibility
  - Users can export data before major updates (recommended)

## Data Export/Import

### Export Format (JSON)
```json
{
  "version": "1.0.0",
  "exportDate": "2024-01-15T10:00:00Z",
  "workouts": [...],
  "exercises": [...],
  "settings": {...}
}
```

### Import Process
1. Validate JSON structure
2. Check version compatibility
3. Merge or replace data (user choice)
4. Run migrations if needed