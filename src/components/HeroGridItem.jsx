import React, { Component } from 'react'
import styles from "../style";


export default class HeroGridItem extends React.Component {
  componentDidMount(){
    
    const cards = document.querySelectorAll(".hover-effect");
    
    cards.forEach(card => {
      
      card.addEventListener("mousemove", (e) => {
        const { x, y } = card.getBoundingClientRect();
        card.style.setProperty("--x", e.clientX - x);
        card.style.setProperty("--y", e.clientY - y);
        //Ich bin extrem homosexuell
      });
    });
  }
  render(){
    return(
    <a href={this.props.link} target="_blank" className={`${this.props.style} col-span-1 cursor-pointer hover-effect overflow-hidden relative rounded-xl hover:-mt-2 hover:mb-2 duration-75 ease-linear ${styles.flexCenter} bg-[${this.props.bgColor}]`}>
          <img src={this.props.logo} className={`z-[2] object-contain h-14 transition-all duration-100 ease-linear `}/>
    </a>
    
  )
}
}