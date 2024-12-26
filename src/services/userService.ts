import { supabase } from '../lib/supabase';
import { User, Address, Company } from '../types/user';

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('users')
    .select(`
      *,
      company:companies(*),
      addresses(*)
    `)
    .eq('id', user.id)
    .single();

  return data;
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
  return data;
}

export async function addAddress(userId: string, address: Omit<Address, 'id'>) {
  const { data, error } = await supabase
    .from('addresses')
    .insert([{ ...address, userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAddress(addressId: string, updates: Partial<Address>) {
  const { data, error } = await supabase
    .from('addresses')
    .update(updates)
    .eq('id', addressId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAddress(addressId: string) {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', addressId);

  if (error) throw error;
}

export async function updateCompany(companyId: string, updates: Partial<Company>) {
  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', companyId)
    .select()
    .single();

  if (error) throw error;
  return data;
}