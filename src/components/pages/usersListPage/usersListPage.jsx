/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import api from '../../../api';
// Утилиты
import { orderBy } from 'lodash';
import paginate from '../../../utils/paginate';
import showError from '../../../utils/showError';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/showElement';
// Компоненты
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import Pagination from '../../common/pagination';
import GroupList from '../../common/groupList';
import SearchInput from '../../ui/searchInput';

export default function UsersListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfession] = useState(api.professions.fetchAll());
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchInput, setSearchInput] = useState({ value: '' });
  const pageSize = 8;

  useEffect(() => { // Получаем юзеров из промися
    if (!Object.values(users)[0]) {
      users.then((data) => setUsers(data)).catch((error) => showError(error));
    }
  }, []);
  useEffect(() => { // Получаем профессии для фильтров из промися
    if (!Object.values(professions)[0]) {
      professions
        .then((data) => setProfession(data))
        .catch((error) => showError(error));
    }
  }, []);

  function clearFilter() {
    setSelectedProfession(undefined);
  }
  function clearSearch() {
    setSearchInput((prevState) => ({
      ...prevState,
      value: '',
    }));
  }
  function filterUsersByProf() {
    return selectedProfession
      ? users.filter((user) => user.profession.name === selectedProfession.name)
      : users;
  }
  function filterUsersBySearch() {
    const condition = searchInput.value !== '' ? new RegExp(searchInput.value) : '';
    if (condition !== '') {
      if (selectedProfession) {
        clearFilter();
      }
      if (users[0]) {
        return users.filter((user) => condition.test(user.name));
      }
    }
    return users;
  }

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
    const updatedUsers = users.map((user) => {
      const newUser = user;
      if (user._id === markingUserId) {
        newUser.bookmark = !newUser.bookmark;
      }
      return newUser;
    });
    setUsers(updatedUsers);
  }
  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  function handleItemSelect(item) {
    clearSearch();
    setSelectedProfession(item);
    setCurrentPage(1);
  }
  function handleSort(item) {
    setSortBy(item);
  }
  function handleSearchChange({ target }) {
    setSearchInput((prevState) => ({
      ...prevState,
      value: target.value,
    }));
  }

  const filteredUsers = searchInput.value ? filterUsersBySearch() : filterUsersByProf();
  function getDisplayedUsers() {
    const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    return users[0]
      ? paginate(sortedUsers, currentPage, pageSize)
      : [];
  }
  const usersOnPage = getDisplayedUsers();

  const numberOfDisplayedUsers = filteredUsers.length ? filteredUsers.length : 0;
  useEffect(() => { // Меняем страницу, если пользователь находиться на странице которой больше нет
    if (numberOfDisplayedUsers > 0) {
      if (currentPage > Math.ceil(numberOfDisplayedUsers / pageSize)) {
        setCurrentPage(Math.ceil(numberOfDisplayedUsers / pageSize));
      }
    }
  }, [numberOfDisplayedUsers]);

  // Рендер
  // Делаем проверку на наличие данных с сервера, если данные не готовы - отображаем загрузчик
  if (!Array.isArray(users)) return <h2><span className="badge bg-warning m-3">Загрузка...</span></h2>;
  // Если готовы - отображаем таблицу.
  return (
    <div id="layoutContainer" className="d-flex">
      <div id="filtersContainer">
        {Object.values(professions)[0] ? (
          <div id="profFiltersContainer" className="d-flex flex-column shrink-0 p-3">
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
          <div id="profFilterLoader" className="d-flex flex-column shrink-0 p-4 m-4">
            <ul className="list-group">
              <span className="list-group-item">Загрузка...</span>
            </ul>
          </div>
        )}
      </div>
      <div id="bodyContainer" className="d-flex flex-column">
        <SearchStatus number={numberOfDisplayedUsers} />
        <SearchInput onChange={handleSearchChange} value={searchInput.value} />
        <UsersTable
          usersOnPage={usersOnPage}
          selectedSort={sortBy}
          onBookmark={handleBookmark}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <div id="paginationContainer" className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            itemCount={numberOfDisplayedUsers}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
