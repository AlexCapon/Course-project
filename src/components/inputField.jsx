import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import { eyeOpenIcon, eyeShutIcon } from '../assets/icons';

export default function InputField({
  value,
  onChange,
  name,
  type,
  label,
  error,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible((prevState) => !prevState);
  }
  const eyeIcon = passwordVisible ? eyeOpenIcon : eyeShutIcon;

  const inputClass = `form-control mt-1 mb-1 ${
    error ? 'is-invalid' : ''
  }`;

  return (
    <div className="m-2">
      <label htmlFor={name} className="label-control">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={passwordVisible ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
        {type === 'password' && (
        <button className="btn btn-outline-secondary mt-1 mb-1" type="button" onClick={togglePasswordVisibility}>
          {eyeIcon}
        </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  label: 'Поле для текста',
  name: `textInput-${Date.now()}`,
  type: 'text',
  value: '',
  error: undefined,
};
