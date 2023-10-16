/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
// Компоненты
import SearchStatus from './searchStatus';
import User from './user';
import Pagination from './pagination';
import GroupList from './groupList';
// Утилиты
import paginate from '../utils/paginate';

export default function Users({ users, onDelete, onBookmark }) {
  const [professions, setProfession] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  useEffect(() => setProfession(api.professions), []);
  useEffect(() => {
  }, [professions]);
  // Пагинация
  const pageSize = 4; // Количество пользователей которое можно поместить на одну страницу
  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  // Фильтры
  const filteredUsers = selectedProfession
    ? users.filter((user) => user.profession.name === selectedProfession.name)
    : users;
  const usersOnPage = users[0] ? paginate(filteredUsers, currentPage, pageSize) : [];
  const numberOfUsers = filteredUsers.length;
  // Меняем страницу, если пользователь находиться на странице которой больше нет
  useEffect(() => {
    if (currentPage > Math.ceil(numberOfUsers / pageSize)) {
      setCurrentPage(Math.ceil(numberOfUsers / pageSize));
    }
  }, [numberOfUsers]);

  function onItemSelect(item) {
    setSelectedProfession(item);
  }

  function clearFilter() {
    setSelectedProfession(undefined);
  }
  // Рендер
  return (
    <div className="d-flex">
      {/* Фильтр профессий */}
      {professions ? (
        <div className="d-flex flex-column shrink-0 p-3">
          <GroupList
            selectedItem={selectedProfession}
            items={professions}
            onItemSelect={onItemSelect}
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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
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
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
};
