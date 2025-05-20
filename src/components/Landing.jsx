import React from 'react'
import styles from "../style";
import { Hero, NewSongs, SpotifyPreview, Partner, CTA, Donate, Footer } from '.';

const Landing = () => (
    <div className=' w-full overflow-hidden'>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth} flex flex-col gap-10`}>
            <NewSongs />
            <SpotifyPreview />
            <Partner />
            <CTA />
            <Donate />
          </div>
        </div>

        
    </div>
)


export default Landing