import React from 'react';

const MyBlogComponent: React.FC = () => {
    return (
        <div className="w-full h-full">
            <div className="w-[175px] h-[53px] mt-[28px] ml-[34px]">
                <label
                    htmlFor="search blog"
                    className="text-[16px] font-medium font-Jost"
                >
                    Search Blog
                </label>
                <input
                    type="text"
                    placeholder="Search by title"
                    className="w-full h-[30px] rounded-lg border-2 text-[12px] p-2"
                />
            </div>
            <div className="w-full h-[610px] flex justify-center mt-[20px]">
                <div className="w-[380px] h-full rounded-[15px] flex justify-center border-2">
                    <div className="w-[360px] h-[30px] bg-grayButton flex justify-between  items-center p-1 rounded mt-[18px]">
                        <p className="font-Jost text-[14px] font-medium">
                            Cara Masuk ke Isekai
                        </p>
                        <div className="w-[70px] h-[20px] rounded-[20px] bg-white">
                            <p className="font-Jost text-[14px] font-medium text-center">
                                Published
                            </p>
                        </div>
                        <div className="w-[105px] h-[20px] flex justify-between">
                            <button className="w-[50px] h-[20px] rounded-[5px] bg-blueButton text-white font-medium text-[14px] font-Jost text-center">
                                Update
                            </button>
                            <button className="w-[50px] h-[20px] rounded-[5px] bg-redButton text-white font-medium text-[14px] font-Jost text-center">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[40px] flex items-center justify-center">
                <div className="w-[200px] flex justify-between">
                    <button className="h-[21px] w-[84px] rounded-[20px] text-center text-white bg-graySecond">
                        Previous
                    </button>
                    <button className="h-[20px] w-[20px] rounded-full bg-purpleCustom text-white font-Jost font-medium">
                        1
                    </button>
                    <button className="h-[21px] w-[84px] rounded-[20px] text-center text-white bg-graySecond">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyBlogComponent;
