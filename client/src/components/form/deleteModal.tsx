import useDeleteBlog from '@/hooks/blog/useDeleteBlog';
import { useBlogContext } from '@/context/blogContext';
import { useEffect, useRef } from 'react';

interface DeleteModalProps {
    isVisible: boolean;
    onClose: () => void;
    blogId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isVisible,
    blogId,
    onClose
}) => {
    const { deleteBlog } = useDeleteBlog();
    const { dispatch } = useBlogContext();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleDeleteBlog = (blogId: string) => {
        deleteBlog(blogId);
        dispatch({ type: 'DELETE_BLOG', payload: blogId });
    };

    useEffect(() => {
        if (isVisible) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isVisible]);

    return (
        <div>
            <dialog id="my_modal_1" className="modal" ref={dialogRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Are you sure to delete this blog?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="min-w-40 flex justify-between">
                                <button
                                    className="btn btn-error"
                                    onClick={() => handleDeleteBlog(blogId)}
                                >
                                    Delete
                                </button>
                                <button className="btn" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DeleteModal;
