import React, { useState, useEffect } from 'react';
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
          <h4>💡 Explicación:</h4>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};

const QuizCompletionScreen = ({ 
  score, 
  correctAnswers, 
  totalQuestions, 
  timeSpent, 
  nextQuizId, 
  currentQuizTitle,
  onNavigateToNext, 
  onBackToQuizzes,
  onRetakeQuiz 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    if (score >= 85) return '#10B981'; // Verde
    if (score >= 70) return '#F59E0B'; // Amarillo
    return '#EF4444'; // Rojo
  };

  const getScoreMessage = () => {
    if (score >= 85) return '¡Excelente trabajo! 🎉';
    if (score >= 70) return '¡Buen trabajo! 👍';
    return 'Puedes mejorar. ¡Sigue practicando! 💪';
  };

  return (
    <div className="quiz-completion-screen">
      <div className="completion-header">
        <div className="completion-icon">
          {score >= 85 ? '🏆' : score >= 70 ? '🎯' : '📚'}
        </div>
        <h2>¡Quiz Completado!</h2>
        <h3>{currentQuizTitle}</h3>
      </div>

      <div className="results-summary">
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <div className="score-number" style={{ color: getScoreColor() }}>
            {score}%
          </div>
          <div className="score-label">Puntuación</div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{correctAnswers}/{totalQuestions}</div>
            <div className="stat-label">Respuestas correctas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{formatTime(timeSpent)}</div>
            <div className="stat-label">Tiempo empleado</div>
          </div>
        </div>
      </div>

      <div className="completion-message">
        <p>{getScoreMessage()}</p>
      </div>

      <div className="navigation-actions">
        {nextQuizId ? (
          <button 
            className="next-quiz-button primary"
            onClick={() => onNavigateToNext(nextQuizId)}
          >
            🚀 Siguiente Quiz
          </button>
        ) : (
          <div className="no-next-quiz">
            <p>🎉 ¡Has completado todos los quizzes disponibles!</p>
          </div>
        )}
        
        <div className="secondary-actions">
          <button 
            className="action-button secondary"
            onClick={onRetakeQuiz}
          >
            🔄 Repetir Quiz
          </button>
          
          <button 
            className="action-button secondary"
            onClick={onBackToQuizzes}
          >
            📚 Ver Todos los Quizzes
          </button>
        </div>
      </div>

      <style jsx>{`
        .quiz-completion-screen {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
          border-radius: 12px;
          margin: 2rem 0;
        }

        .completion-header {
          margin-bottom: 2rem;
        }

        .completion-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .completion-header h2 {
          color: #111827;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .completion-header h3 {
          color: #6B7280;
          font-size: 1.2rem;
          margin: 0;
          font-weight: 500;
        }

        .results-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          border: 6px solid;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .score-number {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
        }

        .score-label {
          font-size: 0.8rem;
          color: #6B7280;
          margin-top: 0.25rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6B7280;
          margin-top: 0.25rem;
        }

        .completion-message {
          margin: 2rem 0;
        }

        .completion-message p {
          font-size: 1.1rem;
          color: #374151;
          font-weight: 500;
        }

        .navigation-actions {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .next-quiz-button {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #3B82F6;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .next-quiz-button:hover {
          background: #2563EB;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        .no-next-quiz {
          padding: 1rem 2rem;
          background: #F0FDF4;
          border: 2px solid #10B981;
          border-radius: 8px;
          color: #065F46;
        }

        .secondary-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .action-button {
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          color: #6B7280;
        }

        .action-button:hover {
          border-color: #3B82F6;
          color: #3B82F6;
          background: #EFF6FF;
        }

        @media (max-width: 768px) {
          .results-summary {
            flex-direction: column;
            gap: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .secondary-actions {
            flex-direction: column;
            width: 100%;
          }

          .action-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

const MultipleChoiceLesson = ({ 
  lessonData, 
  onQuizComplete, 
  onNavigateToNext, 
  onBackToQuizzes, 
  currentQuizId 
}) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  const questions = lessonData.questions;

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const calculateScore = (answersToUse = null) => {
    const finalAnswers = answersToUse || answers;
    let correctCount = 0;
    
    console.log('=== CALCULANDO PUNTUACIÓN ===');
    console.log('Respuestas del usuario:', finalAnswers);
    
    questions.forEach((question, index) => {
      if (finalAnswers[index] !== undefined) {
        const userAnswerIndex = finalAnswers[index];
        const selectedOption = question.options[userAnswerIndex];
        const isCorrect = selectedOption && selectedOption.isCorrect;
        
        console.log(`Pregunta ${index + 1}:`);
        console.log(`  Usuario eligió opción: ${userAnswerIndex}`);
        console.log(`  Texto de opción: "${selectedOption?.text}"`);
        console.log(`  Es correcta: ${isCorrect}`);
        
        if (isCorrect) {
          correctCount++;
        }
      } else {
        console.log(`Pregunta ${index + 1}: Sin respuesta`);
      }
    });
    
    const result = {
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      score: Math.round((correctCount / questions.length) * 100)
    };
    
    console.log('Resultado final:', result);
    console.log('=== FIN CÁLCULO ===');
    
    return result;
  };

  const handleAnswerSelect = (answerIndex) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answerIndex
    };
    setAnswers(updatedAnswers);
    
    // Pasar automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completado
        handleQuizCompletion(updatedAnswers);
      }
    }, 2000);
  };

  const handleQuizCompletion = async (finalAnswers) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Calcular directamente con las respuestas finales
    const results = calculateScore(finalAnswers);
    
    try {
      // Llamar al callback de completado del quiz
      const completionInfo = await onQuizComplete?.(results.score, timeSpent, finalAnswers);
      
      setCompletionData({
        ...results,
        timeSpent,
        nextQuizId: completionInfo?.nextQuizId,
        currentQuizTitle: completionInfo?.currentQuizTitle
      });
      setIsCompleted(true);
    } catch (error) {
      console.error('Error al completar quiz:', error);
    }
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setStartTime(Date.now());
    setIsCompleted(false);
    setCompletionData(null);
  };

  const isAnswered = (questionIndex) => {
    return answers.hasOwnProperty(questionIndex);
  };

  const getProgressPercentage = () => {
    return Math.round((Object.keys(answers).length / questions.length) * 100);
  };

  if (isCompleted && completionData) {
    return (
      <QuizCompletionScreen
        score={completionData.score}
        correctAnswers={completionData.correctAnswers}
        totalQuestions={completionData.totalQuestions}
        timeSpent={completionData.timeSpent}
        nextQuizId={completionData.nextQuizId}
        currentQuizTitle={completionData.currentQuizTitle}
        onNavigateToNext={onNavigateToNext}
        onBackToQuizzes={onBackToQuizzes}
        onRetakeQuiz={handleRetakeQuiz}
      />
    );
  }

  return (
    <div className="interactive-lesson-content">
      <div className="lesson-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
        </div>
        <p className="progress-text">
          Progreso: {Object.keys(answers).length} de {questions.length} preguntas respondidas ({getProgressPercentage()}%)
        </p>
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
      ) : null}

      {Object.keys(answers).length > 0 && currentQuestion < questions.length && (
        <div className="answered-questions">
          <h4>📝 Preguntas Respondidas:</h4>
          <div className="question-summary">
            {questions.slice(0, currentQuestion).map((q, index) => (
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

      <style jsx>{`
        .interactive-lesson-content {
          padding: 2rem;
        }

        .lesson-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #E5E7EB;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3B82F6, #1E40AF);
          transition: width 0.5s ease;
        }

        .progress-text {
          color: #6B7280;
          font-size: 0.9rem;
          margin: 0;
        }

        .question-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .question-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .question-number {
          background: #3B82F6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .multiple-choice-question h3 {
          font-size: 1.3rem;
          color: #111827;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .option-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .option-button:hover:not(:disabled) {
          border-color: #3B82F6;
          background: #EFF6FF;
        }

        .option-button.selected {
          border-color: #3B82F6;
          background: #EFF6FF;
        }

        .option-button.correct {
          border-color: #10B981;
          background: #ECFDF5;
        }

        .option-button.incorrect {
          border-color: #EF4444;
          background: #FEF2F2;
        }

        .option-button:disabled {
          cursor: not-allowed;
        }

        .option-letter {
          width: 2rem;
          height: 2rem;
          background: #F3F4F6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: #374151;
          flex-shrink: 0;
        }

        .option-button.selected .option-letter {
          background: #3B82F6;
          color: white;
        }

        .option-button.correct .option-letter {
          background: #10B981;
          color: white;
        }

        .option-button.incorrect .option-letter {
          background: #EF4444;
          color: white;
        }

        .option-text {
          flex: 1;
          font-size: 1rem;
          line-height: 1.4;
        }

        .explanation {
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .explanation h4 {
          color: #0369A1;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .answered-questions {
          background: #F9FAFB;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .answered-questions h4 {
          color: #374151;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .question-summary {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .answered-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .answered-question:last-child {
          border-bottom: none;
        }

        .question-title {
          font-weight: 500;
          color: #374151;
        }

        .answer-status {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .answer-status.correct {
          color: #10B981;
        }

        .answer-status.incorrect {
          color: #EF4444;
        }
      `}</style>
    </div>
  );
};

export default MultipleChoiceLesson;