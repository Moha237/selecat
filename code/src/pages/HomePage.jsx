import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Aprende Matemáticas y Física de Forma Interactiva</h1>
          <p>Domina el cálculo, las derivadas y los conceptos de física a través de visualizaciones interactivas y explicaciones paso a paso.</p>
          <Link to="/lesson/tangent-line" className="cta-button">
            Comenzar
          </Link>
        </div>
      </section>

      <section className="courses-overview">
        <h2>Explora los Cursos</h2>
        <div className="courses-grid-home">
          <div className="course-card-home">
            <div className="course-icon">📈</div>
            <h3>Análisis</h3>
            <p>Funciones, límites, derivadas e integrales. El corazón del cálculo matemático.</p>
            <Link to="/courses" className="course-link">
              Ver Temas →
            </Link>
          </div>
          <div className="course-card-home">
            <div className="course-icon">📐</div>
            <h3>Álgebra y Geometría</h3>
            <p>Geometría espacial, matrices y sistemas de ecuaciones lineales.</p>
            <Link to="/courses" className="course-link">
              Ver Temas →
            </Link>
          </div>
          <div className="course-card-home">
            <div className="course-icon">🎲</div>
            <h3>Probabilidad</h3>
            <p>Cálculo de probabilidades, variables aleatorias y teorema de Bayes.</p>
            <Link to="/courses" className="course-link">
              Ver Temas →
            </Link>
          </div>
        </div>
        <div className="view-all-courses">
          <Link to="/courses" className="cta-button-secondary">
            Ver Todos los Cursos
          </Link>
        </div>
      </section>

      <section className="featured-lesson">
        <h2>Lección Destacada</h2>
        <div className="lesson-card">
          <h3>Rectas Tangentes</h3>
          <p>Aprende a calcular la recta tangente de una función en cualquier punto dado. Domina la derivada y la fórmula punto-pendiente a través de ejemplos interactivos.</p>
          <div className="lesson-meta">
            <span className="difficulty">Intermedio</span>
            <span className="topic">Análisis</span>
          </div>
          <Link to="/lesson/tangent-line" className="lesson-link">
            Comenzar Lección →
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>¿Por Qué Elegir SeleCat?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Visualizaciones Interactivas</h3>
            <p>Ve los conceptos matemáticos cobrar vida con gráficos dinámicos y controles interactivos.</p>
          </div>
          <div className="feature">
            <h3>Soluciones Paso a Paso</h3>
            <p>Sigue explicaciones detalladas que desglosan problemas complejos en pasos manejables.</p>
          </div>
          <div className="feature">
            <h3>Práctica con Exámenes Reales</h3>
            <p>Practica con preguntas reales de exámenes de Catalunya y otros sistemas educativos.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;