import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import StatisticIcon from '@/assets/icon/statistic.svg';
import MyArthicleIcon from '@/assets/icon/add post.svg';
import DraftIcon from '@/assets/icon/draft.svg';
import { useNavigate } from 'react-router-dom';

const SideBar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleItemClick = (item: string) => {
        setActiveItem(item); // Set active item state
        switch (item) {
            case 'statistic':
                navigate('/dashboard');
                break;
            case 'myArthicle':
                navigate('/blog');
                break;
            case 'draft':
                navigate('/draft');
                break;
            case 'addBlog':
                navigate('/addblog');
                break;
            default:
                break;
        }
    };

    const isActive = (item: string) => activeItem === item;

    return (
        <div className="w-[150px] h-full shadow-sideBar fixed top-0 left-0 z-20 bg-white sidebar flex justify-center">
            <div className="w-[120px] h-full">
                <button
                    className="mt-[90px] w-full h-[35px] bg-grayButton rounded-[8px] text-purpleCustom text-[13px]"
                    onClick={() => handleItemClick('addBlog')}
                >
                    New Post
                </button>
                <hr className="mt-[26px]" />
                <div className="w-full mt-[30px] flex flex-col space-y-5">
                    <div
                        className="flex space-x-3 items-center ml-[5px] cursor-pointer"
                        onClick={() => handleItemClick('statistic')}
                    >
                        <ReactSVG
                            src={StatisticIcon}
                            className={
                                isActive('statistic')
                                    ? 'fill-purpleCustom'
                                    : 'fill-current'
                            }
                        />
                        <p
                            className={`font-Jost text-[15px] font-medium ${
                                isActive('statistic') ? 'text-purpleCustom' : ''
                            } mt-[10px]`}
                        >
                            Dashboard
                        </p>
                    </div>
                    <div
                        className="flex space-x-3 items-center ml-[2px] cursor-pointer"
                        onClick={() => handleItemClick('myArthicle')}
                    >
                        <ReactSVG
                            src={MyArthicleIcon}
                            className={
                                isActive('myArthicle')
                                    ? 'fill-purpleCustom'
                                    : 'fill-current'
                            }
                        />
                        <p
                            className={`font-Jost text-[15px] font-medium ${
                                isActive('myArthicle')
                                    ? 'text-purpleCustom'
                                    : ''
                            } mt-[10px]`}
                        >
                            My Blog
                        </p>
                    </div>
                    <div
                        className="flex space-x-4 items-center cursor-pointer"
                        onClick={() => handleItemClick('draft')}
                    >
                        <ReactSVG
                            src={DraftIcon}
                            className={
                                isActive('draft')
                                    ? 'fill-purpleCustom'
                                    : 'fill-current'
                            }
                        />
                        <p
                            className={`font-Jost text-[15px] font-medium ${
                                isActive('draft') ? 'text-purpleCustom' : ''
                            } mt-[10px]`}
                        >
                            Draft
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
