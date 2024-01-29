import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/showElement';

export default function RadioInput({
  options, value, label, name, onChange,
}) {
  return (
    <div className="mb-4">
      <label htmlFor="professionSelect" className="form-label me-4">
        {label}
      </label>
      {options.map((option) => (
        <div className="form-check form-check-inline" key={`${option.name}_${option.value}`}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            id={`${option.name}_${option.value}`}
            onChange={onChange}
          />
          <label
            htmlFor={`${option.name}_${option.value}`}
            className="form-check-label"
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
}
RadioInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
