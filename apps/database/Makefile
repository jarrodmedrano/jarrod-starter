postgres:
	docker run --name postgres12 -p ${DATABASE_PORTS} -e POSTGRES_USER=${DATABASE_USER} -e POSTGRES_PASSWORD=${DATABASE_SECRET} -d postgres:12-alpine
createdb:
	docker exec -it postgres12 createdb --username=${DATABASE_USER} --owner=root ${DATABASE_NAME}
dropdb:
	docker exec -it postgres12 dropdb ${DATABASE_NAME}
migrateup:
	migrate -path db/migration -database ${DATABASE_URL} -verbose up
migratedown:
	migrate -path db/migration -database ${DATABASE_URL} -verbose down
sqlc:
	sqlc generate

.PHONY: postgres createdb dropdb migrateup migratedown sqlc