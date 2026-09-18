import React from 'react'
import './Programs.css'
import Navbar from '../../Components/Navbar/Navbar'
import ThreeScene from '../../ThreeScene/ThreeScene'
import ThreeScene1 from '../../ThreeScene/ThreeScene1'
import ThreeScene2 from '../../ThreeScene/ThreeScene2'
import Title from '../../Components/Title/Title'
import Footer from '../../Components/Footer/footer'

import tomato from '../../assets/tomato-coating.png'
import ketchup from '../../assets/savos-ketchup.png'
import shito from '../../assets/savos_shito.png'
{/*import program_icon_1 from '../../assets/tomato_coating.png'
import program_icon_2 from '../../assets/ketchup-bottle.png'
import program_icon_3 from '../../assets/shito-container.png'*/}



const Programs = () => {
  return (
    <>
    <Navbar/>
    <div className='services' >
       <Title subTitle='Our SERVICES' title='What We Offer'/> 
    </div>
    <div className="coating">
      <div className="coating-left">
      <ThreeScene/>
      </div>
      <div className="about-pic">
          <img src={tomato} alt='' className='pic'/>
        </div>
    <div className="coating-right">
      <h3>TOMATO COATING</h3>
      <p>Our tomato coating process is designed to extend the freshness and shelf life of tomatoes after harvest. 
        We begin by selecting ripe tomatoes and carefully washing them to remove dirt and contaminants. 
        After drying, the tomatoes are treated with a thin, food-safe edible coating, such as a chitosan-based solution. 
        This protective layer helps reduce moisture loss, slow ripening, and provide protection against microorganisms. 
        The process is important because tomatoes can spoil quickly during storage and transportation, causing financial losses and food waste. 
        SAVOS combines food science and agricultural innovation to preserve tomato quality, helping farmers, retailers, and consumers keep tomatoes fresh, and marketable for longer. 
</p>
    </div>
    </div>
    <div className="ketchup">
      <div className="ketchup-left">
      <h3>KETCHUP PRODUCTION</h3>
      <p>Our ketchup production begins with selecting fresh, ripe tomatoes sourced from local farmers. 
        The tomatoes are washed, sorted, and processed before being crushed and cooked to release their natural colour and flavour. 
        The tomato pulp is strained for a smooth consistency and combined with carefully measured vinegar, sugar, salt, and selected spices. 
        The mixture is then cooked until it reaches the desired thickness, flavour, and texture before being hygienically packaged and sealed. 
        This process transforms fresh tomatoes into a convenient, longer-lasting product while creating value for farmers and helping reduce post-harvest losses.
        SAVOS focuses on hygiene, consistency, quality, and responsible food production at every stage.</p>
      </div>
       <div className="ketchup-right">
        <ThreeScene1/>
      </div>
      <div className="about-pic">
          <img src={ketchup} alt='' className='pic'/>
        </div>
    </div>
    <div className="shito">
      <div className="shito-left">
        <ThreeScene2/>
      </div>
      <div className="about-pic">
          <img src={shito} alt='' className='pic'/>
        </div>
      <div className="shito-right">
      <h3>SHITO PRODUCTION</h3>
      <p>Our shito production combines locally sourced ingredients with food-processing methods to create a flavourful Ghanaian condiment.
        We begin by selecting peppers, onions, garlic, ginger, tomatoes, spices, and cooking oil. 
        The ingredients are cleaned and prepared before being blended or processed to the desired consistency. 
        The mixture is then slowly cooked with oil and seasonings, allowing the ingredients to develop their colour, aroma, and flavour. 
        Control of cooking time, temperature, and moisture helps produce a consistent product. 
        Once ready, the shito is cooled and packaged in clean containers. 
        SAVOS Shito provides a convenient way to enjoy a favourite while creating value from locally sourced ingredients.</p>

      </div>
    </div>



   <Footer/>


  
    

    </>
  )
}
 
export default Programs
