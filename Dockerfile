# Stage 1: Build the React/Vite app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the compiled assets with nginx
FROM nginx:1.27-alpine

# Remove the default nginx config and replace with one that:
#  - Listens on port 8080
#  - Serves the Vite dist/ output
#  - Falls back to index.html for client-side routing
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
