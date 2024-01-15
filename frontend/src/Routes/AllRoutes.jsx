import React from 'react'
import { Route, Routes } from "react-router-dom";
import NewTask from '../Pages/NewTask';
import MyProfile from '../Pages/MyProfile';
import PrivateRoute from './PrivateRoute';
import Signup from '../Pages/Signup';
import Signin from '../Pages/Signin';
import Home from '../Pages/Home';
import Mytasks from '../components/Mytasks';
import Signout from '../components/Signout';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <NewTask />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/" element={<Signup></Signup>} />
        <Route path="/login" element={<Signin></Signin>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home></Home>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/addtask"
          element={
            <PrivateRoute>
              <NewTask></NewTask>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/mytasks"
          element={
            <PrivateRoute>
              <Mytasks></Mytasks>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Signout></Signout>
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default AllRoutes
