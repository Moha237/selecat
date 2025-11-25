# Selecat - Math & Physics Educational Web App

An educational web application for learning mathematics and physics through interactive lessons and quizzes.

## Project Structure

The main application code is located in the `code/` directory. You need to navigate into this directory to run the project.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the code directory:
```bash
cd code/
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

#### Development Mode (Recommended)

To run both the React app and the JSON server concurrently:

```bash
npm run dev
```

This will start:
- React development server on `http://localhost:3000`
- JSON server (mock backend) on `http://localhost:3001`

#### Run React App Only

```bash
npm start
```

Opens the app at `http://localhost:3000`

#### Run JSON Server Only

```bash
npm run server
```

Starts the mock backend at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

### Running Tests

```bash
npm test
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Navigation
- **KaTeX** - Math equation rendering
- **Plotly.js** - Interactive graphs and visualizations
- **JSON Server** - Mock REST API for development

## Project Documentation

- [PROYECTO_AVANCES.md](code/PROYECTO_AVANCES.md) - Project progress and development history
- [CREAR_LECCIONES.md](code/CREAR_LECCIONES.md) - Guide for creating lessons
- [GUIA_PASO_A_PASO_QUIZ.md](code/GUIA_PASO_A_PASO_QUIZ.md) - Step-by-step quiz creation guide

## License

ISC
