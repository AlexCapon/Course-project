import React, { useState } from "react";
import api from "../api";
// Компоненты
import User from "./user";
import Pagination from "./pagination";
// Утилиты
import paginate from "../utils/paginate";

export default function Users(api) {
  const users = api.users;
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4;
  const numberOfUsers = users.length;
  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  const usersOnPage = paginate(users, currentPage, pageSize)

  // Рендер
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {usersOnPage.map((user, index) => (
            <User
              key={user._id}
              {...user}
              marked={false}
              onDelete={api.onDelete}
              onMark={api.onBookmark}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemCount={numberOfUsers}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}
