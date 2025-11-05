import React from 'react'
import { assets, cityList } from '../assets/assets'
import { motion } from 'framer-motion'

const heroBgVariants = {
  animate: {
    background: [
      'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)',
      'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)'
    ],
    transition: { duration: 10, repeat: Infinity, ease: 'linear' }
  }
};

const Hero = () => {
  const [pickupLocation, setPickupLocation] = React.useState('');
  return (
    <motion.section
      className='relative min-h-[80vh] flex flex-col items-center justify-center gap-14 text-center overflow-hidden'
      variants={heroBgVariants}
      animate='animate'
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className='text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg flex flex-col items-center'
      >
        <motion.span
          className='inline-block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent'
          animate={{
            x: [0, 20, -20, 0],
            textShadow: [
              '0px 0px 0px #2563eb',
              '0px 2px 16px #2563eb',
              '0px -2px 16px #2563eb',
              '0px 0px 0px #2563eb'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Rent. Drive. Enjoy.
        </motion.span>
        <motion.span
          className='text-lg md:text-2xl font-medium text-gray-500 block mt-4'
          animate={{
            y: [0, -8, 8, 0],
            color: [
              '#6b7280',
              '#2563eb',
              '#6b7280',
              '#6b7280'
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          The <span className='text-primary font-bold'>#1 Car Rental</span> Experience
        </motion.span>
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-2xl bg-white/90 shadow-xl border border-borderColor backdrop-blur'
      >
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
          <div className='flex flex-col items-start gap-2'>
            <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className='rounded-md border border-borderColor px-3 py-2 text-gray-700 focus:ring-2 focus:ring-primary outline-none'>
              <option value=''>Pickup Location</option>
              {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : 'Please select location'}</p>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='pickup-date' className='font-medium'>Pickup Date</label>
            <input type='date' id='pickup-date' min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-700 border border-borderColor rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none' required />
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='return-date' className='font-medium'>Return Date</label>
            <input type='date' id='return-date' className='text-sm text-gray-700 border border-borderColor rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none' required />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.12, backgroundColor: '#2563eb', x: [0, 8, -8, 0] }}
          whileTap={{ scale: 0.97 }}
          animate={{
            y: [0, -6, 0, 6, 0],
            boxShadow: [
              '0px 2px 8px #2563eb55',
              '0px 8px 24px #2563eb99',
              '0px 2px 8px #2563eb55',
              '0px -8px 24px #2563eb99',
              '0px 2px 8px #2563eb55'
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className='flex items-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull transition-all text-white rounded-full cursor-pointer font-semibold shadow-lg ml-0 md:ml-6 mt-6 md:mt-0'
        >
          <img src={assets.search_icon} alt='search' className='brightness-300' />
          Search
        </motion.button>
      </motion.form>
      <motion.img
        src={assets.main_car}
        alt='car'
        className='max-h-72 drop-shadow-2xl mt-8 animate-bounce-slow'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
      />
      <motion.div
        className='absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />
      <motion.div
        className='absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.section>
  )
}

export default Hero