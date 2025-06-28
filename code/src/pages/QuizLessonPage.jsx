import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const QuizLessonPage = () => {
  const lessonData = createTangentLineQuiz('exponentialProduct');
  
  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Quiz: Recta Tangente</span>
      </nav>
      
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Quiz: Cálculo de Recta Tangente</h1>
          <p className="quiz-description">
            Responde las preguntas paso a paso para calcular la recta tangente de la función f(x) = xe^(x-1) en el punto x = 1.
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ 10-15 min</span>
            <span className="info-badge">🎯 Intermedio</span>
            <span className="info-badge">📊 5 preguntas</span>
          </div>
        </div>
        
        <div className="quiz-content">
          <MultipleChoiceLesson 
            lessonData={lessonData}
            onStepChange={(question, answer) => {
              console.log(`Quiz - Pregunta ${question}, respuesta ${answer}`);
            }}
          />
        </div>
        
        <div className="quiz-footer">
          <div className="related-concepts">
            <h3>💡 Conceptos Relacionados</h3>
            <div className="concepts-list">
              <span className="concept-tag">Derivadas</span>
              <span className="concept-tag">Regla del Producto</span>
              <span className="concept-tag">Punto-Pendiente</span>
              <span className="concept-tag">Funciones Exponenciales</span>
            </div>
          </div>
          
          <div className="next-steps">
            <h3>🎯 Próximos Pasos</h3>
            <ul>
              <li><a href="/lesson/tangent-interactive">Versión Interactiva con Gráficos</a></li>
              <li><a href="/quiz/derivatives-basic">Quiz: Derivadas Básicas</a></li>
              <li><a href="/quiz/tangent-advanced">Quiz: Rectas Tangentes Avanzado</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLessonPage;