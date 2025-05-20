import React, {useContext} from 'react'
import styles from "../style";
import { EmailFormNew } from '.';
import { AuthContext } from '../auth';

const Contact = () => {
return(
    <div className=" w-full overflow-hidden ">
        <div className={`${styles.paddingX} ${styles.flexCenter} `}>
            
            <div className={`${styles.boxWidth} top-1/4 `}>
                <div className={`flex md:flex-row flex-col gap-10 md:gap-0 ${styles.paddingY}  h-[100%] w-full`}>
                    
                    <div className='absolute z-[0] w-[30%] h-[30%] right-20 rounded-full pink__gradient'/>

                    <div className={`flex-1 ${styles.flexStart}  flex-col xl:px-0 sm:px-16 px-6 justify-center`}>
                        <a href='/' className=' self-center ss:self-start text-white text-[60px] font-bold hover:-ml-2 duration-75 ease-linear rounded-full leading-[60px]'> <span>&larr;</span> </a>

                        <div>

                            <div className=" flex flex-row justify-between items-center w-full">
                                <h1 className="flex-1 flex-wrap font-poppins font-semibold z-[4] text-[35px] xs:text-[65px] text-center ss:text-left md:text-[52px] text-white xs:leading-[80.8px] leading-[45px]">
                                    Hilf mit bei <br className="sm:block hidden" /> <span className="text-gradient">DJ Ramsad</span>! 
                                </h1>
                            </div>

                            <p className={`flex ${styles.paragraph} max-w-[470px] mt-5`}> Sei die treibende Kraft für DJ Ramsad! Teile deine Ideen und Vorschläge für aufregende Projekte - deine 
                                Einflüsse sind gefragt! 
                            </p>
                        </div>
                    </div>

                    <div className={`flex-1 gap-5 w-full flex ${styles.flexCenter} `}>
                        <EmailFormNew />
                    </div>

                </div>
            </div>
        </div>
    </div>
)}


export default Contact