/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import api from './api';
// Компоненты
import Users from './components/users';
import SearchStatus from './components/searchStatus';
// Утилиты
import showError from './utils/showError';

export default function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfession] = useState(api.professions.fetchAll);

  useEffect(() => { // Получаем юзеров из промися
    if (!Object.values(users)[0]) {
      users.then((data) => setUsers(data)).catch((error) => showError(error));
    }
  }, []);
  useEffect(() => { // Получаем профессии из промися
    if (!Object.values(professions)[0]) {
      professions.then((data) => setProfession(data)).catch((error) => showError(error));
    }
  }, []);
  function handleDelete(userId) { // Обрабатываем удаление
    setUsers((prevState) => {
      const usersAfterDeletion = prevState.filter((user) => user._id !== userId);
      return usersAfterDeletion;
    });
  }
  function handleBookmark(userId) { // Обрабатываем букмарк
    const updatedUsers = users.map((user) => { // Пробегаемся по всем юзерам
      const newUser = user;
      if (user._id === userId) { // Находим юзера по которому кликнули
        newUser.bookmark = !newUser.bookmark; // Меняет статус букмарка на противоположный
      }
      return newUser;
    });
    setUsers(updatedUsers); // Возвращаем в стейт новый массив
  }

  if (users.length === 0) return <SearchStatus number={users.length} />;
  return (
    <>
      <Users
        onDelete={handleDelete}
        onBookmark={handleBookmark}
        users={users}
        professions={professions}
      />
    </>
  );
}
