/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Компоненты
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Table from './table';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';

export default function UsersTable({
  usersOnPage,
  onDelete,
  onBookmark,
  onSort,
  selectedSort,
}) {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      caret: '',
      component: (user) => (
        <Bookmark status={user.bookmark} onMark={() => onBookmark(user._id)} />
      ),
    },
    delete: {
      component: (user) => (
        <button
          id={`${user._id}del_btn`}
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
          type="button"
        >
          delete
        </button>
      ),
    },
  };
  return usersOnPage[0] ? (
    <Table>
      <TableHeader
        columns={columns}
        selectedSort={selectedSort}
        onSort={onSort}
      />
      <TableBody columns={columns} data={usersOnPage} />
    </Table>
  ) : (
    <h2> </h2>
  );
}

UsersTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  usersOnPage: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
