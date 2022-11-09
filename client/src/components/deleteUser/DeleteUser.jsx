import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteUser(id));
    navigate("/");
  }, [id, dispatch, navigate]);
  return <div>DeleteUser</div>;
};

export default DeleteUser;
