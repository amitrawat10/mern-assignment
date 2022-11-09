import { useEffect, useState } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/userAction";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const Register = ({ adminCreate }) => {
  const initalState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    mobile: "",
  };
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const { error, isLoading, isAuthenticated } = useSelector(
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
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.city === "" ||
      formData.mobile === ""
    ) {
      setErrorText("Please enter all fields");
      return;
    } else {
      if (formData.password !== formData.confirmPassword) {
        setErrorText("Password & confirm password should match");
        return;
      } else {
        adminCreate && dispatch(createUser(formData));
        if (adminCreate) navigate("/");
      }
    }
  };

  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
    if (!adminCreate) if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, adminCreate, error]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{adminCreate ? "Create new user" : "Register"}</h2>
        <div>
          <input
            type="text"
            name="name"
            required={true}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

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

        <div>
          <input
            type="password"
            required={true}
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            placeholder="Enter confirm password"
          />
        </div>

        <div>
          <input
            type="text"
            required={true}
            name="city"
            onChange={handleChange}
            placeholder="Enter city"
            value={formData.city}
          />
        </div>

        <div>
          <input
            type="text"
            name="mobile"
            required={true}
            onChange={handleChange}
            value={formData.mobile}
            placeholder="Enter mobile no"
          />
        </div>
        <span className="error-text">{errorText}</span>
        <button type="submit" className="register-btn">
          {adminCreate ? "Create new user" : "Sign Up"}
        </button>
        {!adminCreate && (
          <div className="login-link">
            <span>
              Already have account sign in <NavLink to="/login">here</NavLink>
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
