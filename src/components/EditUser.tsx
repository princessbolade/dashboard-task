import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editUser } from "../store/actions/actionCreator";
import { RootState } from "../store/reducers/userReducer";
import { Store } from "../store/types";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const selectorUsers = useSelector<Store, Store["users"]>(
    (state: RootState) => state.users
  );

  const [users, setUsers] = useState(selectorUsers);

  useEffect(() => {
    setUsers(selectorUsers);
  }, [selectorUsers]);

  const foundUser = users.find((user) => user.id === parseInt(id as string));

  useEffect(() => {
    if (foundUser) {
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
  }, [foundUser]);

  const handleSubmit = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();

    const checkEmail = users.find(
      (user) => user.email === email && user.id !== id
    );

    if (!name || !email) {
      return toast.warning("Input field is empty!");
    }

    if (checkEmail) {
      return toast.error("This email already exists");
    }

    dispatch(editUser(id, name, email));
    toast.success("Contact Edited");

    navigate("/");
  };

  return (
    <div className="container">
      <div className="row my-5">
        {foundUser ? (
          <>
            <h1 className="display-3 text-center">Edit Contact - {id}</h1>
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={(e) => handleSubmit(e, foundUser.id)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group my-2">
                  <input
                    type="submit"
                    value="Edit Contact"
                    className="btn btn-block btn-dark"
                  />

                  <Link to="/" className="btn btn-block btn-danger mx-3">
                    {" "}
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </>
        ) : (
          <h1 className="display-3 text-center">
            Contact with id - {id} does not exist
          </h1>
        )}
      </div>
    </div>
  );
};

export default EditUser;
