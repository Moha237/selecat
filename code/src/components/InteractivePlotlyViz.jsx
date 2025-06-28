import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const InteractivePlotlyViz = ({ currentStep, onStepChange }) => {
  const [xPoint, setXPoint] = useState(1);
  const [showDerivative, setShowDerivative] = useState(false);
  const [showTangent, setShowTangent] = useState(false);
  const [showCalculations, setShowCalculations] = useState(false);
  
  const f = (x) => x * Math.exp(x - 1);
  const fPrime = (x) => (1 + x) * Math.exp(x - 1);
  
  // Actualizar visualización según el paso actual
  useEffect(() => {
    switch(currentStep) {
      case 0: // Introducción
        setShowDerivative(false);
        setShowTangent(false);
        setShowCalculations(false);
        break;
      case 1: // Paso 1: Calcular derivada
        setShowDerivative(true);
        setShowTangent(false);
        setShowCalculations(false);
        break;
      case 2: // Paso 2: Evaluar derivada
        setShowDerivative(true);
        setShowTangent(false);
        setShowCalculations(true);
        setXPoint(1); // Fijar punto en x=1
        break;
      case 3: // Paso 3: Evaluar función
        setShowDerivative(true);
        setShowTangent(false);
        setShowCalculations(true);
        setXPoint(1);
        break;
      case 4: // Paso 4: Fórmula punto-pendiente
        setShowDerivative(true);
        setShowTangent(true);
        setShowCalculations(true);
        setXPoint(1);
        break;
      case 5: // Solución final
        setShowDerivative(true);
        setShowTangent(true);
        setShowCalculations(true);
        setXPoint(1);
        break;
      default:
        break;
    }
  }, [currentStep]);
  
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

  const getStepInstructions = () => {
    switch(currentStep) {
      case 0:
        return "Observa la función f(x) = xe^(x-1). Vamos a calcular su recta tangente en x = 1.";
      case 1:
        return "Ahora se muestra la derivada f'(x) = (1+x)e^(x-1) en línea punteada naranja.";
      case 2:
        return "El punto está fijo en x = 1. Observa el valor de la derivada en este punto.";
      case 3:
        return "Calculamos f(1) = 1. El punto de tangencia es (1, 1).";
      case 4:
        return "Ahora se muestra la recta tangente y = 2x - 1 en línea roja discontinua.";
      case 5:
        return "¡Solución completa! Puedes explorar otros puntos con el deslizador.";
      default:
        return "";
    }
  };
  
  return (
    <div className="interactive-plotly-viz">
      <div className="step-instructions">
        <h3>Instrucciones del Paso {currentStep + 1}</h3>
        <p>{getStepInstructions()}</p>
      </div>

      <div className="plot-container">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '500px' }}
        />
      </div>

      {(currentStep === 5 || currentStep === 0) && (
        <div className="controls">
          <h3>Controles Interactivos</h3>
          <div className="control-group">
            <label htmlFor="x-slider">Coordenada X del punto:</label>
            <input
              id="x-slider"
              type="range"
              min="-0.5"
              max="2.5"
              step="0.1"
              value={xPoint}
              onChange={(e) => setXPoint(parseFloat(e.target.value))}
            />
            <span className="slider-value">{xPoint}</span>
          </div>
          
          <div className="calculation-display">
            <h4>Cálculos Actuales:</h4>
            <p><strong>f({xPoint}) =</strong> {data.point.y.toFixed(3)}</p>
            <p><strong>f'({xPoint}) =</strong> {data.slope}</p>
            <p><strong>Ecuación de la recta tangente:</strong> {data.equation}</p>
          </div>
        </div>
      )}

      <div className="graph-controls">
        <h4>Elementos del Gráfico:</h4>
        <div className="toggle-controls">
          <label>
            <input 
              type="checkbox" 
              checked={showDerivative} 
              onChange={(e) => setShowDerivative(e.target.checked)}
              disabled={currentStep < 1}
            />
            Mostrar derivada f'(x)
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showTangent} 
              onChange={(e) => setShowTangent(e.target.checked)}
              disabled={currentStep < 4}
            />
            Mostrar recta tangente
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showCalculations} 
              onChange={(e) => setShowCalculations(e.target.checked)}
              disabled={currentStep < 2}
            />
            Mostrar cálculos
          </label>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlotlyViz;