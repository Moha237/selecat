import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizProgress } from '../hooks/useQuizProgress';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';

const TangentLineQuizzes = () => {
  const navigate = useNavigate();
  const { 
    progress, 
    definitions, 
    loading, 
    error, 
    startQuiz, 
    resetQuiz, 
    getOverallStats 
  } = useQuizProgress();

  const [selectedCategory, setSelectedCategory] = useState('all');

  // ========================
  // DATOS Y ESTADÍSTICAS
  // ========================

  const stats = getOverallStats();
  
  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'polynomial', name: 'Polinomiales', icon: '📈' },
    { id: 'exponential', name: 'Exponenciales', icon: '📊' },
    { id: 'trigonometric', name: 'Trigonométricas', icon: '〰️' },
    { id: 'logarithmic', name: 'Logarítmicas', icon: '📉' }
  ];

  const filteredQuizzes = selectedCategory === 'all' 
    ? definitions 
    : definitions.filter(quiz => quiz.category === selectedCategory);

  // ========================
  // HANDLERS
  // ========================

  const handleStartQuiz = async (quizId) => {
    try {
      await startQuiz(quizId);
      navigate(`/quiz/tangent-line/${quizId}`);
    } catch (error) {
      console.error('Error al iniciar quiz:', error);
    }
  };

  const handleContinueQuiz = (quizId) => {
    navigate(`/quiz/tangent-line/${quizId}`);
  };

  const handleResetQuiz = async (quizId) => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar este quiz? Se perderá todo el progreso.')) {
      try {
        await resetQuiz(quizId);
      } catch (error) {
        console.error('Error al reiniciar quiz:', error);
      }
    }
  };

  // ========================
  // RENDERIZADO
  // ========================

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <div className="error-container">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶
        <a href="/courses">Cursos</a> ▶
        <span>Quizzes: Línea Tangente</span>
      </nav>

      {/* HEADER PRINCIPAL */}
      <header className="page-header">
        <div className="header-content">
          <h1>🎯 Quizzes: Línea Tangente</h1>
          <p className="page-description">
            Practica el cálculo de líneas tangentes con estos quizzes interactivos. 
            Cada quiz se enfoca en un tipo específico de función y punto de análisis.
          </p>
        </div>
        
        <div className="stats-card">
          <h3>📊 Tu Progreso</h3>
          <ProgressBar 
            completed={stats.completed} 
            total={stats.totalQuizzes}
            label="Quizzes completados"
          />
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <div>
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completados</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🔄</span>
              <div>
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">En progreso</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📋</span>
              <div>
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">Pendientes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FILTROS */}
      <section className="filters-section">
        <h3>🔍 Filtrar por categoría</h3>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.name}
              <span className="filter-count">
                ({category.id === 'all' 
                  ? definitions.length 
                  : definitions.filter(q => q.category === category.id).length
                })
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* LISTA DE QUIZZES */}
      <section className="quizzes-section">
        <div className="section-header">
          <h3>📝 Quizzes Disponibles</h3>
          <p className="section-description">
            {selectedCategory === 'all' 
              ? `Mostrando todos los ${filteredQuizzes.length} quizzes disponibles`
              : `Mostrando ${filteredQuizzes.length} quizzes de ${categories.find(c => c.id === selectedCategory)?.name}`
            }
          </p>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="empty-state">
            <h4>📭 No hay quizzes disponibles</h4>
            <p>No se encontraron quizzes para la categoría seleccionada.</p>
          </div>
        ) : (
          <div className="quizzes-grid">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                progress={progress[quiz.id]}
                onStart={handleStartQuiz}
                onContinue={handleContinueQuiz}
                onReset={handleResetQuiz}
              />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER CON INFORMACIÓN */}
      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>💡 Consejos para los Quizzes</h4>
            <ul>
              <li>Empieza por los quizzes de nivel principiante</li>
              <li>Revisa las explicaciones después de cada pregunta</li>
              <li>Puedes repetir los quizzes las veces que quieras</li>
              <li>Tu progreso se guarda automáticamente</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🎯 Recomendaciones</h4>
            <p>
              Para un mejor aprendizaje, te sugerimos seguir el orden establecido:
              primero funciones polinomiales, luego exponenciales, y finalmente 
              trigonométricas y logarítmicas.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .quiz-page {
          max-width: 1200px;
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

        .page-header {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
          margin-bottom: 3rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .page-header {
            grid-template-columns: 1fr;
          }
        }

        .header-content h1 {
          font-size: 2.5rem;
          color: #111827;
          margin: 0 0 1rem 0;
          font-weight: 800;
        }

        .page-description {
          font-size: 1.1rem;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .stats-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
        }

        .stats-card h3 {
          margin: 0 0 1rem 0;
          color: #111827;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }

        .stat-icon {
          font-size: 1.5rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #6B7280;
        }

        .filters-section {
          margin-bottom: 2rem;
        }

        .filters-section h3 {
          margin: 0 0 1rem 0;
          color: #111827;
        }

        .category-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .filter-button:hover {
          border-color: #3B82F6;
          background: #EFF6FF;
        }

        .filter-button.active {
          border-color: #3B82F6;
          background: #3B82F6;
          color: white;
        }

        .filter-count {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .quizzes-section {
          margin-bottom: 3rem;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h3 {
          margin: 0 0 0.5rem 0;
          color: #111827;
          font-size: 1.5rem;
        }

        .section-description {
          color: #6B7280;
          margin: 0;
          font-size: 0.9rem;
        }

        .quizzes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .quizzes-grid {
            grid-template-columns: 1fr;
          }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 12px;
          border: 2px dashed #E5E7EB;
        }

        .empty-state h4 {
          margin: 0 0 0.5rem 0;
          color: #6B7280;
        }

        .empty-state p {
          color: #9CA3AF;
          margin: 0;
        }

        .page-footer {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }

        .footer-section h4 {
          margin: 0 0 1rem 0;
          color: #111827;
        }

        .footer-section ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #6B7280;
        }

        .footer-section li {
          margin-bottom: 0.5rem;
        }

        .footer-section p {
          margin: 0;
          color: #6B7280;
          line-height: 1.6;
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
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

        .error-container button {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TangentLineQuizzes;