CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.users (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
