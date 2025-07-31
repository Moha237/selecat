import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ 
  quiz, 
  progress, 
  onStart, 
  onContinue, 
  onReset,
  className = "" 
}) => {
  const getStatusInfo = () => {
    if (!progress || progress.status === 'pending') {
      return {
        icon: '📋',
        status: 'Pendiente',
        statusClass: 'pending',
        action: 'Empezar',
        actionClass: 'start',
        showProgress: false
      };
    }
    
    if (progress.status === 'in_progress') {
      return {
        icon: '🔄',
        status: 'En progreso',
        statusClass: 'in-progress',
        action: 'Continuar',
        actionClass: 'continue',
        showProgress: true,
        progressText: `Pregunta ${progress.currentQuestion + 1}/${progress.totalQuestions}`
      };
    }
    
    if (progress.status === 'completed') {
      return {
        icon: '✅',
        status: 'Completado',
        statusClass: 'completed',
        action: 'Repetir',
        actionClass: 'repeat',
        showProgress: false,
        score: progress.score,
        completedAt: progress.completedAt
      };
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString();
  };

  const statusInfo = getStatusInfo();

  const handleAction = () => {
    if (statusInfo.statusClass === 'pending') {
      onStart?.(quiz.id);
    } else if (statusInfo.statusClass === 'in-progress') {
      onContinue?.(quiz.id);
    } else if (statusInfo.statusClass === 'completed') {
      onReset?.(quiz.id);
    }
  };

  return (
    <div className={`quiz-card ${statusInfo.statusClass} ${className}`}>
      <div className="quiz-card-header">
        <div className="quiz-status">
          <span className="status-icon">{statusInfo.icon}</span>
          <span className="status-text">{statusInfo.status}</span>
        </div>
        <div className="quiz-difficulty">
          <span className={`difficulty-badge ${quiz.difficulty}`}>
            {quiz.difficulty === 'beginner' && '🎯 Principiante'}
            {quiz.difficulty === 'intermediate' && '📊 Intermedio'}
            {quiz.difficulty === 'advanced' && '🔥 Avanzado'}
          </span>
        </div>
      </div>

      <div className="quiz-content">
        <h3 className="quiz-title">{quiz.title}</h3>
        <p className="quiz-description">{quiz.description}</p>
        
        <div className="quiz-meta">
          <span className="meta-item">
            <span className="meta-icon">⏱️</span>
            {quiz.estimatedTime}
          </span>
          <span className="meta-item">
            <span className="meta-icon">📝</span>
            4 preguntas
          </span>
          <span className="meta-item">
            <span className="meta-icon">📚</span>
            {quiz.category}
          </span>
        </div>

        {statusInfo.showProgress && (
          <div className="quiz-progress">
            <div className="progress-text">{statusInfo.progressText}</div>
            <div className="progress-bar-mini">
              <div 
                className="progress-fill-mini"
                style={{ width: `${(progress.currentQuestion / progress.totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {statusInfo.score !== undefined && (
          <div className="quiz-results">
            <div className="score-display">
              <span className="score-label">Puntuación:</span>
              <span className={`score-value ${statusInfo.score >= 75 ? 'passed' : 'failed'}`}>
                {statusInfo.score}%
              </span>
            </div>
            {progress.timeSpent > 0 && (
              <div className="time-display">
                <span className="time-icon">⏱️</span>
                <span className="time-value">{formatTime(progress.timeSpent)}</span>
              </div>
            )}
            {statusInfo.completedAt && (
              <div className="completed-date">
                Completado {formatDate(statusInfo.completedAt)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="quiz-actions">
        <button 
          className={`action-button ${statusInfo.actionClass}`}
          onClick={handleAction}
        >
          {statusInfo.action}
        </button>
        
        <Link 
          to={`/quiz/tangent-line/${quiz.id}`}
          className="details-link"
        >
          Ver detalles
        </Link>
      </div>

      <style jsx>{`
        .quiz-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 2px solid #E5E7EB;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .quiz-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .quiz-card.completed {
          border-color: #10B981;
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf9 100%);
        }

        .quiz-card.in-progress {
          border-color: #F59E0B;
          background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
        }

        .quiz-card.pending {
          border-color: #6B7280;
        }

        .quiz-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .quiz-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-icon {
          font-size: 1.2rem;
        }

        .status-text {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .pending .status-text { color: #6B7280; }
        .in-progress .status-text { color: #F59E0B; }
        .completed .status-text { color: #10B981; }

        .difficulty-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .difficulty-badge.beginner {
          background: #DBEAFE;
          color: #1E40AF;
        }

        .difficulty-badge.intermediate {
          background: #FEF3C7;
          color: #92400E;
        }

        .difficulty-badge.advanced {
          background: #FEE2E2;
          color: #991B1B;
        }

        .quiz-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .quiz-description {
          color: #6B7280;
          font-size: 0.9rem;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .quiz-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: #6B7280;
        }

        .meta-icon {
          font-size: 0.9rem;
        }

        .quiz-progress {
          background: #F3F4F6;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .progress-text {
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .progress-bar-mini {
          width: 100%;
          height: 6px;
          background: #E5E7EB;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill-mini {
          height: 100%;
          background: #F59E0B;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .quiz-results {
          background: #F9FAFB;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .score-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .score-label {
          font-size: 0.85rem;
          color: #6B7280;
        }

        .score-value {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .score-value.passed {
          color: #10B981;
        }

        .score-value.failed {
          color: #EF4444;
        }

        .time-display {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: #6B7280;
          margin-bottom: 0.25rem;
        }

        .completed-date {
          font-size: 0.75rem;
          color: #9CA3AF;
          font-style: italic;
        }

        .quiz-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .action-button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
        }

        .action-button.start {
          background: #3B82F6;
          color: white;
        }

        .action-button.start:hover {
          background: #2563EB;
        }

        .action-button.continue {
          background: #F59E0B;
          color: white;
        }

        .action-button.continue:hover {
          background: #D97706;
        }

        .action-button.repeat {
          background: #6B7280;
          color: white;
        }

        .action-button.repeat:hover {
          background: #4B5563;
        }

        .details-link {
          color: #6B7280;
          text-decoration: none;
          font-size: 0.85rem;
          padding: 0.5rem;
          border-radius: 6px;
          transition: color 0.2s ease;
        }

        .details-link:hover {
          color: #374151;
          background: #F3F4F6;
        }
      `}</style>
    </div>
  );
};

export default QuizCard;