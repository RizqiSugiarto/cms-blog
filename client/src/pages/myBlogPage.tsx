import React, { useState, useEffect } from 'react';
import Table from '@/components/dashboard/table';
import UpdateModal from '@/components/form/updateInputModal';
import { useBlogContext } from '@/context/blogContext';
import { useAuthContext } from '@/context/authContext';
import useGetAllBlogsByUserId from '@/hooks/blog/useGetAllBlog';
import DeleteModal from '@/components/form/deleteModal';
import useUpdateBlog from '@/hooks/blog/useUpdateBlog';
import { UpdateBlogRequest } from '@/types';
import showToast from '@/utils/toastify';
import { useNavigate } from 'react-router-dom';

const MyBlogPage: React.FC = () => {
    const [search, setSearch] = useState<string>('');

    const [modalUpdateFormVisible, setModalUpdateFormVisible] =
        useState<boolean>(false);

    const [modalDeleteVisible, setModalDeleteVisible] =
        useState<boolean>(false);

    const [selectedBlog, setSelectedBlog] = useState<any>(null);

    const { blogs, dispatch } = useBlogContext();
    const { authUser } = useAuthContext();
    const { allBLog, getAllBlogByUserId, getAllErrMessage } =
        useGetAllBlogsByUserId();
    const { UpdateBlogErrMessage, updateBlog } = useUpdateBlog();

    useEffect(() => {
        const fetchInitialBlogs = async () => {
            if (authUser?.userId) {
                console.log(authUser.userId);
                await getAllBlogByUserId(authUser.userId);
            }
        };
        fetchInitialBlogs();
    }, [authUser]);

    useEffect(() => {
        if (allBLog) {
            dispatch({ type: 'SET_BLOGS', payload: allBLog.data });
        }
    }, [allBLog]);

    useEffect(() => {
        if (getAllErrMessage) {
            showToast(`${getAllErrMessage} Please refresh this page`, 'error');
        }

        if (UpdateBlogErrMessage) {
            showToast(
                `${UpdateBlogErrMessage} Please refresh this page`,
                'error'
            );
        }
    }, [getAllErrMessage, UpdateBlogErrMessage]);

    const navigate = useNavigate()

    const toggleUpdateForm = (blog: any) => {
        setSelectedBlog(blog);
        setModalUpdateFormVisible(!modalUpdateFormVisible);
    };

    const toggleDeleteModal = (blog: any) => {
        setSelectedBlog(blog);
        setModalDeleteVisible(!modalDeleteVisible);
    };

    const handleBlogToDraft = (blog: any) => {
        const req: UpdateBlogRequest = {
            title: blog.title,
            content: blog.text,
            tag: blog.tag,
            blogId: blog.id,
            isDraft: true,
            image: blog.file
        };

        updateBlog(req);

        if (!UpdateBlogErrMessage) {
            dispatch({ type: 'DELETE_BLOG', payload: blog.id });
        }
    };

    const handleViewBlog = (blogId: string) => {
        navigate(`/blog/${blogId}`);
    };

    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    return (
        <section>
            <div className="card bg-base-100 rounded-box">
                <div className="card-title flex flex-col md:flex-row justify-between items-center p-4">
                    <h2 className="section-title my-4">My Blogs</h2>
                    <div className="join xs:join-vertical md:join-horizontal">
                        <div>
                            <input
                                className="input input-bordered join-item border-grayCustom"
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body px-4 md:px-6 overflow-x-scroll py-4">
                    <Table
                        titles={[
                            'Title',
                            'Tag',
                            'Total view',
                            'Show',
                            'Options'
                        ]}
                    >
                        {blogs &&
                            blogs
                                .filter((item: any) =>
                                    search.toLowerCase() === ''
                                        ? item
                                        : item.title
                                              .toLowerCase()
                                              .includes(search)
                                )
                                .map((blog: any) => (
                                    <Table.tr
                                        className="border-grayCustom"
                                        key={blog.id}
                                    >
                                        <Table.td>{blog.title}</Table.td>
                                        <Table.td>
                                            <span className="badge badge-sm border-grayCustom">
                                                {trimTag(blog.tag)}
                                            </span>
                                        </Table.td>
                                        <Table.td>{blog.view.length}</Table.td>
                                        <Table.td>
                                            <button
                                                className="btn btn-primary btn-xs"
                                                onClick={() => handleViewBlog(blog.id)}
                                            >
                                                View
                                            </button>
                                        </Table.td>
                                        <Table.td className="flex gap-1">
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={() =>
                                                    handleBlogToDraft(blog)
                                                }
                                            >
                                                Draft
                                            </button>
                                            <button
                                                className="btn btn-info btn-xs"
                                                onClick={() =>
                                                    toggleUpdateForm(blog)
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() =>
                                                    toggleDeleteModal(blog)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </Table.td>
                                    </Table.tr>
                                ))}
                    </Table>
                </div>
                {modalUpdateFormVisible && selectedBlog && (
                    <UpdateModal
                        isVisible={modalUpdateFormVisible}
                        onClose={() => setModalUpdateFormVisible(false)}
                        blog={selectedBlog}
                    />
                )}
                {modalDeleteVisible && selectedBlog && (
                    <DeleteModal
                        isVisible={modalDeleteVisible}
                        onClose={() => setModalDeleteVisible(false)}
                        blogId={selectedBlog.id}
                    />
                )}
            </div>
        </section>
    );
};

export default MyBlogPage;
