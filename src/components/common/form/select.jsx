/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes, { shape } from 'prop-types';

export default function Select({
  options,
  value,
  onChange,
  error,
  label,
  defaultOption,
}) {
  const selectClass = `form-select mt-1 ${error ? 'is-invalid' : ' '}`;

  return (
    <div id="profSelector" className="mb-4 mt-3">
      <label htmlFor="professionSelect" className="form-label">
        {label}
        <div className="input-group has-validation">
          <select
            id="professionSelect"
            className={selectClass}
            name="profession"
            value={value}
            onChange={onChange}
          >
            <option id="defaultOption" disabled value="">{defaultOption}</option>
            {Array.isArray(options) ? (
              options.map((option) => (
                <option value={option._id} key={option._id}>
                  {option.name}
                </option>
              ))
            ) : (
              <option disabled defaultValue="">Загрузка...</option>
            )}
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </label>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    shape({
      id_: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
};
Select.defaultProps = {
  error: undefined,
};
