import { createClient } from '@supabase/supabase-js';
const supabaseUrl ="https://nsilwwqrhweuqgjmnoiw.supabase.co"
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaWx3d3FyaHdldXFnam1ub2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjIxOTcsImV4cCI6MjA2MzMzODE5N30.D3PJ3274H4Jv7AbN3drhZZcdj7SyhjMNQCu8LbxWIks"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;