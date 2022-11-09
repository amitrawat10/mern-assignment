import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import {
  clearErrors,
  getUserDetails,
  loadUser,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
const EditUser = ({ adminProfile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isUpdated, error } = useSelector((state) => state.profile);
  const { user: editUser, isLoading } = useSelector(
    (state) => state.userDetails
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    dispatch(getUserDetails(id));
    if (adminProfile) {
      setName(user.name);
      setEmail(user.email);
      setCity(user.city);
      setRole(user.role);
      setMobile(user.mobile);
    } else {
      setName(editUser.name);
      setEmail(editUser.email);
      setCity(editUser.city);
      setRole(editUser.role);
      setMobile(editUser.mobile);
    }
  }, [
    navigate,
    isAuthenticated,
    id,
    dispatch,
    editUser.name,
    editUser.email,
    editUser.city,
    editUser.role,
    editUser.mobile,
    user.name,
    user.email,
    user.city,
    user.role,
    user.mobile,
    adminProfile,
  ]);

  const handleSubmit = (e) => {
    setErrorText("");
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      city === "" ||
      mobile === "" ||
      role === ""
    ) {
      setErrorText("Please enter all fields");
      return;
    } else {
      if (adminProfile)
        dispatch(updateUser(user._id, { name, email, city, mobile, role }));
      else dispatch(updateUser(id, { name, email, city, mobile, role }));
    }
  };

  useEffect(() => {
    console.log(isUpdated);
    if (error) {
      setErrorText(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [error, errorText, dispatch, isUpdated, navigate, user]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{adminProfile ? "Update Profile" : "Edit user"}</h2>
        <div>
          <input
            type="text"
            name="name"
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter name"
          />
        </div>

        <div>
          <input
            type="text"
            name="email"
            required={true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
        </div>

        {/* <div>
          <input
            type="password"
            name="password"
            required={true}
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="password"
            required={true}
            name="confirmPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            placeholder="Enter confirm password"
          />
        </div> */}

        <div>
          <input
            type="text"
            required={true}
            name="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="Enter city"
            value={city}
          />
        </div>

        <div>
          <input
            type="text"
            name="mobile"
            required={true}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            value={mobile}
            placeholder="Enter mobile no"
          />
        </div>
        <div>
          <input
            type="text"
            name="role"
            required={true}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            value={role}
            placeholder="Enter role"
          />
        </div>
        <span className="error-text">{errorText}</span>
        <button type="submit" className="register-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
