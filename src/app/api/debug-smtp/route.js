import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Test de conectividad básica
    const result = await execAsync('curl -v telnet://smtp.hostinger.com:587');
    
    return Response.json({ 
      success: true, 
      message: 'Conexión exitosa',
      output: result.stdout 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message,
      stderr: error.stderr,
      stdout: error.stdout
    });
  }
}