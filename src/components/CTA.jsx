import React, { Component } from 'react'
import styles, { layout } from "../style";
import Button from './Button';

export default class CTA extends React.Component {
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
      <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} hover-effect2 relative overflow-hidden sm:flex-row flex-col gap-5 border-t-4 border-[#4F228D] rounded-3xl bg-black-gradient-2 box-shadow-2`}>
        <div className="flex-1 flex flex-col z-[2]">
          <h2 className={styles.heading2}>Tritt mit DJRamsad in Kontakt!</h2>
          <p className={`${styles.paragraph} max-w-[500px] mt-5`}>Sei die treibende Kraft für DJ Ramsad! Teile deine Ideen und Vorschläge für aufregende Projekte - deine Einflüsse sind gefragt!</p>
        </div>
        <div>
          <Button content={"Kontakt"} styles={"bg-pink-gradient z-[2] mb-5 md:mb-0"} className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}/>
        </div>
      </section>
    )
  }
}