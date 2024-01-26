/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useParams } from 'react-router';
import LoginForm from '../components/loginForm';
import showElement from '../utils/showElement';
import RegisterForm from '../components/rgisterForm';

export default function LoginPage() {
  const params = useParams();
  const { register } = useParams();
  showElement(params, 'register');
  return (
    <div id="formContainer" className="container text-center">
      <input type="color" hidden />
      <div className="row">
        <div className="col" />
        <div className="col mt-5 pt-5 pb-5 card shadow">
          {!register
            ? <LoginForm />
            : <RegisterForm />}
        </div>
        <div className="col" />
      </div>
    </div>
  );
}
