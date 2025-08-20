import { MailService } from '@sendgrid/mail';
import { storage } from '../storage';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set - email functionality will be disabled");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface WeeklySummaryData {
  userName: string;
  email: string;
  supplementsTaken: number;
  totalSupplements: number;
  averageSteps: number;
  averageSleep: number;
  streak: number;
}

export async function sendWeeklySummary(userId: number): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured, skipping email");
    return false;
  }

  try {
    const user = await storage.getUser(userId);
    if (!user) return false;

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [supplements, logs, biometrics] = await Promise.all([
      storage.getSupplements(userId),
      storage.getSupplementLogs(userId, startDate, endDate),
      storage.getBiometrics(userId, startDate, endDate)
    ]);

    const averageSteps = biometrics.length > 0 
      ? Math.round(biometrics.reduce((sum, b) => sum + (b.steps || 0), 0) / biometrics.length)
      : 0;

    const averageSleep = biometrics.length > 0
      ? Math.round(biometrics.reduce((sum, b) => sum + (b.sleepHours || 0), 0) / biometrics.length / 60 * 10) / 10
      : 0;

    const summaryData: WeeklySummaryData = {
      userName: user.name,
      email: user.email,
      supplementsTaken: logs.length,
      totalSupplements: supplements.length * 7, // weekly total
      averageSteps,
      averageSleep,
      streak: 12 // simplified
    };

    const emailContent = generateEmailContent(summaryData);

    await mailService.send({
      to: user.email,
      from: process.env.FROM_EMAIL || 'noreply@gohealme.com',
      subject: '📊 Your Weekly Health Summary - GoHealMe',
      html: emailContent,
      text: generateTextContent(summaryData)
    });

    return true;
  } catch (error) {
    console.error('Failed to send weekly summary:', error);
    return false;
  }
}

function generateEmailContent(data: WeeklySummaryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weekly Health Summary</title>
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #4ADE80 0%, #166534 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .metric-card { background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 15px 0; border-left: 4px solid #4ADE80; }
        .metric-value { font-size: 24px; font-weight: bold; color: #166534; }
        .metric-label { color: #6b7280; font-size: 14px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌿 Weekly Health Summary</h1>
          <p>Hi ${data.userName}, here's how you did this week!</p>
        </div>
        <div class="content">
          <div class="metric-card">
            <div class="metric-value">${data.supplementsTaken}/${data.totalSupplements}</div>
            <div class="metric-label">Supplements Taken This Week</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">${data.averageSteps.toLocaleString()}</div>
            <div class="metric-label">Average Daily Steps</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">${data.averageSleep}h</div>
            <div class="metric-label">Average Sleep Duration</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">${data.streak} days</div>
            <div class="metric-label">Current Streak</div>
          </div>
          
          <p>Keep up the great work! Consistency is key to achieving your health goals.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.APP_URL || 'https://gohealme.com'}" 
               style="background-color: #4ADE80; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              View Full Dashboard
            </a>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent by GoHealMe Health Tracker.<br>
          You're receiving this because you have weekly summaries enabled.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateTextContent(data: WeeklySummaryData): string {
  return `
Weekly Health Summary - GoHealMe

Hi ${data.userName},

Here's your weekly health summary:

📊 Supplements: ${data.supplementsTaken}/${data.totalSupplements} taken
👟 Average Steps: ${data.averageSteps.toLocaleString()} per day  
😴 Average Sleep: ${data.averageSleep} hours
🔥 Current Streak: ${data.streak} days

Keep up the great work! Consistency is key to achieving your health goals.

View your full dashboard: ${process.env.APP_URL || 'https://gohealme.com'}

---
GoHealMe Health Tracker
  `;
}

export async function scheduleWeeklySummaries(): Promise<void> {
  // This would typically be called by a cron job
  // For now, it's a simple function that can be called manually
  console.log("Weekly summary scheduler would run here");
}
