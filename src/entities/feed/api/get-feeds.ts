import { supabase } from '@/shared/api/supabase';
import { Feed } from '../model/types';

export async function getFeeds(): Promise<Feed[]> {
  const { data, error } = await supabase
    .from('feeds')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching feeds:', error);
    return [];
  }

  return data || [];
}
