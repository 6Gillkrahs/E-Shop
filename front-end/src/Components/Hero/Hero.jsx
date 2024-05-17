import React from 'react'
import { Link } from 'react-router-dom';
require('./Hero.css');
const hand_icon = require('../Assets/hand_icon.png');
const arrow_icon =require('../Assets/arrow.png');
const hero_image =require('../Assets/hero_image.png');

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            <div className="hero-lastest-btn">
                <div>Lastest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero 
