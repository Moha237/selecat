import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import CoursesPage from './pages/CoursesPage';
import MiPrimerQuiz from './pages/MiPrimerQuiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/lesson/tangent-line" element={<LessonPage />} />
            <Route path="/quiz/mi-primer-quiz" element={<MiPrimerQuiz/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;