# Product Requirements Document: PPL Workout Tracker PWA

## 1. Overview

A lightweight Progressive Web App (PWA) for tracking workouts based on a personalized 16-week push/pull/leg training program. The app must work seamlessly on mobile devices and provide an offline-first experience.

## 2. Goals

- Enable users to track workouts, exercises, sets, reps, and weights
- Display weekly calendar with planned workouts from the program
- Allow flexibility to add custom workouts on different days
- Provide quick access to exercise form videos
- Display progress checkpoints and milestones
- Show nutrition and recovery tips

## 3. Core Features

### 3.1 Weekly Calendar View
- **Primary View**: Weekly calendar showing days of the week
- **Planned Workouts**: Display scheduled workouts from the program (Day 1: Push, Day 2: Pull, Day 3: Push + Core, Day 4: Pull + Lower Body)
- **Completed Workouts**: Visual indicator for completed workouts
- **Custom Workouts**: Ability to add workouts on any day (not just scheduled days)
- **Navigation**: Ability to navigate between weeks

### 3.2 Workout Tracking
- **Workout Details**: 
  - Date and time
  - Workout type (Push, Pull, Push + Core, Pull + Lower Body, or Custom)
  - Duration (optional)
- **Exercise Tracking**:
  - Exercise name
  - Equipment type (Machine/Dumbbell/Bodyweight)
  - Sets completed
  - Reps per set
  - Weight per set (or bodyweight indicator)
  - Rest time (optional, can be auto-filled from plan)
- **Exercise Selection**:
  - Pre-populated exercises from the plan for each workout type
  - Ability to add custom exercises
  - Quick-add from previous workouts

### 3.3 Progress Tracking
- **Historical Data**: View past workouts
- **Exercise History**: See progression for specific exercises over time
- **Progress Checkpoints**: 
  - Display milestones from plan (4-week, 8-week, 12-week, 16-week)
  - Compare current progress to expected milestones
  - Visual indicators for checkpoint achievements

### 3.4 Resources Section
- **Exercise Videos**: 
  - Organized by category (Push, Pull, Core, Glute Activation)
  - Links to YouTube videos from the plan
  - Quick access during workout tracking
- **Exercise Details**: Notes and tips from the plan

### 3.5 Nutrition & Recovery Section
- Display nutrition tips from the plan
- Show recovery recommendations
- Quick reference for protein intake, caloric balance, sleep recommendations

## 4. Technical Requirements

### 4.1 PWA Requirements
- **Offline Support**: App must work offline after initial load
- **Installable**: Can be added to home screen on mobile devices
- **Service Worker**: For offline functionality and caching
- **Manifest**: Proper PWA manifest for installation

### 4.2 Performance
- **Lightweight**: Minimal dependencies, fast load times
- **Mobile-First**: Optimized for phone screens
- **Fast Interactions**: Smooth UI interactions, no lag

### 4.3 Data Storage
- **Local Storage**: All data stored locally (IndexedDB or localStorage)
- **No Backend**: Fully client-side application
- **Data Persistence**: Data persists across sessions and app updates

## 5. User Experience Requirements

### 5.1 Mobile Optimization
- Touch-friendly interface
- Large tap targets
- Responsive design
- Portrait orientation primary (landscape support optional)

### 5.2 Workflow
- **Quick Entry**: Fast way to log sets/reps/weight during workout
- **Template-Based**: Start with plan templates, customize as needed
- **Minimal Clicks**: Reduce friction in data entry

### 5.3 Visual Design
- Clean, minimal interface
- Clear visual hierarchy
- Easy to read during workout (good contrast, readable fonts)

## 6. Data Model

### 6.1 Workout
```
- id: unique identifier
- date: date/time
- type: "Push" | "Pull" | "Push + Core" | "Pull + Lower Body" | "Custom"
- exercises: Exercise[]
- duration: number (minutes, optional)
- notes: string (optional)
```

### 6.2 Exercise
```
- id: unique identifier
- name: string
- equipment: "Machine" | "Dumbbell" | "Bodyweight" | "Custom"
- sets: Set[]
- notes: string (optional)
```

### 6.3 Set
```
- setNumber: number
- reps: number
- weight: number (or null for bodyweight)
- completed: boolean
```

### 6.4 Program Template
```
- workoutType: string
- exercises: ExerciseTemplate[]
- defaultSets: number
- defaultReps: string (e.g., "8-10")
- restTime: number (seconds)
```

## 7. Non-Functional Requirements

- **Privacy**: All data stored locally, no cloud sync required
- **Simplicity**: Easy to use during workout (minimal cognitive load)
- **Reliability**: Data should never be lost
- **Maintainability**: Clean code structure for future updates

## 8. Out of Scope (v1)

- Social features
- Cloud sync/backup
- Advanced analytics/charts
- Workout sharing
- Multiple users/profiles
- Exercise library beyond plan exercises
