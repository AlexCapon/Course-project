import React, { useState } from "react";
import api from "../api";
// Компоненты
import TalbeHead from "./tableHead";
import User from "./user";
import SearchStatus from "./searchStatus";

export default function Users() {
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
      console.log(user._id === userId)
      console.log('id', user._id);
      console.log('p', userId)
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    console.log(updatedUsers);
    setUser(updatedUsers);
  }

  // Рендерим список
  if (users.length === 0)
    return (
      <h2>
        <SearchStatus {...users} />
      </h2>
    );
  return (
    <>
      <h2>
        <SearchStatus {...users} />
      </h2>
      <table className="table">
        <TalbeHead />
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              {...user}
              marked={false}
              onDelete={handleDelete}
              onMark={handleBookmark}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
