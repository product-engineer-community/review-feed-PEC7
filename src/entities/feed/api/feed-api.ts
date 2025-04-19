import { createClient } from '@/shared/utils/supabase/server';
import { Feed } from '../model/types';

// Feed API 함수들
export const getFeeds = async (): Promise<Feed[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('feeds')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching feeds:', error);
    return [];
  }

  return data || [];
};

export const getFeedById = async (id: string): Promise<Feed | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('feeds')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching feed:', error);
    return null;
  }

  return data;
};
