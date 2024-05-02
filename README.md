## Sapmle env required to run the application

`.env` file in project's root directory

```POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=db_user
POSTGRES_PASSWORD=db_password
POSTGRES_DATABASE=db_name


SALT_FOR_ENCRYPTION = 10

```

###Steps to run application once env variables are

installing dependencies
`npm install`

running app build
`npm run build`

running app in dev mode
`npm run start:dev`

running app for production
`npm run start:prod`
