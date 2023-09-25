import React from "react";
import api from "../api";
import { useState } from "react";

function Users() {
  const [users, setUser] = useState(api.users.fetchAll());
  // Инициализируем статусный текст
  let statusText =
    users.length === 0 ? (
      <span className="badge bg-danger m-3">Nobody will party with you</span>
    ) : (
      <span className="badge bg-primary m-3">
        {users.length} people will party with you
      </span>
    );
  // Обрабатываем нажатие на кнопку
  function handleDelete(userId) {
    setUser((prevState) => {
      renderPhrase();
      return prevState.filter((user) => user._id !== userId);
    });
  }
  // Отрабатываем изменение статусного текста
  function renderPhrase() {
    statusText =
      users.length === 0 ? (
        <span className="badge bg-danger m-3">Nobody will party with you</span>
      ) : (
        <span className="badge bg-primary m-3">
          {users.length} people will party with you
        </span>
      );
  }
  // Рендерим таблицу
  function renderTable(users) {
    // Строим голову таблицы
    function buildTableHead() {
      return (
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
      );
    }
    // Строим строку в таблице
    function buildTableRow(user) {
      // Расставляем качества
      function buildQualities() {
        return user.qualities.map((quality) => (
          <span key={quality.name} className={"badge  m-1 bg-" + quality.color}>
            {quality.name}
          </span>
        ));
      }

      return (
        <tr id={user._id} key={user._id + "2"}>
          <td>{user.name}</td>
          <td>{buildQualities()}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button
              id={user._id + "del_btn"}
              className="btn btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              delete
            </button>
          </td>
        </tr>
      );
    }
    // Строим тело таблицы
    function buildTableBody(users) {
      return <tbody>{users.map((user) => buildTableRow(user))}</tbody>;
    }
    return (
      <table className="table">
        {buildTableHead()}
        {buildTableBody(users)}
      </table>
    );
  }
  // Рендерим список
  if (users.length === 0) return <h2>{statusText}</h2>;
  return (
    <>
      <h2>{statusText}</h2>
      {renderTable(users)}
    </>
  );
}

export default Users;
