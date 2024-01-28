<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# ejecuyar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yanr install
```
3. Tener nest cli instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo ___.env.template___ y cambniarlo a .env


6. Llenar las variable de entorno definidas en el .env

7. Ejecutar la aplicacion en estado dev

```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla
```
localhost:3000/api/v2/seed
```

## Stack Usado
* MongoDB
* Nest
