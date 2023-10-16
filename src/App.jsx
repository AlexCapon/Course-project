/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import api from './api';

import Users from './components/users';
import SearchStatus from './components/searchStatus';

export default function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  useEffect(() => {
    users.then((data) => setUsers(data));
  }, []);
  // Обрабатываем удаление
  function handleDelete(userId) {
    setUsers((prevState) => {
      const usersAD = prevState.filter((user) => user._id !== userId);
      console.log('usersAD', usersAD);
      return usersAD;
    });
  }
  // Обрабатываем букмарк
  function handleBookmark(userId) {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  if (users.length === 0) return <SearchStatus number={users.length} />;
  return (
    <>
      <Users onDelete={handleDelete} onBookmark={handleBookmark} users={users} />
    </>
  );
}
