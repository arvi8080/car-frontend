import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Recommendation from '../components/Recommendation'
import HeroSection from '../components/HeroSection'

import { useAppContext } from '../context/AppContext'
import { dummyCarData } from '../assets/assets'

const Home = () => {
  const { user } = useAppContext()

  const fakeUser = user || {
    name: 'Demo User',
    lastRental: dummyCarData[1],
  }

  const fakeTrip = { destination: 'mountain' }
  const fakeWeather = 'sunny'

  return (
    <div className="min-h-screen bg-light flex flex-col items-center w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-8 space-y-12">
        <HeroSection /> {/*New animated hero section */}
        <Hero />
        <Recommendation user={fakeUser} trip={fakeTrip} weather={fakeWeather} cars={dummyCarData} />
        <FeaturedSection />
        <Banner />
        <Testimonial />
        <NewsLetter />
      </div>
    </div>
  )
}

export default Home
