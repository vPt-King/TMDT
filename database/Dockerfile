FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=conbo2chan MYSQL_DATABASE=tmdt MYSQL_ALLOW_EMPTY_PASSWORD=yes
ADD ./dump /docker-entrypoint-initdb.d/
VOLUME [ "/db","/var/lib/mysql" ]
