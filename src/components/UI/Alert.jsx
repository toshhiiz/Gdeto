import React from 'react';
import { Button } from './Button';

export const Alert = ({ type = 'info', title, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  };

  const iconEmoji = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`border-l-4 p-4 rounded ${typeStyles[type]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl">{iconEmoji[type]}</span>
          <div>
            {title && <h4 className="font-semibold mb-1">{title}</h4>}
            {message && <p className="text-sm">{message}</p>}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-current opacity-50 hover:opacity-100">
            ×
          </button>
        )}
      </div>
    </div>
  );
};
