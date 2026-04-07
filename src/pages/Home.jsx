import React, { useState, useEffect, useContext } from 'react';
import { foodService } from '../api/axiosClient';
import FoodCard from '../components/FoodCard';
import { AuthContext } from '../contexts/AuthContext';
import { Loader2, Plus, Sparkles, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await foodService.get('/foods');
      setFoods(response.data);
    } catch (error) {
      setFoods([
        { id: 1, name: 'Phở Bò Thập Cẩm', price: 65000, description: 'Phở bò tái nạm gầu gân chuẩn vị Hà Nội cực hấp dẫn, kèm bánh quẩy nóng.', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80' },
        { id: 2, name: 'Bún Chả Hà Nội', price: 55000, description: 'Thịt nướng than hoa thơm lừng với nước mắm chua ngọt đậm đà, ăn kèm bún rối tươi.', image: 'https://images.unsplash.com/photo-1625467006846-930eb4ea8731?w=800&q=80' },
        { id: 3, name: 'Cơm Tấm Sườn Bì', price: 70000, description: 'Cơm tấm Sài Gòn sườn nướng mỡ hành cực xịn, chả nướng và trứng ốp la.', image: 'https://images.unsplash.com/photo-1625467045763-747124747ebc?w=800&q=80' },
        { id: 4, name: 'Gà Rán Sốt Cay', price: 85000, description: 'Phần gà giòn rụm tẩm sốt cay ngọt Hàn Quốc cực kì mọng nước và đậm vị.', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
        { id: 5, name: 'Bánh Mì Thịt Nướng', price: 30000, description: 'Bánh mì giòn rụm kẹp thịt nướng xiên que thơm phức với ngò và tương ớt.', image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80' },
        { id: 6, name: 'Trà Sữa Trân Châu', price: 45000, description: 'Trà sữa đậm vị trà, trân châu đen dai giòn sựt sựt hoàn hảo cho buổi chiều.', image: 'https://images.unsplash.com/photo-1558852224-1188dc25585b?w=800&q=80' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleEdit = (food) => {
    toast(`Mở form sửa món: ${food.name}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món này?')) {
      try {
        await foodService.delete(`/foods/${id}`);
        setFoods(foods.filter(f => f.id !== id));
        toast.success("Xóa thành công!");
      } catch (error) {
        toast.error("Xóa thất bại!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-4">
        <Loader2 className="h-12 w-12 text-brand-500 animate-spin" />
        <p className="text-gray-500 font-medium">Đang chuẩn bị nhà bếp...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <div className="bg-brand-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
         <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute top-0 left-0 translate-y-12 -translate-x-1/3 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-600 font-semibold text-sm mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>Siêu ưu đãi hôm nay giảm tới 30%</span>
               </div>
               <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                 Hương vị <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-amber-500">tuyệt đỉnh</span><br /> Giao tận tay bạn.
               </h1>
               <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                 Khám phá những món ăn ngon nhất được chuẩn bị từ các đầu bếp hàng đầu. Nhanh chóng, nóng hổi và an toàn.
               </p>
               <button className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2 group">
                  Đặt món ngay
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            
            <div className="flex-1 hidden md:block">
               <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Delicious Food" className="w-full h-[400px] object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" />
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Thực đơn nổi bật</h2>
            <p className="text-gray-500 mt-2 font-medium">Bán chạy nhất tuần qua</p>
          </div>
          
          {user?.role === 'ADMIN' && (
            <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Thêm Món Mới</span>
            </button>
          )}
        </div>

        {foods.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg font-medium">Hiện chưa có món ăn nào trong thực đơn.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food) => (
              <FoodCard 
                key={food.id} 
                food={food} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Home;
