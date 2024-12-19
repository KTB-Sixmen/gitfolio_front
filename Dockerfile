# 기본 Node.js 이미지 사용
FROM node:20.4-alpine AS base

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
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Dependencies stage - 의존성 설치
FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci && \
    npm install -D @tailwindcss/typography && \
    npm install sharp && \
    npm cache clean --force

# Builder stage - 애플리케이션 빌드
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Next.js 빌드 (standalone 모드 활성화)
RUN CI=false npm run build

# Runner stage - 최종 실행 환경
FROM base AS runner
WORKDIR /app

# 보안을 위한 비root 사용자 설정
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nextjs && \
    chown -R nextjs:nodejs /app

# standalone 출력물 복사
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]