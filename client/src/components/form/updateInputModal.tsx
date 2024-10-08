import React, { useEffect, useRef, useState } from 'react';
import FileInput from './fileInput';
import Input from './input';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { UpdateBlogRequest } from '@/types';
import useUpdateBlog from '@/hooks/blog/useUpdateBlog';
import { useBlogContext } from '@/context/blogContext';
import showToast from '@/utils/toastify';

interface UpdateModalProps {
    isVisible: boolean;
    blog: any;
    onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    isVisible,
    blog,
    onClose
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(blog.imageUrl);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const { updateBlog, UpdateBlogLoading, UpdateBlogErrMessage } =
        useUpdateBlog();
    const { dispatch } = useBlogContext();

    const [text, setText] = useState<string>(blog.content);
    const [title, setTitle] = useState<string>(blog.title);
    const [tag, setTag] = useState<string>(blog.tag);
    const [file, setFile] = useState<File>();

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const req: UpdateBlogRequest = {
            title: title,
            content: text,
            tag: tag,
            blogId: blog.id,
            isDraft: false,
        };

        if (req.title || req.tag || req.content) {
            updateBlog(req, file);

            if(!UpdateBlogErrMessage) {
                dialogRef.current?.close()
                showToast('Updated Blog successfuly', 'success')
            }
        }
    };

    const handleFileInputClick = () => {
        inputFileRef.current?.click();
    };

    useEffect(() => {
        if (isVisible) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isVisible]);

    useEffect(() => {
        if (!UpdateBlogLoading && !UpdateBlogErrMessage) {
            const updatedBlog = {
                ...blog,
                title: title,
                content: text,
                tag: tag,
                imageUrl: imagePreview
            };

            dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
        }
    }, [UpdateBlogLoading, UpdateBlogErrMessage]);

    useEffect(() => {
        if(UpdateBlogErrMessage) {
            showToast('Update blog failed', 'error')
        }
    }, [UpdateBlogErrMessage])

    return (
        <dialog id="my_modal_3" className="modal" ref={dialogRef}>
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </form>
                <div className="min-h-screen max-w-5xl mx-auto space-y-5">
                    <div className="md:relative md:top-8 relative top-20">
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div
                            onClick={handleFileInputClick}
                            className={`cursor-pointer card md:w-64 overflow-hidden rounded border-2 ${typeof imagePreview !== 'string' ? 'h-64' : 'max-h-64'}`}
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
                                <span className="font-bold text-primary">
                                    {title}
                                </span>
                            </h1>
                            <form
                                onSubmit={handleForm}
                                className="flex flex-col gap-4"
                            >
                                <Input
                                    required
                                    auth
                                    setData={setTitle}
                                    type="text"
                                    className="w-full"
                                    placeholder="Blog title"
                                    value={title}
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
                                        <option value="finance">Finance</option>
                                        <option value="health">Health</option>
                                    </select>
                                </div>
                                <FileInput
                                    ref={inputFileRef}
                                    accept="image/*"
                                    setFile={setFile}
                                    setImagePreview={setImagePreview}
                                    className="hidden"
                                    name="imageUpload"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {UpdateBlogLoading ? 'Loading' : 'Update'}
                                </button>
                            </form>
                        </div>
                    </div>
                    <MarkdownEditor
                        value={text}
                        onChange={(value) => setText(value)}
                        minHeight="50vh"
                        maxHeight="100vh"
                        previewWidth="100%"
                    />
                </div>
            </div>
        </dialog>
    );
};

export default UpdateModal;
