import React from "react";
import { Link } from "react-router-dom"
import Table from "@/components/dashboard/table";

const MyBlogPage: React.FC = () => {
    return (
        <section>
            <div className="card bg-base-100 rounded-box">
                <div className="card-title flex flex-col md:flex-row justify-between items-center p-4">
                    <h2 className="section-title my-4">My Blogs</h2>
                    <div className="join xs:join-vertical md:join-horizontal">
                        <div>
                            <div>
                            <input className="input input-bordered join-item border-grayCustom" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="indicator w-full">
                            <button className="btn join-item w-full border-grayCustom">Search</button>
                        </div>
                    </div>
                </div>
                <div className='card-body px-4 md:px-6 overflow-x-scroll py-4'>
                    <Table titles={["Title","Categories","Total view","Show","Options"]}>
                            {[2,54,8,3,4,5,7,78,9,996,974,4435,543].map(e => <Table.tr className="border-grayCustom" key={e}>
                                    <Table.td>
                                        Lorem ipsum dolor sit amet
                                    </Table.td>
                                    <Table.td>
                                        <span className="badge badge-sm border-grayCustom">Sport</span>
                                    </Table.td>
                                    <Table.td>
                                    205,454
                                    </Table.td>
                                    <Table.td>
                                        <Link className="btn btn-primary btn-xs" to={`/blog`} >View</Link>
                                    </Table.td>
                                    <Table.td className="flex gap-1">
                                        <button className="btn btn-info btn-xs">Update</button>
                                        <button className="btn btn-error btn-xs">Delete</button>
                                    </Table.td>
                                </Table.tr>
                            )}
                    </Table>
                </div>
            </div>
        </section>
      )
}

export default MyBlogPage