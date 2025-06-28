# 📚 Guía para Crear Nuevas Lecciones de Opción Múltiple

## 🎯 Resumen

Este sistema te permite crear fácilmente nuevas lecciones de preguntas de opción múltiple, especialmente para temas de cálculo como rectas tangentes. Cada lección sigue el mismo patrón: pregunta → respuesta → explicación → siguiente pregunta.

## 🔄 Dos Tipos de Lecciones

### 📝 **QUIZ (Solo Preguntas)**
- **Propósito**: Práctica pura de conceptos sin distracciones
- **Formato**: Preguntas de opción múltiple + explicaciones
- **Ideal para**: Evaluación, repaso rápido, práctica enfocada
- **Archivos**: `quizTemplates.js`, `QuizLessonPage.jsx`

### 📊 **INTERACTIVO (Preguntas + Gráficos)**
- **Propósito**: Comprensión visual y conceptual profunda
- **Formato**: Preguntas + visualización sincronizada
- **Ideal para**: Aprendizaje inicial, exploración de conceptos
- **Archivos**: `lessonTemplates.js`, `LessonPage.jsx`

## 📁 Estructura de Archivos

```
src/
├── data/
│   └── lessonTemplates.js     # Plantillas y ejemplos de lecciones
├── components/
│   ├── MultipleChoiceLesson.jsx   # Componente genérico para lecciones
│   └── InteractiveLessonContent.jsx  # Componente específico actual
└── pages/
    └── LessonPage.jsx         # Página que contiene la lección
```

## 🚀 Método 1: Crear QUIZ (Solo Preguntas) - Más Fácil

### Paso 1: Elegir una función de los ejemplos

En `src/data/quizTemplates.js` hay ejemplos predefinidos:

```javascript
// Ejemplos disponibles para quizzes:
- exponentialProduct: f(x) = xe^(x-1)     
- logarithmicProduct: f(x) = x·ln(x)      
- polynomialExponential: f(x) = x²e^x     
- trigonometricProduct: f(x) = x·sin(x)   
```

### Paso 2: Crear un quiz

```javascript
import { createTangentLineQuiz } from '../data/quizTemplates';

// Crear quiz con función logarítmica
const logQuiz = createTangentLineQuiz('logarithmicProduct');
```

### Paso 3: Crear la página

```jsx
import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineQuiz } from '../data/quizTemplates';

const MiQuizPage = () => {
  const lessonData = createTangentLineQuiz('logarithmicProduct');
  
  return (
    <div className="quiz-lesson-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📝 Mi Quiz Personalizado</h1>
          <p>Descripción de mi quiz...</p>
        </div>
        
        <div className="quiz-content">
          <MultipleChoiceLesson lessonData={lessonData} />
        </div>
      </div>
    </div>
  );
};
```

## 🎨 Método 2: Crear Lección Interactiva (Preguntas + Gráficos)

### Paso 1: Elegir una plantilla

En `src/data/lessonTemplates.js` ya hay ejemplos predefinidos:

```javascript
// Ejemplos disponibles:
- exponentialProduct: f(x) = xe^(x-1)     [ACTUAL]
- trigonometricProduct: f(x) = x²sin(x)   [NUEVO]
- logarithmicProduct: f(x) = x·ln(x)      [NUEVO]
```

### Paso 2: Crear una nueva lección

```javascript
// En cualquier archivo donde quieras usar la lección:
import { createTangentLineLesson } from '../data/lessonTemplates';

// Crear lección con función trigonométrica
const trigLesson = createTangentLineLesson('trigonometricProduct');

// Crear lección con función logarítmica  
const logLesson = createTangentLineLesson('logarithmicProduct');
```

### Paso 3: Usar el componente genérico

```jsx
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';

function NuevaLeccionPage() {
  const lessonData = createTangentLineLesson('trigonometricProduct');
  
  return (
    <div className="lesson-page">
      <MultipleChoiceLesson 
        lessonData={lessonData}
        onStepChange={(question, answer) => {
          console.log(`Pregunta ${question}, respuesta ${answer}`);
        }}
      />
    </div>
  );
}
```

## 🛠️ Método 2: Crear Nuevos Ejemplos (Personalizado)

### Paso 1: Añadir tu función a `lessonExamples`

En `src/data/lessonTemplates.js`, añade un nuevo ejemplo:

```javascript
export const lessonExamples = {
  // ... ejemplos existentes ...
  
  // Tu nueva función: f(x) = x³·cos(x)
  tuNuevaFuncion: {
    functionExpr: "f(x) = x³·cos(x)",
    functionLatex: "f(x) = x^3 \\cos(x)",
    derivativeExpr: "3*x*x*Math.cos(x) - x*x*x*Math.sin(x)",
    derivativeLatex: "f'(x) = 3x^2\\cos(x) - x^3\\sin(x)",
    pointX: 0,
    pointY: 0,
    slopeValue: 0,
    tangentEquation: "y = 0"
  }
};
```

### Paso 2: Usar tu nuevo ejemplo

```javascript
const miLeccion = createTangentLineLesson('tuNuevaFuncion');
```

## 🎨 Método 3: Crear Lección Completamente Personalizada

### Paso 1: Definir la estructura de datos

