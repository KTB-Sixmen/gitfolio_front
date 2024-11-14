# 기본 Node.js 이미지 사용
FROM node:20.4-alpine AS base

 # 빌드 시간 변수 선언
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_S3_URL
ARG AUTH_SERVER_URL
ARG MEMBERS_SERVER_URL
ARG RESUMES_SERVER_URL
ARG NOTIFICATIONS_SERVER_URL

# 환경 변수 설정
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
 NEXT_PUBLIC_S3_URL=${NEXT_PUBLIC_S3_URL} \
 AUTH_SERVER_URL=${AUTH_SERVER_URL} \
 MEMBERS_SERVER_URL=${MEMBERS_SERVER_URL} \
 RESUMES_SERVER_URL=${RESUMES_SERVER_URL} \
 NOTIFICATIONS_SERVER_URL=${NOTIFICATIONS_SERVER_URL}

# Build stage
FROM base AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including Tailwind Typography & shar
RUN npm ci && \
    npm install -D @tailwindcss/typography && \
    npm install sharp && \
    npm cache clean --force

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN CI=false npm run build

# Production stage
FROM base AS runner

WORKDIR /app

# 시스템 의존성 설치 및 사용자 생성
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nextjs && \
    chown -R nextjs:nodejs /app

# Copy built artifacts from builder stage

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./

# 프로덕션 의존성 설치
# 실행에 필요한 dependencies만 설치되어 이미지 크기 감소
RUN npm ci --omit=dev && \
    npm cache clean --force

# Switch to non-root user
USER nextjs

# 포트 설정
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]