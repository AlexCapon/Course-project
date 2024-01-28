/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Компоненты
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import NotFoundPage from './components/pages/notFoundPage';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index Component={MainPage} />
        <Route path="/login/:register?" Component={Login} />
        <Route path="/users/:userId?" Component={Users} />
        <Route path="/404" Component={NotFoundPage} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
