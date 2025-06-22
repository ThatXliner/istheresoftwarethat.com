alter table "public"."reviews" add column "stars" smallint;

alter table "public"."reviews" alter column "comment" drop not null;

alter table "public"."reviews" alter column "helpful_count" drop not null;

alter table "public"."reviews" alter column "is_upvote" drop not null;


