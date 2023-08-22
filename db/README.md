# Contenedor de la base de datos

## Instrucciones
para pruebas: levantar con el docker compose que se encuentra en el directorio db
```bash
docker-compose up -d
```

para producción: levantar con el docker compose que se encuentra en la raíz del proyecto
```bash
docker-compose up -d
```

## Notas
- El contenedor de la base de datos se levanta con un volumen para persistir los datos en el host
- Para conectarse al mongosh del contenedor, ejecutar el siguiente comando:
```bash
docker exec -it db-mongo-1 mongosh -u root -p root --authenticationDatabase admin
```