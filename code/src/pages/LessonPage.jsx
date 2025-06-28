import React, { useState } from 'react';
import InteractiveLessonContent from '../components/InteractiveLessonContent';
import InteractivePlotlyViz from '../components/InteractivePlotlyViz';

const LessonPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);

  const handleQuestionChange = (questionIndex, answerIndex) => {
    setCurrentQuestion(questionIndex);
    setSelectedAnswer(answerIndex);
  };

  return (
    <div className="lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Rectas Tangentes (Interactivo)</span>
      </nav>
      
      <div className="lesson-container">
        <div className="lesson-layout">
          <div className="lesson-left">
            <InteractiveLessonContent 
              currentStep={currentQuestion} 
              onStepChange={handleQuestionChange}
            />
          </div>
          
          <div className="lesson-right">
            <div className="visualization-panel">
              <h2>Visualización Interactiva</h2>
              <p>Esta versión combina preguntas con gráficos interactivos para una comprensión visual completa.</p>
              <div className="lesson-type-notice">
                <p><strong>💡 Nota:</strong> Esta es la versión con visualización interactiva.</p>
                <p>¿Prefieres solo las preguntas? <a href="/quiz/tangent-line">Prueba la versión Quiz →</a></p>
              </div>
              <InteractivePlotlyViz 
                currentQuestion={currentQuestion} 
                selectedAnswer={selectedAnswer}
                onStepChange={handleQuestionChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;