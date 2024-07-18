import React, { useEffect, useRef, useState } from 'react';
import useGetProfile from '@/hooks/user/useGetProfile';
import useUpdateProfile from '@/hooks/user/useUpdateProfile';
import { useAuthContext } from '@/context/authContext';
import FileInput from '../form/fileInput';
import Input from '../form/input';
import { UpdateProfileRequest } from '@/types';
import showToast from '@/utils/toastify';

const RightLink: React.FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isVisibleModalProfile, setVisibleModalProfile] = useState<boolean>(false);

    const { getProfileLoading, getProfileErrMessage, profile, getProfile } = useGetProfile();
    const { updateProfileLoading, updateProfileErrMessage, updateProfile } = useUpdateProfile();

    const [file, setFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { authUser } = useAuthContext();

    const inputFileRef = useRef<HTMLInputElement>(null);

    const toggleModalProfile = () => {
        setVisibleModalProfile(!isVisibleModalProfile);
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!authUser?.userId) {
            console.warn('auth user undifined');
            return;
        }

        const req: UpdateProfileRequest = {
            userId: authUser.userId,
            name: name,
            email: email,
            imageProfile: file
        };

        if (req.email || req.name || req.imageProfile) {
            try {
                await updateProfile(req);
                showToast('Update profile success', 'success');
                if (authUser.userId) {
                    getProfile(authUser.userId);
                }
            } catch (error) {
                console.error('Update profile failed:', error);
                showToast('Failed to update profile', 'error');
            }
        }
    };

    const handleFileInputClick = () => {
        inputFileRef.current?.click();
    };

    useEffect(() => {
        if (authUser?.userId) {
            getProfile(authUser.userId);
        } else {
            console.warn('auth user undifined');
        }
    }, [authUser]);

    useEffect(() => {
        if (isVisibleModalProfile) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isVisibleModalProfile]);

    useEffect(() => {
        if (profile?.data) {
            setName(profile.data.name);
            setEmail(profile.data.email);
            setImagePreview(profile.data.ImageUrl); 
        }
    }, [profile]);

    useEffect(() => {
        if (getProfileErrMessage && getProfileErrMessage.trim() !== '') {
            showToast(getProfileErrMessage, 'error');
        }
        if (updateProfileErrMessage && updateProfileErrMessage.trim() !== '') {
            showToast(updateProfileErrMessage, 'error');
        }
    }, [getProfileErrMessage, updateProfileErrMessage]);

    if (getProfileLoading || updateProfileLoading) {
        return <div>Loading...</div>;
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
                        className={`cursor-pointer card mx-auto w-64 overflow-hidden rounded-full border-2 ${typeof imagePreview !== 'string' ? 'h-64' : 'max-h-64'}`}
                    >
                        {typeof imagePreview === 'string' ? (
                            <img
                                src={imagePreview as string}
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
                    <div className='mt-6'>
                        <div className='w-[300px] mx-auto'>
                            <form onSubmit={handleForm} className='flex flex-col gap-6'>
                                <Input
                                    required
                                    auth
                                    setData={setName}
                                    type="text"
                                    className="w-full"
                                    placeholder="name"
                                    value={name}
                                />
                                <Input
                                    required
                                    auth
                                    setData={setEmail}
                                    type="text"
                                    className="w-full"
                                    placeholder="email"
                                    value={email}
                                />
                                <FileInput
                                    ref={inputFileRef}
                                    accept="image/*"
                                    setFile={setFile}
                                    setImagePreview={setImagePreview}
                                    className="hidden"
                                    name="imageProfile"
                                />
                                <button type="submit" className='btn btn-primary w-full'>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RightLink;
