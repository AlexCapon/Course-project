/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React from 'react';
// Компоненты
import Qualities from './qualities';
import Bookmark from './bookmark';

export default function User(user) {
  const {
    _id, name, profession, completedMeetings, rate, onDelete,
  } = user;
  return (
    <tr id={_id} key={`${_id}2`}>
      <td>{name}</td>
      <td><Qualities {...user} /></td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td><Bookmark {...user} /></td>
      <td>
        <button
          id={`${_id}del_btn`}
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
          type="button"
        >
          delete
        </button>
      </td>
    </tr>
  );
}
