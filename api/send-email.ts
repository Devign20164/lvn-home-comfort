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

    // Get website URL for logo (use environment variable or default)
    const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
    // Logo is in public folder, so it's accessible at /logo.png
    const logoUrl = websiteUrl ? `${websiteUrl}/logo.png` : 'https://via.placeholder.com/200x48/256ad1/ffffff?text=LVN+Home+Care';

    // Create transporter using Gmail SMTP
    // Environment variables should be set in Vercel:
    // GMAIL_USER: lvnhomecareservices@gmail.com
    // GMAIL_APP_PASSWORD: Your Gmail App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER ,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email 1: Send to LVN Home Care Services
    const inquiryEmail = {
      from: process.env.GMAIL_USER ,
      to: 'lvnhomecareservices@gmail.com',
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #e6f2ff 0%, #f0f9ff 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(37, 106, 209, 0.15);">
                  <!-- Header with Logo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #256ad1 0%, #38b6ff 100%); padding: 30px 40px; text-align: center;">
                      <img src="${logoUrl}" alt="LVN Home Care Services" style="height: 48px; width: auto; max-width: 200px; display: block; margin: 0 auto;" />
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0 0 10px 0; color: #1a3d6b; font-family: 'Merriweather', Georgia, serif; font-size: 28px; font-weight: 700; line-height: 1.2;">
                        New Contact Form Submission
                      </h1>
                      <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                        You have received a new inquiry from your website contact form.
                      </p>
                      
                      <!-- Form Details Card -->
                      <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 4px solid #256ad1;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <strong style="color: #1a3d6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</strong>
                              <p style="margin: 5px 0 0 0; color: #2d3748; font-size: 16px;">${sanitizedName}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <strong style="color: #1a3d6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                              <p style="margin: 5px 0 0 0; color: #2d3748; font-size: 16px;">
                                <a href="mailto:${sanitizedEmail}" style="color: #256ad1; text-decoration: none;">${sanitizedEmail}</a>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <strong style="color: #1a3d6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</strong>
                              <p style="margin: 5px 0 0 0; color: #2d3748; font-size: 16px;">
                                <a href="tel:${sanitizedPhone}" style="color: #256ad1; text-decoration: none;">${sanitizedPhone}</a>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0;">
                              <strong style="color: #1a3d6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
                              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0;">
                                <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Footer Note -->
                      <p style="margin: 30px 0 0 0; color: #718096; font-size: 12px; text-align: center; line-height: 1.5;">
                        This email was automatically sent from the LVN Home Care Services contact form.<br>
                        Please respond to the client at <a href="mailto:${sanitizedEmail}" style="color: #256ad1; text-decoration: none;">${sanitizedEmail}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Email 2: Confirmation email to the client
    const confirmationEmail = {
      from: process.env.GMAIL_USER || 'lvnhomecareservices@gmail.com',
      to: email, // Use original email for sending (not sanitized)
      subject: 'Thank You for Contacting LVN Home Care Services',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #e6f2ff 0%, #f0f9ff 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(37, 106, 209, 0.15);">
                  <!-- Header with Logo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #256ad1 0%, #38b6ff 100%); padding: 30px 40px; text-align: center;">
                      <img src="${logoUrl}" alt="LVN Home Care Services" style="height: 48px; width: auto; max-width: 200px; display: block; margin: 0 auto;" />
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0 0 20px 0; color: #1a3d6b; font-family: 'Merriweather', Georgia, serif; font-size: 32px; font-weight: 700; line-height: 1.2;">
                        Thank You for Your Inquiry, ${sanitizedName}!
                      </h1>
                      <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 17px; line-height: 1.7;">
                        We have received your message and appreciate you reaching out to <strong style="color: #256ad1;">LVN Home Care Services</strong>.
                      </p>
                      
                      <!-- Highlight Box -->
                      <div style="background: linear-gradient(135deg, #256ad1 0%, #38b6ff 100%); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 0 4px 15px rgba(37, 106, 209, 0.3);">
                        <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600; line-height: 1.6;">
                          LVN Home Care Services will contact you briefly.
                        </p>
                      </div>
                      
                      <!-- Contact Info Card -->
                      <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border-left: 4px solid #38b6ff;">
                        <p style="margin: 0 0 15px 0; color: #1a3d6b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Contact Information:</p>
                        <p style="margin: 8px 0; color: #2d3748; font-size: 15px;">
                          <strong style="color: #256ad1;">Email:</strong> ${sanitizedEmail}
                        </p>
                        <p style="margin: 8px 0; color: #2d3748; font-size: 15px;">
                          <strong style="color: #256ad1;">Phone:</strong> ${sanitizedPhone}
                        </p>
                      </div>
                      
                      <!-- Urgent Contact -->
                      <div style="background-color: #fff5e6; border-left: 4px solid #ffa500; border-radius: 8px; padding: 20px; margin: 30px 0;">
                        <p style="margin: 0; color: #744210; font-size: 15px; line-height: 1.6;">
                          <strong>Need immediate assistance?</strong><br>
                          If you have any urgent questions, please feel free to call us at <a href="tel:+17148722502" style="color: #256ad1; text-decoration: none; font-weight: 600;">+1 (714) 872-2502</a>.
                        </p>
                      </div>
                      
                      <!-- Company Info -->
                      <div style="border-top: 2px solid #e2e8f0; padding-top: 30px; margin-top: 40px;">
                        <p style="margin: 0 0 15px 0; color: #2d3748; font-size: 16px; line-height: 1.7;">
                          Best regards,<br>
                          <strong style="color: #1a3d6b; font-size: 18px;">LVN Home Care Services</strong>
                        </p>
                        <p style="margin: 20px 0 0 0; color: #718096; font-size: 14px; line-height: 1.8;">
                          155 N. Riverview drive unit 100<br>
                          Anaheim Hills, CA 92808<br>
                          <a href="tel:+17148722502" style="color: #256ad1; text-decoration: none;">Phone: +1 (714) 872-2502</a><br>
                          <a href="mailto:lvnhomecareservices@gmail.com" style="color: #256ad1; text-decoration: none;">Email: lvnhomecareservices@gmail.com</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a3d6b 0%, #256ad1 100%); padding: 25px 40px; text-align: center;">
                      <p style="margin: 0; color: #ffffff; font-size: 12px; line-height: 1.6; opacity: 0.9;">
                        Licensed & Insured | Certified Non-Medical Home Care Provider<br>
                        Committed to dignity, respect, and compassionate care.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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

