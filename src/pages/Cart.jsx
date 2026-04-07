import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { orderService, paymentService } from '../api/axiosClient';
import { Trash2, ShoppingBag, CreditCard, CheckCircle2, ChevronLeft, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error('Giỏ hàng trống!');
    
    setIsProcessing(true);
    try {
      // 1. Tạo đơn hàng qua Order Service
      // const orderPayload = { items: cart, total: cartTotal, paymentMethod };
      // const orderRes = await orderService.post('/orders', orderPayload);
      
      // 2. Xử lý thanh toán qua Payment Service
      // if (paymentMethod === 'BANKING') {
      //   await paymentService.post('/pay', { orderId: orderRes.data.id, amount: cartTotal });
      // }
      
      // Giả lập delay mạng
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Đặt hàng thành công!');
      clearCart();
      setOrderComplete(true);
      
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center animate-in zoom-in duration-500">
           <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h2>
           <p className="text-gray-500 mb-8 max-w-md mx-auto">
             Cảm ơn bạn đã đặt món. Đơn hàng của bạn đang được chuẩn bị và sẽ sớm được giao tới.
           </p>
           <Link to="/" className="btn-primary inline-flex items-center gap-2">
             <ChevronLeft className="h-5 w-5" />
             Về Trang Chủ
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
        <ShoppingBag className="text-brand-500" />
        Giỏ Hàng Của Bạn
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg mb-6">Giỏ hàng của bạn đang trống.</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            Quay lại chọn món
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <div className="text-brand-600 font-semibold mt-1">{formatPrice(item.price)}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 text-gray-500 hover:text-brand-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 text-gray-500 hover:text-brand-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tổng Đơn Hàng</h2>
              
              <div className="flex justify-between mb-4 text-gray-600 font-medium">
                <span>Tạm tính ({cart.length} món)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600 font-medium">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(15000)}</span>
              </div>
              
              <div className="h-px bg-gray-100 my-4"></div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                <span className="text-2xl font-black text-brand-600">{formatPrice(cartTotal + 15000)}</span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phương thức thanh toán</label>
                <div className="space-y-3">
                  <div 
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300'}`}
                  >
                    <input type="radio" readOnly checked={paymentMethod === 'COD'} className="text-brand-600 w-4 h-4" />
                    <span className="font-medium text-gray-800">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod('BANKING')}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'BANKING' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300'}`}
                  >
                    <input type="radio" readOnly checked={paymentMethod === 'BANKING'} className="text-brand-600 w-4 h-4" />
                    <div className="flex items-center gap-2">
                       <CreditCard className="h-5 w-5 text-gray-500" />
                       <span className="font-medium text-gray-800">Chuyển khoản Ngân hàng</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isProcessing ? 'Đang xử lý thanh toán...' : 'Tiến hành Đặt hàng'}
              </button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Cart;
