import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const MiPrimerQuiz = () => {
  // ✅ Usamos una función que sí existe y funciona
  const lessonData = createTangentLineQuiz('polynomial_2_x2');

  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶
        <a href="/courses">Cursos</a> ▶
        <span>Mi Primer Quiz</span>
      </nav>

      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Mi Primer Quiz</h1>
          <p className="quiz-description">
            Mi descripción personalizada
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ 8-12 min</span>
            <span className="info-badge">🎯 Principiante</span>
            <span className="info-badge">📊 5 preguntas</span>
            <span className="info-badge">📈 Polinomial</span>
          </div>
        </div>

        <div className="quiz-content">
          <MultipleChoiceLesson lessonData={lessonData} />
        </div>
      </div>
    </div>
  );
};

export default MiPrimerQuiz;