import "./pagination.css";
import { NavLink } from "react-router-dom";
const Pagination = ({
  userPerpage,
  totalUsers,
  paginate,
  currentPage,
  handlePrevBtn,
  handleNextBtn,
  pageIncrementBtn,
  pageDecrementBtn,
  maxInPageRange,
  minInPageRange,
}) => {
  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / userPerpage); i++) {
    PageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <nav>
        <ul>
          <li>
            <NavLink onClick={handlePrevBtn}>Prev</NavLink>
          </li>
          {pageDecrementBtn}
          {PageNumbers.map(
            (number) =>
              number < maxInPageRange + 1 &&
              number > minInPageRange && (
                <li
                  key={number}
                  className={number === currentPage ? "active" : ""}
                >
                  <NavLink onClick={() => paginate(number)}>{number}</NavLink>
                </li>
              )
          )}
          {pageIncrementBtn}
          <li>
            <NavLink onClick={handleNextBtn}>Next</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
