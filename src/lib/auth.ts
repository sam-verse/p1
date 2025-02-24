import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, metadata: {
  full_name: string;
  roll_no: string;
  department: string;
  interests: string[];
  skills: string[];
}) {
<<<<<<< HEAD
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  
  if (error) throw error;
  return data;
=======
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) throw authError;
  if (!authData.user) throw new Error('User creation failed');

  // Then create the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{
      id: authData.user.id,
      ...metadata
    }]);

  if (profileError) {
    // If profile creation fails, we should clean up the auth user
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw profileError;
  }

  return authData;
>>>>>>> 85541e8 (p2)
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
<<<<<<< HEAD
=======
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
>>>>>>> 85541e8 (p2)
}