import React, { useState } from "react";
import api from "../api";
// Компоненты
import TalbeHead from "./tableHead";
import User from "./user";
import SearchStatus from "./searchStatus";

export default function Users(users) {
  console.log('users', users);
  return (
      <table className="table">
        <TalbeHead />
        <tbody>
          {users.users.map((user) => (
            <User
              key={user._id}
              {...user}
              marked={false}
              onDelete={users.onDelete}
              onMark={users.onBookmark}
            />
          ))}
        </tbody>
      </table>
  );
}
