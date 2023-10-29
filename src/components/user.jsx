/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Компоненты
// import Qualities from './qualities';
// import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import showElement from '../utils/showElement';

export default function User({ user }) {
  showElement(user, 'user');
  const {
    name, profession, completedMeetings, rate, qualities,
  } = user;
  return (
    <div className="user">
      <h1>{name}</h1>
      <h2>
        Профессия:
        {' '}
        {profession.name}
      </h2>
      <QualitiesList qualities={qualities} />
      <h3>
        Завершенных встреч:
        {' '}
        {completedMeetings}
      </h3>
      <h3>
        Оценка:
        {' '}
        {rate}
      </h3>
      <Link to="/users"><button className="btn btn-primary mt-2" type="button">Все пользователи</button></Link>
    </div>
  );
}

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};

// <tr id={_id} key={`${_id}2`}>
//   <td>{name}</td>
//   <td><Qualities {...user} /></td>
//   <td>{profession.name}</td>
//   <td>{completedMeetings}</td>
//   <td>{rate}</td>
//   <td><Bookmark {...user} /></td>
//   <td>
//     <button
//       id={`${_id}del_btn`}
//       className="btn btn-danger"
//       onClick={() => onDelete(_id)}
//       type="button"
//     >
//       delete
//     </button>
//   </td>
// </tr>
