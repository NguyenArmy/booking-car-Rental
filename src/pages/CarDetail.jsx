import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { dummyCarData, assets } from '../assets/assets'


const CarDetail = () => {


  const {id} = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  useEffect(() => {
    setCar(dummyCarData.find(car => car._id === id))
  },[id])
  
  return car ?  (
    <div className='px-6 md: px-16 1g: px-24 xl: px-32 mt-16'>
    <button onClick={() => navigate('/cars')} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer '>
      <img src={assets.arrow_icon} alt="" className ='rotate-180 opacity-65'/>
      Back to all cars
    </button>

      
    </div>
  ) : <p> Loading...</p>
}

export default CarDetail
