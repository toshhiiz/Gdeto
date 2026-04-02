import React from 'react';

export const Select = ({
  label,
  options,
  error,
  required = false,
  disabled = false,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded outline-none transition-colors text-sm ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'
        } disabled:bg-gray-50 bg-white ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
