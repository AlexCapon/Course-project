/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-underscore-dangle */
// Импорты
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Утилиты
import { orderBy } from 'lodash';
import paginate from '../utils/paginate';
// Компоненты
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import Pagination from './pagination';
import GroupList from './groupList';

export default function Users({
  users, professions, onDelete, onBookmark,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const pageSize = 9; // Количество пользователей которое можно поместить на одну страницу

  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  function handleItemSelect(item) {
    setSelectedProfession(item);
    setCurrentPage(1);
  }
  function handleSort(item) {
    setSortBy(item);
  }

  // Фильтры
  const filteredUsers = selectedProfession
    ? users.filter((user) => user.profession.name === selectedProfession.name)
    : users;
  const numberOfUsers = filteredUsers.length ? filteredUsers.length : 0;
  const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersOnPage = users[0] ? paginate(sortedUsers, currentPage, pageSize) : [];

  useEffect(() => { // Меняем страницу, если пользователь находиться на странице которой больше нет
    if (numberOfUsers > 0) {
      if (currentPage > Math.ceil(numberOfUsers / pageSize)) {
        setCurrentPage(Math.ceil(numberOfUsers / pageSize));
      }
    }
  }, [numberOfUsers]);

  function clearFilter() {
    setSelectedProfession(undefined);
  }

  // Рендер
  return (
    <div className="d-flex">
      {/* Фильтр профессий */}
      {Object.values(professions)[0] ? (
        <div className="d-flex flex-column shrink-0 p-3">
          <GroupList
            selectedItem={selectedProfession}
            items={professions}
            onItemSelect={handleItemSelect}
          />
          <button
            className="btn btn-secondary mt-2"
            type="button"
            onClick={clearFilter}
          >
            Отчистить Фильтры
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column shrink-0 p-4 m-4">
          <ul className="list-group">
            <span className="list-group-item">Загрузка...</span>
          </ul>
        </div>
      )}
      <div className="d-flex flex-column">
        {/* Статус поиска */}
        {users[0] ? (<SearchStatus number={numberOfUsers} />) : (<h2><span className="badge bg-warning m-3">Загрузка...</span></h2>)}
        {/* Таблица пользователей */}
        {users[0] ? (
          <UsersTable
            usersOnPage={usersOnPage}
            selectedSort={sortBy}
            onBookmark={onBookmark}
            onDelete={onDelete}
            onSort={handleSort}
          />
        ) : (
          <h2> </h2>
        )}
        {/* Страницы  */}
        <div className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            itemCount={numberOfUsers}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
Users.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
};
