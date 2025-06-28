import { InlineMath, BlockMath } from 'react-katex';

// Plantilla base para lecciones de recta tangente
export const tangentLineTemplate = {
  type: 'tangent-line',
  title: 'Recta Tangente',
  description: 'Calcular la recta tangente de una función en un punto dado',
  
  // Función para generar preguntas basadas en parámetros
  generateQuestions: (params) => {
    const { functionExpr, functionLatex, derivativeLatex, pointX, slopeValue, yValue, tangentEquation } = params;
    
    return [
      {
        id: 0,
        question: `Considera la función ${functionLatex}. ¿Qué regla de derivación necesitas usar para calcular f'(x)?`,
        options: [
          { text: "Regla de la cadena", isCorrect: false },
          { text: "Regla del producto", isCorrect: true },
          { text: "Regla del cociente", isCorrect: false },
          { text: "Derivada de una función exponencial simple", isCorrect: false }
        ],
        explanation: (
          <div>
            <p>[PLACEHOLDER: Explicación de por qué usar la regla del producto]</p>
            <p><em>Aquí se explicaría paso a paso el concepto de manera interactiva</em></p>
            <BlockMath math="f'(x) = u'(x) \\cdot v(x) + u(x) \\cdot v'(x)" />
          </div>
        )
      },
      {
        id: 1,
        question: `Aplicando la regla del producto a ${functionLatex}, ¿cuál es f'(x)?`,
        options: [
          { text: "f'(x) = e^(x-1)", isCorrect: false },
          { text: functionExpr,        isCorrect: false },
          { text: derivativeLatex,      isCorrect: true  },
          { text: "f'(x) = (x-1)e^(x-1)", isCorrect: false }
        ],
        explanation: (
          <div>
            <p>[PLACEHOLDER: Demostración paso a paso de la aplicación de la regla del producto]</p>
            <p><em>Aquí se mostraría el proceso completo de derivación de manera interactiva</em></p>
            <BlockMath math={`f'(x) = ${derivativeLatex.replace("f'(x) = ", "")}`} />
          </div>
        )
      },
      {
        id: 2,
        question: `¿Cuál es el valor de f'(${pointX})?`,
        options: [
          { text: `f'(${pointX}) = 1`, isCorrect: false },
          { text: `f'(${pointX}) = ${slopeValue}`, isCorrect: true },
          { text: `f'(${pointX}) = e`, isCorrect: false },
          { text: `f'(${pointX}) = 0`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>[PLACEHOLDER: Cálculo paso a paso de la evaluación de la derivada]</p>
            <p><em>Aquí se mostraría la sustitución y simplificación paso a paso</em></p>
            <BlockMath math={`f'(${pointX}) = ${slopeValue}`} />
          </div>
        )
      },
      {
        id: 3,
        question: `¿Cuál es el valor de f(${pointX})?`,
        options: [
          { text: `f(${pointX}) = 0`, isCorrect: false },
          { text: `f(${pointX}) = ${yValue}`, isCorrect: true },
          { text: `f(${pointX}) = ${slopeValue}`, isCorrect: false },
          { text: `f(${pointX}) = e`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>[PLACEHOLDER: Cálculo paso a paso de la evaluación de la función]</p>
            <p><em>Aquí se mostraría la sustitución y simplificación paso a paso</em></p>
            <BlockMath math={`f(${pointX}) = ${yValue}`} />
          </div>
        )
      },
      {
        id: 4,
        question: `Con la pendiente m = ${slopeValue} y el punto (${pointX}, ${yValue}), ¿cuál es la ecuación de la recta tangente?`,
        options: [
          { text: `y = x + ${yValue}`, isCorrect: false },
          { text: tangentEquation, isCorrect: true },
          { text: `y = ${slopeValue}x + ${yValue}`, isCorrect: false },
          { text: `y = x - ${yValue}`, isCorrect: false }
        ],
        explanation: (
          <div>
            <p>[PLACEHOLDER: Aplicación de la fórmula punto-pendiente]</p>
            <p><em>Aquí se mostraría el proceso de construcción de la ecuación</em></p>
            <BlockMath math={`y = ${tangentEquation.replace('y = ', '')}`} />
          </div>
        )
      }
    ];
  },
  
  // Función para generar datos de visualización
  generateVisualization: (params) => {
    const { functionExpr, derivativeExpr, pointX, pointY, slopeValue, tangentEquation } = params;
    
    return {
      function: {
        expr: functionExpr,
        latex: params.functionLatex
      },
      derivative: {
        expr: derivativeExpr,
        latex: params.derivativeLatex
      },
      point: {
        x: pointX,
        y: pointY
      },
      slope: slopeValue,
      tangentEquation: tangentEquation,
      plotRange: {
        x: [-1, 3],
        y: [-2, 10]
      }
    };
  }
};

// Ejemplos de parámetros para diferentes funciones
export const lessonExamples = {
  // Ejemplo actual: f(x) = xe^(x-1)
  exponentialProduct: {
    functionExpr: "f(x) = x·e^(x-1)",
    functionLatex: "f(x) = xe^{x-1}",
    derivativeExpr: "(1 + x) * Math.exp(x - 1)",
    derivativeLatex: "f'(x) = (1 + x)e^{x-1}",
    pointX: 1,
    pointY: 1,
    slopeValue: 2,
    tangentEquation: "y = 2x - 1"
  },
  
  // Ejemplo: f(x) = x²·sin(x)
  trigonometricProduct: {
    functionExpr: "f(x) = x²·sin(x)",
    functionLatex: "f(x) = x^2 \\sin(x)",
    derivativeExpr: "2*x*Math.sin(x) + x*x*Math.cos(x)",
    derivativeLatex: "f'(x) = 2x\\sin(x) + x^2\\cos(x)",
    pointX: Math.PI/2,
    pointY: Math.pow(Math.PI/2, 2),
    slopeValue: Math.PI, // Aproximado
    tangentEquation: `y = ${Math.PI}x - ${Math.PI * Math.PI/2 - Math.pow(Math.PI/2, 2)}`
  },
  
  // Ejemplo: f(x) = x·ln(x)
  logarithmicProduct: {
    functionExpr: "f(x) = x·ln(x)",
    functionLatex: "f(x) = x \\ln(x)",
    derivativeExpr: "Math.log(x) + 1",
    derivativeLatex: "f'(x) = \\ln(x) + 1",
    pointX: 1,
    pointY: 0, // 1·ln(1) = 0
    slopeValue: 1, // ln(1) + 1 = 1
    tangentEquation: "y = x - 1"
  }
};

// Función helper para crear una lección completa
export const createTangentLineLesson = (exampleKey) => {
  const params = lessonExamples[exampleKey];
  if (!params) {
    throw new Error(`Ejemplo '${exampleKey}' no encontrado`);
  }
  
  return {
    template: tangentLineTemplate,
    questions: tangentLineTemplate.generateQuestions(params),
    visualization: tangentLineTemplate.generateVisualization(params),
    metadata: {
      id: `tangent-line-${exampleKey}`,
      title: `Recta Tangente - ${params.functionLatex}`,
      difficulty: 'intermediate',
      tags: ['derivadas', 'recta_tangente', 'calculo'],
      estimatedTime: '10-15 minutos'
    }
  };
};