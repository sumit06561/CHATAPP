import React, { useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import SearchUser from './SearchUser';


const SideBar = () => {
    const user = useSelector((state) => state?.user)
    const [editUserOpen, seteditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)


  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
      <div className='bg-slate-200 w-12 h-full py-5 text-slate-900 flex flex-col justify-between'>
        <div>
            <NavLink title='chat' className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && "bg-slate-300"}`}>
                <IoChatboxEllipses size={20} />
            </NavLink>

            <div title='Add users' onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded'>
                <FaUserPlus size={20} />
            </div>
        </div>

        <div>
            <button title={user?.name} onClick={() => seteditUserOpen(true)} className='w-12 h-12 flex justify-center items-center'>
                <Avatar
                    width={40}
                    height={40}
                    name={user?.name}
                    userId={user?._id}
                    imageUrl={user?.profile_pic}
                />
            </button>

            <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded'>
                <IoLogOut size={20} />
            </button>
        </div>
      </div>

      <div className='w-full'>
        <div className='h-16 flex items-center'>
          <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
        </div>
        {/* Divider */}
        <div className='bg-slate-200 p-[0.5px]'></div>

        <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
          {
            allUser.length === 0 && (
              <div className='mt-12'>
                <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>    
              </div>
            )
          }
        </div>
      </div>

      {/**edit user details*/}
      {
        editUserOpen && (
            <EditUserDetails onClose={() => seteditUserOpen(false)} userData={user}/>
        )
      }

      {/**search user */}
      {
        openSearchUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)} />
        )
      }

    </div>
  )
}

export default SideBar
