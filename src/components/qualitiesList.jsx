import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';

export default function QualitiesList({ qualities }) {
  return (
    <>
      {qualities.map((quality) => (
        <span key={quality.name} className={`badge  m-1 bg-${quality.color}`}>
          {quality.name}
        </span>
      ))}
    </>
  );
}
QualitiesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  qualities: PropTypes.array.isRequired,
};
