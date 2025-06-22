create policy "Enable read access for all users"
on "public"."software"
as permissive
for select
to public
using (true);



