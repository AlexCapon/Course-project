/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
// Компоненты
import User from './user';

export default function UsersTable({
  usersOnPage, onDelete, onBookmark, onSort, currentSort,
}) {
  function handleSort(item) {
    if (currentSort.iter === item && currentSort.order === 'asc') {
      onSort({ iter: item, order: 'desc' });
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th onClick={() => handleSort('profession.name')} scope="col">Профессия</th>
          <th onClick={() => handleSort('completedMeetings')} scope="col">Встретился, раз</th>
          <th onClick={() => handleSort('rate')} scope="col">Оценка</th>
          <th onClick={() => handleSort('bookmark')} scope="col">Избранное</th>
          <th scope="col" label="empty" />
        </tr>
      </thead>
      <tbody>
        {usersOnPage.map((user) => (
          <User
            key={user._id}
            {...user}
            marked={false}
            onDelete={onDelete}
            onMark={onBookmark}
          />
        ))}
      </tbody>
    </table>
  );
}
UsersTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  usersOnPage: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
