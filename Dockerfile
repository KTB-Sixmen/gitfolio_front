# 기본 Node.js 이미지 사용
FROM node:20.4-alpine AS base

# 의존성 설치 단계
FROM base AS builder
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci && \
    npm cache clean --force

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN CI=false npm run build

# 프로덕션 이미지 생성
FROM base AS runner
WORKDIR /app

# 환경변수 설정
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOST=0.0.0.0

# 시스템 의존성 설치 및 사용자 생성
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nextjs && \
    chown -R nextjs:nodejs /app

# 빌드 파일 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# 사용자 전환
USER nextjs

# 포트 설정
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]