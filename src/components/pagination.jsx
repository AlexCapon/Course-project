import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function Pagination({
  itemCount,
  pageSize,
  onPageChange,
  currentPage,
}) {
  const numberOfPages = [];
  for (let i = 0; i < itemCount; i += pageSize) { numberOfPages.push(numberOfPages.length + 1); }
  // Исправить баг с удалением пользователей на последней странице.Вписать в условие возврат на 1-ю.
  if (numberOfPages.length <= 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {numberOfPages.map((page) => {
          const classOfPage = page === currentPage ? ' active' : '';
          return (
            <li className={`page-page${classOfPage}`} key={`page_${page}`}>
              <button
                className="page-link btn"
                type="button"
                onClick={() => onPageChange(page)}
                tabIndex={0}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
