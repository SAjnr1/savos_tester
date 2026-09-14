{/*import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/images_savos.png'
import user_2 from '../../assets/images_savos.png'
import user_3 from '../../assets/images_savos.png'
import user_4 from '../../assets/images_savos.png' 

import Commments from '../../Components/Comments/CommentsPage' */}

import CommentsPage from "../../Components/Comments/CommentsPage"



const Testimonials = () => {

    /*const slider = useRef();
    let tx = 0;

    const slideForward = ()=>{
        if(tx > -50){
            tx -=25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

    const slideBackward= ()=>{
        if(tx < 0){
            tx +=25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    } */





  return (
    <>
  { /* <div className='testimonials'>
        
        <img src={next_icon} alt="" className="next-btn" onClick={slideForward}/>
        <img src={back_icon} alt="" className="back-btn" onClick={slideBackward} />
        <div className="slider">
            <ul ref={slider} >
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_1} alt="" />
                            <div>
                                <h3>Dr. Kwesi Crankson</h3>
                                <span>Academic City University, Ghana</span>
                            </div>
                        </div>
                        <p>
                            I love that there are no hidden sugars or artificial ingredients. 
                            It saves me 30 minutes of chopping and prep time every single week.
                             
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_2} alt="" />
                            <div>
                                <h3>Rhodaline Yeboah</h3>
                                <span>Aburi Girls' SHS, Ghana</span>
                            </div>
                        </div>
                        <p>
                            Savos shito is absolutely delicious. 
                            It has a rich flavour, a satisfying level of spice, and pairs wonderfully with a variety of meals. 
                            One taste and you will want more, I will recommend for averyone😋😋
                             
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_3} alt="" />
                            <div>
                                <h3>Maliq</h3>
                                <span>Cornell University, New York</span>
                            </div>
                        </div>
                        <p>
                            This ketchup has completely transformed my meals! The rich, balanced flavor is exactly what I've been searching for not too sweet, not too vinegary, just pure tomato perfection. It elevates everything from simple burgers and fries to more complex dishes. I'm officially hooked and will be recommending it to everyone!
                            
                        </p>
                    </div>
                </li>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_4} alt="" />
                            <div>
                                <h3>Anna Aboagye Bonner</h3>
                                <span>International Community School, Ghana</span>
                            </div>
                        </div>
                        <p>
                            I was genuinely impressed by the website and the vision behind the brand. 
                            It’s inspiring to see an idea turn into something practical and creative, from tomato sauce to plans for ketchup, shito, and more. 
                            Coming from a school with limited opportunities to explore practical projects, I find what you’ve created truly inspiring. 
                            I’m excited to see how far the brand goes and proud to support the journey from the beginning.
                             
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div> */} 

    
    <CommentsPage/>
     </>
  )
}

export default Testimonials 