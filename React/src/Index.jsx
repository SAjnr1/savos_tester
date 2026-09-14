import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Programs from './Components/Programs/Programs'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Campus from './Components/Campus/Campus'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/footer'
{/*import CommentsPage from './Components/Comments/CommentsPage'
import AdminPage from './Components/Comments/AdminPage'
import { Route, Routes } from 'react-router-dom'*/}


const Index = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title subTitle='Our SERVICES' title='What We Offer'/>
        <Programs/>
        <Title subTitle='Gallery' title='Product Photos'/>
        <Campus/>
        <About/>
        <Title subTitle='Testimonials' title='What Students Say'/>  
        <Testimonials/> 
        <Title subTitle='Contact Us' title='Get In Touch'/>
        <Contact/>
        <Footer/>
      </div>
      
      
    </div>
  )
}

export default Index