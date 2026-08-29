import { supabase } from '../config/supabase.js';

export async function getCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}