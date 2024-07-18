import React, { Suspense, lazy, useState } from 'react';
import HeaderDashboard from '@/components/header/headerDashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddBlogPage from '@/pages/addBlogPage';
import DraftPage from '@/pages/draftPage';
import MyBlogPage from '@/pages/myBlogPage';
import useLogout from '@/hooks/auth/useLogout';
import { useAuthContext } from '@/context/authContext';
import { useUnsavedChangesContext } from '@/context/unsavedChangesContext';
import ConfirmNavigationModal from '@/components/global/confirmNavigationmodal';

const DashboardPage = lazy(() => import('@/pages/dashboardPage'));

const DashboardLayout: React.FC = () => {
    const { loading, logout, errMessage } = useLogout();
    const { isSaved } = useUnsavedChangesContext();

    const { setAuthUser } = useAuthContext();
    
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingNavigationPath, setPendingNavigationPath] = useState<
        string | null
    >(null);

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-lg btn btn-primary justify-start w-full'
            : 'text-lg btn btn-ghost justify-start w-full';

    const handleLogout = () => {
        logout();
        navigate('/')
        setAuthUser(null);
    };

    const handleNavigate = (path: string) => {
        if (isSaved) {
            setPendingNavigationPath(path);
            setIsModalOpen(true);
        } else {
            navigate(path);
        }
    };

    const handleConfirmNavigation = () => {
        if (pendingNavigationPath) {
            navigate(pendingNavigationPath);
        }
        setIsModalOpen(false);
        setPendingNavigationPath(null);
    };

    const handleCancelNavigation = () => {
        setIsModalOpen(false);
        setPendingNavigationPath(null);
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
                            <Route
                                path="/writeBlog"
                                element={<AddBlogPage />}
                            />
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
                        <button
                            onClick={() => handleNavigate('/dashboard')}
                            className={getNavLinkClass({
                                isActive:
                                    window.location.pathname === '/dashboard'
                            })}
                        >
                            <i className="bi bi-window-dash"></i>
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() =>
                                handleNavigate('/dashboard/writeBlog')
                            }
                            className={getNavLinkClass({
                                isActive:
                                    window.location.pathname ===
                                    '/dashboard/writeBlog'
                            })}
                        >
                            <i className="bi bi-pencil-square"></i>
                            Write Blog
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigate('/dashboard/myblog')}
                            className={getNavLinkClass({
                                isActive:
                                    window.location.pathname ===
                                    '/dashboard/myblog'
                            })}
                        >
                            <i className="bi bi-file-earmark-richtext"></i>
                            My Blogs
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigate('/dashboard/draft')}
                            className={getNavLinkClass({
                                isActive:
                                    window.location.pathname ===
                                    '/dashboard/draft'
                            })}
                        >
                            <i className="bi bi-file-earmark-break"></i>
                            Draft
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-lg btn btn-ghost justify-start w-full"
                        >
                            <i className="bi bi-box-arrow-left"></i>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <ConfirmNavigationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmNavigation}
                onCancel={handleCancelNavigation}
            />
        </main>
    );
};

export default DashboardLayout;
