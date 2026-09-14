import React from 'react'
import './Programs.css'
import Navbar from '../../Components/Navbar/Navbar'
import ThreeScene from '../../ThreeScene/ThreeScene'
import ThreeScene1 from '../../ThreeScene/ThreeScene1'
import ThreeScene2 from '../../ThreeScene/ThreeScene2'
import Title from '../../Components/Title/Title'

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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Tempora placeat dicta error corrupti unde similique libero, quos voluptate 
        sit soluta reiciendis alias accusamus omnis
        fugiat iure molestias aspernatur sequi natus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. S
        int, inventore. Repellendus, aut corporis impedit suscipit repudiandae eveniet 
        vitae esse asperiores quibusdam, quod, repellat at voluptatem dicta fugiat enim rem minima.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit harum error quidem quisquam voluptatum! 
        Vero, consequuntur voluptate qui dolore, 
        enim nesciunt quasi doloremque laudantium ad architecto sint, non numquam ullam!</p>
    </div>
    </div>
    <div className="ketchup">
      <div className="ketchup-left">
      <h3>KETCHUP PRODUCTION</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Tempora placeat dicta error corrupti unde similique libero, quos voluptate 
        sit soluta reiciendis alias accusamus omnis
        fugiat iure molestias aspernatur sequi natus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. S
        int, inventore. Repellendus, aut corporis impedit suscipit repudiandae eveniet 
        vitae esse asperiores quibusdam, quod, repellat at voluptatem dicta fugiat enim rem minima.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit harum error quidem quisquam voluptatum! 
        Vero, consequuntur voluptate qui dolore, 
        enim nesciunt quasi doloremque laudantium ad architecto sint, non numquam ullam!</p>
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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Tempora placeat dicta error corrupti unde similique libero, quos voluptate 
        sit soluta reiciendis alias accusamus omnis
        fugiat iure molestias aspernatur sequi natus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. S
        int, inventore. Repellendus, aut corporis impedit suscipit repudiandae eveniet 
        vitae esse asperiores quibusdam, quod, repellat at voluptatem dicta fugiat enim rem minima.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit harum error quidem quisquam voluptatum! 
        Vero, consequuntur voluptate qui dolore, 
        enim nesciunt quasi doloremque laudantium ad architecto sint, non numquam ullam!</p>
      </div>
    </div>






  
    

    </>
  )
}
 
export default Programs