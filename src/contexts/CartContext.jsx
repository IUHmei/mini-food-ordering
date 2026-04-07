import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === food.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== foodId));
  };

  const updateQuantity = (foodId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === foodId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
