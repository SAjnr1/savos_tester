import React from 'react'
import './Programs.css'
import program_1 from '../../assets/tomato-coating.png'
import program_2 from '../../assets/savos-ketchup.png'
import product_3 from '../../assets/savos_shito.png'
import program_icon_1 from '../../assets/tomato_coating.png'
import program_icon_2 from '../../assets/ketchup-bottle.png'
import program_icon_3 from '../../assets/shito-container.png'
import { Link } from 'react-router-dom';



const Programs = () => {
  return (
    <div className='programs' >
        <div className="program">
             <Link to='/services' className='services-link'>
            <img src={program_1} alt="" />
            <div className="caption">
                <img src={program_icon_1} alt="" />
                <p>Tomato Coating</p>
            </div>
            </Link>
        </div>

        <div className="program">
            <Link to='/services' className='services-link'>
            <img src={program_2} alt="" />
            <div className="caption">
                <img src={program_icon_2} alt="" />
                <p>Ketchup Production</p>
            </div>
            </Link>
        </div>

        <div className="program">
            <Link to='/services' className='services-link'>
            <img src={product_3} alt="" />
            <div className="caption">
                <img src={program_icon_3} alt="" />
                <p>Shito Production</p>
            </div>
            </Link>
        </div>
       
    </div>
  )
}
 
export default Programs