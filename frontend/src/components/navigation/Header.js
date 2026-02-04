'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { removeToken } from '@/lib/auth';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

const Header = ({ title = '대시보드' }) => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    toast.success('로그아웃되었습니다.');
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">관리자</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>로그아웃</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
