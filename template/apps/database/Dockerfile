# Use the official PostgreSQL 12 image as a base
FROM postgres:12

# Copy initialization scripts (if any) into the Docker container
# These scripts can be SQL or shell scripts that will run when the container is first started
# Uncomment the line below and add your scripts to the `docker-entrypoint-initdb.d` directory
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/


# Set the default command for the container, this is optional since the base image already has an entrypoint
CMD ["postgres"]
