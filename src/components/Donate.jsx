import React from 'react'
import styles from '../style'
import { paypal } from '../assets'
import Button from './Button'

export default class Donate extends React.Component {
    componentDidMount(){
        const arschs = document.querySelectorAll(".hover-effect2");
            
        arschs.forEach(arsch => {
            arsch.addEventListener("mousemove", (e) => {
                const { x, y } = arsch.getBoundingClientRect();
                arsch.style.setProperty("--x", e.clientX - x);
                arsch.style.setProperty("--y", e.clientY - y);
            });
        });

      }
    render(){
    return(
        <section>
            <div className={`${styles.flexCenter} hover-effect2 relative overflow-hidden md:flex-row flex-col justify-between gap-20 w-full p-10 border-t-4 border-[#4F228D] box-shadow-2 rounded-3xl bg-black-gradient-2`}>
                <form action="https://www.paypal.com/donate" className='z-[2]' method="post" target="_blank">
                        <input type="hidden" name="hosted_button_id" value="Y2UBTBPVJSAGA"/>
                        <input type="image" src={paypal} border="0" name="submit" value="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" className=' w-52 object-contain' />
                    </form>
                <div className='flex z-[2] flex-col'>
                    <h1 className={`${styles.heading2}`}>Unterstütze DJRamsad</h1>
                    <p className={`${styles.paragraph}`}>
                        Wenn die Begeisterung für Spenden an DJ Ramsad, MBL Music oder wohltätige Zwecke euch packt, 
                        klickt auf das PayPal-Logo. Jeder Beitrag zählt – eure Unterstützung 
                        macht einen Unterschied!
                    </p>

                </div>
            </div>
        </section>
        )
    }
}