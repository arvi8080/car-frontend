import React, { useState } from 'react'
import { assets, cityList, dummyUserData, dummyCarData } from '../../assets/assets';

const AddCar = () => {
  const [form, setForm] = useState({
    name: '',
    model: '',
    year: '',
    price: '',
    image: null,
    city: cityList[0],
    owner: dummyUserData._id,
    category: '',
    seating_capacity: '',
    fuel_type: '',
    transmission: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState(null);
  const [features, setFeatures] = useState([]);
  const featureOptions = [
    'Air Conditioning', 'Bluetooth', 'GPS', 'Sunroof', 'Backup Camera', 'Heated Seats',
    'Cruise Control', 'Keyless Entry', 'Alloy Wheels', 'Apple CarPlay', 'Android Auto',
    'Leather Seats', 'Parking Sensors', 'Blind Spot Monitor', 'Remote Start',
    'Third Row Seating', 'Tow Package', 'Lane Departure Warning', 'Adaptive Cruise Control',
    'Premium Sound System', 'Wireless Charging', 'Automatic Emergency Braking',
    'Heads-Up Display', '360° Camera', 'WiFi Hotspot', 'Power Liftgate',
    'Navigation System', 'Rain Sensing Wipers', 'Memory Seats', 'Ambient Lighting',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFeatures((prev) => checked ? [...prev, value] : prev.filter(f => f !== value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Enhanced validation
    if (!form.name || !form.model || !form.year || !form.price || !form.category || !form.seating_capacity || !form.fuel_type || !form.transmission || !form.description) {
      setError('Please fill in all fields.');
      return;
    }
    if (features.length === 0) {
      setError('Please select at least one feature.');
      return;
    }
    if (isNaN(form.year) || form.year < 1900 || form.year > new Date().getFullYear()) {
      setError('Please enter a valid year.');
      return;
    }
    if (isNaN(form.price) || form.price <= 0) {
      setError('Please enter a valid price.');
      return;
    }
    if (isNaN(form.seating_capacity) || form.seating_capacity <= 0) {
      setError('Please enter a valid seating capacity.');
      return;
    }
    // Add the new car to dummyCarData
    const newCar = {
      "_id": Date.now().toString(), // Generate a simple ID for demo
      "owner": dummyUserData._id,
      "brand": form.name,
      "model": form.model,
      "image": preview || assets.car_image1, // Use preview or default image
      "year": parseInt(form.year),
      "category": form.category,
      "seating_capacity": parseInt(form.seating_capacity),
      "fuel_type": form.fuel_type,
      "transmission": form.transmission,
      "pricePerDay": parseInt(form.price),
      "location": form.city,
      "description": form.description,
      "isAvailable": true,
      "createdAt": new Date().toISOString(),
      "features": features
    };

    // Add to dummyCarData (in a real app, this would be sent to backend)
    dummyCarData.push(newCar);

    setSuccess('Car added successfully and is now available in the car list!');
    setForm({
      name: '',
      model: '',
      year: '',
      price: '',
      image: null,
      city: cityList[0],
      owner: dummyUserData._id,
      category: '',
      seating_capacity: '',
      fuel_type: '',
      transmission: '',
      description: '',
    });
    setFeatures([]);
    setPreview(null);
    // Here you would send form data to the backend
  };

  return (
    <div style={{ flex: 1, height: 'calc(100vh - 64px)', overflowY: 'auto', background: 'linear-gradient(135deg, #eaf1fb 0%, #f9fbfd 100%)' }}>
      <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', padding: '2.5rem 1.5rem', borderRadius: 20, boxShadow: '0 8px 32px rgba(45,114,217,0.10)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'linear-gradient(135deg, #2d72d9 0%, #6fc3ff 100%)', borderRadius: '50%', opacity: 0.08, zIndex: 0 }} />
        <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12, fontSize: '2rem', color: '#2d72d9', fontWeight: 700, letterSpacing: 0.5, zIndex: 1 }}>
          <img src={assets.addIconColored} alt="Add Car" style={{ height: 40 }} /> Add New Car
        </h2>
        <form onSubmit={handleSubmit} style={{ zIndex: 1, position: 'relative' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: 220, maxHeight: 140, borderRadius: 10, marginBottom: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Car Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. BMW" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Model</label>
            <input type="text" name="model" value={form.model} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. X5" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Year</label>
            <input type="number" name="year" value={form.year} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. 2022" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Price per Day ($)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. 200" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>City</label>
            <select name="city" value={form.city} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }}>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Category</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. SUV" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Seating Capacity</label>
            <input type="number" name="seating_capacity" value={form.seating_capacity} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. 4" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Fuel Type</label>
            <input type="text" name="fuel_type" value={form.fuel_type} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. Hybrid" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Transmission</label>
            <input type="text" name="transmission" value={form.transmission} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="e.g. Automatic" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} placeholder="Car description..." />
          </div>
          {/* Features Included */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 600, marginBottom: 8, display: 'block', color: '#2d72d9', fontSize: 17 }}>Features Included</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
              {featureOptions.map((feature) => (
                <label key={feature} style={{ display: 'flex', alignItems: 'center', gap: 4, background: features.includes(feature) ? 'linear-gradient(90deg, #2d72d9 0%, #6fc3ff 100%)' : '#f5f7fa', color: features.includes(feature) ? '#fff' : '#2d72d9', borderRadius: 16, padding: '6px 16px', cursor: 'pointer', border: features.includes(feature) ? '2px solid #2d72d9' : '1px solid #e3eaf6', fontSize: 15, fontWeight: 500, boxShadow: features.includes(feature) ? '0 2px 8px rgba(45,114,217,0.10)' : 'none', transition: 'all 0.2s', minWidth: 120, justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    value={feature}
                    checked={features.includes(feature)}
                    onChange={handleFeatureChange}
                    style={{ accentColor: '#2d72d9', marginRight: 6, width: 18, height: 18 }}
                  />
                  {feature}
                </label>
              ))}
            </div>
            {/* Show selected features as chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {features.map((f) => (
                <span key={f} style={{ background: 'linear-gradient(90deg, #2d72d9 0%, #6fc3ff 100%)', color: '#fff', borderRadius: 12, padding: '4px 14px', fontSize: 14, fontWeight: 500, boxShadow: '0 2px 8px rgba(45,114,217,0.10)' }}>{f}</span>
              ))}
            </div>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
          <button type="submit" style={{ background: 'linear-gradient(90deg, #2d72d9 0%, #6fc3ff 100%)', color: '#fff', padding: '0.75rem 2rem', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(45,114,217,0.10)', fontSize: '1.1rem', transition: 'background 0.2s, transform 0.2s', marginTop: 8 }}>
            Add Car
          </button>
        </form>
        <style>{`
          input[type="text"], input[type="number"], select, textarea {
            border: 1.5px solid #eaf1fb !important;
            border-radius: 8px !important;
            font-size: 16px !important;
            transition: border 0.2s;
          }
          input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus {
            border: 1.5px solid #2d72d9 !important;
            outline: none !important;
          }
          button[type="submit"] {
            background: linear-gradient(90deg, #2d72d9 0%, #6fc3ff 100%) !important;
            color: #fff !important;
            font-weight: bold !important;
            border: none !important;
            border-radius: 6px !important;
            box-shadow: 0 2px 8px rgba(45,114,217,0.10);
            font-size: 1.1rem;
            padding: 0.8rem 2.2rem;
            margin-top: 8px;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          button[type="submit"]:hover {
            background: linear-gradient(90deg, #6fc3ff 0%, #2d72d9 100%) !important;
            transform: translateY(-2px) scale(1.03);
          }
        `}</style>
      </div>
    </div>
  )
}

export default AddCar