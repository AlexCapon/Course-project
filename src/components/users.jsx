/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Компоненты
import User from './user';
import Pagination from './pagination';
// Утилиты
import paginate from '../utils/paginate';

export default function Users({ users, onDelete, onBookmark }) {
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const numberOfUsers = users.length;
  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  const usersOnPage = paginate(users, currentPage, pageSize);

  // Рендер
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col" />
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
      <Pagination
        currentPage={currentPage}
        itemCount={numberOfUsers}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}
Users.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
};
