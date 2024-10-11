import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the JWT cookie
    res.setHeader('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire the cookie immediately
      path: '/',
    }));

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  // Handle invalid method
  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
