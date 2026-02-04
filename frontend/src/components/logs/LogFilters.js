'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Search, RotateCcw } from 'lucide-react';

const LogFilters = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    source_ip: '',
    destination_ip: '',
    destination_port: '',
    action: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      source_ip: '',
      destination_ip: '',
      destination_port: '',
      action: '',
      start_date: '',
      end_date: '',
    });
    onReset();
  };

  return (
    <Card title="필터">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="소스 IP"
            name="source_ip"
            value={filters.source_ip}
            onChange={handleChange}
            placeholder="예: 192.168.1.1"
          />
          <Input
            label="목적지 IP"
            name="destination_ip"
            value={filters.destination_ip}
            onChange={handleChange}
            placeholder="예: 10.0.0.1"
          />
          <Input
            label="포트"
            name="destination_port"
            type="number"
            value={filters.destination_port}
            onChange={handleChange}
            placeholder="예: 80"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              액션
            </label>
            <select
              name="action"
              value={filters.action}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체</option>
              <option value="allow">허용</option>
              <option value="block">차단</option>
              <option value="drop">드롭</option>
            </select>
          </div>
          <Input
            label="시작 날짜"
            name="start_date"
            type="date"
            value={filters.start_date}
            onChange={handleChange}
          />
          <Input
            label="종료 날짜"
            name="end_date"
            type="date"
            value={filters.end_date}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>검색</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LogFilters;
