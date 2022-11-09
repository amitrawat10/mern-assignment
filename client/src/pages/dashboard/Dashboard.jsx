import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";
const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { users, isLoading: allUserLoading } = useSelector(
    (state) => state.allUsers
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(5);
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    dispatch(getAllUsers());
  }, [navigate, isAuthenticated, dispatch]);

  const indexOfLastUser = userPerPage * currentPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const curretUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const [pageNumberRange] = useState(5);
  const [maxInPageRange, setMaxInPageRange] = useState(5);
  const [minInPageRange, setMinPageRange] = useState(0);
  const handlePrevBtn = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberRange === 0) {
      setMaxInPageRange(maxInPageRange - pageNumberRange);
      setMinPageRange(minInPageRange - pageNumberRange);
    }
  };
  const handleNextBtn = () => {
    if (currentPage * currentPage <= users.length)
      setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxInPageRange) {
      setMaxInPageRange(maxInPageRange + pageNumberRange);
      setMinPageRange(minInPageRange + pageNumberRange);
    }
  };

  let pageDecrementBtn = null;
  if (minInPageRange >= 1) {
    pageDecrementBtn = (
      <li>
        <NavLink onClick={handlePrevBtn}>&hellip;</NavLink>
      </li>
    );
  }
  let pageIncrementBtn = null;
  if (users.length > maxInPageRange) {
    pageIncrementBtn = (
      <li>
        <NavLink onClick={handleNextBtn}>&hellip;</NavLink>
      </li>
    );
  }

  const paginate = (number) => setCurrentPage(number);
  return isLoading || allUserLoading ? (
    <Loader />
  ) : (
    <div className="dashboard">
      <header className="header">
        <h3>Welcome {user && user.role === "admin" && user.name}</h3>
        <div className="admin-links">
          <NavLink to="/user/new">Create new user</NavLink> |{" "}
          <NavLink to="/profile-update">Edit Profile</NavLink>
        </div>
      </header>
      <div className="user-box">
        {curretUsers &&
          curretUsers.map(
            (singleUser, i) =>
              singleUser.role !== "admin" && (
                <div className="user" key={i}>
                  <div>
                    <span>Name:</span>
                    <span>{singleUser.name}</span>
                  </div>
                  <div>
                    <span>Email:</span>
                    <span>{singleUser.email}</span>
                  </div>
                  <div>
                    <span>Mob:</span>
                    <span>{singleUser.mobile}</span>
                  </div>
                  <div>
                    <span>City:</span>
                    <span>{singleUser.city}</span>
                  </div>
                  <div>
                    <span>Role:</span>
                    <span>{singleUser.role}</span>
                  </div>

                  <div>
                    <NavLink to={`/edit/${singleUser._id}`}>Edit</NavLink>
                    <NavLink to={`/delete/${singleUser._id}`}>Delete</NavLink>
                  </div>
                </div>
              )
          )}
        <Pagination
          totalUsers={users.length}
          userPerpage={userPerPage}
          paginate={paginate}
          currentPage={currentPage}
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
          pageIncrementBtn={pageIncrementBtn}
          pageDecrementBtn={pageDecrementBtn}
          minInPageRange={minInPageRange}
          maxInPageRange={maxInPageRange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
