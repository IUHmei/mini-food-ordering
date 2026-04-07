import React, { useContext } from 'react';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const FoodCard = ({ food, onEdit, onDelete }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    addToCart(food);
    toast.success(`Đã thêm ${food.name} vào giỏ`, {
      icon: '🛒',
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
  };

  const isAdmin = user?.role === 'ADMIN';
  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(food.price);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-floating border border-gray-100 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
      <div className="relative overflow-hidden w-full h-52 bg-gray-100">
        <img
          src={food.image || `https://source.unsplash.com/800x600/?food,${encodeURIComponent(food.name)}`}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9590a1a704?auto=format&fit=crop&q=80&w=800&h=600';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 shadow-sm border border-white/20">
          {formattedPrice}
        </div>

        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => onEdit(food)}
              className="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-brand-600 rounded-full shadow-md hover:scale-110 transition-all"
              title="Sửa"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(food.id)}
              className="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-red-500 rounded-full shadow-md hover:scale-110 transition-all"
              title="Xóa"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow bg-white relative">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-brand-600 transition-colors">
          {food.name}
        </h3>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {food.description || "Món ăn ngon miệng, hấp dẫn, chuẩn vị ẩm thực."}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 px-4 bg-gray-50 hover:bg-brand-500 text-gray-900 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30 group/btn"
        >
          <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
