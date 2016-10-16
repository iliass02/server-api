#Server API

API Project for init API

- Install modules
```shell
npm install
```

- Edit MySQL Connection
```shell
nano app.js
```
Line 9 to 16 and line 17 to 22

- Edit Router
```shell
nano api/routes/mainRoute.js
nano app.js
```

- Generate APIDOC
```shell
apidoc -i api/routes -o apidoc/ -t apidoc-template/
```

- Generate Entities from your database
```shell
sequelize-auto -o "./models" -d 'DATABASE' -h localhost -u 'USER' -p 3306 -x 'PASSWORD' -e mysql
``# server-api
