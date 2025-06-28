import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const EjemploPolynomialQuiz = () => {
  const lessonData = createTangentLineQuiz('polynomialSimple');
  
  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <span>Ejemplo: Quiz Polinomial</span>
      </nav>
      
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Ejemplo: f(x) = x² + 3x</h1>
          <p className="quiz-description">
            Este es un ejemplo de cómo crear un quiz para una función polinomial simple. 
            Calcula la recta tangente de f(x) = x² + 3x en el punto x = 2.
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ 8-12 min</span>
            <span className="info-badge">🎯 Principiante</span>
            <span className="info-badge">📊 5 preguntas</span>
            <span className="info-badge">📈 Polinomial</span>
          </div>
        </div>
        
        <div className="quiz-content">
          <MultipleChoiceLesson 
            lessonData={lessonData}
            onStepChange={(question, answer) => {
              console.log(`Quiz Polinomial - Pregunta ${question}, respuesta ${answer}`);
            }}
          />
        </div>
        
        <div className="quiz-footer">
          <div className="related-concepts">
            <h3>💡 Conceptos de Esta Lección</h3>
            <div className="concepts-list">
              <span className="concept-tag">Funciones Polinomiales</span>
              <span className="concept-tag">Regla de la Potencia</span>
              <span className="concept-tag">Derivadas Básicas</span>
              <span className="concept-tag">Recta Tangente</span>
            </div>
          </div>
          
          <div className="function-summary">
            <h3>🎯 Resumen de la Función</h3>
            <div className="function-details">
              <p><strong>Función:</strong> f(x) = x² + 3x</p>
              <p><strong>Derivada:</strong> f'(x) = 2x + 3</p>
              <p><strong>Punto de análisis:</strong> x = 2</p>
              <p><strong>Punto de tangencia:</strong> (2, 10)</p>
              <p><strong>Pendiente:</strong> f'(2) = 7</p>
              <p><strong>Recta tangente:</strong> y = 7x - 4</p>
            </div>
          </div>
          
          <div className="next-steps">
            <h3>🎯 Otros Quizzes</h3>
            <ul>
              <li><a href="/quiz/tangent-line">Quiz: f(x) = xe^(x-1) (Exponencial)</a></li>
              <li><a href="/quiz/logarithmic">Quiz: f(x) = x·ln(x) (Logarítmica)</a></li>
              <li><a href="/lesson/tangent-interactive">Versión Interactiva con Gráficos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EjemploPolynomialQuiz;