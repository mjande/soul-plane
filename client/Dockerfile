FROM caddy:alpine
RUN npm run build
COPY ./dist/ /srv/
COPY ./Caddyfile /etc/caddy/Caddyfile
