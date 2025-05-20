import React from 'react'
import styles from '../style'
import { ramsadSpotify } from '../assets'

const SpotifyPreview = () => (

    <div className={`md:flex block w-full relative`}>
        <div className='absolute z-[0] w-[30%] h-[20%] left-[20] rounded-full pink__gradient'/>
        <div className='hidden md:block z-[2] pointer-events-none'>
            <p className={`${styles.paragraph} leading-3 text-secondary`}>Spotify</p>
            <h1 className={`font-poppins font-semibold xs:text-[40px] text-[34px] text-white xs:leading-[30px] leading-[20px] w-full mb-10`}>DJRamsad</h1>
            <p className={` pointer-events-auto font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] p-5 backdrop-blur-md bg-white/10 rounded-2xl mb-20`}>
            DJ Ramsad begeistert auf Spotify mit einer vielseitigen Palette musikalischer Kreationen, von mitreißenden Beats bis zu entspannten Melodien. Seine Tracks zeichnen sich durch kreative Arrangements und eine einzigartige Genrefusion aus, die ein unverwechselbares Hörerlebnis bietet.
            </p>
        </div>
        <img src={ramsadSpotify} className='md:w-2/4 md:-ml-20 rounded-3xl md:hover:-mt-5 md:hover:mb-5 duration-75 ease-linear blur-sm opacity-50 md:blur-0 md:opacity-100'/>
        <div className='md:hidden block -mt-[40%] px-5 ss:px-10 duration-75'>
            <p className={`${styles.paragraph} relative z-[2] leading-3 text-secondary`}>Spotify</p>
            <h1 className={`font-poppins font-semibold relative z-[2] xs:text-[40px] text-[34px] text-white xs:leading-[30px] leading-[20px] w-full mb-10`}>DJRamsad</h1>
            <p className={` pointer-events-auto relative z-[2] font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] p-5 backdrop-blur-md bg-white/10 rounded-2xl`}>
            DJ Ramsad begeistert auf Spotify mit einer vielseitigen Palette musikalischer Kreationen, von mitreißenden Beats bis zu entspannten Melodien. Seine Tracks zeichnen sich durch kreative Arrangements und eine einzigartige Genrefusion aus, die ein unverwechselbares Hörerlebnis bietet.
            </p>
        </div>
    </div>
        

)


export default SpotifyPreview