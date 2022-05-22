import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Auth from '../middleware/storage';
import { paths } from '../utils/constants';

export default function ProtectedRoutes() {
  if (Auth.isAuthenticated() && (Auth.getRole() === 'user' || Auth.getRole() === 'organizer')) {
    return <Outlet />;
  } else {
    return <Navigate to={paths.SIGNIN} />;
  }
}

export function ProtectedAdminRoutes() {
  if (Auth.isAuthenticated() && Auth.getRole() === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to={paths.ADMIN} />;
  }
}
