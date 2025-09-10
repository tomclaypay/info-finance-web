# Use a minimal Node.js base image
FROM node:14-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy only the necessary files for installing dependencies
COPY package.json yarn.lock ./
# COPY bun.lockb ./

# Install dependencies
RUN yarn install --frozen-lockfile
# RUN bun install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN rm -rf .next && npm run build
# RUN bun run build

# Production image
FROM node:14-alpine
# FROM oven/bun:latest

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/app/.env.local ./.env.local

# Install only production dependencies
RUN yarn install --production --frozen-lockfile
# RUN bun install --production --frozen-lockfile

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
# CMD ["bun", "start"]