import React from "react";
import api from "../api";
import { useState } from "react";
// import { fetchAll } from "../api/fake.api/user.api";

function Users() {
  console.log(api.users.fetchAll());
  const [users, setUser] = useState(api.users.fetchAll());
  function handleDelete(userId) {}
  function handlePhrase(number) {}
  return (
    <>
      <h1>Users</h1>
    </>
  );
}

export default Users;
