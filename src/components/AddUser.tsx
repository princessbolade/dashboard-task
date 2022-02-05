import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../store/actions/actionCreator";
import { RootState } from "../store/reducers/userReducer";
import { Store } from "../store/types";

const AddUser = () => {
  const users = useSelector<Store, Store["users"]>(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const checkEmail = users.find((user) => user.email === email && user);

    if (!name || !email) {
      return toast.warning("Input field is empty!");
    }

    if (checkEmail) {
      return toast.error("This email already exists");
    }

    dispatch(addUser(name, email));
    toast.success("Contact Added");

    navigate("/");
  };

  const routeToHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row my-5">
        <h3 className="text-center">Form</h3>
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-between ">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginLeft: "30px" }}
                />
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex align-items-center">
                <span>Email</span>

                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginLeft: "30px" }}
                />
              </div>
            </div>

            <div
              className="form-group d-flex justify-content-end"
              style={{ marginTop: "15px" }}
            >
              <input
                type="submit"
                value="Cancel"
                className="btn btn-block btn-outline-danger"
                style={{ marginRight: "20px" }}
                onClick={routeToHome}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-block btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
