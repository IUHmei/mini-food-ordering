import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/axiosClient';
import { AuthContext } from '../contexts/AuthContext';
import { Utensils, Lock, Mail, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.submitter?.blur();
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegister) {
        // Tích hợp API đăng ký
        // const res = await authService.post('/register', formData);
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 1500)),
          {
            loading: 'Đang tạo báo khoản...',
            success: 'Đăng ký thành công! Đang đăng nhập...',
            error: 'Đăng ký thất bại.',
          }
        );
        // Mock after successful registration
        login({ id: Date.now(), username: formData.username, role: 'USER' }, 'mock-jwt-token');
        navigate('/');
      } else {
        // Tích hợp API đăng nhập
        // const res = await authService.post('/login', { username: formData.username, password: formData.password });
        
        // Mock Login for Demo (Nếu Admin thì role = ADMIN)
        const mockRole = formData.username.toLowerCase() === 'admin' ? 'ADMIN' : 'USER';
        const mockUser = { id: 1, username: formData.username, role: mockRole };

        toast.success(`Đăng nhập thành công! Xin chào ${formData.username}`);
        login(mockUser, 'mock-jwt-token-12345');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg">
           <Utensils className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isRegister ? 'Tạo tài khoản mới' : 'Đăng nhập vào hệ thống'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="font-medium text-brand-600 hover:text-brand-500 transition-colors"
          >
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên đăng nhập (hoặc Admin)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>
            </div>

            {isRegister && (
               <div>
                 <label className="block text-sm font-medium text-gray-700">Email</label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Mail className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     name="email"
                     type="email"
                     required
                     value={formData.email}
                     onChange={handleInputChange}
                     className="input-field pl-10"
                     placeholder="you@example.com"
                   />
                 </div>
               </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Đang xử lý...' : isRegister ? 'Đăng ký' : 'Đăng nhập'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-400">
             Mẹo: Nhập "admin" vào Tên đăng nhập để test luồng quyền Admin.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
