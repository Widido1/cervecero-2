import { createTransporter } from '@/libs/email-config';

export async function GET() {
  try {
    const transporter = createTransporter();
    
    console.log('Testing SMTP configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? '***' + process.env.SMTP_USER.slice(-4) : 'undefined'
    });

    await transporter.verify();
    
    return Response.json({ 
      success: true, 
      message: 'SMTP connection successful',
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
      }
    });
  } catch (error) {
    console.error('SMTP test failed:', error);
    return Response.json({ 
      success: false, 
      error: error.message,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER ? '***' + process.env.SMTP_USER.slice(-4) : 'undefined'
      }
    }, { status: 500 });
  }
}
