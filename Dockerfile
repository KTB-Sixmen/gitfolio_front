# 기본 Node.js 이미지 사용 - Alpine 기반으로 가벼운 이미지 구성
FROM node:20.4.0-alpine3.18 AS base

# 빌드 시간 변수 선언
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_S3_URL
ARG AUTH_SERVER_URL
ARG MEMBERS_SERVER_URL
ARG RESUMES_SERVER_URL
ARG NOTIFICATIONS_SERVER_URL
ARG PAYMENTS_SERVER_URL

# 환경 변수 설정
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_S3_URL=${NEXT_PUBLIC_S3_URL} \
    AUTH_SERVER_URL=${AUTH_SERVER_URL} \
    MEMBERS_SERVER_URL=${MEMBERS_SERVER_URL} \
    RESUMES_SERVER_URL=${RESUMES_SERVER_URL} \
    NOTIFICATIONS_SERVER_URL=${NOTIFICATIONS_SERVER_URL} \
    PAYMENTS_SERVER_URL=${PAYMENTS_SERVER_URL} \
    NEXT_TELEMETRY_DISABLED=1

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

# Next.js standalone 모드로 빌드
RUN npm run build

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