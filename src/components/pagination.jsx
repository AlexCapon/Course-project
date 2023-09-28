/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import _ from 'lodash';

export default function Pagination({
  itemCount, pageSize, onPageChange, currentPage,
}) {
  const numberOfPages = [];
  for (let i = 0; i < itemCount; i += pageSize) numberOfPages.push(numberOfPages.length + 1);
  if (numberOfPages.length <= 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {numberOfPages.map((page) => {
          const classOfPage = page === currentPage ? ' active' : '';
          return (
            <li className={`page-page${classOfPage}`} key={`page_${page}`}>
              <a className="page-link btn" onClick={() => onPageChange(page)}>{page}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
