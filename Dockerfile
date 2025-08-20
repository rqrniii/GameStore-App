FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .

# Build React app
RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
