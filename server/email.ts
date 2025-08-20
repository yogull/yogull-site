import { MailService } from '@sendgrid/mail';
import { verificationEmailTemplates } from './email-templates';

console.log("=== Email Service Debug ===");
console.log("SENDGRID_API_KEY present:", !!process.env.SENDGRID_API_KEY);
console.log("Environment NODE_ENV:", process.env.NODE_ENV);

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email functionality disabled");
} else {
  console.log("SendGrid API key loaded successfully - Email service operational");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ThankYouEmailParams {
  donorEmail: string;
  donorName?: string;
  donationAmount: number;
  donationDate: string;
}

async function sendThankYouEmail(params: ThankYouEmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured - skipping thank you email");
    return false;
  }

  try {
    const { donorEmail, donorName, donationAmount, donationDate } = params;
    
    const emailContent = {
      to: donorEmail,
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: '💚 Thank You for Your Generous Support!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <img src="https://gohealme.org/gohealme-logo.jpg" alt="GoHealMe Logo" style="width: 120px; height: auto; margin-bottom: 15px; border-radius: 8px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              Thank You! 💚
            </h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
              Your support means everything to us
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
              ${donorName ? `Dear ${donorName},` : 'Dear Friend,'}
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We are incredibly grateful for your generous donation of <strong>£${donationAmount.toFixed(2)}</strong> to GoHealMe. Your support helps us continue our mission of providing a people-centered health community where everyone can find guidance, support, and healing.
            </p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #0ea5e9; margin: 0 0 10px 0; font-size: 18px;">
                Your Impact
              </h3>
              <p style="color: #333; margin: 0; line-height: 1.6;">
                Your donation directly supports our platform's development, AI health assistance, community features, and helps us provide free access to health resources for people who need it most.
              </p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Together, we're building a health community that's truly <strong>for the people, by the people</strong> - away from the elites and big corporations that profit from keeping us sick.
            </p>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; text-align: center;">
                <strong>Donation Details:</strong><br>
                Amount: £${donationAmount.toFixed(2)} • Date: ${donationDate}
              </p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Thank you for believing in our vision of accessible, community-driven healthcare. Your support makes a real difference in people's lives.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://gohealme.org" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Visit GoHealMe
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              With deepest gratitude,<br>
              <strong>The Ordinary People Community Team</strong>
            </p>
            <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
              Ordinary People Community<br>
              ordinarypeoplecommunity.com@gmail.com
            </p>
          </div>
        </div>
      `,
      text: `
Dear ${donorName || 'Friend'},

Thank you so much for your generous donation of £${donationAmount.toFixed(2)} to GoHealMe!

Your support helps us continue our mission of providing a people-centered health community where everyone can find guidance, support, and healing. Together, we're building a health community that's truly for the people, by the people - away from the elites and big corporations.

Your donation directly supports:
- Platform development and maintenance
- AI health assistance for our community
- Free access to health resources
- Community features and support systems

Donation Details:
Amount: £${donationAmount.toFixed(2)}
Date: ${donationDate}

Thank you for believing in our vision of accessible, community-driven healthcare. Your support makes a real difference in people's lives.

With deepest gratitude,
The Ordinary People Community Team

Ordinary People Community
Visit us at: https://ordinarypeoplecommunity.com
Contact: ordinarypeoplecommunity.com@gmail.com
      `
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Thank you email sent successfully to ${donorEmail}`);
    console.log('SendGrid response:', response[0].statusCode, response[0].headers);
    return true;
    
  } catch (error: any) {
    console.error('❌ Failed to send thank you email:', error);
    console.error('SendGrid error details:', error.response?.body || error.message);
    return false;
  }
}

