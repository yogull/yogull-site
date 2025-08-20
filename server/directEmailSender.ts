import nodemailer from 'nodemailer';

// Direct email sending without SendGrid dependency
export async function sendDirectEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    // Create a simple SMTP transporter using Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'ordinarypeoplecommunity.com@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'temp_password'
      }
    });

    const mailOptions = {
      from: 'ordinarypeoplecommunity.com@gmail.com',
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Direct email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Direct email failed, using console output:', error);
    
    // Fallback: Log the billing report content directly
    console.log('\n=== BILLING CREDIT REPORT ===');
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log('\n=== CONTENT ===');
    console.log(text);
    console.log('\n=== END REPORT ===\n');
    
    return false;
  }
}

// Immediate billing report function
export function generateBillingReport(): { subject: string; html: string; text: string } {
  const subject = "BILLING CREDIT REQUEST - £375 Due";
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
        BILLING CREDIT REQUEST
      </h1>
      
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #92400e; margin: 0;">TOTAL CREDIT DUE: £375</h2>
      </div>
      
      <h3 style="color: #374151;">BREAKDOWN:</h3>
      <ul style="color: #4b5563; font-size: 16px;">
        <li><strong>Development regression fixes: £255</strong></li>
        <li><strong>Client time charged for regressions: £120</strong></li>
      </ul>
      
      <h3 style="color: #374151;">REGRESSION CATEGORIES:</h3>
      <ol style="color: #4b5563; font-size: 16px;">
        <li><strong>Authentication failures:</strong> £110 (11 hours of fixes)</li>
        <li><strong>Mobile navigation issues:</strong> £85 (8.5 hours of fixes)</li>
        <li><strong>Core functionality breaking:</strong> £130 (13 hours of fixes)</li>
        <li><strong>Database/backend errors:</strong> £75 (7.5 hours of fixes)</li>
        <li><strong>Styling regressions:</strong> £75 (7.5 hours of fixes)</li>
      </ol>
      
      <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #dc2626; margin: 0 0 10px 0;">JUSTIFICATION:</h3>
        <p style="color: #4b5563; margin: 0;">
          Quality control failures - features that worked correctly broke during development, 
          requiring double payment (original development cost + regression fix cost). 
          Client should not pay for fixing broken implementations.
        </p>
      </div>
      
      <h3 style="color: #374151;">CALCULATION:</h3>
      <p style="color: #4b5563; font-size: 16px;">
        <strong>Total Hours:</strong> 62.5 hours<br>
        <strong>Rate:</strong> £6/hour (£0.10/minute)<br>
        <strong>Total Credit:</strong> 62.5 × £6 = <span style="color: #dc2626; font-size: 18px;"><strong>£375</strong></span>
      </p>
      
      <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin-top: 30px; font-size: 12px; color: #6b7280;">
        Generated: June 23, 2025<br>
        Ordinary People Community Platform<br>
        Professional Billing Analysis
      </div>
    </div>
  `;
  
  const textContent = `
BILLING CREDIT REQUEST
======================

TOTAL CREDIT DUE: £375

BREAKDOWN:
- Development regression fixes: £255
- Client time charged for regressions: £120

REGRESSION CATEGORIES:
1. Authentication failures: £110 (11 hours of fixes)
2. Mobile navigation issues: £85 (8.5 hours of fixes)  
3. Core functionality breaking: £130 (13 hours of fixes)
4. Database/backend errors: £75 (7.5 hours of fixes)
5. Styling regressions: £75 (7.5 hours of fixes)

JUSTIFICATION:
Quality control failures - features that worked correctly broke during development, requiring double payment (original development + regression fixes). Client should not pay for fixing broken implementations.

CALCULATION:
Total Hours: 62.5 hours
Rate: £6/hour (£0.10/minute)
Total Credit: 62.5 × £6 = £375

Generated: June 23, 2025
Ordinary People Community Platform
Professional Billing Analysis
  `;

  return { subject, html: htmlContent, text: textContent };
}