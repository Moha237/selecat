# 🎯 Guía Paso a Paso: Crear Tu Primer Quiz

## ✅ Objetivo
Crear un quiz para la función **f(x) = x² + 3x** en el punto **x = 2**

## 📋 Paso 1: Calcular los Valores Matemáticos

Antes de programar, necesitamos calcular:

```
Función: f(x) = x² + 3x
Derivada: f'(x) = 2x + 3

En x = 2:
- f(2) = 2² + 3(2) = 4 + 6 = 10
- f'(2) = 2(2) + 3 = 4 + 3 = 7

Recta tangente: y - 10 = 7(x - 2)
Simplificando: y = 7x - 4
```

## 📝 Paso 2: Añadir Tu Función a las Plantillas

**Archivo a editar:** `src/data/quizTemplates.js`

**Qué hacer:** Busca la sección `export const quizExamples = {` y añade tu función:

```javascript
export const quizExamples = {
  // ... funciones existentes ...
  
  // TU NUEVA FUNCIÓN - añadir al final antes de };
  miPrimeraFuncion: {
    functionLatex: "f(x) = x^2 + 3x",
    derivativeLatex: "f'(x) = 2x + 3",
    pointX: 2,
    yValue: 10,
    slopeValue: 7,
    tangentEquation: "y = 7x - 4"
  }
};
```

## 📄 Paso 3: Crear Tu Página de Quiz

**Archivo a crear:** `src/pages/MiPrimerQuiz.jsx`

**Contenido completo del archivo:**

```jsx
import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const MiPrimerQuiz = () => {
  const lessonData = createTangentLineQuiz('miPrimeraFuncion');
  
  return (
    <div className="quiz-lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <span>Mi Primer Quiz</span>
      </nav>
      
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Mi Primer Quiz: f(x) = x² + 3x</h1>
          <p className="quiz-description">
            Calcula paso a paso la recta tangente de f(x) = x² + 3x en el punto x = 2.
          </p>
          <div className="quiz-info">
            <span className="info-badge">⏱️ 8-12 min</span>
            <span className="info-badge">🎯 Principiante</span>
            <span className="info-badge">📊 5 preguntas</span>
            <span className="info-badge">📈 Polinomial</span>
          </div>
        </div>
        
        <div className="quiz-content">
          <MultipleChoiceLesson 
            lessonData={lessonData}
            onStepChange={(question, answer) => {
              console.log(`Mi Quiz - Pregunta ${question}, respuesta ${answer}`);
            }}
          />
        </div>
        
        <div className="quiz-footer">
          <div className="related-concepts">
            <h3>💡 Conceptos de Esta Lección</h3>
            <div className="concepts-list">
              <span className="concept-tag">Funciones Polinomiales</span>
              <span className="concept-tag">Regla de la Potencia</span>
              <span className="concept-tag">Derivadas Básicas</span>
              <span className="concept-tag">Recta Tangente</span>
            </div>
          </div>
          
          <div className="function-summary">
            <h3>🎯 Resumen de la Función</h3>
            <div className="function-details">
              <p><strong>Función:</strong> f(x) = x² + 3x</p>
              <p><strong>Derivada:</strong> f'(x) = 2x + 3</p>
              <p><strong>Punto de análisis:</strong> x = 2</p>
              <p><strong>Punto de tangencia:</strong> (2, 10)</p>
              <p><strong>Pendiente:</strong> f'(2) = 7</p>
              <p><strong>Recta tangente:</strong> y = 7x - 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPrimerQuiz;
```

## 🔗 Paso 4: Añadir la Ruta (Opcional)

Si quieres que se pueda acceder desde la navegación:

**Archivo a editar:** `src/App.js`

**Qué añadir:** Busca donde están las otras rutas y añade:

```jsx
// Importar tu componente al inicio del archivo
import MiPrimerQuiz from './pages/MiPrimerQuiz';

// Añadir la ruta dentro de <Routes>
<Route path="/quiz/mi-primer-quiz" element={<MiPrimerQuiz />} />
```

## 🧪 Paso 5: Probar Tu Quiz

1. **Guardar todos los archivos**
2. **Ejecutar el proyecto:** `npm start`
3. **Ir a:** `http://localhost:3000/quiz/mi-primer-quiz`
4. **Verificar que funciona:**
   - ✅ Se cargan las 5 preguntas
   - ✅ Las matemáticas son correctas
   - ✅ Las explicaciones aparecen
   - ✅ El progreso funciona

## 📁 Resumen de Archivos Modificados/Creados

```
src/
├── data/
│   └── quizTemplates.js          # ✏️ EDITADO - añadiste tu función
├── pages/
│   └── MiPrimerQuiz.jsx         # 🆕 NUEVO - tu página de quiz
└── App.js                       # ✏️ EDITADO - añadiste la ruta
```

## 🔧 Para Crear Más Quizzes

Una vez que tengas este funcionando, para crear otro quiz solo necesitas:

1. **Añadir nueva función** a `quizTemplates.js`
2. **Crear nueva página** copiando `MiPrimerQuiz.jsx`
3. **Cambiar el nombre** de la función en `createTangentLineQuiz('tuNuevaFuncion')`

## ❓ ¿Problemas?

**Error: "Cannot find module"**
- Verifica que el nombre `'miPrimeraFuncion'` sea exactamente igual en `quizTemplates.js` y en tu página

**Quiz no se carga**
- Revisa la consola del navegador (F12) para ver errores
- Verifica que todos los valores matemáticos sean números, no texto

**Matemáticas incorrectas**
- Usa Wolfram Alpha para verificar: `derivative of x^2 + 3x` y `evaluate at x=2`

## 🎉 ¡Listo!

Ahora tienes tu primer quiz funcionando. Es súper fácil crear más siguiendo el mismo patrón.