import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/savos.png'
import menu_icon from '../../assets/menu-icons.png'
{/*import { Link } from 'react-scroll';*/}
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

   const [sticky, setSticky] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const [mobileMenu, setMobileMenu] = useState(false);

   const toggleMenu = () => {
    setMobileMenu(prev => !prev);
   }

   const closeMenu = () => {
    setMobileMenu(false);
   }

   // Close the mobile menu automatically if the window is resized
   // back up to desktop width, so the toggle state never gets "stuck".
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenu) {
        setMobileMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
   }, [mobileMenu]);

   // Lock background scrolling while the mobile menu is open.
   useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
   }, [mobileMenu]);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <Link to='/' className='home-link'>
        <img src={logo} alt="" className='logo' />
      </Link>
        <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
            {/*<li><Link to='hero' smooth={true} offset={0} onClick={closeMenu}>Home</Link></li>
            <li><Link to='programs' smooth={true} offset={-295} onClick={closeMenu}>Services</Link></li>
            <li><Link to='campus' smooth={true} offset={-260} onClick={closeMenu}>Products</Link></li>
            <li><Link to='about' smooth={true} offset={-165} onClick={closeMenu}>About Us</Link></li>
            <li><Link to='testimonials' smooth={true} offset={-285} onClick={closeMenu}>Testimonials</Link></li>
            <li><button className='btn'><Link to='contact' smooth={true} offset={-260} onClick={closeMenu}>Contact Us</Link></button></li>*/}
            <li><NavLink to='/' end className='home-link' onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to='/services' className='services-link' onClick={closeMenu}>Services</NavLink></li>
            <li><NavLink to='/product' className='program-link' onClick={closeMenu}>Products</NavLink></li>
            <li><NavLink to='/about' className='about-link' onClick={closeMenu}>About Us</NavLink></li>
            <li><NavLink to='/testimonials' className='testimonial-link' onClick={closeMenu}>Testimonials</NavLink></li>
            {/*<li><button className='btn'><Link to='/admin' className='contact-link' onClick={closeMenu}>Admin</Link></button></li>*/}
        </ul>
        <img
          src={menu_icon}
          alt="Toggle menu"
          className={`menu-icon ${mobileMenu ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
          role="button"
        />
        {/* Backdrop: only active on mobile widths, closes the menu on tap-outside */}
        <div
          className={`nav-overlay ${mobileMenu ? 'show' : ''}`}
          onClick={closeMenu}
        />
    </nav>
  )
}

export default Navbar
