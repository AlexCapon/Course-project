/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-underscore-dangle */
// Импорты
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
// Утилиты
import { orderBy } from 'lodash';
import paginate from '../utils/paginate';
import showError from '../utils/showError';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
// Компоненты
import SearchStatus from '../components/searchStatus';
import UsersTable from '../components/usersTable';
import Pagination from '../components/pagination';
import GroupList from '../components/groupList';
import User from '../components/user';
// Основной компонент
export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfession] = useState(api.professions.fetchAll());
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const { userId } = useParams();

  const pageSize = 8; // Количество пользователей которое можно поместить на одну страницу

  useEffect(() => {
    // Получаем юзеров из промися
    if (!Object.values(users)[0]) {
      users.then((data) => setUsers(data)).catch((error) => showError(error));
    }
  }, []);
  useEffect(() => {
    // Получаем профессии для фильтров из промися
    if (!Object.values(professions)[0]) {
      professions
        .then((data) => setProfession(data))
        .catch((error) => showError(error));
    }
  }, []);

  function handleDelete(deletingUserId) {
    // Обрабатываем удаление
    setUsers((prevState) => {
      const usersAfterDeletion = prevState.filter(
        (user) => user._id !== deletingUserId,
      );
      return usersAfterDeletion;
    });
  }
  function handleBookmark(markingUserId) {
    // Обрабатываем букмарк
    const updatedUsers = users.map((user) => {
      // Пробегаемся по всем юзерам
      const newUser = user;
      if (user._id === markingUserId) {
        // Находим юзера по которому кликнули
        newUser.bookmark = !newUser.bookmark; // Меняет статус букмарка на противоположный
      }
      return newUser;
    });
    setUsers(updatedUsers); // Возвращаем в стейт новый массив
  }
  function handlePageChange(pageIndex) {
    // Обабатываем смену страницы
    setCurrentPage(pageIndex);
  }
  function handleItemSelect(item) {
    // Обрабатываем выбор фильтра
    setSelectedProfession(item);
    setCurrentPage(1);
  }
  function handleSort(item) {
    // Обрабатываем сортировку
    setSortBy(item);
  }

  // Фильтры
  const filteredUsers = selectedProfession
    ? users.filter((user) => user.profession.name === selectedProfession.name)
    : users;
  const numberOfUsers = filteredUsers.length ? filteredUsers.length : 0;
  const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersOnPage = users[0]
    ? paginate(sortedUsers, currentPage, pageSize)
    : [];

  useEffect(() => {
    // Меняем страницу, если пользователь находиться на странице которой больше нет
    if (numberOfUsers > 0) {
      if (currentPage > Math.ceil(numberOfUsers / pageSize)) {
        setCurrentPage(Math.ceil(numberOfUsers / pageSize));
      }
    }
  }, [numberOfUsers]);

  function clearFilter() {
    // Очищаем фильтры
    setSelectedProfession(undefined);
  }
  // Рендер
  // Делаем проверку на наличие данных с сервера, если данные не готовы - отображаем загрузчик
  if (!Array.isArray(users)) {
    return (
      <h2>
        <span className="badge bg-warning m-3">Загрузка...</span>
      </h2>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userId ? (
        <div className="d-flex justify-content-center">
          <User
            user={usersOnPage.filter((user) => user._id === userId)[0]}
          />
        </div>
      ) : (
        <div className="d-flex">
          {/* Фильтр профессий */}
          {Object.values(professions)[0] ? ( // Выводим фильтры
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
            // Выводим лоадер, если фильтры не загрузились
            <div className="d-flex flex-column shrink-0 p-4 m-4">
              <ul className="list-group">
                <span className="list-group-item">Загрузка...</span>
              </ul>
            </div>
          )}
          <div className="d-flex flex-column">
            {/* Статус поиска */}
            <SearchStatus number={numberOfUsers} />
            {/* Таблица пользователей */}
            {userId ? ( // Если id юзера существует, то отображаем юзера, если нет, то таблицу
              <User users={usersOnPage} userId={userId} />
            ) : (
              <UsersTable
                usersOnPage={usersOnPage}
                selectedSort={sortBy}
                onBookmark={handleBookmark}
                onDelete={handleDelete}
                onSort={handleSort}
                userId={userId}
              />
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
      )}
    </>
  );
}
