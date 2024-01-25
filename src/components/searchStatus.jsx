import React from 'react';
import PropTypes from 'prop-types';

// Статусный текст основанный на колличестве участников
export default function SearchStatus({ number }) {
  return (
    number === 0 ? (

      <h2><span className="badge bg-danger m-3">Nobody will party with you</span></h2>
    ) : (
      <h2>
        <span className="badge bg-primary m-3">
          {number}
          {' '}
          people will party with you
        </span>

      </h2>
    ));
}
SearchStatus.propTypes = {
  number: PropTypes.number.isRequired,
};
