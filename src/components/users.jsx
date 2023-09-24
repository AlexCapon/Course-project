import React from "react";
import api from "../api";
import { useState } from "react";

// Инициализируем статусный текст
const fetchedUsers = api.users.fetchAll();
let statusText = <span className="badge bg-primary m-3">{fetchedUsers.length} people will party with you</span>

function Users() {
  const [users, setUser] = useState(api.users.fetchAll());
  // Обрабатываем нажатие на кнопку
  function handleDelete(userId) {
    setUser((prevState) => {
      handlePhrase(users.length - 1);
      return prevState.filter((user) => user._id !== userId)
    })
  }
  // Отрабатываем изменение статусного текста
  function handlePhrase(number) {
  let usersLeft = number;
  statusText =
  usersLeft === 0 ? (
    <span className="badge bg-danger m-3">Nobody will party with you</span>
  ) : (
    <span className="badge bg-primary m-3">
      {usersLeft} people will party with you
    </span>
  );
  }
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
      <td scope="col">{user.name}</td>
      <td scope="col">{buildQualities()}</td>
      <td scope="col">{user.profession.name}</td>
      <td scope="col">{user.completedMeetings}</td>
      <td scope="col">{user.rate}</td>
      <td scope="col">
        <button id={user._id + "del_btn"} className="btn btn-danger" onClick={() => handleDelete(user._id)}>
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
// Рендерим список
  return (
    <>
      <h1>{statusText}</h1>
      <table className="table">
        {buildTableHead()}
        {buildTableBody(users)}
      </table>
    </>
  );
}

export default Users;
