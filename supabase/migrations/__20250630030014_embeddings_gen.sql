create trigger "generate_embedding"
AFTER INSERT OR UPDATE ON public.software
FOR EACH ROW
execute function "supabase_functions"."http_request"(
  'http://host.docker.internal:3000',
  'POST',
  '{"Content-Type":"application/json"}',
  '{}',
  '1000'
);
