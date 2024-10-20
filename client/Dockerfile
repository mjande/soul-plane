FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_HOST
RUN VITE_BACKEND_HOST=$VITE_BACKEND_HOST npm run build

FROM caddy:alpine
COPY --from=build app/dist/ /srv/
COPY ./Caddyfile /etc/caddy/Caddyfile
