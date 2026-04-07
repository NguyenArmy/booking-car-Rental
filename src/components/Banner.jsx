import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-5xl lg:max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] rounded-2xl overflow-hidden'> 
      

      <div className='text-white'>

        <h2 className='text-3xl font-medium'>
            Do You Own A Luxury Car?
        </h2>
        <p className='mt-2'>Monetize your vehicle effortlessly by listing it on CarRental.</p>
    <p className='max-w-[520px]'>We take care of insurance, driver verification and secure payments
        so you can earn passive income, stress-free. </p>

        <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>List your car</button>


      </div>


      <img src={assets.banner_car_image} alt="car" className="max-h-[220px] md:max-h-[260px] mt-8 md:mt-0"/>
    </div>
  )
}

export default Banner
