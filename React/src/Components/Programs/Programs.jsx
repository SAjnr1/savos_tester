import React from 'react'
import './Programs.css'
import program_1 from '../../assets/tomato-coating.png'
import program_2 from '../../assets/savos-ketchup.png'
import product_3 from '../../assets/savos_shito.png'
import program_icon_1 from '../../assets/tomato_coating.png'
import program_icon_2 from '../../assets/ketchup-bottle.png'
import program_icon_3 from '../../assets/shito-container.png'



const Programs = () => {
  return (
    <div className='programs' >
        <div className="program">
            <img src={program_1} alt="" />
            <div className="caption">
                <img src={program_icon_1} alt="" />
                <p>Tomato Coating</p>
            </div>
        </div>
        <div className="program">
            <img src={program_2} alt="" />
            <div className="caption">
                <img src={program_icon_2} alt="" />
                <p>Ketchup Production</p>
            </div>
        </div>
        <div className="program">
            <img src={product_3} alt="" />
            <div className="caption">
                <img src={program_icon_3} alt="" />
                <p>Shito Production</p>
            </div>
        </div>
       
    </div>
  )
}
 
export default Programs