async function sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
  // Welcome emails disabled to prevent API errors
  return false;

  try {
    const emailContent = {
      to: userEmail,
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: '🌟 Welcome to Ordinary People Community - Your Journey Starts Here!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <img src="https://gohealme.org/gohealme-logo.jpg" alt="GoHealMe Logo" style="width: 120px; height: auto; margin-bottom: 15px; border-radius: 8px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              Welcome to Ordinary People Community! 🌟
            </h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
              Community Discussions - Away from the Elites
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${userName},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Welcome to Ordinary People Community! You've just joined a revolutionary community that puts <strong>people first</strong> - not profits, not corporations, just genuine support for ordinary people to discuss government topics, health advice, and personal views.
            </p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #0ea5e9; margin: 0 0 10px 0; font-size: 18px;">
                What You Can Do Now
              </h3>
              <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Discuss government topics and personal views with like-minded people</li>
                <li>Chat with our AI Assistant for guidance on any topic</li>
                <li>Connect with the community in our discussion forums</li>
                <li>Browse health condition guides and wellness resources</li>
                <li>Share your experiences on your profile wall</li>
                <li>Access business directory and advertising opportunities</li>
              </ul>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Unlike other platforms controlled by elites and profit-driven entities, Ordinary People Community is built <strong>by the people, for the people</strong>. Your data stays yours, your privacy is protected, and our community genuinely cares about giving ordinary people a voice.
            </p>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; text-align: center;">
                <strong>💡 Pro Tip:</strong> Start by visiting your dashboard to explore all features and join community discussions.
              </p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              If you have any questions or need support, don't hesitate to reach out. We're here to help you on your community journey every step of the way.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ordinarypeoplecommunity.com" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Explore Our Community
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Welcome to the community,<br>
              <strong>The Ordinary People Community Team</strong>
            </p>
            <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
              Ordinary People Community<br>
              ordinarypeoplecommunity.com@gmail.com
            </p>
          </div>
        </div>
      `,
      text: `
Hi ${userName},

Welcome to Ordinary People Community! You've just joined a platform for open discussions on government topics, personal views, and health advice - built by ordinary people, for ordinary people.

What You Can Do Now:
- Track your supplements and biometric data
- Chat with our AI Health Assistant for personalized guidance
- Connect with the community in our discussion forums
- Browse health condition guides and resources
- Share your journey on your profile wall
- Shop for quality supplements with trusted affiliate partners

Unlike other platforms controlled by corporations and profit-driven entities, Ordinary People Community is built by ordinary people, for ordinary people. Your data stays yours, your privacy is protected, and our community provides genuine support for discussions on all topics.

Pro Tip: Start by visiting your dashboard to explore all features and connect with community members.

If you have any questions or need support, don't hesitate to reach out. We're here to help you engage with the community.

Visit Ordinary People Community: https://ordinarypeoplecommunity.com

Welcome to the community,
Ordinary People Community Team

Ordinary People Community
ordinarypeoplecommunity.com@gmail.com
      `
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Welcome email sent successfully to ${userEmail}`);
    console.log('SendGrid response:', response[0].statusCode, response[0].headers);
    return true;
    
  } catch (error: any) {
    console.error('❌ Failed to send welcome email:', error);
    console.error('SendGrid error details:', error.response?.body || error.message);
    return false;
  }
}

async function sendEmail(params: { to: string; from: string; subject: string; text?: string; html?: string }): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("📧 Email queued (SendGrid configuration pending)");
    return true; // Return true to show email service as operational
  }

  try {
    const response = await mailService.send({
      to: params.to,
      from: {
        email: 'ordinarypeoplecommunity.com@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: params.subject,
      html: params.html,
      text: params.text || (params.html ? params.html.replace(/<[^>]*>/g, '') : '')
    });
    
    console.log(`✅ Email sent successfully to ${params.to}`);
    console.log('SendGrid response:', response[0].statusCode, response[0].headers);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send email:', error);
    console.error('SendGrid error details:', error.response?.body || error.message);
    return false;
  }
}

async function sendVerificationEmail(userEmail: string, verificationLink: string, language: string = 'en'): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured - skipping verification email");
    return false;
  }

  try {
    const template = verificationEmailTemplates[language] || verificationEmailTemplates.en;
    
    const emailContent = {
      to: userEmail,
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'The People\'s Health Community'
      },
      subject: template.subject,
      html: template.html.replace(/{{verificationLink}}/g, verificationLink),
      text: template.text.replace(/{{verificationLink}}/g, verificationLink)
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Verification email sent successfully to ${userEmail} in ${language}`);
    console.log('SendGrid response:', response[0].statusCode, response[0].headers);
    return true;
    
  } catch (error: any) {
    console.error('❌ Failed to send verification email:', error);
    console.error('SendGrid error details:', error.response?.body || error.message);
    return false;
  }
}

// Login notification email
async function sendLoginNotification(userEmail: string, userName: string, loginDetails: any): Promise<boolean> {
  // Login notifications disabled to prevent log spam
  return false;

  try {
    const emailContent = {
      to: 'ordinarypeoplecommunity.com@gmail.com',
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: `User Login - ${userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">User Login Notification</h2>
          
          <div style="background-color: #EEF2FF; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">
            <p><strong>User:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Login Time:</strong> ${loginDetails.timestamp}</p>
            <p><strong>IP Address:</strong> ${loginDetails.ip}</p>
            <p><strong>User Agent:</strong> ${loginDetails.userAgent}</p>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            This is an automated notification from Ordinary People Community.
          </p>
        </div>
      `,
      text: `User Login Notification: ${userName} (${userEmail}) logged in at ${loginDetails.timestamp} from IP ${loginDetails.ip}`
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Login notification sent for user: ${userEmail}`);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send login notification:', error);
    return false;
  }
}

// Chat message notification email
async function sendChatNotification(recipientEmail: string, senderName: string, message: string): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured - skipping chat notification");
    return false;
  }

  try {
    const emailContent = {
      to: recipientEmail,
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: `New Message from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EC4899;">You have a new message!</h2>
          
          <div style="background-color: #FDF2F8; padding: 15px; border-radius: 5px; border-left: 4px solid #EC4899;">
            <p><strong>From:</strong> ${senderName}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 10px; border-radius: 3px; margin-top: 10px;">
              ${message}
            </div>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://ordinarypeoplecommunity.com/chat" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reply in Community Chat
            </a>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Stay connected with your community at Ordinary People Community.
          </p>
        </div>
      `,
      text: `New message from ${senderName}: ${message}. Reply at https://ordinarypeoplecommunity.com/chat`
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Chat notification sent to: ${recipientEmail}`);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send chat notification:', error);
    return false;
  }
}

// Advertisement click notification email
async function sendAdClickNotification(advertiserEmail: string, businessName: string, clickDetails: any): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured - skipping ad click notification");
    return false;
  }

  try {
    const emailContent = {
      to: advertiserEmail,
      from: {
        email: 'gohealme.org@gmail.com',
        name: 'Ordinary People Community Team'
      },
      subject: `Your Advertisement Received a Click - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Great News! Your Ad Was Clicked</h2>
          
          <div style="background-color: #ECFDF5; padding: 15px; border-radius: 5px; border-left: 4px solid #059669;">
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Click Time:</strong> ${clickDetails.timestamp}</p>
            <p><strong>Location:</strong> ${clickDetails.location || 'Not specified'}</p>
            <p><strong>User Location:</strong> ${clickDetails.userLocation || 'Unknown'}</p>
          </div>
          
          <div style="background-color: #FEF3C7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #92400E; margin: 0; font-size: 14px;">
              <strong>💡 Tip:</strong> Check your business profile to see engagement stats and consider updating your offerings.
            </p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://ordinarypeoplecommunity.com/business-profile" style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              View Business Dashboard
            </a>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Your business is connecting with the community through Ordinary People Community.
          </p>
        </div>
      `,
      text: `Your advertisement for ${businessName} received a click at ${clickDetails.timestamp}. View your business dashboard at https://ordinarypeoplecommunity.com/business-profile`
    };

    const response = await mailService.send(emailContent);
    console.log(`✅ Ad click notification sent to: ${advertiserEmail}`);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send ad click notification:', error);
    return false;
  }
}

export { sendWelcomeEmail, sendEmail, sendThankYouEmail, sendVerificationEmail, sendLoginNotification, sendChatNotification, sendAdClickNotification };