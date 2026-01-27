# 3D Frogger Game

A 3D version of the classic Frogger game built with React Three Fiber, TypeScript, and Zustand. Navigate your character through traffic, avoid vehicles, and progress through increasingly challenging levels.

## 🎮 Game Overview

This is a 3D adaptation of the classic Frogger arcade game where you control a character that must cross roads filled with moving cars and trucks while avoiding collisions. The game features:

- **3D Graphics**: Built with React Three Fiber and Three.js
- **Progressive Difficulty**: 5 levels with increasing complexity
- **Dynamic Map Generation**: Procedurally generated rows with trees, cars, and trucks
- **Score System**: Track your progress and highest row reached
- **Level System**: Difficulty increases with each new map generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-three-fiber
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Play

### Controls

- **Arrow Keys** or **On-screen Buttons**: Move your character
  - ⬆️ **Up**: Move forward
  - ⬇️ **Down**: Move backward
  - ⬅️ **Left**: Move left
  - ➡️ **Right**: Move right

### Gameplay

1. **Objective**: Navigate your character across the map, avoiding collisions with vehicles
2. **Safe Zones**: Green grass rows with trees are safe to stand on
3. **Danger Zones**: Gray road rows contain moving cars and trucks
4. **Collision**: If you collide with a vehicle, the game ends
5. **Progress**: Your score is based on the furthest row you've reached
6. **Levels**: Each time new rows are generated, the level increases, making the game more challenging


## 🛠️ Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **React Three Fiber**: 3D rendering with React
- **Three.js**: 3D graphics library
- **Zustand**: State management
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **@react-three/drei**: Useful helpers for React Three Fiber


## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🎮 Game Configuration

Game difficulty and mechanics can be configured in `src/_components/constants.ts`:

- `LEVELS_CONFIG`: Define level-specific parameters (vehicle counts, speeds, road limits)
- `TILE_SIZE`: Size of each tile in the game world
- `ROWS_PATCH_COUNT`: Number of rows generated per patch
