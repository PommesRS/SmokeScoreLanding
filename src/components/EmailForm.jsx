import React, { useRef, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { waves } from '../assets'
import { AuthContext } from '../auth';

export const EmailForm = () => {
    const mailform = useRef();

    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)

    const sendEmail = (e) => {
    e.preventDefault();
    e.target.reset()
    emailjs.sendForm('service_DJRamsadTes', 'template_zyvtric', mailform.current, 'V76EhoGQU2lQ5PXKW')///////////////put 't' at the end of service id to let it function properly
        .then((result) => {
            console.log(result.text);
            alert('Email send!')

        }, (error) => {
            console.log(error.text);
        });
    };

    window.onload = () => {

        const form = document.querySelector('form');

        document.addEventListener('mousemove', (e) => {
            rotateElement(e, form);
        })
        
        function rotateElement(event, element){
            const x = event.clientX;
            const y = event.clientY;
            
            const middleX = element.getBoundingClientRect().x
            const middleY = element.getBoundingClientRect().y

            const offsetX = ((middleX - x + element.offsetWidth / 2) / element.offsetWidth / 2 ) * 30 ;
            const offsetY = ((middleY - y + element.offsetHeight / 2) / element.offsetHeight / 2) * 30;

            console.log(offsetX, offsetY );
            form.style.setProperty("--rotateX", offsetY + "deg")
            form.style.setProperty("--rotateY", 0 - offsetX + "deg")

        }
    }



  return (
      <form className={` mailform flex flex-col gap-5 w-[35rem] p-5 rounded-3xl relative`} ref={mailform} onSubmit={sendEmail}>
        <input placeholder='Name' type="text" name="from_name" required className='form-input' />
        <input placeholder='Your Email' type="email" name="from_email" required className='form-input' />
        <textarea placeholder='Message' name="message" required className='form-input h-36' />
        <input type="submit" value="Send" className='relative py-4 px-8 font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] bg-pink-gradient hover:cursor-pointer active:mt-[0.15rem] active:-mb-[0.15rem] active:box-shadow-2' />
      </form>
  );
};

export default EmailForm