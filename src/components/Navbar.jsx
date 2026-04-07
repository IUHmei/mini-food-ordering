import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, User as UserIcon, Utensils, Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100' : 'bg-white/50 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-brand-500 to-brand-400 p-2.5 rounded-xl shadow-brand-500/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-gray-900 tracking-tight">Crave<span className="text-brand-500">Bite</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-brand-600' : 'text-gray-600 hover:text-brand-500'} transition-colors`}>
              Thực đơn
            </Link>
            
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <span className="bg-amber-100/80 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    Admin Menu
                  </span>
                )}
                
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand-600 transition-colors group">
                  <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-500 rounded-full shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="h-8 w-px bg-gray-200"></div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100">
                    <div className="bg-brand-100 p-1.5 rounded-full text-brand-600">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{user.name || user.username}</span>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Đăng xuất"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Đăng Nhập
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
