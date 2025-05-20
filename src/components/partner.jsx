import React from 'react'
import styles from '../style'
import { mblSpotify } from '../assets'


const partner = () => (
    <section id='partner' className={`md:flex flex-col block w-full`}>
        <h1 className={`${styles.heading2} ${styles.flexCenter} md:mt-14 relative mt-20 mb-20`}>Partner</h1>
        <div className='absolute z-[1] w-[30%] h-[20%] right-20 rounded-full pink__gradient'/>
        
        <div className='md:flex md:flex-row'>

        <img src={mblSpotify} className='md:w-2/4 md:-mr-20 z-[0] rounded-3xl md:hover:-mt-5 md:hover:mb-5 duration-75 ease-linear blur-sm opacity-50 md:blur-0 md:opacity-100'/>
             
        <div className='hidden md:block z-[2] pointer-events-none text-end'>
            <p className={`${styles.paragraph} leading-3 text-secondary`}>Spotify</p>
            <h1 className={`font-poppins font-semibold  xs:text-[40px] text-[34px] text-white xs:leading-[30px] leading-[20px] w-full mb-10`}>MBL Music</h1>
            <p className={` pointer-events-auto font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] p-5 backdrop-blur-md bg-white/10 rounded-2xl `}>
            MBL Music ist schon ein sehr langer Partner von <span>DJRamsad</span> <br />Sie haben schon unzählige lieder gemacht und es kommen in Zukunft auch noch neue.
            </p>
        </div>
        <div className='md:hidden block -mt-[40%] px-5 ss:px-10 duration-75 mb-40 text-end'>
            <p className={`${styles.paragraph} relative z-[2] leading-3 text-secondary`}>Spotify</p>
            <h1 className={`font-poppins font-semibold relative z-[2] xs:text-[40px] text-[34px] text-white xs:leading-[30px] leading-[20px] w-full mb-10`}>MBL Music</h1>
            <p className={` pointer-events-auto relative z-[2] font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] p-5 backdrop-blur-md bg-white/10 rounded-2xl`}>
            MBL Music ist schon ein sehr langer Partner von <span>DJRamsad</span> <br />Sie haben schon unzählige lieder gemacht und es kommen in Zukunft auch noch neue.
            </p>
        </div>
        </div>
        
        
    </section>
)


export default partner