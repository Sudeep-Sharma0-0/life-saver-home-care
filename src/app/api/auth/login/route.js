import { supabase } from "@/lib/supabase";
import { serialize } from 'cookie';

export async function POST(req) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  const session = data["session"];

  if (error || !session) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  // Set JWT token in a cookie after successful login
  const token = session.access_token;

  return new Response(JSON.stringify({ message: 'Login successful', data }), {
    status: 200,
    headers: {
      'Set-Cookie': serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 60, // 60 days
        path: '/',
      }),
    },
  });
}
