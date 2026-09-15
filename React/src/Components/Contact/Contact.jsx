import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import white_arrow from '../../assets/white-arrow.png'
{/*import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import instagram_icon from '../../assets/instagram-icon.png'
import whatsapp_icon from '../../assets/whatsapp-icon.png' */}


const Contact = () => {

     const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6417919e-3b86-484b-af10-28ac28499515");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };





  return (
    <div className='contact'>
       <div className="contact-col">
         <h3>Send us a message <img src={msg_icon} alt="" /></h3>
         <p>We’d love to hear from you! Whether you have questions about our tomato ketchup, authentic shito, tomato coating, 
          or you have some issues you want us to address with regards to our products. 
          Our team is ready to assist you and will respond promptly. Thank you for choosing SAVOS!</p>

         {/*} <ul>
                <a href = "tel:+233558877516"><li><img src={phone_icon} alt="" />+233 558 877 516</li></a>
                <a href = "mailto:savos2.0africa@gmail.com"><li><img src={mail_icon} alt="" />savos2.0africa@gmail.com</li></a>
                <a href = "https://wa.me/+233558877516"><li><img src={whatsapp_icon} alt="" />+233 558 877 516</li></a>
                <a href = "https://www.instagram.com/savos2.0africa?igsh=cnU2a3p5dDg0eDg4"><li><img src={instagram_icon} alt="" />@savos2.0africa</li></a>
                <a href = "https://maps.app.goo.gl/bqJVkcikpMcwJ5DFA"><li><img src={location_icon} alt="" />P. O. BOX 46, Aburi</li></a>
        </ul> */}

       </div> 
       <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your name</label>
            <input type="text" name='name' placeholder='Enter your name ' required/>
            <label>Phone number</label>
            <input type="tel" name='phone' placeholder='Enter your mobile number ' required/>
            <label>Write your message</label>
            <textarea name="message"  rows="6" placeholder='Enter your request, question or concern'></textarea>
            <button type='submit' className="btn dark-btn">Submit now <img src={white_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
       </div> 

       
    </div>
  )
}

export default Contact