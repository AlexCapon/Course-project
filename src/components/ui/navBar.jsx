/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/showElement';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="users"
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Решение без NavLink
// const currentPage = localStorage.getItem('page');
// function setActiveLinkOnLoad() {
//   const links = document.querySelectorAll('.nav-link');
//   showElement(links, 'links');
//   links.forEach((link) => {
//     showElement(link, 'link');
//     if (link.innerHTML === currentPage) {
//       link.classList.add('navbar-brand');
//     } else {
//       link.classList.remove('navbar-brand');
//     }
//   });
// }
// window.onload = setActiveLinkOnLoad;
// function toggleActiveClass(item) {
//   const links = document.querySelectorAll('.nav-link');
//   if (item && item.classList.contains('nav-link')) {
//     links.forEach((link) => {
//       if (link.innerHTML === item.innerHTML) {
//         link.classList.add('navbar-brand');
//         localStorage.page = link.innerHTML;
//       } else {
//         link.classList.remove('navbar-brand');
//       }
//     });
//   }
// }
// function handleClick(event) {
//   toggleActiveClass(event.target);
// }
