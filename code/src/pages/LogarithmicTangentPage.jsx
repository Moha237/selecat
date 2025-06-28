import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineLesson } from '../data/lessonTemplates';

const LogarithmicTangentPage = () => {
  const lessonData = createTangentLineLesson('logarithmicProduct');
  
  return (
    <div className="lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Recta Tangente - Logarítmica</span>
      </nav>
      
      <div className="lesson-container">
        <div className="lesson-layout">
          <div className="lesson-left">
            <MultipleChoiceLesson 
              lessonData={lessonData}
              onStepChange={(question, answer) => {
                console.log(`Pregunta ${question}, respuesta ${answer}`);
              }}
            />
          </div>
          
          <div className="lesson-right">
            <div className="visualization-panel">
              <h2>Función Logarítmica</h2>
              <p>Esta lección trabaja con f(x) = x·ln(x)</p>
              <div className="function-info">
                <h4>Información de la función:</h4>
                <ul>
                  <li><strong>Función:</strong> f(x) = x·ln(x)</li>
                  <li><strong>Derivada:</strong> f'(x) = ln(x) + 1</li>
                  <li><strong>Punto de análisis:</strong> x = 1</li>
                  <li><strong>Punto de tangencia:</strong> (1, 0)</li>
                  <li><strong>Pendiente:</strong> f'(1) = 1</li>
                  <li><strong>Recta tangente:</strong> y = x - 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogarithmicTangentPage;