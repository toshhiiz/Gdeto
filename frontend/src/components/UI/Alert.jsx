import React from 'react';
import { Button } from './Button';

export const Alert = ({ type = 'info', title, message, onClose }) => {
  const typeStyles = {
    success: 'bg-white border-gray-200 text-gray-900',
    error: 'bg-white border-gray-200 text-gray-900',
    warning: 'bg-white border-gray-200 text-gray-900',
    info: 'bg-white border-gray-200 text-gray-900',
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
