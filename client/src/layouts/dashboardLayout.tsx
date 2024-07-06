import React from 'react';
import { lazy } from 'react';
import HeaderDashboard from '@/components/header/headerDashboard';
import { NavLink, Route, Routes } from 'react-router-dom';
const DashboardPage = lazy(() => import('@/pages/dashboardPage'));
import AddBlogPage from '@/pages/addBlogPage';
import DraftPage from '@/pages/draftPage';
import MyBlogPage from '@/pages/myBlogPage';

const DashboardLayout: React.FC = () => {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-lg btn btn-primary justify-start w-full'
            : 'text-lg btn btn-ghost justify-start w-full';

    return (
        <main className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-200 relative">
                <div className="sticky -top-1 left-0 w-full z-30">
                    <HeaderDashboard />
                </div>
                <div className="mx-2 md:mx-4">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/addBlog" element={<AddBlogPage />} />
                        <Route path="/draft" element={<DraftPage />} />
                        <Route path="/myblog" element={<MyBlogPage />} />
                    </Routes>
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
                        <NavLink
                            to="/dashboard"
                            end
                            className={getNavLinkClass}
                        >
                            <i className="bi bi-window-dash"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/addblog"
                            end
                            className={getNavLinkClass}
                        >
                            <i className="bi bi-pencil-square"></i>
                            Add Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/myblog"
                            className={getNavLinkClass}
                        >
                            <i className="bi bi-file-earmark-richtext"></i>
                            My Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/draft"
                            className={getNavLinkClass}
                        >
                            <i className="bi bi-file-earmark-break"></i>
                            Draft
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="text-lg btn btn-ghost justify-start w-full"
                        >
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
