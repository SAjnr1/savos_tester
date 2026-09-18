import React from 'react'
import './About.css'
import Title from '../../Components/Title/Title'
import Navbar from '../../Components/Navbar/Navbar'
import about_img from '../../assets/about.png'
import person1 from '../../assets/person1.png'
import person2 from '../../assets/person2.png'
import Footer from '../../Components/Footer/footer'
import play_icon from '../../assets/red-arrow.png'
// The image dimensions are 1194 × 1144 pixels.

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="info">
      <Title subTitle='OUR COMPANY' title='ABOUT US'/>
    </div>
       <div className="project-lead">
        <div className="profile">
          <h3>Mansura Abdullah</h3>
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
          <img src={person2} className='propic'/>
        </div>
       </div>
       <div className="project-lead">
        <div className="profile-picture">
          <img src={person1} className='propic'/>
        </div>
        <div className="profile">
          <h3>Emmanuella Agyei Boadiwaa</h3>
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
          <h3>Rejoyce Dellor Mawumelon</h3>
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
          <h3>PERSON4</h3>
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

       <Footer/>
    </>
  )
}

export default About