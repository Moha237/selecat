import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import courseStructure, { getCourseProgress, getTopicsByStatus } from '../data/courseData';

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const courses = Object.values(courseStructure);
  const completedTopics = getTopicsByStatus('completed');

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Bàsic': return '#10b981';
      case 'Intermedi': return '#f59e0b';
      case 'Avançat': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completado';
      case 'in_progress': return 'En progreso';
      case 'pending': return 'Pendiente';
      default: return 'Pendiente';
    }
  };

  const filterTopics = (topics) => {
    return topics.filter(topic => {
      const difficultyMatch = filterDifficulty === 'Todos' || topic.difficulty === filterDifficulty;
      const statusMatch = filterStatus === 'Todos' || topic.status === filterStatus;
      return difficultyMatch && statusMatch;
    });
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Cursos de Matemáticas - 2º Bachillerato</h1>
        <p>Temario completo basado en el currículum oficial</p>
        
        <div className="stats-overview">
          <div className="stat-card">
            <h3>{completedTopics.length}</h3>
            <p>Temas Completados</p>
          </div>
          <div className="stat-card">
            <h3>{courses.length}</h3>
            <p>Bloques de Contenido</p>
          </div>
          <div className="stat-card">
            <h3>{Object.values(courseStructure).reduce((total, course) => 
              total + Object.values(course.sections).reduce((sectionTotal, section) => 
                sectionTotal + section.topics.length, 0), 0)}</h3>
            <p>Temas Totales</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <h3>Filtros</h3>
        <div className="filters">
          <div className="filter-group">
            <label>Dificultad:</label>
            <select 
              value={filterDifficulty} 
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Bàsic">Básico</option>
              <option value="Intermedi">Intermedio</option>
              <option value="Avançat">Avanzado</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Estado:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="completed">Completado</option>
              <option value="in_progress">En progreso</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map(course => {
          const progress = getCourseProgress(course.id);
          
          return (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-icon">{course.icon}</div>
                <div className="course-info">
                  <h2>{course.titleEs}</h2>
                  <p>{course.descriptionEs}</p>
                </div>
                <div className="course-progress">
                  <div className="progress-circle">
                    <span>{progress.percentage}%</span>
                  </div>
                  <p>{progress.completed} de {progress.total}</p>
                </div>
              </div>

              <div className="sections-list">
                {Object.values(course.sections).map(section => (
                  <div key={section.id} className="section-item">
                    <h4>{section.titleEs}</h4>
                    <p>{section.descriptionEs}</p>
                    
                    <div className="topics-grid">
                      {filterTopics(section.topics).map(topic => (
                        <div key={topic.id} className="topic-item">
                          {topic.url ? (
                            <Link to={topic.url} className="topic-link">
                              <div className="topic-content">
                                <span className="topic-title">{topic.titleEs}</span>
                                <span 
                                  className="difficulty-badge"
                                  style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                                >
                                  {topic.difficulty === 'Bàsic' ? 'Básico' : 
                                   topic.difficulty === 'Intermedi' ? 'Intermedio' :
                                   topic.difficulty === 'Avançat' ? 'Avanzado' : topic.difficulty}
                                </span>
                                <span 
                                  className="status-badge"
                                  style={{ backgroundColor: getStatusColor(topic.status) }}
                                >
                                  {getStatusText(topic.status)}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <div className="topic-disabled">
                              <div className="topic-content">
                                <span className="topic-title">{topic.titleEs}</span>
                                <span 
                                  className="difficulty-badge"
                                  style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                                >
                                  {topic.difficulty === 'Bàsic' ? 'Básico' : 
                                   topic.difficulty === 'Intermedi' ? 'Intermedio' :
                                   topic.difficulty === 'Avançat' ? 'Avanzado' : topic.difficulty}
                                </span>
                                <span 
                                  className="status-badge"
                                  style={{ backgroundColor: getStatusColor(topic.status) }}
                                >
                                  {getStatusText(topic.status)}
                                </span>
                                <span className="coming-soon">Próximamente</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {filterTopics(section.topics).length === 0 && (
                      <p className="no-topics">No hay temas que coincidan con los filtros seleccionados.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;