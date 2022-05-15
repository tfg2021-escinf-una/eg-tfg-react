FROM nginx
LABEL maintainer=tfg2021.escinf.una@gmail.com

EXPOSE 4200

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/apps/tfg-frontend /usr/share/nginx/html