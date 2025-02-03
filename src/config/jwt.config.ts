export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecretkey', // 환경변수에서 가져오기
  expiresIn: '1h', // 토큰 만료 시간
};
