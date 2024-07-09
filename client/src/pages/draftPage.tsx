import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@/components/dashboard/table';
import { useAuthContext } from '@/context/authContext';
import useGetAllBlogsDraftByUserId from '@/hooks/blog/useGetAllBlogDraft';

const MyBlogPage: React.FC = () => {
    const { authUser } = useAuthContext();
    const {getAllBLogDraftLoading, getAllBlogDraftErrMessage, allBlogDraft, getAllBlogDraftByUserId} = useGetAllBlogsDraftByUserId()
    const [search, setSearch] = useState<string>('')


    useEffect(() => {
        if (authUser?.userId) {
            getAllBlogDraftByUserId(authUser.userId);
        } else {
            console.error('authUser is undefined');
        }
    }, [authUser])

    if(getAllBLogDraftLoading) {
        return(
            <div>
                {getAllBLogDraftLoading}
            </div>
        )
    }

    if(getAllBlogDraftErrMessage) {
        return(
            <div>
                {getAllBlogDraftErrMessage}
            </div>
        )
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
                                    onChange={(e) => {setSearch(e.target.value)}}
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
                        {allBlogDraft && allBlogDraft.data.filter((item: any) => {
                            return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
                        }).map(
                            (draft: any) => (
                                <Table.tr className="border-grayCustom" key={draft.id}>
                                    <Table.td>
                                        {draft.title}
                                    </Table.td>
                                    <Table.td>
                                        <span className="badge badge-sm border-grayCustom">
                                        {draft.tag}
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
                                        <button className="btn btn-success btn-xs">
                                            Post!!
                                        </button>
                                        <button className="btn btn-info btn-xs">
                                            Update
                                        </button>
                                        <button className="btn btn-error btn-xs">
                                            Delete
                                        </button>
                                    </Table.td>
                                </Table.tr>
                            )
                        )}
                    </Table>
                </div>
            </div>
        </section>
    );
};

export default MyBlogPage;
