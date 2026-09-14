import React from 'react'
import './About.css'
import Navbar from '../../Components/Navbar/Navbar'
import about_img from '../../assets/about.png'
import Title from '../../Components/Title/Title'
import play_icon from '../../assets/red-arrow.png'
// The image dimensions are 1194 × 1144 pixels.

const About = () => {
  return (
    <>
    <Navbar/>
       <div className="about">
        <Title subTitle='' title='ABOUT COMPANY'/> 
       </div>
       <div className="project-lead">
        <div className="profile">
          <h3>PERSON1</h3>
          <h5>Person's Position</h5>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
          asperiores! Officiis nostrum hic quia placeat 
          mvoluptatibus reiciendis temporibus dicta eaque, 
          ipedit iste repellendus odit aut amet quos veniam illo maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ducimus dolore a laboriosam adipisci perspiciatis ex illum pariatur cumque asperiores dolores,
          repudiandae est at neque veritatis? Ut officiis eum magni eaque?Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. Ducimus vitae accusantium quam ad, impedit ipsum iste aliquid harum quia illo adipisci, 
          non quasi excepturi placeat exercitationem, temporibus odit a. Facere.</p>
        </div>
        <div className="profile-picture">
          <img src={about_img} className='propic'/>
        </div>
       </div>
       <div className="project-lead">
        <div className="profile-picture">
          <img src={about_img} className='propic'/>
        </div>
        <div className="profile">
          <h3>PERSON1</h3>
          <h5>Person's Position</h5>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
          asperiores! Officiis nostrum hic quia placeat 
          mvoluptatibus reiciendis temporibus dicta eaque, 
          ipedit iste repellendus odit aut amet quos veniam illo maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ducimus dolore a laboriosam adipisci perspiciatis ex illum pariatur cumque asperiores dolores,
          repudiandae est at neque veritatis? Ut officiis eum magni eaque?Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. Ducimus vitae accusantium quam ad, impedit ipsum iste aliquid harum quia illo adipisci, 
          non quasi excepturi placeat exercitationem, temporibus odit a. Facere.</p>
        </div> 
       </div>
       <div className="project-lead">
        <div className="profile">
          <h3>PERSON1</h3>
          <h5>Person's Position</h5>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
          asperiores! Officiis nostrum hic quia placeat 
          mvoluptatibus reiciendis temporibus dicta eaque, 
          ipedit iste repellendus odit aut amet quos veniam illo maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ducimus dolore a laboriosam adipisci perspiciatis ex illum pariatur cumque asperiores dolores,
          repudiandae est at neque veritatis? Ut officiis eum magni eaque?Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. Ducimus vitae accusantium quam ad, impedit ipsum iste aliquid harum quia illo adipisci, 
          non quasi excepturi placeat exercitationem, temporibus odit a. Facere.</p>
        </div>
        <div className="profile-picture">
          <img src={about_img} className='propic'/>
        </div>
       </div>
       <div className="project-lead">
        <div className="profile-picture">
          <img src={about_img} className='propic'/>
        </div>
        <div className="profile">
          <h3>PERSON1</h3>
          <h5>Person's Position</h5>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
          asperiores! Officiis nostrum hic quia placeat 
          mvoluptatibus reiciendis temporibus dicta eaque, 
          ipedit iste repellendus odit aut amet quos veniam illo maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ducimus dolore a laboriosam adipisci perspiciatis ex illum pariatur cumque asperiores dolores,
          repudiandae est at neque veritatis? Ut officiis eum magni eaque?Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. Ducimus vitae accusantium quam ad, impedit ipsum iste aliquid harum quia illo adipisci, 
          non quasi excepturi placeat exercitationem, temporibus odit a. Facere.</p>
        </div>
       </div>
    </>
  )
}

export default About