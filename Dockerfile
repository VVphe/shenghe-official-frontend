FROM nginx:stable
RUN mkdir -p web/logs
ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD dist/larix-official-frontend web/dist
EXPOSE 80