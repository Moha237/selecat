import { InlineMath, BlockMath } from 'react-katex';

// Plantilla específica para quizzes (solo preguntas, sin visualización)
export const tangentLineQuizTemplate = {
  type: 'quiz-tangent-line',
  title: 'Quiz: Recta Tangente',
  description: 'Preguntas de opción múltiple para practicar el cálculo de rectas tangentes',
  
  // 🆕 Enunciado principal siempre visible
  getMainStatement: (params) => {
    return `Calcula la línea tangente de ${params.functionLatex} en x = ${params.pointX}`;
  },
  
  generateQuestions: (params) => {
    const { 
      functionLatex, derivativeLatex, pointX, slopeValue, yValue, tangentEquation,
      opcion_1_q1, opcion_2_q1, opcion_3_q1,
      opcion_1_q2, opcion_2_q2, opcion_3_q2,
      opcion_1_q3, opcion_2_q3, opcion_3_q3,
      opcion_1_q4, opcion_2_q4, opcion_3_q4
    } = params;
    
    // 🆕 Función helper para reemplazar placeholders
    const formatText = (text, params) => {
      if (!text) return text;
      return text
        .replace('{functionLatex}', functionLatex)
        .replace('{derivativeLatex}', derivativeLatex)
        .replace('{pointX}', pointX)
        .replace('{slopeValue}', slopeValue)
        .replace('{yValue}', yValue)
        .replace('{tangentEquation}', tangentEquation);
    };
    
    return [
      {
        id: 1,
        question: `Calcula la derivada de ${functionLatex}`,
        options: [
          { text: formatText(derivativeLatex, params), isCorrect: true },
          { text: formatText(opcion_1_q1, params), isCorrect: false },
          { text: formatText(opcion_2_q1, params), isCorrect: false },
          { text: formatText(opcion_3_q1, params), isCorrect: false }
        ],
        explanation: (
          <div>
            <p>Para derivar {functionLatex}, aplicamos las reglas de derivación correspondientes.</p>
            <BlockMath math={`f'(x) = ${derivativeLatex.replace("f'(x) = ", "")}`} />
          </div>
        ),
        hint: "Identifica qué regla de derivación aplicar según el tipo de función",
        topic: "Cálculo de derivadas"
      },
      {
        id: 2,
        question: `Si evaluamos la derivada en x = ${pointX}, ¿cuál es el valor de f'(${pointX})?`,
        options: [
          { text: formatText(`f'(${pointX}) = ${slopeValue}`, params), isCorrect: true },
          { text: formatText(opcion_1_q2, params), isCorrect: false },
          { text: formatText(opcion_2_q2, params), isCorrect: false },
          { text: formatText(opcion_3_q2, params), isCorrect: false }
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
          { text: formatText(`f(${pointX}) = ${yValue}`, params), isCorrect: true },
          { text: formatText(opcion_1_q3, params), isCorrect: false },
          { text: formatText(opcion_2_q3, params), isCorrect: false },
          { text: formatText(opcion_3_q3, params), isCorrect: false }
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
        question: `¿Cuál es la recta tangente de ${functionLatex} en el punto x = ${pointX}?`,
        options: [
          { text: formatText(tangentEquation, params), isCorrect: true },
          { text: formatText(opcion_1_q4, params), isCorrect: false },
          { text: formatText(opcion_2_q4, params), isCorrect: false },
          { text: formatText(opcion_3_q4, params), isCorrect: false }
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
    // 🆕 OPCIONES PERSONALIZADAS para cada pregunta
    opcion_1_q1: "f'(x) = 3x + 2",
    opcion_2_q1: "f'(x) = x^2 + 3",
    opcion_3_q1: "f'(x) = 2x^2 + 3x",
    
    opcion_1_q2: "f'(2) = 2",
    opcion_2_q2: "f'(2) = 10",
    opcion_3_q2: "f'(2) = 3",
    
    opcion_1_q3: "f(2) = 7",
    opcion_2_q3: "f(2) = 4",
    opcion_3_q3: "f(2) = 6",
    
    opcion_1_q4: "y = 2x + 6",
    opcion_2_q4: "y = 7x + 10",
    opcion_3_q4: "y = 10x - 7"
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
    mainStatement: tangentLineQuizTemplate.getMainStatement(params), // 🆕 Enunciado principal
    questions: tangentLineQuizTemplate.generateQuestions(params),
    metadata: {
      id: `quiz-tangent-line-${exampleKey}`,
      title: `Quiz: Recta Tangente - ${params.functionLatex}`,
      type: 'quiz',
      difficulty: 'intermediate',
      tags: ['quiz', 'derivadas', 'recta_tangente'],
      estimatedTime: '8-12 minutos',
      questionCount: 4, // Ahora son exactamente 4 preguntas
      passingScore: 80,
      topics: [
        'Cálculo de derivadas',
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