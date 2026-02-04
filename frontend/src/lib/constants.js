// 로그 액션 타입
export const LOG_ACTIONS = {
  ALLOW: 'allow',
  BLOCK: 'block',
  DROP: 'drop',
};

// 로그 액션 라벨
export const LOG_ACTION_LABELS = {
  [LOG_ACTIONS.ALLOW]: '허용',
  [LOG_ACTIONS.BLOCK]: '차단',
  [LOG_ACTIONS.DROP]: '드롭',
};

// Badge variant 매핑
export const BADGE_VARIANTS = {
  [LOG_ACTIONS.ALLOW]: 'success',
  [LOG_ACTIONS.BLOCK]: 'danger',
  [LOG_ACTIONS.DROP]: 'warning',
};

// 페이지네이션 기본값
export const DEFAULT_PAGE_SIZE = 20;

// 사이드바 메뉴 항목
export const MENU_ITEMS = [
  {
    name: '대시보드',
    path: '/',
    icon: 'LayoutDashboard',
  },
  {
    name: '로그',
    path: '/logs',
    icon: 'FileText',
  },
  {
    name: '분석',
    path: '/analytics',
    icon: 'BarChart',
  },
  {
    name: '설정',
    path: '/settings',
    icon: 'Settings',
  },
];
