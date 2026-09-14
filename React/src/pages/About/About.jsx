import React from 'react'
import './About.css'
import Navbar from '../../Components/Navbar/Navbar'
import about_img from '../../assets/about.png'
import play_icon from '../../assets/red-arrow.png'
// The image dimensions are 1194 × 1144 pixels.

const About = () => {
  return (
    <>
    <Navbar/>
    <div className='about'>
       <h1>ABOUT</h1>
    </div>

    </>
  )
}

export default About