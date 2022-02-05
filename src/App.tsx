import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Home from './components/Home';
import { getUsers } from './store/actions/actionCreator';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";
    
    dispatch(getUsers(url));

  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
