import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MultipleChoiceQuestion = ({ question, options, selectedAnswer, onAnswerSelect, explanation, isAnswered }) => {
  return (
    <div className="multiple-choice-question">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedAnswer === index ? 'selected' : ''
            } ${
              isAnswered && option.isCorrect ? 'correct' : ''
            } ${
              isAnswered && selectedAnswer === index && !option.isCorrect ? 'incorrect' : ''
            }`}
            onClick={() => onAnswerSelect(index)}
            disabled={isAnswered}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)})</span>
            <span className="option-text">{option.text}</span>
          </button>
        ))}
      </div>
      {isAnswered && explanation && (
        <div className="explanation">
          <h4>Explicación:</h4>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};

const InteractiveLessonContent = ({ currentStep, onStepChange }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 0,
      question: "Considera la función f(x) = xe^(x-1). ¿Qué regla de derivación necesitas usar para calcular f'(x)?",
      options: [
        { text: "Regla de la cadena", isCorrect: false },
        { text: "Regla del producto", isCorrect: true },
        { text: "Regla del cociente", isCorrect: false },
        { text: "Derivada de una función exponencial simple", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>[PLACEHOLDER: Explicación de por qué usar la regla del producto]</p>
          <p><em>Aquí se explicaría paso a paso el concepto de manera interactiva</em></p>
          <BlockMath math="f'(x) = u'(x) \cdot v(x) + u(x) \cdot v'(x)" />
        </div>
      )
    },
    {
      id: 1,
      question: "Aplicando la regla del producto a f(x) = x·e^(x-1), ¿cuál es f'(x)?",
      options: [
        { text: "f'(x) = e^(x-1)", isCorrect: false },
        { text: "f'(x) = x·e^(x-1)", isCorrect: false },
        { text: "f'(x) = (1 + x)e^(x-1)", isCorrect: true },
        { text: "f'(x) = (x-1)e^(x-1)", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>[PLACEHOLDER: Demostración paso a paso de la aplicación de la regla del producto]</p>
          <p><em>Aquí se mostraría el proceso completo de derivación de manera interactiva</em></p>
          <BlockMath math="f'(x) = (1 + x)e^{x-1}" />
        </div>
      )
    },
    {
      id: 2,
      question: "¿Cuál es el valor de f'(1)?",
      options: [
        { text: "f'(1) = 1", isCorrect: false },
        { text: "f'(1) = 2", isCorrect: true },
        { text: "f'(1) = e", isCorrect: false },
        { text: "f'(1) = 0", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>[PLACEHOLDER: Cálculo paso a paso de la evaluación de la derivada]</p>
          <p><em>Aquí se mostraría la sustitución y simplificación paso a paso</em></p>
          <BlockMath math="f'(1) = 2" />
        </div>
      )
    },
    {
      id: 3,
      question: "¿Cuál es el valor de f(1)?",
      options: [
        { text: "f(1) = 0", isCorrect: false },
        { text: "f(1) = 1", isCorrect: true },
        { text: "f(1) = 2", isCorrect: false },
        { text: "f(1) = e", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>Sustituimos x = 1 en f(x) = xe^(x-1):</p>
          <BlockMath math="f(1) = 1 \cdot e^{1-1} = 1 \cdot e^0 = 1 \cdot 1 = 1" />
          <p>El punto de tangencia es <strong>(1, 1)</strong>.</p>
        </div>
      )
    },
    {
      id: 4,
      question: "Con la pendiente m = 2 y el punto (1, 1), ¿cuál es la ecuación de la recta tangente?",
      options: [
        { text: "y = x + 1", isCorrect: false },
        { text: "y = 2x - 1", isCorrect: true },
        { text: "y = 2x + 1", isCorrect: false },
        { text: "y = x - 1", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>Usando la fórmula punto-pendiente:</p>
          <BlockMath math="y - f(a) = f'(a)(x - a)" />
          <BlockMath math="y - 1 = 2(x - 1)" />
          <BlockMath math="y - 1 = 2x - 2" />
          <BlockMath math="y = 2x - 1" />
          <p>La ecuación de la recta tangente es <strong>y = 2x - 1</strong>.</p>
        </div>
      )
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answerIndex
    };
    setAnswers(updatedAnswers);
    
    // Llamar al callback para actualizar la visualización
    onStepChange(currentQuestion, answerIndex);
    
    // Pasar automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 2000);
  };

  const isAnswered = (questionIndex) => {
    return answers.hasOwnProperty(questionIndex);
  };

  const getProgressPercentage = () => {
    return Math.round((Object.keys(answers).length / questions.length) * 100);
  };

  return (
    <div className="interactive-lesson-content">
      <div className="lesson-header">
        <h2>Recta Tangente: Preguntas Interactivas</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
        </div>
        <p className="progress-text">Progreso: {Object.keys(answers).length} de {questions.length} preguntas respondidas ({getProgressPercentage()}%)</p>
      </div>

      {currentQuestion < questions.length ? (
        <div className="question-container">
          <div className="question-header">
            <span className="question-number">Pregunta {currentQuestion + 1} de {questions.length}</span>
          </div>
          <MultipleChoiceQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            explanation={questions[currentQuestion].explanation}
            isAnswered={isAnswered(currentQuestion)}
          />
        </div>
      ) : (
        <div className="lesson-complete">
          <h3>¡Lección Completada!</h3>
          <div className="final-answer">
            <h4>Respuesta Final:</h4>
            <BlockMath math="y = 2x - 1" />
          </div>
          <p>Has completado exitosamente todas las preguntas sobre el cálculo de la recta tangente.</p>
          
          <h4>Resumen del proceso:</h4>
          <ol>
            <li>Aplicamos la regla del producto para obtener: <InlineMath math="f'(x) = (1 + x) e^{x-1}" /></li>
            <li>Calculamos la pendiente en x=1: <InlineMath math="f'(1) = 2" /></li>
            <li>Encontramos el punto de tangencia: <InlineMath math="(1, 1)" /></li>
            <li>Aplicamos la fórmula punto-pendiente para obtener: <InlineMath math="y = 2x - 1" /></li>
          </ol>
          
          <button 
            className="reset-button"
            onClick={() => {
              setAnswers({});
              setCurrentQuestion(0);
            }}
          >
            Reiniciar Lección
          </button>
        </div>
      )}

      {Object.keys(answers).length > 0 && (
        <div className="answered-questions">
          <h4>Preguntas Respondidas:</h4>
          <div className="question-summary">
            {questions.slice(0, currentQuestion + 1).map((q, index) => (
              isAnswered(index) && (
                <div key={index} className="answered-question">
                  <span className="question-title">Pregunta {index + 1}:</span>
                  <span className={`answer-status ${
                    q.options[answers[index]]?.isCorrect ? 'correct' : 'incorrect'
                  }`}>
                    {q.options[answers[index]]?.isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

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