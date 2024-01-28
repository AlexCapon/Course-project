/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../api';
// Компоненты
import QualitiesList from '../../ui/qualities/qualitiesList';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/showElement';
import showError from '../../../utils/showError';

export default function User({ userId }) {
  showElement(userId, 'userId');
  const [user, setUser] = useState();
  showElement(user, 'user');
  useEffect(() => {
    if (!user?.id) {
      api.users.fetchAll()
        .then((data) => {
          const result = data.filter((item) => item._id === userId)[0];
          setUser(result);
        })
        .catch((err) => showError(err));
    }
  }, []);

  if (!user?._id) return <h2><span className="badge bg-warning m-3">Загрузка...</span></h2>;

  const {
    name, profession, completedMeetings, rate, qualities,
  } = user;
  return (
    <div className="container m-5">
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
  userId: PropTypes.string.isRequired,
};
