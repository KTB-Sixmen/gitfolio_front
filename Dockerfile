# 기본 Node.js 이미지 사용 - Alpine 기반으로 가벼운 이미지 구성
FROM node:20.4.0-alpine3.18 AS base

# 환경 변수 파일 복사
COPY .env /app/.env

# 의존성 설치 단계
FROM base AS dependencies

WORKDIR /app

# package.json 파일 복사
COPY package*.json ./

# 프로덕션 의존성 설치 및 Tailwind 관련 패키지 설치
RUN npm ci && \
    npm install -D @tailwindcss/typography && \
    npm install sharp && \
    npm cache clean --force

# 빌드 단계
FROM base AS builder

WORKDIR /app

# 의존성 복사
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

#나중에 ESLint 로 오류나면 이 코드 추가해줄것
# CI=false 환경변수 설정 후 빌드 진행
#ENV CI=false \
#    NEXT_TELEMETRY_DISABLED=1

# Next.js standalone 모드로 빌드
RUN npm run build CI=false

# 실행 단계
FROM base AS runner

WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME="0.0.0.0"

# 보안을 위한 비루트 사용자 설정
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nextjs && \
    chown -R nextjs:nodejs /app

# standalone 모드 결과물 복사
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
RUN mkdir .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 비루트 사용자로 전환
USER nextjs

# 포트 설정
EXPOSE 3000

# 서버 실행
CMD ["node", "server.js"]



























