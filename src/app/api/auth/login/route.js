import crypto from 'crypto';

// Almacén simple en memoria (para serverless, cada instancia tiene su propio mapa, pero sirve como limitación básica)
const rateLimit = new Map();

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxAttempts = 5;

  // Limpiar entradas antiguas y verificar límite
  if (rateLimit.has(ip)) {
    const { attempts, firstAttempt } = rateLimit.get(ip);
    if (now - firstAttempt > windowMs) {
      // Reiniciar el contador si pasó la ventana
      rateLimit.set(ip, { attempts: 1, firstAttempt: now });
    } else {
      if (attempts >= maxAttempts) {
        return new Response(JSON.stringify({ error: 'Demasiados intentos. Espera 15 minutos.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      rateLimit.set(ip, { attempts: attempts + 1, firstAttempt });
    }
  } else {
    rateLimit.set(ip, { attempts: 1, firstAttempt: now });
  }

  // Resto del código de login (igual que antes)
  try {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex');

      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      response.headers.set(
        'Set-Cookie',
        `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=14400; Secure=${process.env.NODE_ENV === 'production'}`
      );

      return response;
    } else {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error en la solicitud' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}