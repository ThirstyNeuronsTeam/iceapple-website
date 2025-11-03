# -------------------------------
# Stage 1 — Build the application
# -------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# -------------------------------
# Stage 2 — Production image
# -------------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Optional: non-root
# RUN addgroup -S app && adduser -S app -G app
# USER app

RUN apk add --no-cache ca-certificates && update-ca-certificates

EXPOSE 3000
ENV PORT=3000

# Start the Next.js server
CMD ["npm","run","start"]
