import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@/components/dashboard/table';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const MyBlogPage: React.FC = () => {
    const { Blogloading, Blogdata: blogs, Blogerror } = useSelector((state: RootState) => state.blog);

    if(Blogloading) {
        return (
            <div>
                {Blogloading}
            </div>
        )
    }

    if(Blogerror) {
        return (
            <div>
                {Blogerror}
            </div>
        )
    }

    return (
        <section>
            <div className="card bg-base-100 rounded-box">
                <div className="card-title flex flex-col md:flex-row justify-between items-center p-4">
                    <h2 className="section-title my-4">My Blogs</h2>
                    <div className="join xs:join-vertical md:join-horizontal">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered join-item border-grayCustom"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div className="indicator w-full">
                            <button className="btn join-item w-full border-grayCustom">
                                Search
                            </button>
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
                        {blogs && blogs.map((blog: any) => (
                            <Table.tr className="border-grayCustom" key={blog.id}>
                                <Table.td>{blog.title}</Table.td>
                                <Table.td>
                                    <span className="badge badge-sm border-grayCustom">
                                        {blog.tag}
                                    </span>
                                </Table.td>
                                <Table.td>{blog.view.length}</Table.td>
                                <Table.td>
                                    <Link
                                        className="btn btn-primary btn-xs"
                                        to={`/blog/${blog.id}`}
                                    >
                                        View
                                    </Link>
                                </Table.td>
                                <Table.td className="flex gap-1">
                                    <button className="btn btn-info btn-xs">
                                        Update
                                    </button>
                                    <button className="btn btn-error btn-xs">
                                        Delete
                                    </button>
                                </Table.td>
                            </Table.tr>
                        ))}
                    </Table>
                </div>
            </div>
        </section>
    );
};

export default MyBlogPage;
