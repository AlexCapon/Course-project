import PropTypes from 'prop-types';
import Pagination from '../components/pagination';
export default function paginate(items, pageNumber, pageSize) {
  const firstUser = pageSize * (pageNumber - 1);
  return [...items].splice(firstUser, pageSize);
};
Pagination.propTypes={
  itemCount:PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
  currentPage:PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
}