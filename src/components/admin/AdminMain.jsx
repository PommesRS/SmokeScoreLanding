import React from 'react'
import styles from '../../style'
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';


const AdminMain = () => {
  var urlArr = [];
  urlArr = JSON.stringify(window.location.href).split('/');
  urlArr = urlArr[urlArr.length - 1].split('"')
  const [activeId, setActiveId] = useState(urlArr[0]);

  const handleClick = (e) => {
    setActiveId(e.target.id);
  }

  return (
    <div className=" w-full overflow-hidden font-poppins mt-[5dvh]">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`w-full`}>
                    <div className="relative flex flex-col lg:flex-row gap-10 h-full overflow-hidden ">

                      <div className=' w-full lg:w-1/4 border-[#4F228D] lg:h-[80dvh] border-4 box-shadow-2 rounded-3xl bg-black-gradient-2'>
                        <div className='flex flex-col'>
                          <h1 className={`${styles.heading2} px-5 pt-5`}>Überblick</h1>
                          <span className='w-full flex'>
                            <Link id='users' to={'/admin/users'} onClick={handleClick} className={` flex items-center w-full py-3 text-white relative hover:bg-[#4F228D] duration-75 ease-linear ${activeId == 'users' ? 'bg-[#4F228D] before:w-1 before:h-full before:top-0 before:bg-secondary before:content-[" "] before:absolute font-semibold' : ''}`}>
                              <span id='users' className='ml-5'>Beutzerkonten</span>
                            </Link>
                          </span>
                          <span className='w-full flex '>
                            <Link id='read' to={'/admin/inbox/read'} onClick={handleClick} className={`flex items-center rounded-b-2xl lg:rounded-none w-full py-3 text-white relative hover:bg-[#4F228D] overflow-hidden duration-75 ease-linear ${activeId == 'read' ? 'bg-[#4F228D] before:w-1 before:h-full before:top-0 before:bg-secondary before:content-[" "] before:absolute font-semibold' : ''}`}>
                              <span id='read' className='ml-5 '>Posteingang</span>
                            </Link>
                          </span>
                          <span className='w-full flex '>
                            <Link id='edit' to={'/admin/edit'} onClick={handleClick} className={`flex items-center rounded-b-2xl lg:rounded-none w-full py-3 text-white relative hover:bg-[#4F228D] overflow-hidden duration-75 ease-linear ${activeId == 'edit' ? 'bg-[#4F228D] before:w-1 before:h-full before:top-0 before:bg-secondary before:content-[" "] before:absolute font-semibold' : ''}`}>
                              <span id='edit' className='ml-5 '>Bearbeiten</span>
                            </Link>
                          </span>
                          <span className='w-full flex '>
                            <Link id='test' to={'/admin/test'} onClick={handleClick} className={`flex items-center rounded-b-2xl lg:rounded-none w-full py-3 text-white relative hover:bg-[#4F228D] overflow-hidden duration-75 ease-linear ${activeId == 'test' ? 'bg-[#4F228D] before:w-1 before:h-full before:top-0 before:bg-secondary before:content-[" "] before:absolute font-semibold' : ''}`}>
                              <span id='test' className='ml-5 '>TestSection</span>
                            </Link>
                          </span>
                        </div>
                      </div>

                      <div className='bg-[#252525] w-full h-fit overflow-hidden box-shadow-2 rounded-3xl border-[#4F228D] border-4 bg-black-gradient-2'>
                        <div className='overflow-y-scroll max-h-[80dvh] p-10 relative'>
                          <Outlet/> 
                        </div>
                      </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AdminMain