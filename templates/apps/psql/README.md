# PSQL database with auto generated golang schema

First make sure docker is running and you have the environment variables set in the .env file in this directory.

Golang migrate used for migrating the schema

`brew install golang-migrate`

## Set up the postgres database in a docker container

We use make file to set up the postgres database

`make postgres`

This creates the actual database in the docker container

`make createdb`

This creates the migrations from the schema

`make create`

add schema into the migrate up sql file
add schema to drop tables in the migrate down

This creates the schema in the database

`make migrateup`
