import React, { useEffect, useContext, useState } from 'react';
import emailjs from '@emailjs/browser';
import { waves } from '../assets'
import { AuthContext } from '../auth';
import styles from '../style';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

export const EmailFormNew = () => {
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const sendEmail = async (e) => {
        e.preventDefault();
        const date = new Date();
        const timestamp = (date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()) + '  ' + (date.getHours() + ':' + date.getMinutes());

        const mail = await addDoc(collection(db, 'inbox'), {
            userEmail: currentUser.email,
            userName: currentUser.displayName,
            userId: currentUser.uid,
            userMessage: message,
            createDate: timestamp
        })
        
        //await db.collection('users').doc(currentUser.uid).collection('messages').doc(mail.id).set();
        await setDoc(doc(db, 'users', currentUser.uid, 'messages', await mail.id), {})

        e.target.reset();
        setSuccess(true);
    };



  return (
    <>
        {success ? 
            <div className={` bg-black-gradient-2 border-4 border-[#4F228D] w-[35rem] p-5 rounded-3xl relative`}>
                
                <h1 className={`${styles.heading2}`}><FontAwesomeIcon className='text-lime-500' icon={faCheck}/> Erfolg!</h1>
                <button onClick={() => setSuccess(false)} className='relative font-poppins font-normal cursor-pointer hover:text-secondary text-white'>
                    Verstanden
                </button>
                &nbsp;&nbsp;&nbsp;
                <Link to={'/profile'} className='relative font-poppins font-normal cursor-pointer hover:text-secondary text-white'>
                    Nachrichten ansehen <FontAwesomeIcon icon={faArrowRight}/>
                </Link>
            </div> : currentUser ?

            <form className={` mailform flex flex-col gap-5 w-[35rem] p-5 rounded-3xl relative`} onSubmit={sendEmail}>
                <label className='text-white font-normal text-[25px]'>Angemeldet als <span className=' font-bold'>{currentUser.displayName}</span>.</label>
                <textarea placeholder='Nachricht' onChange={(e) => setMessage(e.target.value)} name="message" required className='form-input h-36' />
                <input type="submit" value="Absenden" className='relative py-4 px-8 font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] bg-pink-gradient hover:cursor-pointer active:mt-[0.15rem] active:-mb-[0.15rem] active:box-shadow-2' />
            </form> :
            <div className={` bg-black-gradient-2 border-4 border-[#4F228D] w-[35rem] p-5 rounded-3xl relative`}>
                <h1 className={`${styles.heading2}`}>Melde dich an um eine Nachricht zu schreiben.</h1>
                <Link className='relative group font-poppins font-normal cursor-pointer text-white' to={'/login'}>
                    Anmelden
                    <span className='h-1 transition-all duration-100 group-hover:ml-2'> <FontAwesomeIcon icon={faArrowRight}/></span>
                </Link>
            </div> 
        }
    </>
      
  );
};

export default EmailFormNew