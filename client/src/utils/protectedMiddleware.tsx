import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const isJwtExist = (): boolean => !!localStorage.getItem('access-token');

const ProtectedRoute: React.FC = () => {
    return isJwtExist() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
