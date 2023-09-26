import React from "react";
// Компоненты
import Qualities from "./qualities";
import Bookmark from "./bookmark";

export default function User(user) {
  return (
    <tr id={user._id} key={user._id + "2"}>
      <td>{user.name}</td>
      <td>{<Qualities {...user} />}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td><Bookmark {...user} /></td>
      <td>
        <button
          id={user._id + "del_btn"}
          className="btn btn-danger"
          onClick={() => user.onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}
