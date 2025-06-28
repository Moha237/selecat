import React, { useState } from 'react';
import InteractiveLessonContent from '../components/InteractiveLessonContent';
import InteractivePlotlyViz from '../components/InteractivePlotlyViz';

const LessonPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Rectas Tangentes</span>
      </nav>
      
      <div className="lesson-container">
        <div className="lesson-layout">
          <div className="lesson-left">
            <InteractiveLessonContent 
              currentStep={currentStep} 
              onStepChange={handleStepChange}
            />
          </div>
          
          <div className="lesson-right">
            <div className="visualization-panel">
              <h2>Visualización Interactiva</h2>
              <p>Sigue los pasos para ver cómo se desarrolla la solución paso a paso en el gráfico.</p>
              <InteractivePlotlyViz 
                currentStep={currentStep} 
                onStepChange={handleStepChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;