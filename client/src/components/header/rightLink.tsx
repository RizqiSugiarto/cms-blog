import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetProfile from '@/hooks/auth/useGetProfile';
import { useAuthContext } from '@/context/authContext';

const RightLink: React.FC = () => {
    const { authUser } = useAuthContext();
    const { getProfileLoading, getProfileErrMessage, profile, getProfile } = useGetProfile();

    useEffect(() => {
        if (authUser?.userId) {
            getProfile(authUser.userId);
        } else {
            console.error('authUser is undefined');
        }
    }, [authUser]);

    if (getProfileLoading) {
        return <div>Loading...</div>;
    }

    if (getProfileErrMessage) {
        return <div>Error: {getProfileErrMessage}</div>;
    }

    return (
        <div className="md:gap-x-2">
            <div className="dropdown dropdown-end">
                <ul
                    tabIndex={0}
                    className="dropdown-content dropdown-right mt-3 z-[1] p-2 shadow bg-base-100 rounded-box grid grid-cols-2 gap-4 w-[60vw] md:w-52 h-[54vh]"
                ></ul>
            </div>
            <div className="dropdown dropdown-end">
                <button className="btn btn-ghost px-2">
                    <span className="hidden md:block">{profile?.name}</span>
                    <div tabIndex={0} className="avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Profile" src={profile?.imageUrl} />
                        </div>
                    </div>
                </button>
                <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                    <div className="card-body">
                        <span className="font-bold text-lg">{profile?.name}</span>
                        <span className="text-info">{profile?.email}</span>
                        <div className="card-actions bg-black">
                            <Link to={`/profile/${authUser?.userId}`} className="btn btn-primary btn-block">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightLink;
