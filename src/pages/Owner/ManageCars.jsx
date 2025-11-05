import React, { useState } from 'react'
import { dummyCarData, assets } from '../../assets/assets';
import CarCard from '../../components/CarCard';

// Optionally, map type to icon (add more as needed)
const typeIcons = {
  suv: assets.carIconColored,
  sedan: assets.carIcon,
  hatchback: assets.carIconColored,
  coupe: assets.carIcon,
  convertible: assets.carIconColored,
  truck: assets.carIcon,
  van: assets.carIconColored,
  // ...add more if you have icons
};

// Define all possible types (add more as needed)
const allPossibleTypes = [
  'suv', 'sedan', 'hatchback', 'coupe', 'convertible', 'truck', 'van'
  // ...add more if needed
];

const typeLabels = type => type ? type.charAt(0).toUpperCase() + type.slice(1) : '';

const ManageCars = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('default');
  const [cars, setCars] = useState(dummyCarData);
  const [modal, setModal] = useState(null); // { type: 'edit'|'delete', car }
  const [editForm, setEditForm] = useState(null); // { ...car }

  // Get unique car types from data
  const carTypes = Array.from(new Set(cars.map(car => car.type))).filter(Boolean);

  // Filtering and sorting
  let filteredCars = cars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === 'all' || car.type === type;
    return matchesSearch && matchesType;
  });

  if (sort === 'price-asc') filteredCars.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filteredCars.sort((a, b) => b.price - a.price);
  if (sort === 'year-desc') filteredCars.sort((a, b) => b.year - a.year);
  if (sort === 'year-asc') filteredCars.sort((a, b) => a.year - b.year);

  // Handlers
  const handleEdit = (car) => {
    setEditForm({ ...car });
    setModal({ type: 'edit', car });
  };
  const handleDelete = (car) => setModal({ type: 'delete', car });
  const closeModal = () => { setModal(null); setEditForm(null); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCars(cars.map(c => c._id === editForm._id ? { ...c, ...editForm, price: Number(editForm.price), year: Number(editForm.year) } : c));
    closeModal();
  };
  const confirmDelete = () => {
    setCars(cars.filter(c => c._id !== modal.car._id));
    closeModal();
  };

  return (
    <div style={{ flex: 1, height: 'calc(100vh - 64px)', overflowY: 'auto', background: '#f9fbfd' }}>
      <div style={{ maxWidth: 1400, margin: '2.5rem auto', padding: '3rem', background: '#fff', borderRadius: 18, boxShadow: '0 6px 24px rgba(45,114,217,0.10)' }}>
        <h2 style={{ marginBottom: '2.5rem', color: '#2d72d9', textAlign: 'center', fontWeight: 800, fontSize: '2.6rem', letterSpacing: 1 }}>Manage Cars</h2>
        {/* Enhanced Type Selector */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 28, overflowX: 'auto', paddingBottom: 10 }}>
          <button
            onClick={() => setType('all')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: type === 'all' ? '#2d72d9' : '#eaf1fb',
              color: type === 'all' ? '#fff' : '#2d72d9',
              border: 'none', borderRadius: 28, padding: '14px 38px', fontWeight: 700, fontSize: 18, cursor: 'pointer',
              boxShadow: type === 'all' ? '0 2px 8px rgba(45,114,217,0.10)' : 'none',
              transition: 'background 0.2s, color 0.2s',
              minWidth: 120
            }}
          >
            <span>All Types</span>
          </button>
          {allPossibleTypes.map(t => {
            const available = carTypes.includes(t);
            return (
              <button
                key={t}
                onClick={() => available && setType(t)}
                disabled={!available}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: type === t ? '#2d72d9' : '#eaf1fb',
                  color: !available ? '#bbb' : (type === t ? '#fff' : '#2d72d9'),
                  border: 'none', borderRadius: 28, padding: '14px 38px', fontWeight: 700, fontSize: 18, cursor: available ? 'pointer' : 'not-allowed',
                  boxShadow: type === t && available ? '0 2px 8px rgba(45,114,217,0.10)' : 'none',
                  opacity: available ? 1 : 0.5,
                  transition: 'background 0.2s, color 0.2s',
                  minWidth: 120,
                  position: 'relative'
                }}
              >
                {typeIcons[t] && <img src={typeIcons[t]} alt={t} style={{ width: 30, height: 30, opacity: available ? 0.85 : 0.4 }} />}
                <span>{typeLabels(t)}</span>
                {!available && <span style={{ position: 'absolute', bottom: 4, right: 10, fontSize: 11, color: '#e74c3c', fontWeight: 600 }}>Unavailable</span>}
              </button>
            );
          })}
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by brand or model..."
            style={{ padding: '1.1rem 1.8rem', borderRadius: 12, border: '2px solid #eaf1fb', fontSize: 20, minWidth: 300 }}
          />
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '1.1rem 1.8rem', borderRadius: 12, border: '2px solid #eaf1fb', fontSize: 20 }}>
            <option value="all">All Types</option>
            {carTypes.map(t => <option key={t} value={t}>{typeLabels(t)}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '1.1rem 1.8rem', borderRadius: 12, border: '2px solid #eaf1fb', fontSize: 20 }}>
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest</option>
            <option value="year-asc">Year: Oldest</option>
          </select>
        </div>
        {/* Car grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))', gap: '2.5rem' }}>
          {filteredCars.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#aaa', fontSize: 26, padding: '4rem 0' }}>No cars found.</div>
          ) : filteredCars.map((car, idx) => (
            <div key={car._id} style={{ animation: 'fadeInUp 0.5s', animationDelay: `${idx * 0.07}s`, animationFillMode: 'backwards', position: 'relative' }}>
              <CarCard car={car} />
              {/* Action buttons */}
              <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 14 }}>
                <button onClick={() => handleEdit(car)} style={{ background: '#eaf1fb', color: '#2d72d9', border: 'none', borderRadius: 8, padding: '8px 22px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(car)} style={{ background: '#fdeaea', color: '#e74c3c', border: 'none', borderRadius: 8, padding: '8px 22px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {/* Edit Modal */}
        {modal?.type === 'edit' && editForm && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(45,114,217,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <form onSubmit={handleEditSubmit} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(45,114,217,0.15)', padding: '3rem 2.5rem', minWidth: 400, textAlign: 'center', animation: 'modalPop .5s cubic-bezier(.4,2,.6,1)' }}>
              <h3 style={{ color: '#2d72d9', marginBottom: 22, fontSize: 24 }}>Edit Car</h3>
              <input name="brand" value={editForm.brand} onChange={handleEditChange} placeholder="Brand" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '2px solid #eaf1fb', fontSize: 18 }} required />
              <input name="model" value={editForm.model} onChange={handleEditChange} placeholder="Model" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '2px solid #eaf1fb', fontSize: 18 }} required />
              <input name="year" type="number" value={editForm.year} onChange={handleEditChange} placeholder="Year" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '2px solid #eaf1fb', fontSize: 18 }} required />
              <input name="price" type="number" value={editForm.price} onChange={handleEditChange} placeholder="Price" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '2px solid #eaf1fb', fontSize: 18 }} required />
              <input name="type" value={editForm.type} onChange={handleEditChange} placeholder="Type" style={{ width: '100%', marginBottom: 24, padding: 12, borderRadius: 8, border: '2px solid #eaf1fb', fontSize: 18 }} required />
              <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 16 }}>
                <button type="button" onClick={closeModal} style={{ background: '#eaf1fb', color: '#2d72d9', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#2d72d9', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        )}
        {/* Delete Modal */}
        {modal?.type === 'delete' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(45,114,217,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(45,114,217,0.15)', padding: '3rem 2.5rem', minWidth: 400, textAlign: 'center', animation: 'modalPop .5s cubic-bezier(.4,2,.6,1)' }}>
              <h3 style={{ color: '#e74c3c', marginBottom: 22, fontSize: 24 }}>Delete Car?</h3>
              <p style={{ color: '#444', marginBottom: 32, fontSize: 18 }}>Are you sure you want to delete <b>{modal.car.brand} {modal.car.model}</b>?</p>
              <div style={{ display: 'flex', gap: 18, justifyContent: 'center' }}>
                <button onClick={closeModal} style={{ background: '#eaf1fb', color: '#2d72d9', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>No</button>
                <button onClick={confirmDelete} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes modalPop { 0% { transform: scale(0.8); opacity: 0;} 100% { transform: scale(1); opacity: 1;} }
        `}</style>
      </div>
    </div>
  )
}

export default ManageCars