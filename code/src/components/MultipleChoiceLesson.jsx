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

const MultipleChoiceLesson = ({ lessonData, onStepChange }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = lessonData.questions;

  const handleAnswerSelect = (answerIndex) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answerIndex
    };
    setAnswers(updatedAnswers);
    
    // Llamar al callback para actualizar la visualización
    if (onStepChange) {
      onStepChange(currentQuestion, answerIndex);
    }
    
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
        <h2>{lessonData.metadata?.title || 'Lección Interactiva'}</h2>
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
          <p>Has completado exitosamente todas las preguntas de esta lección.</p>
          
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
          <p><strong>Tipo de lección:</strong> {lessonData.template?.type || 'Múltiple choice'}</p>
          <p><strong>Dificultad:</strong> {lessonData.metadata?.difficulty || 'No especificada'}</p>
          <p><strong>Tiempo estimado:</strong> {lessonData.metadata?.estimatedTime || '10-15 minutos'}</p>
          
          <h4>Tags:</h4>
          <div className="tag-list">
            {lessonData.metadata?.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            )) || <span className="tag">general</span>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultipleChoiceLesson;