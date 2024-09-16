import React from "react";
import styles from './Animation.module.css'
import { useState, useEffect, useRef } from "react";
const Animation = () =>{
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
        }
      );
  
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);
    return (
        <div className={`${styles.conteiner} dark:bg-[#3A3B3E]`}>
          <ul className={styles.dinamico}>
            <li data-aos="fade-up" className={styles.first}>
              <span>EFICIENTE</span>
            </li>
            <li data-aos="fade-up"  className={styles.second}>
              <span>RÁPIDO</span>
            </li>
            <li data-aos="fade-up"  className={styles.third}>
              <span>TECNOLÓGICO</span>
            </li>
          </ul>
        </div>
    )
}

export default Animation;