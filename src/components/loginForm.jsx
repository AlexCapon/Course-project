/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import showElement from '../utils/showElement';
import InputField from './inputField';
import validator from '../utils/validator';

export default function LoginForm() {
  const emptyData = { email: '', password: '' };
  const [data, setData] = useState(emptyData);
  const [errors, setErrors] = useState({});
  showElement(errors, 'errors');

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Введите e-mail',
      },
      isEmail: {
        message: 'Не корректный e-mail',
      },
    },
    password: {
      isRequired: {
        message: 'Введите пароль',
      },
      isCapitalSymbol: {
        message: 'В пароле должна быть хотя бы 1 заглавная буква',
      },
      isContainsDigits: {
        message: 'В пароле должна быть хотя бы 1 цифра',
      },
      minLength: {
        message: 'В пароле должно быть минимум 8 символов',
        value: 8,
      },
    },
  };
  function validate() {
    const errorsObj = validator(data, validatorConfig);
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  function handleChange({ target }) {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }
  function handleSubmit() {
    const dataIsValid = validate();
    if (dataIsValid) {
      const logingInUser = {
        username: data.email,
        password: data.password,
      };
      showElement(logingInUser, 'user trying to login...');
      setData(emptyData);
    }
  }
  const formIsInvalid = Object.keys(errors).length !== 0;

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <div className="">
      <h2>Авторизация</h2>
      <form id="loginForm" onChange={handleChange} className="form mb-5">
        <InputField name="email" type="text" value={data.email} label="E-mail" onChange={handleChange} error={errors.email} />
        <InputField name="password" type="password" value={data.password} label="Пароль" onChange={handleChange} error={errors.password} />
        <button type="button" onClick={handleSubmit} className="btn btn-primary mt-2 mx-auto w-100" disabled={formIsInvalid}>Войти</button>
      </form>
      <span className="w-100">
        Нет аккаунта?
        {' '}
        <a href="/login/register">Зарегестрируйтесь!</a>
      </span>
    </div>
  );
}
