import React from 'react';
import CarCard from './CarCard';
import { assets } from '../assets/assets';

/**
 * AI-powered car recommendations based on user, trip, and weather context.
 * For demo, uses simple rules and randomization.
 * Extend with real AI/ML backend as needed.
 */
const Recommendation = ({ user, trip, weather, cars }) => {
  // Example: Recommend based on last rental, trip type, and weather
  let recommended = [];
  if (user && user.lastRental) {
    // Suggest similar car
    recommended = cars.filter(
      c => c.category === user.lastRental.category && c._id !== user.lastRental._id
    );
    if (recommended.length > 0) {
      recommended = [
        {
          ...recommended[0],
          _aiReason: `You loved the ${user.lastRental.category} last time. Try this similar model!`
        }
      ];
    }
  }
  if (trip && trip.destination) {
    // Suggest SUV for mountains, convertible for beach, etc.
    if (/mountain/i.test(trip.destination)) {
      const suv = cars.find(c => /SUV/i.test(c.category));
      if (suv) recommended.push({ ...suv, _aiReason: 'Recommended for mountain trips: better traction!' });
    }
    if (/beach|sunny/i.test(trip.destination)) {
      const conv = cars.find(c => /Convertible/i.test(c.category));
      if (conv) recommended.push({ ...conv, _aiReason: 'Perfect for sunny weather: try a convertible!' });
    }
  }
  if (weather && /rain|snow/i.test(weather)) {
    // Suggest AWD or SUV
    const suv = cars.find(c => /SUV/i.test(c.category));
    if (suv) recommended.push({ ...suv, _aiReason: 'Weather alert: SUV recommended for safety.' });
  }
  // Fallback: random car
  if (recommended.length === 0 && cars.length > 0) {
    recommended = [
      { ...cars[Math.floor(Math.random() * cars.length)], _aiReason: 'Popular pick for your next trip!' }
    ];
  }

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <img src={assets.star_icon} alt="AI" className="h-6" />
        AI Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommended.map(car => (
          <div key={car._id} className="relative">
            <CarCard car={car} />
            {car._aiReason && (
              <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-pulse">
                {car._aiReason}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
