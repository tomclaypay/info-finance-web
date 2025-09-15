# ========= deps =========
FROM node:20-alpine AS deps
WORKDIR /app
# Một số native addon (vd. sharp) cần libc6-compat
RUN apk add --no-cache libc6-compat
COPY package.json ./
# Dùng 1 package manager duy nhất: yarn
RUN corepack enable && yarn install --frozen-lockfile

# ========= build =========
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Yêu cầu next.config.js có: module.exports = { output: 'standalone' }
RUN yarn build

# ========= runner =========
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Tạo user không phải root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# Chỉ mang những gì cần để chạy
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT=3000
# server.js được Next tạo trong .next/standalone
CMD ["node", "server.js"]
