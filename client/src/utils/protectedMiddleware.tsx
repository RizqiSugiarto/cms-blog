import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const isCookieExist = (): boolean => !!Cookies.get('jwt');

const ProtectedRoute: React.FC = () => {
    return isCookieExist() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
