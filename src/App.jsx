import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route 
                  path="/cart" 
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '10px',
              },
              success: {
                style: {
                  background: '#22c55e',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
