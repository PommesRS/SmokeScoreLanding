import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { accountAdminLinks, accountUserLinks } from '../constants';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../auth";

const NavbarLogin = () => {
    const [toggle, setToggle] = useState(false)
    const {currentUser} = useContext(AuthContext);

    const handleSignOut = () => {
        if (currentUser != null) {
            signOut(auth).then(() => {
            }).catch((error) => {
                console.error(error);
            })
        }else {
            console.log('no user logged in');
        }
    }

    return (
        //<button className='text-white bg-violet-900 px-4 py-1 rounded-full' onClick={() => setToggle((prev) => !prev)}> {localStorage.getItem('username')} <FontAwesomeIcon icon={faCaretDown}/></button>
        <>
            {currentUser != null ?  
                currentUser.userRole == 187  ?
                    // User is logged in and an admin
                    <button className=' relative' onClick={() => setToggle((prev) => !prev)}>
                        <span className=' flex justify-center items-center gap-2 text-white px-4 py-2 pt-[0.50rem] leading-[0.8] rounded-full ring-1 ring-white '>{currentUser.displayName} <FontAwesomeIcon icon={faCaretDown}/></span>
                        <div className={`${toggle ? 'flex' : 'hidden'} p-6 purple__gradient absolute z-[5] top-15 right-0 my-2 rounded-xl border-2 border-[#b936f598]`}>
                            <ul className='list-none flex flex-col justify-end items-center gap-3 flex-1'>
                                {accountAdminLinks.map((link, index) => (
                                    <li key={link.id} className={`font-poppins font-normal cursor-pointer text-white`}>
                                        <a href={link.id} >{link.title}</a>
                                    </li>
                                ))}
                                <a className=' text-white font-poppins font-normal cursor-pointer' onClick={handleSignOut}>Abmelden</a>
                            </ul>
                        </div>
                    </button>  :
                    // User is logged in
                    <button className=' relative' onClick={() => setToggle((prev) => !prev)}>
                        <span className=' flex justify-center items-center gap-2 text-white px-4 py-2 pt-[0.50rem] leading-[0.8] rounded-full ring-1 ring-white '>{currentUser.displayName} <FontAwesomeIcon icon={faCaretDown}/></span>
                        <div className={`${toggle ? 'flex' : 'hidden'} p-6 purple__gradient absolute z-[5] top-15 right-0 my-2 rounded-xl border-2 border-[#b936f598]`}>
                            <ul className='list-none flex flex-col justify-end items-center gap-3 flex-1'>
                                {accountUserLinks.map((link, index) => (
                                    <li key={link.id} className={`font-poppins font-normal cursor-pointer text-white`}>
                                        <a href={link.id} >{link.title}</a>
                                    </li>
                                ))}
                                <a className=' text-white font-poppins font-normal cursor-pointer' onClick={handleSignOut}>Abmelden</a>
                            </ul>
                        </div>
                    </button> :
                // User isn't logged in
                <Link className='relative group font-poppins font-normal cursor-pointer text-white' to={'/login'}>
                    Anmelden
                    <span className='absolute w-0 h-1 -bottom-2 left-[50%] group-hover:w-[50%] group-hover:left-[25%] rounded-full bg-white transition-all duration-500'></span>
                </Link> 
            }
        </>
        
    )
}

export default NavbarLogin