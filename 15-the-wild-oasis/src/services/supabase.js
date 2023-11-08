import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otspcpfbrwhboqeoabmz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90c3BjcGZicndoYm9xZW9hYm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0Njc0NDUsImV4cCI6MjAxNTA0MzQ0NX0.B88jmjNbCKw1i8CJN2aYyuosvt4J5vWy3_HjfDAzx5w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
