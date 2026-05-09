/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Phone, MapPin, CreditCard, ChevronRight, Clock, Star } from 'lucide-react';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-lg group-hover:scale-110 transition-transform">e</div>
            <span className="text-xl md:text-2xl font-serif tracking-widest text-gray-900 hover:text-pink-500 transition-colors uppercase font-medium">
              nailsbyerinlee
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center font-sans tracking-widest text-[11px] uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all duration-300 relative group py-2 ${location.pathname === link.path ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-pink-500 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            <a
              href="https://www.fresha.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white px-8 py-2.5 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-900 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 w-full h-screen bg-pink-50 z-[100] flex flex-col items-center justify-center space-y-8"
            >
              <button className="absolute top-6 right-6 text-gray-900" onClick={() => setIsOpen(false)}>
                <X size={32} />
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-serif ${location.pathname === link.path ? 'text-pink-500 italic' : 'text-gray-900'}`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://www.fresha.com"
                className="mt-4 bg-pink-500 text-white px-12 py-4 rounded-full text-xl font-serif shadow-xl"
              >
                Book Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Action Button for Mobile */}
      <motion.a
        href="https://www.fresha.com"
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform md:hidden"
      >
        <Star size={24} className="fill-current" />
      </motion.a>
    </>
  );
};

const Footer = () => (
  <footer className="bg-white text-gray-900 py-24 px-6 border-t border-pink-100 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-serif italic text-2xl shadow-lg">e</div>
          <h3 className="text-3xl font-serif tracking-widest uppercase font-medium">nailsbyerinlee</h3>
        </div>
        <p className="text-gray-500 text-base leading-relaxed max-w-sm">
          A premium, self-taught nail art studio in Brackenfell. Dedicated to exquisite detail, feminine elegance, and a luxury experience for every client.
        </p>
        <div className="flex space-x-6">
          <a href="https://instagram.com/nailsbyerinlee" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all"><Instagram size={20} /></a>
          <a href="https://wa.me/27768888380" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all"><Phone size={20} /></a>
        </div>
      </div>
      <div>
        <h4 className="font-serif text-xl mb-8 font-medium">Explore</h4>
        <div className="flex flex-col space-y-4">
          <Link to="/services" className="text-gray-500 hover:text-pink-500 transition-colors text-sm uppercase tracking-widest font-medium">Services</Link>
          <Link to="/gallery" className="text-gray-500 hover:text-pink-500 transition-colors text-sm uppercase tracking-widest font-medium">Gallery</Link>
          <Link to="/booking" className="text-gray-500 hover:text-pink-500 transition-colors text-sm uppercase tracking-widest font-medium">Policies</Link>
          <Link to="/contact" className="text-gray-500 hover:text-pink-500 transition-colors text-sm uppercase tracking-widest font-medium">Contact</Link>
        </div>
      </div>
      <div>
        <h4 className="font-serif text-xl mb-8 font-medium">Find Us</h4>
        <div className="space-y-6 text-gray-500 text-sm">
          <p className="flex items-start gap-4 leading-relaxed">
            <MapPin size={20} className="text-pink-500 shrink-0" />
            Brackenfell, Cape Town <br /> South Africa
          </p>
          <p className="flex items-center gap-4">
            <Phone size={20} className="text-pink-500 shrink-0" />
            076 888 8380
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-pink-100 text-center text-gray-400 text-[10px] tracking-[0.4em] uppercase font-bold">
      © {new Date().getFullYear()} nailsbyerinlee. Crafted with precision.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* This is the fixed clean background replacing the broken image */}
          <div className="absolute inset-0 bg-pink-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/50 to-white/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-full mx-auto flex items-center justify-center border border-white/40 shadow-[0_20px_50px_rgba(255,77,148,0.3)] p-4">
              <div className="w-full h-full bg-pink-500 rounded-full flex items-center justify-center text-white font-serif italic text-5xl shadow-inner animate-pulse">e</div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-serif text-gray-900 mb-8 italic drop-shadow-sm leading-tight"
          >
            Refined <br /> <span className="text-pink-500 mt-2 block">Artistry.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="text-gray-600 text-xs md:text-base tracking-[0.6em] uppercase font-bold max-w-2xl mx-auto">
              Self-Taught Boutique Nail Studio | Brackenfell
            </p>
            <a
              href="https://www.fresha.com"
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-14 py-6 rounded-full font-serif text-xl md:text-2xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 scale-100 hover:scale-105 active:scale-95 shadow-xl"
            >
              Book Your Appointment
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-pink-400">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Discover</span>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[2px] h-12 bg-gradient-to-b from-pink-400 to-transparent"
          ></motion.div>
        </div>
      </section>

      {/* Featured Artwork/Quick Stats */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -right-20 top-0 w-96 h-96 bg-pink-50 rounded-full blur-[100px] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
           <h2 className="text-4xl md:text-5xl font-serif text-gray-900">A Studio Built on Passion.</h2>
           <div className="flex flex-wrap justify-center gap-16 md:gap-32">
             <div className="space-y-2">
               <span className="text-4xl font-serif text-pink-500">100%</span>
               <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Self-Taught Artistry</p>
             </div>
             <div className="space-y-2">
               <span className="text-4xl font-serif text-pink-500">5★</span>
               <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Client Satisfaction</p>
             </div>
             <div className="space-y-2">
               <span className="text-4xl font-serif text-pink-500">Art</span>
               <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Custom Set Specialist</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => {
  const categories = [
    {
      title: "Nail Services",
      items: [
        { name: "Gel Overlay (Natural Nails)", price: "R220", desc: "Classic strengthening overlay" },
        { name: "Gel Overlay (Toes)", price: "R170", desc: "Perfectly polished toes" },
        { name: "Gel Overlay Combo", price: "R370", desc: "Hands and toes bundle" },
        { name: "Gel Extensions (Plain Colour)", price: "R260", desc: "Added length with your choice of color" },
        { name: "Gel Extensions (Basic Art)", price: "R320", desc: "French, simple patterns, or one art per nail" },
        { name: "Gel Extensions (Complex Art)", price: "R380", desc: "Aura, 3D art, chrome, and detailed patterns" },
      ]
    },
    {
      title: "Nail Art Add-ons",
      items: [
        { name: "French", price: "R60", desc: "Classic, double, or V-cut" },
        { name: "Chrome", price: "R70", desc: "Metallic, glazed, or holographic finish" },
        { name: "Rhinestones / Pearls", price: "R5 P/N", desc: "Carefully placed luxury accents" },
        { name: "Charms", price: "R10", desc: "Bow, heart, or trendy accents" },
        { name: "Free-hand Art", price: "R10-30", desc: "Unique hand-painted designs" },
        { name: "Airbrush / Ombre", price: "R60-70", desc: "Seamless gradients and effects" },
      ]
    },
    {
      title: "Soak Offs & Care",
      items: [
        { name: "Soak Off Gel Overlay", price: "R70", desc: "Professional, safe removal" },
        { name: "Soak Off Toes", price: "R40", desc: "Clean and gentle removal" },
        { name: "Soak Off Gel Extensions", price: "R90", desc: "Full length set removal" },
        { name: "Soak Off (Not My Work)", price: "R100", desc: "Removal of foreign sets" },
        { name: "Nail Fix", price: "R25", desc: "Single nail restoration" },
      ]
    }
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-pink-500 uppercase tracking-[0.5em] text-xs font-bold">The Collection</span>
        <h1 className="text-6xl md:text-8xl font-serif text-gray-900 mb-4">Pricelist</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Each set is crafted with time and precision. Pricing may vary based on complexity of request.
        </p>
      </div>

      <div className="space-y-32">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-10 top-0 text-[120px] font-serif text-pink-50 -z-10 select-none">0{idx + 1}</div>
            <h2 className="text-4xl font-serif mb-16 inline-block border-b-2 border-pink-500 pb-4 italic text-gray-900">{cat.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
              {cat.items.map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-50 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl text-gray-900">{item.name}</h3>
                    <span className="text-xl font-serif text-pink-500">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm italic pr-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative bg-white border border-pink-200 p-16 rounded-[60px] text-center space-y-10 shadow-2xl">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Instagram size={40} className="text-pink-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900">Require something custom?</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Follow our Instagram for inspiration and send us a direct message for a custom quote on detailed sets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <a href="https://www.fresha.com" className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-12 py-5 rounded-full font-serif text-xl shadow-xl hover:scale-105 transition-transform">Book Now</a>
            <Link to="/gallery" className="bg-gray-50 text-gray-900 px-12 py-5 rounded-full font-serif text-xl border border-pink-100 hover:bg-pink-50 transition-all">View Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const images = [
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632345031435-07dec7768c34?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604654894611-6973b376cbfe?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600007346083-d737d9765851?q=80&w=2670&auto=format&fit=crop",
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-pink-500 uppercase tracking-[0.5em] text-xs font-bold">The Canvas</span>
        <h1 className="text-6xl md:text-8xl font-serif text-gray-900">Portfolio</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest">Hand-painted designs & sculpted extensions</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[40px] shadow-lg border border-white will-change-transform"
          >
            <img
              src={src}
              alt={`Erin-Lee Art ${idx + 1}`}
              className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-pink-500/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-white p-6 cursor-pointer">
              <Instagram size={40} className="mb-4 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
              <span className="text-sm font-serif italic tracking-widest">View on Instagram</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-32">
        <a 
          href="https://instagram.com/nailsbyerinlee" 
          target="_blank" 
          rel="noreferrer"
          className="text-2xl font-serif text-gray-900 hover:text-pink-500 transition-all border-b-2 border-pink-200 hover:border-pink-500 pb-2 px-4 shadow-sm inline-block"
        >
          @nailsbyerinlee
        </a>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const policies = [
    { 
      title: "Deposit", 
      price: "R100",
      content: "All appointments require a R100 non-refundable deposit to secure your slot. This must be paid within 48 hours of making your booking. This is deducted from your final total.", 
      icon: <CreditCard size={28} className="text-pink-500" /> 
    },
    { 
      title: "Cancellations", 
      price: "24-48h",
      content: "Cancellations must be made at least 24 hours before your appointment. Failure to do so results in forfeiting your deposit and remaining 50% of your service fee.", 
      icon: <Clock size={28} className="text-pink-500" /> 
    },
    { 
      title: "Rescheduling", 
      price: "R100 Fee",
      content: "Rescheduling must happen 48 hours in advance. If failed, a R100 fee applies and must be paid before booking your next appointment.", 
      icon: <Star size={28} className="text-pink-500" /> 
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-pink-500 uppercase tracking-[0.5em] text-xs font-bold">Etiquette</span>
        <h1 className="text-6xl md:text-8xl font-serif mb-4 text-gray-900">Policies</h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Please review our studio policies carefully to ensure a seamless experience for all clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
        {policies.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-pink-100 py-12 px-8 flex flex-col items-center text-center space-y-6 shadow-md"
          >
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              {p.icon}
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-1 text-gray-900">{p.title}</h3>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-pink-500">{p.price}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{p.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[60px] border-2 border-pink-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-transparent opacity-50 rounded-bl-[100px]"></div>
        <div className="space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif italic text-gray-900">Grace Period</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
            <p className="text-gray-600 text-lg">
              We allow a <strong>10-minute</strong> grace period for late arrivals. After 10 minutes, your appointment will be cancelled to protect subsequent bookings.
            </p>
          </div>

          <div className="bg-pink-50 p-8 rounded-3xl text-sm italic text-gray-600 leading-relaxed text-center">
            "By booking with me, you agree to all my policies highlighted on my page. I look forward to meeting you all! ❤️"
          </div>

          <div className="flex flex-col items-center gap-6">
            <a
              href="https://www.fresha.com"
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-16 py-6 rounded-full font-serif text-2xl shadow-2xl hover:scale-105 transition-all w-full md:w-auto text-center"
            >
              Book Now on Fresha
            </a>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Secure your R100 deposit after booking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-pink-500 uppercase tracking-[0.5em] text-xs font-bold">Direct Line</span>
        <h1 className="text-6xl md:text-8xl font-serif text-gray-900">Contact</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-16">
          <div className="space-y-8">
             <h2 className="text-3xl font-serif italic mb-10 text-gray-900">Visit Our Studio</h2>
             <div className="space-y-8">
               <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all border border-pink-50"><MapPin size={24} /></div>
                 <div>
                   <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">Our Location</h4>
                   <p className="text-xl text-gray-900">Brackenfell, Cape Town</p>
                 </div>
               </div>
               <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all border border-pink-50"><Phone size={24} /></div>
                 <div>
                   <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">WhatsApp / Call</h4>
                   <p className="text-xl text-gray-900">076 888 8380</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl font-serif italic text-gray-900">Payment Methods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm flex flex-col items-center text-center">
                <CreditCard className="text-pink-500 mb-4" size={32} />
                <h4 className="font-serif text-lg mb-2 text-gray-900">Card Facilities</h4>
                <p className="text-xs text-gray-500">Available in-studio for all services</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm flex flex-col items-center text-center">
                <div className="text-pink-500 mb-4 font-serif text-2xl">R</div>
                <h4 className="font-serif text-lg mb-2 text-gray-900">Cash</h4>
                <p className="text-xs text-gray-500">Exact amount appreciated</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-pink-50 shadow-sm flex flex-col items-center text-center col-span-full">
                <div className="text-pink-500 mb-4 font-serif text-2xl tracking-tighter">EFT</div>
                <h4 className="font-serif text-lg mb-2 text-gray-900">Electronic Transfer</h4>
                <p className="text-xs text-gray-500">Must be completed at least 24 hours prior to appointment</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border-2 border-pink-50 relative"
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white animate-bounce shadow-xl">
             <Star className="fill-current" size={32} />
          </div>
          <h2 className="text-4xl font-serif mb-8 text-center italic text-gray-900">Send a Message</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Name</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-pink-300 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Inquiry Type</label>
              <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-pink-300 transition-all outline-none appearance-none">
                <option>Custom Set Quote</option>
                <option>Wedding Inquiry</option>
                <option>General Question</option>
                <option>Rescheduling</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-pink-300 transition-all outline-none resize-none"></textarea>
            </div>
            <button className="w-full py-5 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-serif text-xl shadow-xl hover:shadow-pink-500/30 hover:-translate-y-1 transition-all mt-4">
              Send Message
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => window.scrollTo(0, 0), [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fafafa]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}