CREATE DATABASE name_bd_servidor;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

CREATE TABLE IF NOT EXISTS public.users_room_llamada
(
    id serial,
    email_doc text,
    email_user text,
    PRIMARY KEY (id)
);

ALTER TABLE public.users_room_llamada
    OWNER to jhlqfjaaffpmon;
    
