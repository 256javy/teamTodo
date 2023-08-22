FROM mongo:latest

# Copia el archivo de configuración de MongoDB a la imagen
COPY mongod.conf /etc/mongod.conf

# Expone el puerto 27017 para que se pueda acceder a MongoDB desde fuera del contenedor
EXPOSE 27017:27017

# Inicia el servidor de MongoDB
CMD ["mongod", "--config", "/etc/mongod.conf"]

# docker run -p 27017:27017  mongo1