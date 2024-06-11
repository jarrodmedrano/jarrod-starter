#!make
include .env
postgres:
	docker run --name postgres12 -p ${DATABASE_PORTS} -e DATABASE_USER=${DATABASE_USER} -e DATABASE_PASSWORD=${DATABASE_SECRET} -d postgres:12-alpine
createdb:
	docker exec -it postgres12 createdb --username=${DATABASE_USER} --owner=root ${DATABASE_NAME}
create:
	migrate create -ext sql -dir migration -seq init
dropdb:
	docker exec -it postgres12 dropdb ${DATABASE_NAME}
migrateup:
	migrate -path migration -database ${DATABASE_URL} -verbose up
migratedown:
	migrate -path migration -database ${DATABASE_URL} -verbose down
sqlc:
	sqlc generate

.PHONY: postgres createdb create dropdb migrateup migratedown sqlc