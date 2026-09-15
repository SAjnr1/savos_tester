import React from 'react'
import './footer.css'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import instagram_icon from '../../assets/instagram-icon.png'
import whatsapp_icon from '../../assets/whatsapp-icon.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className="contact-info">
      <ul>
                      <a href = "tel:+233558877516"><li><img src={phone_icon} alt="" />+233 558 877 516</li></a>
                      <a href = "mailto:savos2.0africa@gmail.com"><li><img src={mail_icon} alt="" />savos2.0africa@gmail.com</li></a>
                      <a href = "https://wa.me/+233558877516"><li><img src={whatsapp_icon} alt="" />+233 558 877 516</li></a>
                      <a href = "https://www.instagram.com/savos2.0africa?igsh=cnU2a3p5dDg0eDg4"><li><img src={instagram_icon} alt="" />@savos2.0africa</li></a>
                      <a href = "https://maps.app.goo.gl/bqJVkcikpMcwJ5DFA"><li><img src={location_icon} alt="" />P. O. BOX 46, Aburi</li></a>
      </ul>
    </div>
    <div className='footer'>
        <p><Link to='/admin'>©️</Link> 2026 SAVOS All rights reserved</p>
        <ul>
            <li>Terms of services</li>
            <li>Privacy Policy</li>
        </ul>
    </div>
    </>
  )
}

export default Footer