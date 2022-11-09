import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector } from "react-redux";
import store from "./store/store";
import { loadUser } from "./actions/userAction";
import EditUser from "./components/editUser/EditUser";
import DeleteUser from "./components/deleteUser/DeleteUser";
// import UpdateProfile from "./components/profile/UpdateProfile";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/new" element={<Register adminCreate={true} />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
          <Route
            path="/profile-update"
            element={<EditUser adminProfile={true} />}
          />

          <Route
            path="/password/update"
            element={isAuthenticated ? <Dashboard /> : <Register />}
          />
          <Route
            path="/logout"
            element={isAuthenticated ? <Dashboard /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
