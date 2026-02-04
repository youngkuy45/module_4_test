'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, BarChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    name: '대시보드',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: '로그',
    path: '/logs',
    icon: FileText,
  },
  {
    name: '분석',
    path: '/analytics',
    icon: BarChart,
  },
  {
    name: '설정',
    path: '/settings',
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold">방화벽 모니터링</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition',
                isActive && 'bg-gray-800 text-white border-l-4 border-blue-500'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
