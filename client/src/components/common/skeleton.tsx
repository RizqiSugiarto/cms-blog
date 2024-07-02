import React, { ReactNode, useState, useEffect } from 'react';
import Header from '../header/headerDashboard';
import SideBar from './sideBar';

interface SkeletonBodyComponentProps {
    children: ReactNode;
}

const Skeleton: React.FC<SkeletonBodyComponentProps> = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        console.log(target, 'ISINYA KEK GINI');
        if (!target.closest('.sidebar') && !target.closest('.header-icon')) {
            setIsSidebarVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full h-full">
            <Header toggleSidebar={toggleSidebar} />
            {isSidebarVisible && <SideBar />}
            <div className="w-full h-full">{children}</div>
        </div>
    );
};

export default Skeleton;
