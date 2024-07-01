import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from '@/pages/registerPage';
import LoginPage from '@/pages/loginPage';
import DashboardPage from './pages/dashboardPage';
import BlogPage from './pages/blogPage';
import DraftPage from './pages/draftPage';
import AddBlogPage from './pages/AddBlogPage';
import React from 'react';

const RouterComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/draft" element={<DraftPage />} />
                <Route path="/addblog" element={<AddBlogPage />} />
            </Routes>
        </Router>
    );
};

export default RouterComponent;
