
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const USERS = [
  { email: 'libardo.legarda@racoresnarinno.com', password: 'Racores2026!', name: 'Libardo Legarda', roles: ['administrador'] },
  { email: 'adriana.ibarra@racoresnarinno.com', password: 'Racores2026!', name: 'Adriana Ibarra', roles: ['ventas', 'bodega'] },
  { email: 'juan.piscal@racoresnarinno.com', password: 'Racores2026!', name: 'Juan Piscal', roles: ['ventas', 'contabilidad'] },
  { email: 'sebastian.piscal@racoresnarinno.com', password: 'Racores2026!', name: 'Sebastian Piscal', roles: ['ventas', 'bodega'] },
  { email: 'camilo.vidal@racoresnarinno.com', password: 'Racores2026!', name: 'Camilo Vidal', roles: ['ventas', 'bodega'] },
];

Deno.serve(async (req: Request) => {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const results: Record<string, unknown>[] = [];

  for (const u of USERS) {
    // Check if user already exists
    const { data: existing } = await supabaseAdmin.auth.admin.listUsers();
    const alreadyExists = existing?.users?.find((eu: { email?: string }) => eu.email === u.email);

    if (alreadyExists) {
      // Update profile roles if needed
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('*')
        .eq('user_id', alreadyExists.id)
        .maybeSingle();

      if (profile) {
        await supabaseAdmin
          .from('user_profiles')
          .update({ roles: u.roles, full_name: u.name, updated_at: new Date().toISOString() })
          .eq('user_id', alreadyExists.id);
      } else {
        await supabaseAdmin
          .from('user_profiles')
          .insert({ user_id: alreadyExists.id, full_name: u.name, roles: u.roles });
      }

      results.push({ email: u.email, status: 'updated', userId: alreadyExists.id });
      continue;
    }

    // Create auth user
    const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { name: u.name },
    });

    if (error) {
      results.push({ email: u.email, status: 'error', error: error.message });
      continue;
    }

    // Insert profile
    await supabaseAdmin
      .from('user_profiles')
      .insert({ user_id: newUser.user.id, full_name: u.name, roles: u.roles });

    results.push({ email: u.email, status: 'created', userId: newUser.user.id });
  }

  return new Response(JSON.stringify({ success: true, results }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
});
