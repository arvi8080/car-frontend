import React, { Suspense, useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { dummyCarData } from "../assets/assets";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import BookingForm from "../components/BookingForm";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function CarModel({ scrollY }) {
  const { scene } = useGLTF("/models/car.glb");
  const ref = useRef();

  useEffect(() => {
    if (scene && ref.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 3.2 / maxDim : 1;
      const center = box.getCenter(new THREE.Vector3());
      ref.current.scale.set(scale, scale, scale);
      ref.current.position.set(-center.x, -center.y, -center.z);
    }
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.002;
    }
  });

  return (
    <primitive ref={ref} object={scene} />
  );
}

function Car3DViewer() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[480px] bg-light rounded-xl overflow-hidden shadow-lg relative">
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={<Html center>Loading 3D Car...</Html>}>
          <CarModel scrollY={scrollY} />
          <Environment preset="sunset" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.4} scale={10} blur={2.5} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setShowLogin } = useAppContext();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find car by ID from dummy data (in real app, fetch from API)
    const foundCar = dummyCarData.find(c => c._id === id);
    if (foundCar) {
      setCar(foundCar);
    } else {
      toast.error("Car not found");
      navigate("/cars");
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Car not found</div>
      </div>
    );
  }

  const currency = import.meta.env.VITE_CURRENCY || "$";

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title title={`${car.brand} ${car.model}`} subTitle="Book your perfect ride" align="left" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Image/3D Viewer */}
          <div className="space-y-4">
            <Car3DViewer />
            <div className="grid grid-cols-2 gap-4">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-32 object-cover rounded-lg" />
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-32 object-cover rounded-lg" />
            </div>
          </div>

          {/* Car Details and Booking */}
          <div className="space-y-6">
            {/* Car Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                  <p className="text-gray-600">{car.year} · {car.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{currency}{car.pricePerDay}</div>
                  <div className="text-sm text-gray-500">per day</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <img src={assets.users_icon} alt="seats" className="w-5 h-5" />
                  <span>{car.seating_capacity} Seats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={assets.fuel_icon} alt="fuel" className="w-5 h-5" />
                  <span>{car.fuel_type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={assets.car_icon} alt="transmission" className="w-5 h-5" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={assets.location_icon} alt="location" className="w-5 h-5" />
                  <span>{car.location}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{car.description}</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg" id="booking-form">
              <h3 className="text-xl font-bold mb-4">Book This Car</h3>
              {user ? (
                <BookingForm car={car} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Please login to book this car</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Login to Book
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
