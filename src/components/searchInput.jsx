import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';

export default function SearchInput({ onChange }) {
  return <input id="searchInput" type="text" placeholder="Поиск..." onChange={onChange} className="form-control" />;
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};
