import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const PlotlyViz = () => {
  const [xPoint, setXPoint] = useState(1);
  
  const f = (x) => x * Math.exp(x - 1);
  const fPrime = (x) => (1 + x) * Math.exp(x - 1);
  
  const generateData = () => {
    const xRange = [];
    const yRange = [];
    const xMin = -1;
    const xMax = 3;
    const step = 0.1;
    
    for (let x = xMin; x <= xMax; x += step) {
      xRange.push(x);
      yRange.push(f(x));
    }
    
    const yPoint = f(xPoint);
    const slope = fPrime(xPoint);
    
    const tangentX = [];
    const tangentY = [];
    const tangentMin = xPoint - 1;
    const tangentMax = xPoint + 1;
    
    for (let x = tangentMin; x <= tangentMax; x += 0.1) {
      tangentX.push(x);
      tangentY.push(yPoint + slope * (x - xPoint));
    }
    
    return {
      function: { x: xRange, y: yRange },
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
    },
    {
      x: data.tangent.x,
      y: data.tangent.y,
      type: 'scatter',
      mode: 'lines',
      name: 'Tangent Line',
      line: { color: '#ff7f0e', width: 2, dash: 'dash' }
    },
    {
      x: [data.point.x],
      y: [data.point.y],
      type: 'scatter',
      mode: 'markers',
      name: 'Point of Tangency',
      marker: { color: '#d62728', size: 10 }
    }
  ];
  
  const layout = {
    title: 'Interactive Tangent Line Visualization',
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
    annotations: [
      {
        x: data.point.x,
        y: data.point.y + 1,
        text: `Point: (${data.point.x}, ${data.point.y.toFixed(3)})<br>Slope: ${data.slope}`,
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: '#636363',
        bgcolor: '#fff',
        bordercolor: '#636363',
        borderwidth: 1
      }
    ]
  };
  
  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d']
  };
  
  return (
    <div className="plotly-viz">
      <div className="controls">
        <h3>Interactive Controls</h3>
        <div className="control-group">
          <label htmlFor="x-slider">X-coordinate of point:</label>
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
          <h4>Current Calculations:</h4>
          <p><strong>f({xPoint}) =</strong> {data.point.y.toFixed(3)}</p>
          <p><strong>f'({xPoint}) =</strong> {data.slope}</p>
          <p><strong>Tangent line equation:</strong> {data.equation}</p>
        </div>
      </div>
      
      <div className="plot-container">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '500px' }}
        />
      </div>
    </div>
  );
};

export default PlotlyViz;