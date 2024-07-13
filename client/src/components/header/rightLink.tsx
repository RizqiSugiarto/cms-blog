import React, { useEffect, useRef, useState } from 'react';
import useGetProfile from '@/hooks/user/useGetProfile';
import useUpdateProfile from '@/hooks/user/useUpdateProfile';
import { useAuthContext } from '@/context/authContext';
import FileInput from '../form/fileInput';
import Input from '../form/input';
import { UpdateProfileRequest } from '@/types';

const RightLink: React.FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isVisibleModalProfile, setVisibleModalProfile] =
        useState<boolean>(false);

    const { getProfileLoading, getProfileErrMessage, profile, getProfile } =
        useGetProfile();
    const { updateProfileLoading, updateProfileErrMessage, updateProfile } =
        useUpdateProfile();

    const [file, setFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { authUser } = useAuthContext();

    const inputFileRef = useRef<HTMLInputElement>(null);

    const toggleModalProfile = () => {
        setVisibleModalProfile(!isVisibleModalProfile);
    };

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;

        if (!authUser?.userId) {
            console.error('User not authenticate');
            return;
        }

        const req: UpdateProfileRequest = {
            userId: authUser.userId,
            name: name,
            email: email,
            imageProfile: file
        };

        if (req.email || req.name || req.imageProfile) {
            updateProfile(req);
        }
    };

    const handleFileInputClick = () => {
        inputFileRef.current?.click();
    };

    useEffect(() => {
        if (authUser?.userId) {
            getProfile(authUser.userId);
        } else {
            console.error('authUser is undefined');
        }
    }, [authUser]);

    useEffect(() => {
        if (isVisibleModalProfile) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isVisibleModalProfile]);

    if (getProfileLoading) {
        return <div>Loading...</div>;
    }

    if (getProfileErrMessage) {
        return <div>Error: {getProfileErrMessage}</div>;
    }

    if (updateProfileLoading) {
        return <div>Loading...</div>;
    }

    if (updateProfileErrMessage) {
        return <div>Error: {updateProfileErrMessage}</div>;
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
                    <span className="hidden md:block">
                        {profile?.data.name}
                    </span>
                    <div tabIndex={0} className="avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Profile" src={profile?.data.ImageUrl} />
                        </div>
                    </div>
                </button>
                <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                    <div className="card-body">
                        <span className="font-bold text-lg">
                            {profile?.data.name}
                        </span>
                        <span className="text-info">{profile?.data.email}</span>
                        <div className="card-actions">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={toggleModalProfile}
                            >
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <dialog ref={dialogRef} id="profile_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={toggleModalProfile}
                        >
                            ✕
                        </button>
                    </form>
                    <div
                        onClick={handleFileInputClick}
                        className={`cursor-pointer card mx-auto w-64 overflow-hidden rounded-full border-2 bg-pink-400 ${typeof imagePreview !== 'string' ? 'h-64' : 'max-h-64'}`}
                    >
                        {typeof imagePreview === 'string' ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full w-full rounded-full">
                                <h4 className="text-grayCustom flex flex-col items-center">
                                    <i className="bi bi-filetype-jpg text-4xl "></i>
                                    <span className="text-lg">
                                        Photo Profile
                                    </span>
                                </h4>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1>
                            <span></span>
                        </h1>
                        <form onSubmit={handleForm}>
                            <Input
                                required
                                auth
                                setData={setName}
                                type="text"
                                className="w-full"
                                placeholder="name"
                            />
                            <Input
                                required
                                auth
                                setData={setEmail}
                                type="text"
                                className="w-full"
                                placeholder="email"
                            />

                            <FileInput
                                ref={inputFileRef}
                                accept="image/*"
                                setFile={setFile}
                                setImagePreview={setImagePreview}
                                className="hidden"
                                name="profileUpload"
                            />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RightLink;
