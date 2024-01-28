import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/pages/userPage';
import UsersListPage from '../components/pages/usersListPage';

export default function Users() {
  const { userId } = useParams();
  return userId ? <UserPage userId={userId} /> : <UsersListPage />;
}
