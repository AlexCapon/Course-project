/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';

// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import RegisterForm from '../components/ui/rgisterForm';

export default function Login() {
  const { register } = useParams();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 shadow p-4 mt-3">
          {!register
            ? <LoginForm />
            : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
