import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const InteractiveLessonContent = ({ currentStep, onStepChange }) => {
  const steps = [
    {
      id: 0,
      title: "Introducción",
      content: (
        <div>
          <h2>Calcular la recta tangente de una función en un punto dado</h2>
          <p>Para encontrar la recta tangente de una función en un punto dado, necesitas:</p>
          <ol>
            <li>Calcular la derivada f'(x)</li>
            <li>Evaluarla en el punto de interés: f'(a)</li>
            <li>Usar la fórmula punto-pendiente para una recta:</li>
          </ol>
          <div className="formula">
            <BlockMath math="y - f(a) = f'(a)(x - a)" />
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Paso 1: Calcular la derivada",
      content: (
        <div>
          <h3>Problema:</h3>
          <p>Considera la función <InlineMath math="f(x) = x e^{x-1}" />. Calcula la ecuación de la recta tangente al gráfico de la función f en el punto de abscisa <InlineMath math="x = 1" />.</p>
          
          <h3>Paso 1: Calcular la derivada</h3>
          <p><strong>Nota:</strong> Aquí debemos usar la regla del producto.</p>
          <p>Para <InlineMath math="f(x) = x \cdot e^{x-1}" />, aplicamos la regla del producto:</p>
          <BlockMath math="f'(x) = \frac{d}{dx}[x] \cdot e^{x-1} + x \cdot \frac{d}{dx}[e^{x-1}]" />
          <BlockMath math="f'(x) = 1 \cdot e^{x-1} + x \cdot e^{x-1}" />
          <BlockMath math="f'(x) = (1 + x) e^{x-1}" />
        </div>
      )
    },
    {
      id: 2,
      title: "Paso 2: Evaluar la derivada en x = 1",
      content: (
        <div>
          <h3>Paso 2: Evaluar la derivada en x = 1</h3>
          <p>Ahora sustituimos <InlineMath math="x = 1" /> en la derivada:</p>
          <BlockMath math="f'(1) = (1 + 1) e^{1-1} = 2 \cdot e^0 = 2 \cdot 1 = 2" />
          <p>Por lo tanto, la pendiente de la recta tangente en <InlineMath math="x = 1" /> es <strong>2</strong>.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Paso 3: Evaluar la función en x = 1",
      content: (
        <div>
          <h3>Paso 3: Evaluar la función en x = 1</h3>
          <p>Para obtener el punto de tangencia, calculamos <InlineMath math="f(1)" />:</p>
          <BlockMath math="f(1) = 1 \cdot e^{1-1} = 1 \cdot e^0 = 1 \cdot 1 = 1" />
          <p>El punto de tangencia es <strong>(1, 1)</strong>.</p>
        </div>
      )
    },
    {
      id: 4,
      title: "Paso 4: Aplicar la fórmula punto-pendiente",
      content: (
        <div>
          <h3>Paso 4: Aplicar la fórmula punto-pendiente</h3>
          <p>Con el punto <InlineMath math="(1, 1)" /> y la pendiente <InlineMath math="m = 2" />, aplicamos:</p>
          <BlockMath math="y - f(a) = f'(a)(x - a)" />
          <BlockMath math="y - 1 = 2(x - 1)" />
          <BlockMath math="y - 1 = 2x - 2" />
          <BlockMath math="y = 2x - 1" />
        </div>
      )
    },
    {
      id: 5,
      title: "Solución Final",
      content: (
        <div>
          <h3>Respuesta Final:</h3>
          <div className="final-answer">
            <BlockMath math="y = 2x - 1" />
          </div>
          <p>Esta es la ecuación de la recta tangente a la función <InlineMath math="f(x) = x e^{x-1}" /> en el punto <InlineMath math="x = 1" />.</p>
          
          <h3>Resumen del proceso:</h3>
          <ol>
            <li>Derivada: <InlineMath math="f'(x) = (1 + x) e^{x-1}" /></li>
            <li>Pendiente en x=1: <InlineMath math="f'(1) = 2" /></li>
            <li>Punto de tangencia: <InlineMath math="(1, 1)" /></li>
            <li>Ecuación de la recta tangente: <InlineMath math="y = 2x - 1" /></li>
          </ol>
        </div>
      )
    }
  ];

  return (
    <div className="interactive-lesson-content">
      <div className="step-navigation">
        <h2>Pasos de la Solución</h2>
        <div className="step-buttons">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`step-button ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}
              onClick={() => onStepChange(index)}
            >
              {index === 0 ? 'Intro' : `Paso ${index}`}
            </button>
          ))}
        </div>
      </div>

      <div className="step-content">
        {steps[currentStep]?.content}
      </div>

      <div className="navigation-controls">
        <button 
          className="nav-button prev"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          ← Anterior
        </button>
        <span className="step-indicator">
          {currentStep + 1} de {steps.length}
        </span>
        <button 
          className="nav-button next"
          onClick={() => onStepChange(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Siguiente →
        </button>
      </div>

      <section className="practice-template">
        <h2>Plantilla de Práctica</h2>
        <div className="template">
          <p><strong>Dado:</strong> f(x) = ___</p>
          <p><strong>Encontrar:</strong> la recta tangente en x = ___</p>
          
          <h4>El estudiante debe:</h4>
          <ol>
            <li>Calcular f'(x)</li>
            <li>Evaluar f'(x₀) y f(x₀)</li>
            <li>Construir la ecuación con <InlineMath math="y - f(x_0) = f'(x_0)(x - x_0)" /></li>
          </ol>
        </div>
      </section>

      <section className="exam-links">
        <h2>Preguntas de Examen Relacionadas</h2>
        <ul>
          <li><a href="#">Año 2016 Serie 3 Problema 3</a></li>
          <li><a href="#">Año 2016 Serie 5 Problema 3</a></li>
          <li><a href="#">Año 2016 Serie 5 Problema 6</a></li>
        </ul>
      </section>

      <section className="tags">
        <h2>Etiquetas</h2>
        <div className="tag-list">
          <span className="tag">derivada</span>
          <span className="tag">cálculo</span>
          <span className="tag">recta_tangente</span>
        </div>
      </section>
    </div>
  );
};

export default InteractiveLessonContent;