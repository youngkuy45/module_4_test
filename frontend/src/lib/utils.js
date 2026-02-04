import { format } from 'date-fns';

// 날짜 포맷팅 함수
export const formatDate = (date, formatStr = 'yyyy-MM-dd HH:mm:ss') => {
  if (!date) return '';
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return date;
  }
};

// 클래스 이름 조합 함수
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// IP 주소 유효성 검사
export const isValidIP = (ip) => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Regex.test(ip);
};

// 포트 번호 유효성 검사
export const isValidPort = (port) => {
  const portNum = parseInt(port);
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
};
