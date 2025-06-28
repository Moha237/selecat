import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const LogQuizPage = () => {
  const lessonData = createTangentLineQuiz('logarithmicProduct');
  
  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Quiz: Recta Tangente (Logarítmica)</span>
      </nav>
      
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Quiz: f(x) = x·ln(x)</h1>
          <p className="quiz-description">
            Calcula paso a paso la recta tangente de la función logarítmica f(x) = x·ln(x) en el punto x = 1.
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ 8-12 min</span>
            <span className="info-badge">🎯 Intermedio</span>
            <span className="info-badge">📊 5 preguntas</span>
            <span className="info-badge">🧮 Logaritmos</span>
          </div>
        </div>
        
        <div className="quiz-content">
          <MultipleChoiceLesson 
            lessonData={lessonData}
            onStepChange={(question, answer) => {
              console.log(`Quiz Log - Pregunta ${question}, respuesta ${answer}`);
            }}
          />
        </div>
        
        <div className="quiz-footer">
          <div className="related-concepts">
            <h3>💡 Conceptos de Esta Lección</h3>
            <div className="concepts-list">
              <span className="concept-tag">Funciones Logarítmicas</span>
              <span className="concept-tag">Derivada de ln(x)</span>
              <span className="concept-tag">Regla del Producto</span>
              <span className="concept-tag">Recta Tangente</span>
            </div>
          </div>
          
          <div className="function-summary">
            <h3>🎯 Resumen de la Función</h3>
            <div className="function-details">
              <p><strong>Función:</strong> f(x) = x·ln(x)</p>
              <p><strong>Derivada:</strong> f'(x) = ln(x) + 1</p>
              <p><strong>Punto de análisis:</strong> x = 1</p>
              <p><strong>Punto de tangencia:</strong> (1, 0)</p>
              <p><strong>Pendiente:</strong> f'(1) = 1</p>
              <p><strong>Recta tangente:</strong> y = x - 1</p>
            </div>
          </div>
          
          <div className="next-steps">
            <h3>🎯 Más Quizzes</h3>
            <ul>
              <li><a href="/quiz/tangent-line">Quiz: f(x) = xe^(x-1)</a></li>
              <li><a href="/quiz/tangent-polynomial">Quiz: f(x) = x²e^x</a></li>
              <li><a href="/lesson/tangent-interactive">Versión Interactiva con Gráficos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogQuizPage;