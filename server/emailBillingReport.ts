import { sendEmail } from './email';

export async function sendBillingCreditReport(recipientEmail: string) {
  const subject = "Billing Credit Analysis - Regression Fix Costs";
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        BILLING CREDIT REQUEST
      </h1>
      
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #92400e; margin: 0;">TOTAL CREDIT DUE: £375</h2>
      </div>
      
      <h3 style="color: #374151;">BREAKDOWN:</h3>
      <ul style="color: #4b5563;">
        <li>Development regression fixes: £255</li>
        <li>Your time charged for regressions: £120</li>
      </ul>
      
      <h3 style="color: #374151;">CATEGORIES:</h3>
      <ol style="color: #4b5563;">
        <li><strong>Authentication failures:</strong> £110</li>
        <li><strong>Mobile navigation issues:</strong> £85</li>
        <li><strong>Core functionality breaking:</strong> £130</li>
        <li><strong>Database/backend errors:</strong> £75</li>
      </ol>
      
      <h3 style="color: #374151;">JUSTIFICATION:</h3>
      <p style="color: #4b5563; background: #f3f4f6; padding: 15px; border-radius: 8px;">
        Quality control failures - features broke after working correctly, requiring double payment 
        (original development cost + regression fix cost).
      </p>
      
      <h3 style="color: #374151;">CALCULATION:</h3>
      <p style="color: #4b5563;">
        62.5 hours total × £0.10/minute = <strong>£375</strong>
      </p>
      
      <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin-top: 30px; font-size: 12px; color: #6b7280;">
        Generated: June 23, 2025<br>
        Ordinary People Community Platform
      </div>
    </div>
  `;
  
  const textContent = `
BILLING CREDIT REQUEST
======================

TOTAL CREDIT DUE: £375

BREAKDOWN:
- Development regression fixes: £255
- Your time charged for regressions: £120

CATEGORIES:
1. Authentication failures: £110
2. Mobile navigation issues: £85
3. Core functionality breaking: £130
4. Database/backend errors: £75

JUSTIFICATION:
Quality control failures - features broke after working, requiring double payment (original development + regression fixes).

CALCULATION:
62.5 hours total × £0.10/minute = £375

Generated: June 23, 2025
  `;

  try {
    const success = await sendEmail({
      to: recipientEmail,
      from: 'ordinarypeoplecommunity.com@gmail.com',
      subject: subject,
      text: textContent,
      html: htmlContent
    });
    
    if (success) {
      console.log('✅ Billing credit report sent successfully to:', recipientEmail);
      return { success: true, message: 'Email sent successfully' };
    } else {
      console.error('❌ Failed to send billing credit report');
      return { success: false, message: 'Failed to send email' };
    }
  } catch (error) {
    console.error('Error sending billing credit report:', error);
    return { success: false, message: 'Error sending email' };
  }
}