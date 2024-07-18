import React, { useRef, useState, useEffect } from 'react';
import Input from '@/components/form/input';
import FileInput from '@/components/form/fileInput';
import MarkdownEditor from '@uiw/react-markdown-editor';
import useCreateBlog from '@/hooks/blog/useCreateBlog';
import { CreateblogRequest } from '@/types';
import { useAuthContext } from '@/context/authContext';
import { useUnsavedChangesContext } from '@/context/unsavedChangesContext';
import showToast from '@/utils/toastify';

const AddBlogPage: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tag, setTag] = useState<string>('sport');
    const [file, setFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const [isDraft, setIsDraft] = useState<boolean>(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const { authUser } = useAuthContext();
    const { createBlog, errMessage } = useCreateBlog();
    const { isSaved, setIsSaved } = useUnsavedChangesContext();

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!authUser?.userId) {
            showToast(
                'User not authenticated. Please refresh this page.',
                'error'
            );
            return;
        }

        const req: CreateblogRequest = {
            title: title,
            content: text,
            tag: tag,
            userId: authUser.userId,
            isDraft: isDraft
        };

        if (title && tag && text && file) {
            createBlog(req, file);
            setTitle('');
            setText('');
            setTag('sport');
            setFile(undefined);
            setImagePreview(null);
            showToast(
                isDraft
                    ? 'Draft saved successfully!'
                    : 'Blog published successfully!',
                'success'
            );
        } else {
            showToast('Please fill in all required fields.', 'error');
        }
    };

    const handleFileInputClick = () => {
        inputFileRef.current?.click();
    };

    useEffect(() => {
        if (title || text || file) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [title, tag, text, file]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isSaved) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSaved]);

    useEffect(() => {
        if (errMessage) {
            showToast(`${errMessage}. Please refresh this page.`, 'error');
        }
    }, [errMessage]);

    return (
        <div className="min-h-screen max-w-5xl mx-auto space-y-5">
            <div className="md:relative md:top-8 relative top-20">
                {errMessage && <div className="text-red-500">{errMessage}</div>}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <div
                    onClick={handleFileInputClick}
                    className={`cursor-pointer card md:w-64 overflow-hidden rounded border-2 ${
                        typeof imagePreview !== 'string' ? 'h-64' : 'max-h-64'
                    }`}
                >
                    {typeof imagePreview === 'string' ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full">
                            <h4 className="text-grayCustom flex flex-col items-center">
                                <i className="bi bi-filetype-jpg text-4xl "></i>
                                <span className="text-lg">Photo</span>
                            </h4>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full justify-end gap-4">
                    <h1 className="text-2xl">
                        Title:{' '}
                        <span className="font-bold text-primary">{title}</span>
                    </h1>
                    <form onSubmit={handleForm} className="flex flex-col gap-4">
                        <Input
                            required
                            auth
                            setData={setTitle}
                            type="text"
                            className="w-full"
                            placeholder="Blog title"
                        />
                        <div className="w-28">
                            <label className="block text-sm font-medium text-gray-700">
                                Tag
                            </label>
                            <select
                                required
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="sport">Sport</option>
                                <option value="fashion">Fashion</option>
                                <option value="food">Food</option>
                                <option value="life">Life</option>
                            </select>
                        </div>
                        <div className="w-20 my-2">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text text-sm font-medium text-gray-700">
                                        Draft?
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={isDraft}
                                        className="checkbox checkbox-primary"
                                        onChange={() => setIsDraft(!isDraft)}
                                    />
                                </label>
                            </div>
                        </div>
                        <FileInput
                            ref={inputFileRef}
                            accept="image/*"
                            setFile={setFile}
                            setImagePreview={setImagePreview}
                            className="hidden"
                            name="imageUpload"
                        />
                        <button type="submit" className="btn btn-primary">
                            {isDraft ? 'Save' : 'Publish'}
                        </button>
                    </form>
                </div>
            </div>
            <MarkdownEditor
                value={text}
                onChange={(value) => {
                    setText(value);
                    setIsSaved(false);
                }}
                minHeight="50vh"
                maxHeight="100vh"
                previewWidth="100%"
            />
        </div>
    );
};

export default AddBlogPage;
