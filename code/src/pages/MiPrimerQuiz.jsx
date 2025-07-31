import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';
import { useQuizProgress } from '../hooks/useQuizProgress';

const MiPrimerQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { getQuizStatus, definitions, completeQuiz, saveAnswer } = useQuizProgress();
  
  // Si no hay quizId en la URL, usar el valor por defecto
  const currentQuizId = quizId || 'polynomial_2_x2';
  
  const [lessonData, setLessonData] = useState(null);
  const [quizInfo, setQuizInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = createTangentLineQuiz(currentQuizId);
      const status = getQuizStatus(currentQuizId);
      
      setLessonData(data);
      setQuizInfo(status);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando quiz:', error);
      setLoading(false);
    }
  }, [currentQuizId, getQuizStatus]);

  const handleQuizComplete = async (finalScore, timeSpent, answers) => {
    try {
      // Marcar quiz como completado
      await completeQuiz(currentQuizId, finalScore, timeSpent);
      
      // Mostrar pantalla de completado con opciones de navegación
      return {
        showCompletionScreen: true,
        nextQuizId: getNextQuizId(currentQuizId),
        currentQuizTitle: quizInfo?.definition?.title || 'Quiz'
      };
    } catch (error) {
      console.error('Error al completar quiz:', error);
    }
  };

  const getNextQuizId = (currentId) => {
    const currentQuiz = definitions.find(q => q.id === currentId);
    if (!currentQuiz) return null;
    
    const nextQuiz = definitions.find(q => q.order === currentQuiz.order + 1);
    return nextQuiz?.id || null;
  };

  const handleNavigateToNext = (nextQuizId) => {
    if (nextQuizId) {
      navigate(`/quiz/tangent-line/${nextQuizId}`);
    } else {
      navigate('/quiz/tangent-line');
    }
  };

  const handleBackToQuizzes = () => {
    navigate('/quiz/tangent-line');
  };

  if (loading) {
    return (
      <div className="quiz-lesson-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando quiz...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="quiz-lesson-page">
        <div className="error-container">
          <h2>❌ Quiz no encontrado</h2>
          <p>No se pudo cargar el quiz "{currentQuizId}"</p>
          <button onClick={handleBackToQuizzes}>
            Volver a Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶
        <a href="/courses">Cursos</a> ▶
        <a href="/quiz/tangent-line">Quizzes: Línea Tangente</a> ▶
        <span>{quizInfo?.definition?.title || 'Quiz'}</span>
      </nav>

      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 {quizInfo?.definition?.title || 'Quiz'}</h1>
          <p className="quiz-description">
            {lessonData.mainStatement}
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ {quizInfo?.definition?.estimatedTime || '8-12 min'}</span>
            <span className="info-badge">
              🎯 {quizInfo?.definition?.difficulty === 'beginner' ? 'Principiante' : 
                   quizInfo?.definition?.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
            </span>
            <span className="info-badge">📊 4 preguntas</span>
            <span className="info-badge">
              📈 {quizInfo?.definition?.category === 'polynomial' ? 'Polinomial' :
                   quizInfo?.definition?.category === 'exponential' ? 'Exponencial' :
                   quizInfo?.definition?.category === 'trigonometric' ? 'Trigonométrica' : 'Logarítmica'}
            </span>
          </div>
        </div>

        <div className="quiz-content">
          <MultipleChoiceLesson 
            lessonData={lessonData}
            onQuizComplete={handleQuizComplete}
            onNavigateToNext={handleNavigateToNext}
            onBackToQuizzes={handleBackToQuizzes}
            currentQuizId={currentQuizId}
          />
        </div>
      </div>

      <style jsx>{`
        .quiz-lesson-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
          background: #F9FAFB;
          min-height: 100vh;
        }

        .breadcrumbs {
          margin-bottom: 2rem;
          font-size: 0.9rem;
          color: #6B7280;
        }

        .breadcrumbs a {
          color: #3B82F6;
          text-decoration: none;
        }

        .breadcrumbs a:hover {
          text-decoration: underline;
        }

        .quiz-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .quiz-header {
          background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .quiz-header h1 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
        }

        .quiz-description {
          font-size: 1.1rem;
          margin: 0 0 1.5rem 0;
          opacity: 0.9;
          line-height: 1.5;
        }

        .quiz-info {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .info-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
          padding: 2rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #E5E7EB;
          border-top: 4px solid #3B82F6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container h2 {
          color: #EF4444;
          margin-bottom: 1rem;
        }

        .error-container button {
          padding: 0.75rem 1.5rem;
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
        }

        .error-container button:hover {
          background: #2563EB;
        }
      `}</style>
    </div>
  );
};

export default MiPrimerQuiz;