```javascript
const miLeccionPersonalizada = {
  template: tangentLineTemplate,
  questions: [
    {
      id: 0,
      question: "¿Tu pregunta personalizada?",
      options: [
        { text: "Opción A", isCorrect: false },
        { text: "Opción B", isCorrect: true },
        { text: "Opción C", isCorrect: false },
        { text: "Opción D", isCorrect: false }
      ],
      explanation: (
        <div>
          <p>Tu explicación personalizada aquí</p>
          <BlockMath math="tu_{formula} = aquí" />
        </div>
      )
    },
    // ... más preguntas ...
  ],
  metadata: {
    id: 'mi-leccion-unica',
    title: 'Mi Lección Personalizada',
    difficulty: 'beginner',
    tags: ['personalizado', 'mi-tema'],
    estimatedTime: '15 minutos'
  }
};
```

### Paso 2: Usar con el componente

```jsx
<MultipleChoiceLesson lessonData={miLeccionPersonalizada} />
```

## 📋 Parámetros que Necesitas Definir

Para una función f(x) en el punto x = a:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `functionExpr` | Expresión JavaScript | `"x * Math.exp(x - 1)"` |
| `functionLatex` | Fórmula en LaTeX | `"f(x) = xe^{x-1}"` |
| `derivativeExpr` | Derivada en JavaScript | `"(1 + x) * Math.exp(x - 1)"` |
| `derivativeLatex` | Derivada en LaTeX | `"f'(x) = (1 + x)e^{x-1}"` |
| `pointX` | Punto x donde calcular | `1` |
| `pointY` | Valor f(pointX) | `1` |
| `slopeValue` | Valor f'(pointX) | `2` |
| `tangentEquation` | Ecuación final | `"y = 2x - 1"` |

## 🧮 Herramientas para Calcular los Valores

### Online:
- **Wolfram Alpha**: `derivative of x*e^(x-1)` → `evaluate at x=1`
- **Symbolab**: Calculadora de derivadas paso a paso
- **Desmos**: Para visualizar las funciones

### En código JavaScript:
```javascript
// Para f(x) = x·e^(x-1) en x = 1:
const f = (x) => x * Math.exp(x - 1);
const fPrime = (x) => (1 + x) * Math.exp(x - 1);

console.log('f(1) =', f(1));           // → 1
console.log("f'(1) =", fPrime(1));     // → 2

// Ecuación de recta tangente: y - f(a) = f'(a)(x - a)
// y - 1 = 2(x - 1) → y = 2x - 1
```

## 📂 Organización de Archivos Recomendada

```
src/data/lessons/
├── tangent-lines/
│   ├── exponential-product.js      # f(x) = xe^(x-1)
│   ├── trigonometric-product.js    # f(x) = x²sin(x)
│   └── logarithmic-product.js      # f(x) = x·ln(x)
├── derivatives/
│   ├── chain-rule-basics.js
│   └── product-rule-advanced.js
└── integration/
    ├── substitution-method.js
    └── by-parts-method.js
```

## 🔗 Integración con el Sistema de Rutas

Para añadir tu nueva lección al sitio web:

### Paso 1: Crear la página

```jsx
// src/pages/TrigTangentPage.jsx
import React from 'react';
import MultipleChoiceLesson from '../components/MultipleChoiceLesson';
import { createTangentLineLesson } from '../data/lessonTemplates';

const TrigTangentPage = () => {
  const lessonData = createTangentLineLesson('trigonometricProduct');
  
  return (
    <div className="lesson-page">
      <nav className="breadcrumbs">
        <a href="/">Inicio</a> ▶ 
        <a href="/courses">Cursos</a> ▶ 
        <a href="/courses/calculus">Cálculo</a> ▶ 
        <span>Recta Tangente - Trigonométrica</span>
      </nav>
      
      <div className="lesson-container">
        <MultipleChoiceLesson lessonData={lessonData} />
      </div>
    </div>
  );
};

export default TrigTangentPage;
```

### Paso 2: Añadir la ruta

```jsx
// En App.js
import TrigTangentPage from './pages/TrigTangentPage';

// Añadir en las rutas:
<Route path="/lesson/tangent-trigonometric" element={<TrigTangentPage />} />
```

### Paso 3: Actualizar navegación

```jsx
// En courseData.js o donde tengas los cursos
{
  id: 'tangent-trigonometric',
  title: 'Recta Tangente - Función Trigonométrica',
  description: 'f(x) = x²sin(x)',
  difficulty: 'intermediate',
  status: 'available',
  link: '/lesson/tangent-trigonometric'
}
```

## ✅ Lista de Verificación

Antes de crear una nueva lección, asegúrate de:

- [ ] Calcular correctamente f(a) y f'(a)
- [ ] Verificar la ecuación de la recta tangente
- [ ] Probar las fórmulas en una calculadora
- [ ] Escribir las expresiones LaTeX correctamente
- [ ] Crear preguntas progresivas (fácil → difícil)
- [ ] Escribir explicaciones claras
- [ ] Probar la lección completa

## 🚨 Errores Comunes

1. **LaTeX mal formateado**: `f(x) = xe^{x-1}` ✅ vs `f(x) = xe^(x-1)` ❌
2. **Cálculos incorrectos**: Siempre verificar con herramientas externas
3. **JavaScript vs LaTeX**: Son diferentes sintaxis para la misma función
4. **Ecuación tangente**: Usar y - f(a) = f'(a)(x - a), no olvidar simplificar

## 📞 ¿Necesitas Ayuda?

Si encuentras problemas:
1. Revisa los ejemplos existentes en `lessonTemplates.js`
2. Usa Wolfram Alpha para verificar cálculos
3. Prueba la lección paso a paso antes de implementar

¡Feliz creación de lecciones! 🎉