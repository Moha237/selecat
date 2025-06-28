import { InlineMath, BlockMath } from 'react-katex';

// Plantilla específica para quizzes (solo preguntas, sin visualización)
export const tangentLineQuizTemplate = {
  type: 'quiz-tangent-line',
  title: 'Quiz: Recta Tangente',
  description: 'Preguntas de opción múltiple para practicar el cálculo de rectas tangentes',
  
  generateQuestions: (params) => {
    const { 
      functionLatex, derivativeLatex, pointX, slopeValue, yValue, tangentEquation,
      customOptions, customQuestions 
    } = params;
    
    // 🆕 Función helper para reemplazar placeholders
    const formatQuestion = (questionTemplate, params) => {
      return questionTemplate
        .replace('{functionLatex}', functionLatex)
        .replace('{derivativeLatex}', derivativeLatex)
        .replace('{pointX}', pointX);
    };
    
    return [
      {
        id: 0,
        question: customQuestions?.question1 
          ? formatQuestion(customQuestions.question1, params)
          : `Para calcular la recta tangente de ${functionLatex}, ¿qué regla de derivación debes usar?`,
        options: customOptions?.question1 || [
          { text: "Regla de la cadena", isCorrect: false },
          { text: "Regla del producto", isCorrect: true },
          { text: "Regla del cociente", isCorrect: false },
          { text: "Derivada directa", isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Para funciones que son <strong>producto de dos funciones</strong>, como {functionLatex}, necesitamos la regla del producto.</p>
            <p>La regla del producto establece:</p>
            <BlockMath math="[u(x) \cdot v(x)]' = u'(x) \cdot v(x) + u(x) \cdot v'(x)" />
          </div>
        ),
        hint: "Identifica si la función es suma, producto, cociente o composición.",
        topic: "Reglas de derivación"
      },
      {
        id: 1,
        question: customQuestions?.question2 
          ? formatQuestion(customQuestions.question2, params)
          : `¿Cuál es la derivada de ${functionLatex}?`,
        options: customOptions?.question2 || [
          { text: derivativeLatex, isCorrect: true },
          { text: functionLatex.replace('f(x)', "f'(x)"), isCorrect: false },
          { text: "f'(x) = e^(x-1)", isCorrect: false },
          { text: "f'(x) = x·e^(x-1)", isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Aplicando la regla del producto paso a paso:</p>
            <p>Sea u(x) = x y v(x) = e^(x-1)</p>
            <p>Entonces u'(x) = 1 y v'(x) = e^(x-1)</p>
            <BlockMath math={`f'(x) = ${derivativeLatex.replace("f'(x) = ", "")}`} />
          </div>
        ),
        hint: "Recuerda aplicar la regla del producto: (uv)' = u'v + uv'",
        topic: "Aplicación de reglas"
      },
      {
        id: 2,
        question: `Si evaluamos la derivada en x = ${pointX}, ¿cuál es el valor de f'(${pointX})?`,
        options: [
          { text: `f'(${pointX}) = ${slopeValue}`, isCorrect: true },
          { text: `f'(${pointX}) = ${yValue}`, isCorrect: false },
          { text: `f'(${pointX}) = 1`, isCorrect: false },
          { text: `f'(${pointX}) = 0`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Sustituimos x = {pointX} en la derivada:</p>
            <BlockMath math={`f'(${pointX}) = ${slopeValue}`} />
            <p>Este valor representa la <strong>pendiente</strong> de la recta tangente.</p>
          </div>
        ),
        hint: `Sustituye x = ${pointX} en la fórmula de la derivada`,
        topic: "Evaluación de derivadas"
      },
      {
        id: 3,
        question: `¿Cuál es el valor de la función original en x = ${pointX}?`,
        options: [
          { text: `f(${pointX}) = ${yValue}`, isCorrect: true },
          { text: `f(${pointX}) = ${slopeValue}`, isCorrect: false },
          { text: `f(${pointX}) = 0`, isCorrect: false },
          { text: `f(${pointX}) = e`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Evaluamos la función original en x = {pointX}:</p>
            <BlockMath math={`f(${pointX}) = ${yValue}`} />
            <p>Esto nos da el punto de tangencia: <strong>({pointX}, {yValue})</strong></p>
          </div>
        ),
        hint: `Sustituye x = ${pointX} en la función original`,
        topic: "Evaluación de funciones"
      },
      {
        id: 4,
        question: `Con la pendiente m = ${slopeValue} y el punto (${pointX}, ${yValue}), ¿cuál es la ecuación de la recta tangente?`,
        options: [
          { text: tangentEquation, isCorrect: true },
          { text: `y = ${slopeValue}x + ${yValue}`, isCorrect: false },
          { text: `y = x + ${yValue - pointX}`, isCorrect: false },
          { text: `y = ${yValue}x - ${slopeValue}`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Usamos la fórmula punto-pendiente:</p>
            <BlockMath math="y - y_1 = m(x - x_1)" />
            <p>Sustituyendo nuestros valores:</p>
            <BlockMath math={`y - ${yValue} = ${slopeValue}(x - ${pointX})`} />
            <p>Simplificando:</p>
            <BlockMath math={tangentEquation.replace('y = ', '')} />
          </div>
        ),
        hint: "Usa la fórmula punto-pendiente: y - y₁ = m(x - x₁)",
        topic: "Ecuación punto-pendiente"
      }
    ];
  }
};

// Ejemplos específicos para quizzes
export const quizExamples = {
  exponentialProduct: {
    functionLatex: "f(x) = xe^{x-1}",
    derivativeLatex: "f'(x) = (1 + x)e^{x-1}",
    pointX: 1,
    yValue: 1,
    slopeValue: 2,
    tangentEquation: "y = 2x - 1"
  },
  
  logarithmicProduct: {
    functionLatex: "f(x) = x \\ln(x)",
    derivativeLatex: "f'(x) = \\ln(x) + 1",
    pointX: 1,
    yValue: 0,
    slopeValue: 1,
    tangentEquation: "y = x - 1"
  },
  
  polynomialExponential: {
    functionLatex: "f(x) = x^2 e^x",
    derivativeLatex: "f'(x) = (2x + x^2)e^x",
    pointX: 0,
    yValue: 0,
    slopeValue: 0,
    tangentEquation: "y = 0"
  },
  
  trigonometricProduct: {
    functionLatex: "f(x) = x \\sin(x)",
    derivativeLatex: "f'(x) = \\sin(x) + x\\cos(x)",
    pointX: 0,
    yValue: 0,
    slopeValue: 0,
    tangentEquation: "y = 0"
  },
  
  // FUNCIONES POLINOMIALES
  polynomial_2_x2: {  // f(x) = x² + 3x en x = 2
    functionLatex: "f(x) = x^2 + 3x",
    derivativeLatex: "f'(x) = 2x + 3",
    pointX: 2,
    yValue: 10,
    slopeValue: 7,
    tangentEquation: "y = 7x - 4",
    // 🆕 OPCIONES PERSONALIZADAS (opcional)
    customOptions: {
      question1: [
        { text: "{derivativeLatex}", isCorrect: true },
        { text: "f'(x) = 3x + 4", isCorrect: false },
        { text: "f'(x) = x^2 + 3", isCorrect: false },
        { text: "f'(x) = x", isCorrect: false }
      ],
      question2: [
        { text: "f'(x) = 7", isCorrect: true},
        { text: "f'(x) = 2", isCorrect: false},
        { text: "f'(x) = 1", isCorrect: false},
        { text: "f'(x) = 8", isCorrect: false},
      ],
      question3: [
        { text: "f(x) = 4", isCorrect: true},
        { text: "f(x) = 2", isCorrect: false},
        { text: "f(x) = 1", isCorrect: false},
        { text: "f(x) = 3", isCorrect: false},
      ],
      question4: [
        { text: "{tangentEquation}", isCorrect: true},
        { text: "y = 3x", isCorrect: false},
        { text: "y = 10x - 4", isCorrect: false},
        { text: "y = 7", isCorrect: false},
      ]
    },
    // 🆕 FORMATO DE PREGUNTAS PERSONALIZADO (opcional)
    customQuestions: {
      question1: "Calcula la derivada de {functionLatex}:",
      question2: "Cuál es el valor de f'({pointX})?",
      question3: "Cuál es el valor de f({pointX})?",
      question4: "Cuál es la ecuación de la recta tangente?"
      
    }
  },
  
  polynomial_2_x0: {  // f(x) = x² + 3x en x = 0
    functionLatex: "f(x) = x^2 + 3x",
    derivativeLatex: "f'(x) = 2x + 3",
    pointX: 0,
    yValue: 0,
    slopeValue: 3,
    tangentEquation: "y = 3x"
  },
  
  polynomial_3_x1: {  // f(x) = x³ - 2x en x = 1
    functionLatex: "f(x) = x^3 - 2x",
    derivativeLatex: "f'(x) = 3x^2 - 2",
    pointX: 1,
    yValue: -1,
    slopeValue: 1,
    tangentEquation: "y = x - 2"
  },
  
  // FUNCIONES EXPONENCIALES
  exponential_pure_x0: {  // f(x) = e^x en x = 0
    functionLatex: "f(x) = e^x",
    derivativeLatex: "f'(x) = e^x",
    pointX: 0,
    yValue: 1,
    slopeValue: 1,
    tangentEquation: "y = x + 1"
  },
  
  exponential_product_x2: {  // f(x) = xe^(x-1) en x = 2
    functionLatex: "f(x) = xe^{x-1}",
    derivativeLatex: "f'(x) = (1 + x)e^{x-1}",
    pointX: 2,
    yValue: 2,  // 2 * e^1 = 2e ≈ 5.44, pero simplificando
    slopeValue: 3,  // (1 + 2) * e^1 = 3e ≈ 8.15
    tangentEquation: "y = 3x - 4"
  },
  
  // FUNCIONES TRIGONOMÉTRICAS  
  trigonometric_sin_x0: {  // f(x) = sin(x) en x = 0
    functionLatex: "f(x) = \\sin(x)",
    derivativeLatex: "f'(x) = \\cos(x)",
    pointX: 0,
    yValue: 0,
    slopeValue: 1,
    tangentEquation: "y = x"
  },
  
  trigonometric_product_xpi: {  // f(x) = x·sin(x) en x = π
    functionLatex: "f(x) = x\\sin(x)",
    derivativeLatex: "f'(x) = \\sin(x) + x\\cos(x)",
    pointX: "\\pi",
    yValue: 0,
    slopeValue: -3.14,  // aproximación de -π
    tangentEquation: "y = -\\pi(x - \\pi)"
  },
  
  // FUNCIONES LOGARÍTMICAS
  logarithmic_pure_xe: {  // f(x) = ln(x) en x = e
    functionLatex: "f(x) = \\ln(x)",
    derivativeLatex: "f'(x) = \\frac{1}{x}",
    pointX: "e",
    yValue: 1,
    slopeValue: "\\frac{1}{e}",
    tangentEquation: "y = \\frac{1}{e}(x - e) + 1"
  },

  // FUNCIONES PRODUCTO
  product_x_sinx_x0: {  // f(x) = x·sin(x) en x = 0
    functionLatex: "f(x) = x \\sin(x)",
    derivativeLatex: "f'(x) = \\sin(x) + x \\cos(x)",
    pointX: 0,
    yValue: 0,
    slopeValue: 0,
    tangentEquation: "y = 0"
  }
};

// Función para crear un quiz completo
export const createTangentLineQuiz = (exampleKey) => {
  const params = quizExamples[exampleKey];
  if (!params) {
    throw new Error(`Ejemplo de quiz '${exampleKey}' no encontrado`);
  }
  
  return {
    template: tangentLineQuizTemplate,
    questions: tangentLineQuizTemplate.generateQuestions(params),
    metadata: {
      id: `quiz-tangent-line-${exampleKey}`,
      title: `Quiz: Recta Tangente - ${params.functionLatex}`,
      type: 'quiz',
      difficulty: 'intermediate',
      tags: ['quiz', 'derivadas', 'recta_tangente'],
      estimatedTime: '8-12 minutos',
      questionCount: 5,
      passingScore: 80,
      topics: [
        'Reglas de derivación',
        'Aplicación de reglas', 
        'Evaluación de derivadas',
        'Evaluación de funciones',
        'Ecuación punto-pendiente'
      ]
    }
  };
};

// Función helper para crear múltiples quizzes
export const createQuizSeries = (examples = ['exponentialProduct', 'logarithmicProduct', 'polynomialExponential']) => {
  return examples.map(example => createTangentLineQuiz(example));
};