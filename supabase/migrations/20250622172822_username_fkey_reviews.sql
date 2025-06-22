alter table "public"."reviews" alter column "username" drop not null;

alter table "public"."reviews" add constraint "reviews_username_fkey" FOREIGN KEY (username) REFERENCES users(username) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."reviews" validate constraint "reviews_username_fkey";


