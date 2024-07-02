import React from "react";
import { Link } from 'react-router-dom'

const RightLink:React.FC = () => {
  return (
    <div className="md:gap-x-2">
        {/* <a className='btn btn-sm md:btn-md btn-ghost' target='_blank' href="https://github.com/MohamedAbdelrahmanDeveloper"><i className='bi bi-github text-xl'></i></a> */}
        <div className="dropdown dropdown-end">
        {/* <div tabIndex={0} role="button" className="btn btn-ghost"><i className="bi bi-paint-bucket text-2xl"></i></div> */}
        <ul tabIndex={0} className="dropdown-content dropdown-right mt-3 z-[1] p-2 shadow bg-base-100 rounded-box grid grid-cols-2 gap-4 w-[60vw] md:w-52 h-[54vh]">
        </ul>
        </div>
        <div className="dropdown dropdown-end">
        <button className='btn btn-ghost px-2'>
            <span className='hidden md:block'>User</span>
            <div tabIndex={0} className="avatar">
            <div className="w-10 rounded-full">
                <img alt="hello" src="https://picsum.photos/200/300" />
            </div>
            </div>
        </button>
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
            <span className="font-bold text-lg">USER</span>
            <span className="text-info">@EmailUser</span>
            <div className="card-actions bg-black">
                <Link to={'/profile/1'} className="btn btn-primary btn-block">Profile</Link>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default RightLink