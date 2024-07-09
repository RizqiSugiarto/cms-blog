import React, { Suspense, lazy } from 'react';
import HeaderDashboard from '@/components/header/headerDashboard';
import { NavLink, Route, Routes } from 'react-router-dom';
import AddBlogPage from '@/pages/addBlogPage';
import DraftPage from '@/pages/draftPage';
import MyBlogPage from '@/pages/myBlogPage';
import useLogout from '@/hooks/auth/useLogout';

const DashboardPage = lazy(() => import('@/pages/dashboardPage'));

const DashboardLayout: React.FC = () => {
    const { loading, logout, errMessage } = useLogout();

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-lg btn btn-primary justify-start w-full'
            : 'text-lg btn btn-ghost justify-start w-full';

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div>{loading}</div>;
    }

    if (errMessage) {
        return <div>{errMessage}</div>;
    }

    return (
        <main className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-200 relative">
                <div className="sticky -top-1 left-0 w-full z-30">
                    <HeaderDashboard />
                </div>
                <div className="mx-2 md:mx-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/writeBlog" element={<AddBlogPage />} />
                            <Route path="/draft" element={<DraftPage />} />
                            <Route path="/myblog" element={<MyBlogPage />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
            <div className="drawer-side z-30">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-64 md:w-80 min-h-full bg-base-100 text-base-content space-y-2 [&>a]:btn-primary">
                    <div>
                        <h2 className="text-xl font-bold btn btn-ghost justify-start w-full">
                            SIMPLE CMS
                        </h2>
                    </div>
                    <li>
                        <NavLink to="/dashboard" end className={getNavLinkClass}>
                            <i className="bi bi-window-dash"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/writeBlog" end className={getNavLinkClass}>
                            <i className="bi bi-pencil-square"></i>
                            Write Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myblog" className={getNavLinkClass}>
                            <i className="bi bi-file-earmark-richtext"></i>
                            My Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/draft" className={getNavLinkClass}>
                            <i className="bi bi-file-earmark-break"></i>
                            Draft
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="text-lg btn btn-ghost justify-start w-full" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left"></i>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default DashboardLayout;
