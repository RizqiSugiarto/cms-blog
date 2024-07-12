import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from '@/pages/registerPage';
import LoginPage from '@/pages/loginPage';
import DashboardLayout from './layouts/dashboardLayout';
import BlogPages from './pages/blogsPage';
import ProtectedRoute from './utils/protectedMiddleware';
import React from 'react';

const RouterComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/*" element={<DashboardLayout />} />
                    <Route path="/blog" element={<BlogPages />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterComponent;
