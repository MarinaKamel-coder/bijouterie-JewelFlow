FROM nginx:alpine

# On supprime la config par défaut pour éviter les conflits
RUN rm /etc/nginx/conf.d/default.conf

# On copie le fichier de configuration dans le conteneur
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]