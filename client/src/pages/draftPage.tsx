import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@/components/dashboard/table';
import { useAuthContext } from '@/context/authContext';
import useGetAllBlogsDraftByUserId from '@/hooks/blog/useGetAllBlogDraft';
import UpdateModal from '@/components/form/updateInputModal';
import { useBlogContext } from '@/context/blogContext';
import DeleteModal from '@/components/form/deleteModal';
import useUpdateBlog from '@/hooks/blog/useUpdateBlog';
import { UpdateBlogRequest } from '@/types';
import showToast from '@/utils/toastify';

const MyBlogPage: React.FC = () => {
    const { authUser } = useAuthContext();
    const {
        getAllBLogDraftLoading,
        getAllBlogDraftErrMessage,
        allBlogDraft,
        getAllBlogDraftByUserId
    } = useGetAllBlogsDraftByUserId();

    const { UpdateBlogErrMessage, updateBlog } = useUpdateBlog();

    const { blogs, dispatch } = useBlogContext();
    const [search, setSearch] = useState<string>('');
    const [modalUpdateFormVisible, setModalUpdateFormVisible] =
        useState<boolean>(false);
    const [modalDeleteVisible, setModalDeleteVisible] =
        useState<boolean>(false);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);

    const toggleUpdateForm = (blog: any) => {
        setSelectedBlog(blog);
        setModalUpdateFormVisible(!modalUpdateFormVisible);
    };

    const toggleDeleteModal = (blog: any) => {
        setSelectedBlog(blog);
        setModalDeleteVisible(!modalDeleteVisible);
    };

    const handlePostDraft = (blog: any) => {
        const req: UpdateBlogRequest = {
            title: blog.title,
            content: blog.text,
            tag: blog.tag,
            blogId: blog.id,
            isDraft: false,
            image: blog.file
        };
        updateBlog(req);

        if (!UpdateBlogErrMessage) {
            dispatch({ type: 'DELETE_BLOG', payload: req.blogId });
        }
    };

    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    useEffect(() => {
        if (authUser?.userId) {
            getAllBlogDraftByUserId(authUser.userId);
        } else {
            showToast('User Not Authenticated. Please refresh this page', 'error');
        }
    }, [authUser]);

    useEffect(() => {
        if (allBlogDraft) {
            dispatch({ type: 'SET_BLOGS', payload: allBlogDraft.data });
        }
    }, [allBlogDraft]);

    useEffect(() => {
        if (UpdateBlogErrMessage) {
            showToast(`${UpdateBlogErrMessage} Please refresh this page.`, 'error');
        }
        if (getAllBlogDraftErrMessage) {
            showToast(`${getAllBlogDraftErrMessage} Please refresh this page.`, 'error');
        }
    }, [UpdateBlogErrMessage, getAllBlogDraftErrMessage]);
    if (getAllBLogDraftLoading) {
        return <div>{getAllBLogDraftLoading}</div>;
    }


    return (
        <section>
            <div className="card bg-base-100 rounded-box">
                <div className="card-title flex flex-col md:flex-row justify-between items-center p-4">
                    <h2 className="section-title my-4">Draft Blogs</h2>
                    <div className="join xs:join-vertical md:join-horizontal">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered join-item border-grayCustom"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-4 md:px-6 overflow-x-scroll py-4">
                    <Table
                        titles={[
                            'Title',
                            'Categories',
                            'Total view',
                            'Show',
                            'Options'
                        ]}
                    >
                        {blogs &&
                            blogs
                                .filter((item: any) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.title
                                              .toLowerCase()
                                              .includes(search);
                                })
                                .map((draft: any) => (
                                    <Table.tr
                                        className="border-grayCustom"
                                        key={draft.id}
                                    >
                                        <Table.td>{draft.title}</Table.td>
                                        <Table.td>
                                            <span className="badge badge-sm border-grayCustom">
                                                {trimTag(draft.tag)}
                                            </span>
                                        </Table.td>
                                        <Table.td>{draft.view.length}</Table.td>
                                        <Table.td>
                                            <Link
                                                className="btn btn-primary btn-xs"
                                                to={`/blog`}
                                            >
                                                View
                                            </Link>
                                        </Table.td>
                                        <Table.td className="flex gap-1">
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={() =>
                                                    handlePostDraft(draft)
                                                }
                                            >
                                                Launch
                                            </button>
                                            <button
                                                className="btn btn-info btn-xs"
                                                onClick={() =>
                                                    toggleUpdateForm(draft)
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() =>
                                                    toggleDeleteModal(draft)
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
