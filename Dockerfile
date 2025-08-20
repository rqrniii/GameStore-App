# Step 1: Build React app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Serve with 'serve'
FROM node:22-alpine AS runner

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy build files
COPY --from=builder /app/build ./build

# Use the Cloud Run PORT environment variable
ENV PORT 8080

# Start the server
CMD ["serve", "-s", "build", "-l", "8080"]
