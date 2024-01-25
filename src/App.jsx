/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Компоненты
import Users from './pages/users';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import NavBar from './navBar';
import NotFoundPage from './pages/notFoundPage';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index Component={MainPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/users/:userId?" Component={Users} />
        <Route path="/404" Component={NotFoundPage} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
