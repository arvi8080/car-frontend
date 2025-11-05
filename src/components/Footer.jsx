import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-light border-t border-borderColor mt-24 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className='flex flex-wrap justify-between items-start gap-12 pb-8'>
          <div className='max-w-80'>
            <img src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9' />
            <p className='text-sm'>
              Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
            </p>
            <div className='flex items-center gap-3 mt-6'>
              <a href="#" className="hover:scale-110 transition-transform"><img src={assets.facebook_logo} alt="Facebook" className='h-5 w-5' /></a>
              <a href="https://www.instagram.com/arvind_prajapati_8/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src={assets.instagram_logo} alt="Instagram" className='h-5 w-5' /></a>
              <a href="#" className="hover:scale-110 transition-transform"><img src={assets.twitter_logo} alt="Twitter" className='h-5 w-5' /></a>
              <a href="mailto:arvindprajapatijan86@gmail.com" className="hover:scale-110 transition-transform"><img src={assets.gmail_logo} alt="Gmail" className='h-5 w-5' /></a>
            </div>
          </div>
          <div>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>Quick Links</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Browse Cars</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">List Your Car</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>Resources</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Insurance</a></li>
            </ul>
          </div>
          <div>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>Contact</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li>1234 Luxury Drive</li>
              <li>Mumbai India, CA 94107</li>
              <li>+91 98765 43210</li>
              <li>jmd@rentcar.com</li>
            </ul>
          </div>
        </div>
        <hr className='border-gray-300 my-6' />
        <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-3 text-xs text-gray-400'>
          <p>© 2025 RentCar. All rights reserved.</p>
          <ul className='flex items-center gap-4'>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            <li>|</li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            <li>|</li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer