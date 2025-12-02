import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Simple HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = escapeHtml(phone);
    const sanitizedMessage = escapeHtml(message);

    // Create transporter using Gmail SMTP
    // Environment variables should be set in Vercel:
    // GMAIL_USER: lvnhomecareservices@gmail.com
    // GMAIL_APP_PASSWORD: Your Gmail App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'lvnhomecareservices@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email 1: Send to LVN Home Care Services
    const inquiryEmail = {
      from: process.env.GMAIL_USER || 'lvnhomecareservices@gmail.com',
      to: 'lvnhomecareservices@gmail.com',
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Phone:</strong> ${sanitizedPhone}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the LVN Home Care Services contact form.
          </p>
        </div>
      `,
    };

    // Email 2: Confirmation email to the client
    const confirmationEmail = {
      from: process.env.GMAIL_USER || 'lvnhomecareservices@gmail.com',
      to: email, // Use original email for sending (not sanitized)
      subject: 'Thank You for Contacting LVN Home Care Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Your Inquiry, ${sanitizedName}!</h2>
          <p style="color: #666; line-height: 1.6;">
            We have received your message and appreciate you reaching out to LVN Home Care Services.
          </p>
          <p style="color: #666; line-height: 1.6;">
            <strong>LVN Home Care Services will contact you briefly.</strong>
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Your Contact Information:</strong></p>
            <p style="margin: 5px 0; color: #666;">Email: ${sanitizedEmail}</p>
            <p style="margin: 5px 0; color: #666;">Phone: ${sanitizedPhone}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you have any urgent questions, please feel free to call us at <strong>+1 (714) 872-2502</strong>.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            <strong>LVN Home Care Services</strong><br>
            155 N. Riverview drive unit 100<br>
            Anaheim Hills, CA 92808<br>
            Phone: +1 (714) 872-2502<br>
            Email: lvnhomecareservices@gmail.com
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(inquiryEmail),
      transporter.sendMail(confirmationEmail),
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

