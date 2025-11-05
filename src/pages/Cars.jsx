import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from '../components/CarCard';



const Cars = () => {
  const [input, setInput] = useState('');
  // Search logic: filter by brand, model, category, location, and description
  const filteredCars = dummyCarData.filter(car => {
    const q = input.trim().toLowerCase();
    if (!q) return true;
    return (
      car.brand.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      car.category.toLowerCase().includes(q) ||
      car.location.toLowerCase().includes(q) ||
      (car.description && car.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-light w-full">
      <div className='flex flex-col items-center py-16 bg-light max-md:px-4'>
        <Title  title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure'/>
        <motion.div
          className='flex items-center bg-white px-4 mt-6 max-w-2xl w-full h-12 rounded-full shadow border border-borderColor'
          initial={{ boxShadow: '0px 2px 8px #2563eb22' }}
          whileFocus={{ boxShadow: '0px 4px 24px #2563eb55' }}
        >
          <motion.img
            src={assets.search_icon}
            alt=""
            className='w-4.5 h-4.5 mr-2'
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <motion.input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Search by make, model, or features'
            className='w-full h-full outline-none text-gray-500 bg-transparent'
            whileFocus={{ scale: 1.03, backgroundColor: '#f0f4ff' }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <motion.img
            src={assets.filter_icon}
            alt=''
            className='w-4.5 h-4.5 ml-2'
            whileHover={{ rotate: 20, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      </div>
      <div className='px-4 md:px-8 lg:px-16 xl:px-24 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 text-lg">No cars found for your search.</div>
          ) : (
            filteredCars.map((car, index) => (
              <div key={index} className="transition-transform hover:scale-105">
                <CarCard car={car} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Cars