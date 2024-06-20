import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgdsamjhcfkzxhhexfrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZHNhbWpoY2ZrenhoaGV4ZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzOTE1MjAsImV4cCI6MjAzMzk2NzUyMH0.Lr4NvUWFQH_wt5MXz0WeXa8Svl1ZYniYkCr0pau3tu4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
