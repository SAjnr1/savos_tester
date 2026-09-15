import React from 'react'
import './Programs.css'
import Navbar from '../../Components/Navbar/Navbar'
import ThreeScene from '../../ThreeScene/ThreeScene'
import ThreeScene1 from '../../ThreeScene/ThreeScene1'
import ThreeScene2 from '../../ThreeScene/ThreeScene2'
import Title from '../../Components/Title/Title'
import Footer from '../../Components/Footer/footer'

{/*import program_1 from '../../assets/tomato-coating.png'
import program_2 from '../../assets/savos-ketchup.jpg'
import product_3 from '../../assets/savos_shito.png'
import program_icon_1 from '../../assets/tomato_coating.png'
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
    <div className="coating-right">
      <h3>TOMATO COATING</h3>
      <p>Our tomato coating process is designed to extend the freshness and shelf life of tomatoes after harvest. 
        We begin by selecting healthy, ripe tomatoes and carefully washing them to remove dirt and surface contaminants. 
        After drying, the tomatoes are treated with a thin, food-safe edible coating, such as a chitosan-based solution. 
        Chitosan is a biodegradable material that can form a protective layer around the tomato, helping reduce moisture loss, 
        slow down ripening, and provide protection against some microorganisms.
        This process is important because tomatoes can spoil quickly during storage and transportation, 
        leading to significant post-harvest losses for farmers and sellers. 
        By slowing deterioration, our coating can help tomatoes remain marketable for longer and reduce unnecessary food waste.
        SAVOS aims to combine simple food-processing techniques with scientific innovation to address challenges in agriculture. 
        The result is a practical approach to preserving tomatoes while maintaining their natural quality, appearance, and usefulness for consumers.
</p>
    </div>
    </div>
    <div className="ketchup">
      <div className="ketchup-left">
      <h3>KETCHUP PRODUCTION</h3>
      <p>Our ketchup production process begins with the selection of fresh, ripe tomatoes sourced from local farmers. 
        The tomatoes are thoroughly washed, sorted, and processed to remove unwanted parts before being crushed and cooked. 
        The resulting tomato pulp is strained to achieve a smooth consistency and then combined with ingredients such as vinegar, sugar, salt, and selected spices. 
        The mixture is cooked under controlled conditions until it reaches the desired thickness, flavour, and texture. 
        It is then carefully packaged in clean, food-safe containers and properly sealed.
        Ketchup production provides a way of converting fresh tomatoes into a longer-lasting, convenient food product. 
        It also creates additional value for locally produced tomatoes and can help reduce losses when there is an excess supply of fresh tomatoes.
        SAVOS focuses on maintaining good hygiene, consistent preparation, and quality throughout the process. 
        Our goal is to produce ketchup that is safe, flavourful, consistent, and suitable for use with a wide range of everyday meals and snacks.</p>
      </div>
       <div className="ketchup-right">
        <ThreeScene1/>
      </div>
    </div>
    <div className="shito">
      <div className="shito-left">
        <ThreeScene2/>
      </div>
      <div className="shito-right">
      <h3>SHITO PRODUCTION</h3>
      <p>Our shito production combines locally available ingredients with careful food-processing methods to produce a flavourful and convenient Ghanaian condiment. 
        We begin by selecting quality ingredients such as peppers, onions, garlic, ginger, tomatoes, spices, and cooking oil. 
        These ingredients are thoroughly cleaned and prepared before being blended or processed to the required consistency. 
        The mixture is then slowly cooked with the oil and seasonings, allowing the ingredients to develop their characteristic colour, aroma, and flavour.
        Careful control of cooking time, temperature, and moisture is important in producing a consistent product. 
        Once the shito reaches the desired texture and flavour, it is cooled and packaged in clean, food-safe containers before being properly sealed.
        SAVOS Shito provides a way to preserve and add value to locally sourced agricultural ingredients while making a traditional Ghanaian condiment more convenient for consumers. 
        It can be served with meals such as waakye, rice, kenkey, banku, yam, and fried plantain.
</p>
      </div>
    </div>



   <Footer/>


  
    

    </>
  )
}
 
export default Programs