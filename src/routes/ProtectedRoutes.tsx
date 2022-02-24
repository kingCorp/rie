import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Auth from '../middleware/storage';
import { paths } from '../utils/constants';

export default function ProtectedRoutes() {
  return Auth.isAuthenticated() ? <Outlet /> : <Navigate to={paths.SIGNIN} />;
}
