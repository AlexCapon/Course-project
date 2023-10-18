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

  useEffect(() => {
    if (!Object.values(users)[0]) {
      users.then((data) => setUsers(data)).catch((error) => showError(error));
    }
  }, []);
  useEffect(() => {
    if (!Object.values(professions)[0]) {
      professions.then((data) => setProfession(data)).catch((error) => showError(error));
    }
  }, []);
  // Обрабатываем удаление
  function handleDelete(userId) {
    setUsers((prevState) => {
      const usersAfterDeletion = prevState.filter((user) => user._id !== userId);
      return usersAfterDeletion;
    });
  }
  // Обрабатываем букмарк
  function handleBookmark(userId) {
    const updatedUsers = users.map((user) => {
      const newUser = user;
      if (user._id === userId) {
        newUser.bookmark = !newUser.bookmark;
      }
      return newUser;
    });
    setUsers(updatedUsers);
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
