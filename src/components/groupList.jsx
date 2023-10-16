/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

function GroupList({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
}) {
  return (
    // <select name="Загрузка...">
    // eslint-disable-next-line max-len
    //   {Object.values(items).map((item) => <option values={item[contentProperty]} className="list-group-item" onClick={() => { console.log('you clicked on', item); }} key={`${item[valueProperty]}`}>{item[contentProperty]}</option>)}
    // </select>
    <ul className="list-group">
      {Object.values(items).map((item) => (
        <li
          className={`list-group-item${item === selectedItem ? ' active' : ''}`}
          role="button"
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
};

export default GroupList;
