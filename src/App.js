import React, { useState } from "react";
import api from "./api";

import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
// import User from "./components/user";

export default function App() {
  const [users, setUser] = useState(api.users.fetchAll());
  // Обрабатываем удаление
  function handleDelete(userId) {
    setUser((prevState) => {
      return prevState.filter((user) => user._id !== userId);
    });
  }
  // Обрабатываем букмарк
  function handleBookmark(userId) {
    console.log(users);
    const updatedUsers = users.map((user) => {
      console.log(user._id === userId);
      console.log("id", user._id);
      console.log("p", userId);
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    console.log(updatedUsers);
    setUser(updatedUsers);
  }

  if (users.length === 0) return <SearchStatus users={users.length} />;
  return (
    <>
      <h2><SearchStatus number={users.length} /></h2> 
      <Users onDelete={handleDelete} onBookmark={handleBookmark} users={users} />
    </>
  );
}
