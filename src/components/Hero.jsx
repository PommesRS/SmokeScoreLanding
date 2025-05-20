import styles from "../style";
import Button from "./Button";
import { Link } from "react-router-dom";
import { soundcloud,  spotify, twitch, youtube, amazon } from "../assets";
import HeroGridItem from "./HeroGridItem";

const Hero = () => {


  return(  
    <section id='home' className={`flex md:flex-row flex-col gap-0 md:gap-0 ${styles.paddingY} h-[90dvh] mb-20`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className=" flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 flex-wrap font-poppins font-semibold z-[4] text-[35px] xs:text-[65px] text-center ss:text-left md:text-[52px] text-white xs:leading-[80.8px] leading-[45px]">
            Was ist <br className="sm:block hidden" /> <span className="text-gradient font-bold">SmokeScore</span>? 
          </h1>
        </div>

        <p className={`flex ${styles.paragraph} max-w-[650px] mt-5`}>Unsere App trackt nicht nur, wie viel du rauchst, sondern zeigt dir auch wo. Vergleiche dich mit deinen Freunden, messt euch und findet heraus, wer wirklich durchzieht.

 </p>

        <div className={`flex flex-row flex-wrap ${styles.flexCenter} mt-10`}>
          <Button content={"Zur App"} styles={"bg-pink-gradient"} link={'https://www.smokescore.de'} rel={'noopener noreferrer'}/>
        </div>


      </div>
      <div className={`flex-1 gap-2 w-full flex ${styles.flexCenter}`}>
        <div className="absolute bottom-[-23em] md:bottom-0">

          <img src="Phone.png" alt="" width={500} />

        </div>

      </div>
    </section>
)}

export default Hero