import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/reducers/userReducer";
import { Store, Users } from "../store/types";
import ModalComponent from "./ModalComponent";

const Home = () => {
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleShow = (id: number) => {
    setDeleteId(id);
    setShow(true);
  };

  const selectorUsers = useSelector<Store, Store["users"]>(
    (state: RootState) => state.users
  );

  const [users, setUsers] = useState<Store["users"]>(selectorUsers);

  useEffect(() => {
    setUsers(selectorUsers);
  }, [selectorUsers]);

  console.log(users);

  const marginStyle = { marginTop: "3rem" };

  return (
    <>
      <ModalComponent show={show} setShow={setShow} id={deleteId} />
      <div
        className="container"
        style={{ maxWidth: "65rem", marginTop: "4rem" }}
      >
        <h1 className="fs-3 fw-bold"> Dashboard </h1>

        <div className="card text-center" style={marginStyle}>
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills d-flex justify-content-between align-items-start">
              <li className="nav-item">
                <p className="nav-link text-dark h3">User list</p>
              </li>

              <li className="nav-item text-end">
                <Link to="/add" className="btn btn-primary btn-lg">
                  {" "}
                  Add New{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-10 mx-auto" style={marginStyle}>
            <table className="table table-hover">
              <thead className="text-white bg-dark text-center">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">City</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: Users, id: any) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>
                      <Link
                        to={`/edit/${user.id}`}
                        className="btn btn-small btn-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleShow(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
