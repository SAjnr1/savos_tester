import React from 'react'
import './Campus.css'
import gallery_1 from '../../assets/savos-shito.png'
import gallery_2 from '../../assets/savos-coating.png'
import gallery_3 from '../../assets/savos_ketchup.png'
import gallery_4 from '../../assets/savos-sachet.png'
// The image dimensions are 467 × 588 pixels.
// import white_arrow from '../../assets/white-arrow.png'


const Campus = () => {
  return (
    <div className='campus'>
        <div className="gallery">
            <img src={gallery_1} alt="" />
            <img src={gallery_2} alt="" />
            <img src={gallery_3} alt="" />
            <img src={gallery_4} alt="" />
        </div>
       {/*} <button className='btn dark-btn'>See more here <img src={white_arrow} alt="" /></button> */}
        
    </div>
  )
}

export default Campus