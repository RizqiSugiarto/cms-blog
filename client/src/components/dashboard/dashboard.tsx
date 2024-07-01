import React from 'react';
import LineChartComponent from '../common/lineChart';

const DashboardComponent: React.FC = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-[90px] flex justify-center mt-3">
                <div className="w-[380px] flex justify-between">
                    <div className="w-[104px] h-full bg-yellowDashboard rounded-[20px] flex items-center justify-center">
                        <div>
                            <h1 className="text-white font-Jost text-[16px] font-medium text-center">
                                Total Post
                            </h1>
                            <p className="text-white font-Jost text-[16px] font-medium text-center">
                                10
                            </p>
                        </div>
                    </div>
                    <div className="w-[104px] h-full bg-purpleDashboard rounded-[20px] flex items-center justify-center">
                        <div>
                            <h1 className="text-white font-Jost text-[16px] font-medium text-center">
                                Total View
                            </h1>
                            <p className="text-white font-Jost text-[16px] font-medium text-center">
                                10
                            </p>
                        </div>
                    </div>
                    <div className="w-[104px] h-full bg-blueDashboard rounded-[20px] flex items-center justify-center">
                        <div>
                            <h1 className="text-white font-Jost text-[16px] font-medium text-center">
                                Total Blog
                            </h1>
                            <p className="text-white font-Jost text-[16px] font-medium text-center">
                                10
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[215px] flex justify-center mt-[73px]">
                <div className="w-[224px] h-full bg-grayButton rounded-[20px] flex justify-center">
                    <div className="flex flex-col">
                        <div className="space-y-10 flex mb-[10px] mt-[35px]">
                            <h1 className="font-Jost font-bold text-[20px]">
                                Most view Blogs
                            </h1>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-[25px] h-[25px] bg-gold rounded-full text-center">
                                1
                            </div>
                            <p className="font-Jost font-medium text-[14px]">
                                Cara masuk ke isekai
                            </p>
                        </div>
                        <div className="flex space-x-3 mt-3 mb-3">
                            <div className="w-[25px] h-[25px] bg-silver rounded-full text-center">
                                2
                            </div>
                            <p className="font-Jost font-medium text-[14px]">
                                Cara masuk ke surga
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <div className="w-[25px] h-[25px] bg-bronze rounded-full text-center">
                                3
                            </div>
                            <p className="font-Jost font-medium text-[14px]">
                                Cara masuk ke neraka
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[390px] flex justify-center mt-[57px]">
                <div className="w-[328px] rounded-[20px] bg-purpleCustom flex justify-center items-center flex-col">
                    <div>
                        <h1 className="text-[16px] text-white font-Jost font-bold">
                            Graphic view Blog
                        </h1>
                    </div>
                    <LineChartComponent />
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
