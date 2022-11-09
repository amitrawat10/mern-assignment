import { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initalState = {
    email: "",
    password: "",
  };
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { error, isLoading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initalState);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setErrorText("");
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setErrorText("Please enter all fields");
      return;
    } else {
      dispatch(login(formData.email, formData.password));
    }
  };

  useEffect(() => {
    setErrorText("");
    if (error) {
      setErrorText(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, error, errorText, user, dispatch]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <input
            type="text"
            name="email"
            required={true}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            required={true}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <span className="error-text">{errorText}</span>
        <button type="submit" className="login-btn">
          Sign In
        </button>
        <div className="register-link">
          <span>
            Do not have account Sign up <NavLink to="/register">here</NavLink>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
