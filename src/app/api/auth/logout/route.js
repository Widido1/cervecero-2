export async function POST() {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  // Eliminar cookie
  response.headers.set(
    'Set-Cookie',
    'admin_token=; Path=/; HttpOnly; Max-Age=0'
  );

  return response;
}

export async function GET() {
  return new Response('Método no permitido', { status: 405 });
}