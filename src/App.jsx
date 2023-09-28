/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import api from './api';

import Users from './components/users';
import SearchStatus from './components/searchStatus';
// import User from "./components/user";

export default function App() {
  const [users, setUser] = useState(api.users.fetchAll());
  // Обрабатываем удаление
  function handleDelete(userId) {
    setUser((prevState) => prevState.filter((user) => user._id !== userId));
  }
  // Обрабатываем букмарк
  function handleBookmark(userId) {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUser(updatedUsers);
  }

  if (users.length === 0) return <SearchStatus number={users.length} />;
  return (
    <>
      <SearchStatus number={users.length} />
      <Users onDelete={handleDelete} onBookmark={handleBookmark} users={users} />
    </>
  );
}
