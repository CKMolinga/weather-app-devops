FROM nginx:alpine

COPY app/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Overview:

# Uses Nginx lightweight server

# Copies the app folder into the web server

# Serves index.html automatically