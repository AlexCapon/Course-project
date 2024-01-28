/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import api from '../../api';
import InputField from '../common/form/inputField';
import showElement from '../../utils/showElement';
import showError from '../../utils/showError';
import validator from '../../utils/validator';
import Select from '../common/form/select';

export default function RegisterForm() {
  const emptyData = { email: '', password: '', profession: '' };
  const [data, setData] = useState(emptyData);
  const [errors, setErrors] = useState({});
  const [professions, setPropfessions] = useState(api.professions.fetchAll());

  useEffect(() => {
    if (!Array.isArray(professions)) {
      professions
        .then((array) => setPropfessions(array))
        .catch((err) => showError(err));
    }
  }, []);
  showElement(professions, 'professions');
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
    profession: {
      isRequired: {
        message: 'Выберите профессию',
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
      const newUser = {
        username: data.email,
        password: data.password,
        profession: professions.filter(
          (prof) => prof._id === data.profession,
        )[0],
        id: Date.now() + data.email,
      };
      showElement(newUser, 'Trying to register user...');
      setData(emptyData);
    }
  }
  const formIsInvalid = Object.keys(errors).length !== 0;

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <div className="">
      <h2>Регистрация</h2>
      <form id="loginForm" onChange={handleChange} className="form mb-5 ms-2">
        <InputField
          name="email"
          type="text"
          label="E-mail"
          placeholder="adress@mail.com"
          value={data.email}
          error={errors.email}
          onChange={handleChange}
        />
        <InputField
          name="password"
          type="password"
          label="Пароль"
          placeholder="It1sAGo0dP@ss!"
          value={data.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Select
          label="Профессии"
          defaultOption="Выберете профессию"
          options={professions}
          value={data.profession}
          error={errors.profession}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary mt-2 mx-auto w-100"
          disabled={formIsInvalid}
        >
          Зарегестрироваться
        </button>
      </form>
      <span className="w-100">
        Уже есть аккаунт?
        {' '}
        <a href="/login">Авторизируйтесь!</a>
      </span>
    </div>
  );
}
