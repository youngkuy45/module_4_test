# 방화벽 로그 모니터링 시스템 - 프론트엔드

Next.js 14 + Tailwind CSS + JavaScript로 구축된 방화벽 로그 모니터링 웹 어드민 페이지입니다.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **언어**: JavaScript
- **HTTP 클라이언트**: Axios
- **차트**: Recharts
- **날짜**: date-fns
- **알림**: react-hot-toast
- **아이콘**: lucide-react

## 프로젝트 구조

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   ├── layout.js          # 루트 레이아웃
│   │   ├── page.js            # 대시보드 페이지
│   │   ├── login/             # 로그인 페이지
│   │   ├── logs/              # 로그 목록 및 상세 페이지
│   │   ├── analytics/         # 분석 페이지
│   │   └── settings/          # 설정 페이지
│   │
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Input.js
│   │   │   ├── Badge.js
│   │   │   ├── Loading.js
│   │   │   └── Table.js
│   │   ├── layouts/          # 레이아웃 컴포넌트
│   │   │   ├── AuthLayout.js
│   │   │   └── DashboardLayout.js
│   │   ├── navigation/       # 네비게이션 컴포넌트
│   │   │   ├── Sidebar.js
│   │   │   └── Header.js
│   │   ├── dashboard/        # 대시보드 컴포넌트
│   │   │   ├── StatsCard.js
│   │   │   └── RecentLogs.js
│   │   ├── logs/            # 로그 관련 컴포넌트
│   │   │   ├── LogTable.js
│   │   │   ├── LogFilters.js
│   │   │   └── LogDetail.js
│   │   └── analytics/       # 분석 차트 컴포넌트
│   │       ├── LineChart.js
│   │       ├── PieChart.js
│   │       └── BarChart.js
│   │
│   └── lib/                  # 유틸리티 및 헬퍼
│       ├── api.js           # API 클라이언트
│       ├── auth.js          # 인증 헬퍼
│       ├── constants.js     # 상수 정의
│       └── utils.js         # 유틸리티 함수
│
├── public/                   # 정적 파일
├── .env.local               # 환경변수
├── next.config.js           # Next.js 설정
├── tailwind.config.js       # Tailwind CSS 설정
├── postcss.config.js        # PostCSS 설정
└── package.json             # 의존성 관리
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 확인하고 필요시 수정:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 주요 기능

### 1. 인증
- 로그인 페이지 (`/login`)
- JWT 토큰 기반 인증
- 자동 로그아웃 (토큰 만료 시)

### 2. 대시보드 (`/`)
- 통계 카드 (총 로그, 차단, 허용, 오늘 이벤트)
- 최근 로그 목록
- 실시간 데이터 표시

### 3. 로그 관리
- 로그 목록 (`/logs`)
  - 필터링 (IP, 포트, 액션, 날짜)
  - 페이지네이션
  - 정렬
- 로그 상세 (`/logs/[id]`)
  - 전체 로그 정보 표시
  - 메시지 상세 보기

### 4. 분석 (`/analytics`)
- 타임라인 차트 (최근 7일)
- 액션별 분포 (파이 차트)
- 프로토콜별 통계 (바 차트)

### 5. 설정 (`/settings`)
- 알림 이메일 설정
- 로그 보관 기간 설정
- 최대 로그 크기 설정

## API 연동

### API 클라이언트 (`src/lib/api.js`)

```javascript
import { authAPI, logsAPI, usersAPI, settingsAPI } from '@/lib/api';

// 로그인
const response = await authAPI.login({ username, password });

// 로그 목록 조회
const logs = await logsAPI.getAll({ source_ip: '192.168.1.1' });

// 로그 상세 조회
const log = await logsAPI.getById(id);

// 통계 조회
const stats = await logsAPI.getStats();
```

### 인증 (`src/lib/auth.js`)

```javascript
import { setToken, getToken, removeToken, isAuthenticated } from '@/lib/auth';

// 토큰 저장
setToken(token);

// 토큰 조회
const token = getToken();

// 로그아웃
removeToken();

// 인증 확인
if (isAuthenticated()) {
  // 인증됨
}
```

## 컴포넌트 사용법

### Button

```javascript
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  클릭
</Button>
```

### Card

```javascript
import Card from '@/components/ui/Card';

<Card title="제목">
  <p>내용</p>
</Card>
```

### Input

```javascript
import Input from '@/components/ui/Input';

<Input
  label="이름"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
```

### Badge

```javascript
import Badge from '@/components/ui/Badge';

<Badge variant="success">허용</Badge>
<Badge variant="danger">차단</Badge>
```

## 스타일링

### Tailwind CSS

프로젝트는 Tailwind CSS를 사용하여 스타일링됩니다.

```javascript
<div className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded-lg">
  Hello World
</div>
```

### 커스텀 색상

`tailwind.config.js`에 정의된 primary 색상 팔레트:

```javascript
<div className="bg-primary-500 text-white">
  Primary Color
</div>
```

## 개발 가이드

### 새 페이지 추가

1. `src/app` 디렉토리에 새 폴더 생성
2. `page.js` 파일 생성
3. DashboardLayout 사용 (인증 필요 시)

```javascript
'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function NewPage() {
  return (
    <DashboardLayout title="새 페이지">
      <div>내용</div>
    </DashboardLayout>
  );
}
```

### 새 컴포넌트 추가

1. `src/components` 디렉토리에 적절한 폴더에 생성
2. 재사용 가능하도록 작성
3. props를 통한 커스터마이징 지원

### API 엔드포인트 추가

`src/lib/api.js`에 새 API 함수 추가:

```javascript
export const newAPI = {
  getAll: () => apiClient.get('/api/v1/new'),
  create: (data) => apiClient.post('/api/v1/new', data),
};
```

## 트러블슈팅

### 개발 서버가 시작되지 않음

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### 빌드 에러

```bash
# .next 폴더 삭제 후 재빌드
rm -rf .next
npm run build
```

### API 호출 실패

1. 백엔드 서버가 실행 중인지 확인
2. `.env.local`의 API URL 확인
3. CORS 설정 확인
4. 네트워크 탭에서 요청 확인

## 테스트 계정

- **아이디**: admin
- **비밀번호**: admin123

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이센스

이 프로젝트는 교육 목적으로 제작되었습니다.
