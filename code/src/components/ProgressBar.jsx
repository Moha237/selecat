import React from 'react';

const ProgressBar = ({ 
  completed, 
  total, 
  label = "Progreso", 
  showStats = true,
  className = "" 
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={`progress-container ${className}`}>
      {showStats && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-stats">{completed}/{total} ({percentage}%)</span>
        </div>
      )}
      
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-bar-shine"></div>
        </div>
      </div>
      
      <style jsx>{`
        .progress-container {
          width: 100%;
          margin: 1rem 0;
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .progress-label {
          font-weight: 600;
          color: #374151;
        }
        
        .progress-stats {
          color: #6B7280;
          font-weight: 500;
        }
        
        .progress-bar-track {
          width: 100%;
          height: 12px;
          background-color: #E5E7EB;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          border-radius: 6px;
          transition: width 0.6s ease;
          position: relative;
          overflow: hidden;
          min-width: ${percentage > 0 ? '8px' : '0'};
        }
        
        .progress-bar-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine 2s infinite;
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Variaciones de color según porcentaje */
        .progress-bar-fill {
          background: ${
            percentage >= 80 
              ? 'linear-gradient(90deg, #10B981, #059669)' 
              : percentage >= 60
              ? 'linear-gradient(90deg, #F59E0B, #D97706)'
              : percentage >= 40
              ? 'linear-gradient(90deg, #EF4444, #DC2626)'
              : 'linear-gradient(90deg, #6B7280, #4B5563)'
          };
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;