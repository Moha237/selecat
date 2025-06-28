import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const InteractivePlotlyViz = ({ currentQuestion, selectedAnswer, onStepChange }) => {
  const [xPoint, setXPoint] = useState(1);
  const [showDerivative, setShowDerivative] = useState(false);
  const [showTangent, setShowTangent] = useState(false);
  const [showCalculations, setShowCalculations] = useState(false);
  
  const f = (x) => x * Math.exp(x - 1);
  const fPrime = (x) => (1 + x) * Math.exp(x - 1);
  
  // Actualizar visualización según la pregunta actual
  useEffect(() => {
    setXPoint(1); // Siempre fijar en x=1 para esta lección
    
    if (currentQuestion >= 0) {
      // A partir de la primera pregunta, mostrar función original
      if (currentQuestion >= 1 && selectedAnswer !== undefined) {
        // Pregunta 1 respondida: mostrar derivada
        setShowDerivative(true);
      }
      if (currentQuestion >= 2 && selectedAnswer !== undefined) {
        // Pregunta 2 respondida: mostrar cálculos
        setShowCalculations(true);
      }
      if (currentQuestion >= 4 && selectedAnswer !== undefined) {
        // Pregunta 4 respondida: mostrar recta tangente
        setShowTangent(true);
      }
    }
  }, [currentQuestion, selectedAnswer]);
  
  const generateData = () => {
    const xRange = [];
    const yRange = [];
    const xDerivRange = [];
    const yDerivRange = [];
    const xMin = -1;
    const xMax = 3;
    const step = 0.1;
    
    // Función original
    for (let x = xMin; x <= xMax; x += step) {
      xRange.push(x);
      yRange.push(f(x));
      
      // Función derivada (escalada para visualización)
      if (showDerivative) {
        xDerivRange.push(x);
        yDerivRange.push(fPrime(x));
      }
    }
    
    const yPoint = f(xPoint);
    const slope = fPrime(xPoint);
    
    // Línea tangente
    const tangentX = [];
    const tangentY = [];
    if (showTangent) {
      const tangentMin = xPoint - 1.5;
      const tangentMax = xPoint + 1.5;
      
      for (let x = tangentMin; x <= tangentMax; x += 0.1) {
        tangentX.push(x);
        tangentY.push(yPoint + slope * (x - xPoint));
      }
    }
    
    return {
      function: { x: xRange, y: yRange },
      derivative: { x: xDerivRange, y: yDerivRange },
      point: { x: xPoint, y: yPoint },
      tangent: { x: tangentX, y: tangentY },
      slope: slope.toFixed(3),
      equation: `y = ${slope.toFixed(3)}x + ${(yPoint - slope * xPoint).toFixed(3)}`
    };
  };
  
  const data = generateData();
  
  const plotData = [
    {
      x: data.function.x,
      y: data.function.y,
      type: 'scatter',
      mode: 'lines',
      name: 'f(x) = xe^(x-1)',
      line: { color: '#1f77b4', width: 3 }
    }
  ];
  
  // Añadir derivada si está activa
  if (showDerivative && data.derivative.x.length > 0) {
    plotData.push({
      x: data.derivative.x,
      y: data.derivative.y,
      type: 'scatter',
      mode: 'lines',
      name: "f'(x) = (1+x)e^(x-1)",
      line: { color: '#ff7f0e', width: 2, dash: 'dot' }
    });
  }
  
  // Añadir línea tangente si está activa
  if (showTangent && data.tangent.x.length > 0) {
    plotData.push({
      x: data.tangent.x,
      y: data.tangent.y,
      type: 'scatter',
      mode: 'lines',
      name: 'Recta Tangente',
      line: { color: '#d62728', width: 2, dash: 'dash' }
    });
  }
  
  // Punto de tangencia
  plotData.push({
    x: [data.point.x],
    y: [data.point.y],
    type: 'scatter',
    mode: 'markers',
    name: 'Punto de Tangencia',
    marker: { color: '#d62728', size: 12 }
  });
  
  const layout = {
    title: 'Visualización Interactiva de la Recta Tangente',
    xaxis: {
      title: 'x',
      range: [-1, 3],
      gridcolor: '#e5e5e5'
    },
    yaxis: {
      title: 'y',
      range: [-2, 10],
      gridcolor: '#e5e5e5'
    },
    plot_bgcolor: '#fafafa',
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98
    },
    annotations: showCalculations ? [
      {
        x: data.point.x,
        y: data.point.y + 1,
        text: `Punto: (${data.point.x}, ${data.point.y.toFixed(3)})<br>Pendiente: ${data.slope}`,
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: '#636363',
        bgcolor: '#fff',
        bordercolor: '#636363',
        borderwidth: 1
      }
    ] : []
  };
  
  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d']
  };

  const getQuestionInstructions = () => {
    switch(currentQuestion) {
      case 0:
        return "Observa la función f(x) = xe^(x-1). Necesitamos identificar qué regla usar para derivarla.";
      case 1:
        return showDerivative ? 
          "¡Correcto! Ahora puedes ver la derivada f'(x) = (1+x)e^(x-1) en línea punteada naranja." :
          "Responde la pregunta para ver cómo se aplica la regla del producto.";
      case 2:
        return showCalculations ? 
          "¡Exacto! f'(1) = 2. Observa el cálculo en la anotación del gráfico." :
          "Calcula el valor de la derivada en x = 1.";
      case 3:
        return "Ahora calculamos f(1) para encontrar el punto de tangencia.";
      case 4:
        return showTangent ? 
          "¡Perfecto! La recta tangente y = 2x - 1 aparece en línea roja discontinua." :
          "Con el punto (1,1) y pendiente 2, encuentra la ecuación de la recta tangente.";
      default:
        return "¡Felicidades! Has completado el ejercicio de recta tangente.";
    }
  };
  
  return (
    <div className="interactive-plotly-viz">
      <div className="step-instructions">
        <h3>Visualización - Pregunta {currentQuestion + 1}</h3>
        <p>{getQuestionInstructions()}</p>
      </div>

      <div className="plot-container">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '500px' }}
        />
      </div>

      <div className="visualization-summary">
        <div className="current-progress">
          <h4>Progreso de la Visualización:</h4>
          <ul>
            <li className={currentQuestion >= 0 ? 'completed' : 'pending'}>
              ✓ Función original: f(x) = xe^(x-1)
            </li>
            <li className={currentQuestion >= 1 && selectedAnswer !== undefined ? 'completed' : 'pending'}>
              {currentQuestion >= 1 && selectedAnswer !== undefined ? '✓' : '○'} Derivada: f'(x) = (1+x)e^(x-1)
            </li>
            <li className={currentQuestion >= 2 && selectedAnswer !== undefined ? 'completed' : 'pending'}>
              {currentQuestion >= 2 && selectedAnswer !== undefined ? '✓' : '○'} Cálculos en x = 1
            </li>
            <li className={currentQuestion >= 4 && selectedAnswer !== undefined ? 'completed' : 'pending'}>
              {currentQuestion >= 4 && selectedAnswer !== undefined ? '✓' : '○'} Recta tangente: y = 2x - 1
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlotlyViz;