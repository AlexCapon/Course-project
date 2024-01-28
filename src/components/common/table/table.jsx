/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './tableHeader';
import TableBody from './tableBody';

export default function Table({
  children,
  selectedSort,
  onSort,
  columns,
  users,
}) {
  return (
    <table className="table">
      {children
      || (
      <>
        <TableHeader
          selectedSort={selectedSort}
          onSort={onSort}
          columns={columns}
        />
        <TableBody columns={columns} data={users} />
      </>
      )}
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.array,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.array,
  users: PropTypes.array,
};
