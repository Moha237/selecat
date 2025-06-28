import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const LessonContent = () => {
  return (
    <div className="lesson-content">
      <h1>Compute the tangent line of a function at a given point</h1>
      
      <section className="description">
        <h2>Description</h2>
        <p>To find the tangent line of a function at a given point, you need to:</p>
        <ol>
          <li>Compute the derivative f'(x)</li>
          <li>Evaluate it at the point of interest: f'(a)</li>
          <li>Use the point-slope formula for a line:</li>
        </ol>
        <div className="formula">
          <BlockMath math="y - f(a) = f'(a)(x - a)" />
        </div>
      </section>

      <section className="example">
        <h2>Example</h2>
        <div className="problem">
          <h3>Problem:</h3>
          <p>Consider the function <InlineMath math="f(x) = x e^{x-1}" />. Calculate the equation of the tangent line to the graph of the function f at the point with abscissa <InlineMath math="x = 1" />.</p>
        </div>
        
        <div className="solution">
          <h3>Solution:</h3>
          <div className="step">
            <h4>1. Compute the derivative:</h4>
            <p><em>Note: We use the product rule here.</em></p>
            <BlockMath math="f'(x) = (1 + x) e^{x-1}" />
          </div>
          
          <div className="step">
            <h4>2. Evaluate the derivative at x = 1:</h4>
            <BlockMath math="f'(1) = 2" />
          </div>
          
          <div className="step">
            <h4>3. Evaluate the function at x = 1:</h4>
            <BlockMath math="f(1) = 1 \times e^{1-1} = 1" />
          </div>
          
          <div className="step">
            <h4>4. Use the point-slope formula:</h4>
            <BlockMath math="y - 1 = 2(x - 1)" />
          </div>
          
          <div className="step">
            <h4>5. Final answer:</h4>
            <BlockMath math="y = 2x - 1" />
          </div>
        </div>
      </section>

      <section className="practice">
        <h2>Practice Template</h2>
        <div className="template">
          <p><strong>Given:</strong> f(x) = ___</p>
          <p><strong>Find:</strong> the tangent line at x = ___</p>
          
          <h4>Student must:</h4>
          <ol>
            <li>Compute f'(x)</li>
            <li>Evaluate f'(x₀) and f(x₀)</li>
            <li>Build the equation with <InlineMath math="y - f(x_0) = f'(x_0)(x - x_0)" /></li>
          </ol>
        </div>
      </section>

      <section className="exam-links">
        <h2>Linked Exam Questions</h2>
        <ul>
          <li><a href="#">Year 2016 Serie 3 Problem 3</a></li>
          <li><a href="#">Year 2016 Serie 5 Problem 3</a></li>
          <li><a href="#">Year 2016 Serie 5 Problem 6</a></li>
        </ul>
      </section>

      <section className="tags">
        <h2>Tags</h2>
        <div className="tag-list">
          <span className="tag">derivative</span>
          <span className="tag">calculus</span>
          <span className="tag">tangent_line</span>
        </div>
      </section>
    </div>
  );
};

export default LessonContent;