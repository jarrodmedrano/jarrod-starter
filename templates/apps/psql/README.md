brew install golang-migrate

make postgres

make createdb

make create

add schema into the migrate up sql file
add schema to drop tables in the migrate down
