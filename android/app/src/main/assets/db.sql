create table words
(
    id serial primary key,
    name text ,
    meaning text,
    translation text,
    archive INTEGER,
    examples text,
    level INTEGER
);