import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Premium Rice', price: 600, img: 'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-124449389/124449389.jpg' },
  { id: 2, name: 'Maize Flour', price: 300, img: 'https://bestbuyltd.com/wp-content/uploads/2023/12/ajab-maize-flour-2kg-wholesale-nairobi-kenya.jpg' },
  { id: 3, name: 'Refined Sugar', price: 500, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-DqkLT8pb5fPjaaZIrxm3bSYVbdkVUubuQ&s' },
  { id: 4, name: 'Cooking Oil', price: 500, img: 'https://cdn.mafrservices.com/sys-master-root/hbe/h8c/17384320008222/21022_main.jpg?im=Resize=376' },
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
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-100 overflow-x-hidden">
      
      {/* --- CART SIDEBAR --- */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center border-b pb-6">
              <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-tighter">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-orange-500 text-3xl">&times;</button>
            </div>

            <div className="flex-grow overflow-y-auto py-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-5xl block mb-4 text-slate-200">🛒</span>
                  <p className="text-slate-400">Your basket is currently empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between mb-6 group">
                    <div className="flex items-center gap-4">
                      <img src={item.img} className="w-20 h-20 object-cover rounded-xl shadow-sm" alt="" />
                      <div>
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <p className="text-sm text-blue-600 font-semibold">{item.quantity} x {item.price} Ksh</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600">Remove</button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between text-2xl font-black mb-6">
                <span className="text-slate-400">Total</span>
                <span className="text-blue-900">{cartTotal.toLocaleString()} Ksh</span>
              </div>
              <button 
                onClick={() => alert("M-Pesa Checkout Coming Soon!")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-blue-50 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
             <div className="w-8 h-8 bg-blue-700 rounded-lg rotate-12 flex items-center justify-center text-white font-black">C</div>
             <h1 className="text-xl font-black text-blue-900 tracking-tighter uppercase">Capital<span className="text-orange-500">Store</span></h1>
          </div>
          
          <div className="flex items-center space-x-10">
            <div className="hidden md:flex space-x-10 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">
              <button onClick={() => scrollTo('home')} className="hover:text-blue-700 transition-colors">Home</button>
              <button onClick={() => scrollTo('products')} className="hover:text-blue-700 transition-colors">Shop</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-blue-700 transition-colors">Contact</button>
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-all"
            >
              <span className="text-xl">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-4 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (TerraForm Style) --- */}
      <section id="home" className="min-h-screen flex items-center bg-[#faf9f6] pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="relative z-10 animate-fade-in-up">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8">
              Fuel Your Life <br />
              <span className="text-blue-800">with Nature's Best</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
              Certified essential produce, delivered from the source to your door. Taste the difference of Capital quality.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <button 
                onClick={() => scrollTo('products')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-full font-bold shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
              >
                Shop the Harvest
              </button>
              <div className="flex items-center gap-3 text-slate-400">
                 <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center italic font-serif">K</div>
                 <p className="text-xs uppercase font-black tracking-widest leading-tight">ISO Certified & <br/>Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Right Image with Overlapping Shapes */}
          <div className="relative flex justify-center items-center">
            {/* Background Decorative Shapes */}
            <div className="absolute w-[120%] h-[120%] bg-blue-100/40 rounded-full -top-10 -right-20 blur-3xl opacity-50"></div>
            
            <div className="relative w-full aspect-square max-w-[500px]">
               {/* Translucent Overlapping Circles */}
               <div className="absolute top-0 left-0 w-full h-full bg-orange-200/30 rounded-full mix-blend-multiply transform -translate-x-10 translate-y-5"></div>
               <div className="absolute top-0 left-0 w-full h-full bg-blue-200/30 rounded-full mix-blend-multiply transform translate-x-10 -translate-y-5"></div>
               
               {/* Main Image in Circle */}
               <div className="relative w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80" 
                    className="w-full h-full object-cover scale-110" 
                    alt="Healthy Produce" 
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Marketplace</p>
              <h3 className="text-5xl font-black text-blue-900 tracking-tighter">Essential Commodities</h3>
            </div>
            <p className="text-slate-400 max-w-sm text-right font-medium">Providing the backbone of your kitchen with premium sourced grains and oils.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map((item) => (
              <div key={item.id} className="group relative">
                <div className="h-[350px] bg-slate-50 rounded-[2.5rem] mb-6 overflow-hidden relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900 shadow-sm">In Stock</span>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h4>
                  <p className="text-blue-600 font-black text-lg mb-4">{item.price} Ksh</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    Add to Cart <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-5xl font-black mb-6 leading-tight">Connect with <br/>Capital Store.</h3>
              <p className="text-blue-200 text-lg mb-8">Have a wholesale inquiry or a delivery question? Our team is ready to assist you.</p>
              <div className="space-y-4 font-bold text-sm">
                <p>📍 Nairobi, Kenya</p>
                <p>📞 +254 113 362 038</p>
                <p>✉️ hello@capitalstore.co.ke</p>
              </div>
            </div>
            <form className="space-y-4 bg-white/5 p-10 rounded-[2rem] backdrop-blur-md border border-white/10" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" className="w-full p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-blue-200" />
              <textarea placeholder="How can we help?" rows="4" className="w-full p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-blue-200"></textarea>
              <button className="w-full bg-orange-500 hover:bg-orange-600 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-20 border-t border-blue-50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-10 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
             <div className="w-6 h-6 bg-blue-700 rounded-md flex items-center justify-center text-white text-[10px] font-black">C</div>
             <h1 className="text-md font-black text-blue-900 tracking-tighter uppercase">Capital Store</h1>
          </div>
          <div className="flex justify-center space-x-12 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <a href="#" className="hover:text-blue-600">Twitter</a>
            <a href="#" className="hover:text-blue-600">Instagram</a>
            <a href="#" className="hover:text-blue-600">Facebook</a>
          </div>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">© 2026 Capital Store. Made with Quality.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;