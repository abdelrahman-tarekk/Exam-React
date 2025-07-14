import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/freshcart-logo.svg';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/Cart.context';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, logout } = useContext(UserContext);
  const { cartData } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Toggle menu for mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="flex items-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img className="h-10" src={logo} alt="logo" />
            </Link>
          </div>

          {userLogin && (
            <ul className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-700">
              <li><Link to="/" className={`px-3 py-2 rounded-md transition-all ${isActive('/') ? 'text-green-500' : 'hover:text-green-500'}`}>Home</Link></li>
              <li><Link to="/products" className={`px-3 py-2 rounded-md transition-all ${isActive('/products') ? 'text-green-500' : 'hover:text-green-500'}`}>Products</Link></li>
              <li><Link to="/categories" className={`px-3 py-2 rounded-md transition-all ${isActive('/categories') ? 'text-green-500' : 'hover:text-green-500'}`}>Categories</Link></li>
              <li><Link to="/brands" className={`px-3 py-2 rounded-md transition-all ${isActive('/brands') ? 'text-green-500' : 'hover:text-green-500'}`}>Brands</Link></li>
              <li><Link to="/allorders" className={`px-3 py-2 rounded-md transition-all ${isActive('/allorders') ? 'text-green-500' : 'hover:text-green-500'}`}>Orders</Link></li>
              <li><Link to="/wishlist" className={`px-3 py-2 rounded-md transition-all ${isActive('/wishlist') ? 'text-green-500' : 'hover:text-green-500'}`}>WishList</Link></li>
            </ul>
          )}

          <div className="flex items-center gap-4">
            {!userLogin ? (
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <Link to="/login" className="px-3 py-2 text-sm hover:text-green-500 transition-all">Log In</Link>
                <Link to="/register" className="px-3 py-2 text-sm hover:text-green-500 transition-all">Register</Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link to="/cart" className="relative text-gray-600 hover:text-green-500 transition-colors">
                  <FaShoppingCart className="text-2xl" />
                  {cartData?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartData.numOfCartItems}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-500 transition-all"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {userLogin && mobileMenuOpen && (
          <ul className="md:hidden flex flex-col gap-3 bg-gray-100 p-4 border-t border-gray-300">
            <li>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/products') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/categories') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/brands') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                to="/allorders"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/allorders') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${isActive('/wishlist') ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                WishList
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
