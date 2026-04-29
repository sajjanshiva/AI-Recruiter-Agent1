import { supabase } from '@/services/supabaseClient';

export async function GET() {
    await supabase.from('interviews').select('interview_id').limit(1);
    return Response.json({ status: 'alive' });
}