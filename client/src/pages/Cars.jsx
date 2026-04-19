import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import CarCard from '../components/carCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'

const Cars = () => {
    const [seachParams] = useSearchParams();
  const pickupLocation = seachParams.get('pickupLocation');
  const pickupDate = seachParams.get('pickupDate');
  const returnDate = seachParams.get('returnDate');

  const {cars, axios} = useAppContext();

  const [input, setInput] = useState('')
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async ()=>{
    if(input === ''){
      setFilteredCars(cars);
      return null;
    }
    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase()) 
     
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredCars(filtered);
  }

  const searchCarAvailability = async () => {
    try {
      const {data} = await axios.post('/api/bookings/check-availability', {pickupLocation, pickupDate, returnDate})
      if(data.success){
        setFilteredCars(data.availableCars);
        if(data.availableCars.length === 0){
          toast.error('No cars available for the selected dates and location. Please try different options.');
        }
      } else if (Array.isArray(data)) {
        setFilteredCars(data);
        if(data.length === 0){
          toast.error('No cars available for the selected dates and location. Please try different options.');
        }
      } else {
        toast.error('No cars available for the selected dates and location. Please try different options.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
  if (isSearchData) {
    searchCarAvailability();
  } else {
    setFilteredCars(cars);
  }
}, [cars]);

useEffect(() => {
  if (input !== '') {
    applyFilter();
  } else {
    isSearchData ? searchCarAvailability() : setFilteredCars(cars);
  }
}, [input]);

  return (
    <div>

      <motion.div

        initial={{y: 20, opacity: 0}}
        animate={{opacity: 1, y: 0}}
      
        transition={{duration: 0.5, ease: "easeOut"}}
      
      
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vechicles available for your next adventure'/>

        <motion.div

        initial={{y: 20, opacity: 0}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.3, ease: "easeOut"}} 
       
        
        
        
        className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>

          <input onChange={(e)=> setInput(e.target.value)} value={input} type='text' placeholder='Search for cars...' className='w-full h-full outline-none text-gray-500'/>

          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>

        </motion.div>


      </motion.div>
      

      <motion.div
      initial={{ opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5, delay: 0.4}}
      
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto ">Showing {filteredCars.length} Car</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=>(
            <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: index * 0.2, ease: "easeOut"}}
            
            key={index}>
              <CarCard car={car}/>
            </motion.div>
          ))}

        </div>
      </motion.div>
      
    </div>
  )
}

export default Cars
