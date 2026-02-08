import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Premium Rice', price: 600, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Maize Flour', price: 300, img: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Refined Sugar', price: 500, img: 'https://images.unsplash.com/photo-1581447100595-3a74a5af060f?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Cooking Oil', price: 500, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80' },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart automatically when adding item
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-100">
      
      {/* CART SIDEBAR OVERLAY */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-blue-900">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-orange-500 text-2xl">&times;</button>
            </div>

            <div className="flex-grow overflow-y-auto py-4">
              {cart.length === 0 ? (
                <p className="text-center text-slate-500 mt-10">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between mb-4 bg-blue-50/50 p-3 rounded-xl">
                    <div className="flex items-center gap-4">
                      <img src={item.img} className="w-16 h-16 object-cover rounded-lg" alt="" />
                      <div>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-500">{item.quantity} x {item.price} Ksh</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">Remove</button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-blue-700">{cartTotal} Ksh</span>
              </div>
              <button 
                onClick={() => alert("Checkout Feature Coming Soon!")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER / NAV */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight cursor-pointer" onClick={() => scrollTo('home')}>
            CAPITAL<span className="text-orange-500">STORE</span>
          </h1>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider">
              <button onClick={() => scrollTo('home')} className="hover:text-orange-500 transition-colors">Home</button>
              <button onClick={() => scrollTo('products')} className="hover:text-orange-500 transition-colors">Products</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-orange-500 transition-colors">Contact</button>
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
            >
              🛒 <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* LANDING SECTION */}
      <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6">
            Quality Essentials <br />
            <span className="text-orange-500 underline decoration-blue-200">Delivered to You.</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Freshly sourced Rice, Maize Flour, Sugar, and Cooking Oil. Simplified shopping for your daily needs.
          </p>
          <button 
            onClick={() => scrollTo('products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-blue-900">Our Essentials</h3>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div key={item.id} className="group bg-white border border-blue-50 rounded-2xl p-4 hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-slate-100 rounded-xl mb-4 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">{item.name}</h4>
              <p className="text-blue-600 font-bold mb-4">{item.price} Ksh</p>
              <button 
                onClick={() => addToCart(item)}
                className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-blue-900 text-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"></textarea>
            <button className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-lg font-bold transition-colors">Send Message</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t border-blue-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-bold text-blue-900 mb-4 tracking-widest uppercase">Capital Store</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Facebook</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Capital Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;