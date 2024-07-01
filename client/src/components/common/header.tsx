import React from 'react';
import MenuIcon from '@/assets/icon/Menush.jpg';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <div className="w-full h-[56px] flex items-center border-b-2 sticky top-0 z-50 bg-white">
            <div className="ml-[12px]">
                <img
                    src={MenuIcon}
                    alt="Menu Icon"
                    className="w-[30px] h-[25px] text-black header-icon"
                    onClick={toggleSidebar}
                />
            </div>
            <h1 className="text-[24px] font-Poppins font-bold ml-[14px] text-purpleCustom">
                SIMPLE CMS
            </h1>
        </div>
    );
};

export default Header;
