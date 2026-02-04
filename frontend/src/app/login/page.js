'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authAPI } from '@/lib/api';
import { setToken } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 테스트 계정으로 로그인 시도 (백엔드 없이도 작동)
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // 더미 토큰 생성
        const dummyToken = 'demo-token-' + Date.now();
        setToken(dummyToken);
        toast.success('로그인 성공! (데모 모드)');
        router.push('/');
        return;
      }

      // 실제 API 호출 시도
      const response = await authAPI.login(formData);
      const { token } = response.data;

      setToken(token);
      toast.success('로그인 성공!');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);

      // 백엔드가 없거나 연결 실패 시 테스트 계정이면 통과
      if (formData.username === 'admin' && formData.password === 'admin123') {
        const dummyToken = 'demo-token-' + Date.now();
        setToken(dummyToken);
        toast.success('로그인 성공! (데모 모드)');
        router.push('/');
      } else {
        toast.error(
          error.response?.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            방화벽 로그 모니터링
          </h1>
          <p className="text-gray-600">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="아이디"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="pl-10"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>테스트 계정: admin / admin123</p>
        </div>
      </Card>
    </AuthLayout>
  );
}
