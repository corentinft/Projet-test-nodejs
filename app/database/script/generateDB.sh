psql -U corentin -c "DROP DATABASE unittest;"
psql -U corentin -c "CREATE DATABASE unittest;"
psql -U corentin unittest -c "CREATE TABLE public.user (
  email varchar(80) UNIQUE,
  password varchar(80)
);

CREATE TABLE contact (
  email varchar(80),
  name varchar(80),
  surname varchar(80),
  message text
);"