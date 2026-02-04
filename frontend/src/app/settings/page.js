'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    alertEmail: '',
    retentionDays: 30,
    maxLogSize: 1000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('설정이 저장되었습니다.');
  };

  return (
    <DashboardLayout title="설정">
      <div className="max-w-3xl">
        <Card title="시스템 설정">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="알림 이메일"
              name="alertEmail"
              type="email"
              value={settings.alertEmail}
              onChange={handleChange}
              placeholder="admin@example.com"
            />

            <Input
              label="로그 보관 기간 (일)"
              name="retentionDays"
              type="number"
              value={settings.retentionDays}
              onChange={handleChange}
              placeholder="30"
            />

            <Input
              label="최대 로그 크기 (개)"
              name="maxLogSize"
              type="number"
              value={settings.maxLogSize}
              onChange={handleChange}
              placeholder="1000"
            />

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                저장
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
