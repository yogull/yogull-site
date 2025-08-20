import { db } from "../db";
import { users, chatMessages, advertisements, businessProspects } from "@shared/schema";
import { eq, sql, desc, gte, count } from "drizzle-orm";
import { sendEmail } from "../email";

interface AlertLevel {
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  priority: number;
}

interface SystemAlert {
  timestamp: string;
  level: AlertLevel['level'];
  component: string;
  message: string;
  errorDetails?: any;
  actionRequired: string;
}

export class CriticalAlertSystem {
  private static instance: CriticalAlertSystem;
  private alertInterval: NodeJS.Timeout | null = null;
  private lastHealthCheck: Date = new Date();
  private consecutiveFailures: Map<string, number> = new Map();

  // CRITICAL: Alert immediately if any of these fail
  private readonly CRITICAL_COMPONENTS = [
    'database_connection',
    'user_authentication', 
    'payment_system',
    'advertisement_carousel',
    'business_campaigns',
    'chat_system',
    'email_service'
  ];

  public static getInstance(): CriticalAlertSystem {
    if (!CriticalAlertSystem.instance) {
      CriticalAlertSystem.instance = new CriticalAlertSystem();
    }
    return CriticalAlertSystem.instance;
  }

  // Start continuous monitoring (every 30 seconds)
  public startContinuousMonitoring() {
    console.log("🚨 CRITICAL ALERT SYSTEM ACTIVATED - Zero downtime monitoring started");
    
    // Immediate health check
    this.performHealthCheck();
    
    // Continuous monitoring every 30 seconds
    this.alertInterval = setInterval(async () => {
      await this.performHealthCheck();
    }, 30 * 1000); // 30 seconds
  }

  public stopMonitoring() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
      console.log("🛑 Critical alert monitoring stopped");
    }
  }

  // CRITICAL: Comprehensive health check with immediate alerts
  private async performHealthCheck() {
    const checkStart = Date.now();
    const alerts: SystemAlert[] = [];

    try {
      // 1. DATABASE CONNECTION - CRITICAL
      await this.checkDatabaseConnection(alerts);
      
      // 2. USER AUTHENTICATION - CRITICAL  
      await this.checkUserAuthentication(alerts);
      
      // 3. PAYMENT SYSTEM - CRITICAL
      await this.checkPaymentSystem(alerts);
      
      // 4. ADVERTISEMENT SYSTEM - CRITICAL
      await this.checkAdvertisementSystem(alerts);
      
      // 5. BUSINESS CAMPAIGNS - CRITICAL
      await this.checkBusinessCampaigns(alerts);
      
      // 6. CHAT SYSTEM - CRITICAL
      await this.checkChatSystem(alerts);
      
      // 7. EMAIL SERVICE - CRITICAL
      await this.checkEmailService(alerts);

      // 8. PERFORMANCE CHECK - WARNING LEVEL
      await this.checkSystemPerformance(alerts, checkStart);

      // Process all alerts immediately
      await this.processAlerts(alerts);
      
      this.lastHealthCheck = new Date();
      
      if (alerts.length === 0) {
        // Reset failure counters on successful check
        this.consecutiveFailures.clear();
        console.log(`✅ ALL SYSTEMS OPERATIONAL - Health check completed in ${Date.now() - checkStart}ms`);
      }

    } catch (error) {
      const criticalAlert: SystemAlert = {
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'health_check_system',
        message: 'HEALTH CHECK SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Health monitoring system has failed - manual intervention required'
      };
      
      await this.sendImmediateAlert(criticalAlert);
      console.error("🚨 CRITICAL: Health check system failure:", error);
    }
  }

  // Check database connectivity and performance
  private async checkDatabaseConnection(alerts: SystemAlert[]) {
    try {
      const startTime = Date.now();
      const result = await db.select({ count: sql`count(*)` }).from(users);
      const queryTime = Date.now() - startTime;
      
      if (queryTime > 5000) {
        alerts.push({
          timestamp: new Date().toISOString(),
          level: 'WARNING',
          component: 'database_connection',
          message: `Database query slow: ${queryTime}ms`,
          actionRequired: 'Check database performance and optimize queries'
        });
      }
      
      if (!result || result.length === 0) {
        throw new Error('Database query returned no results');
      }
      
      this.resetFailureCount('database_connection');
      
    } catch (error) {
      this.incrementFailureCount('database_connection');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'database_connection',
        message: 'DATABASE CONNECTION FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Database is unreachable - check connection and restart if needed'
      });
    }
  }

  // Check user authentication system
  private async checkUserAuthentication(alerts: SystemAlert[]) {
    try {
      // Verify admin users exist
      const adminUsers = await db.select({ count: sql`count(*)` })
        .from(users)
        .where(eq(users.isAdmin, true));
      
      if (!adminUsers[0] || adminUsers[0].count === 0) {
        alerts.push({
          timestamp: new Date().toISOString(),
          level: 'CRITICAL',
          component: 'user_authentication',
          message: 'NO ADMIN USERS FOUND',
          actionRequired: 'IMMEDIATE: Create admin user to prevent platform lockout'
        });
      }
      
      this.resetFailureCount('user_authentication');
      
    } catch (error) {
      this.incrementFailureCount('user_authentication');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'user_authentication',
        message: 'USER AUTHENTICATION SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Authentication system down - users cannot login'
      });
    }
  }

  // Check payment processing
  private async checkPaymentSystem(alerts: SystemAlert[]) {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        alerts.push({
          timestamp: new Date().toISOString(),
          level: 'CRITICAL',
          component: 'payment_system',
          message: 'STRIPE API KEY MISSING',
          actionRequired: 'IMMEDIATE: Configure Stripe API key - payments will fail'
        });
      }
      
      this.resetFailureCount('payment_system');
      
    } catch (error) {
      this.incrementFailureCount('payment_system');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'payment_system',
        message: 'PAYMENT SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Payment processing down - revenue loss occurring'
      });
    }
  }

  // Check advertisement carousel system
  private async checkAdvertisementSystem(alerts: SystemAlert[]) {
    try {
      const activeAds = await db.select({ count: sql`count(*)` })
        .from(advertisements)
        .where(eq(advertisements.isActive, true));
      
      if (!activeAds[0] || activeAds[0].count === 0) {
        alerts.push({
          timestamp: new Date().toISOString(),
          level: 'WARNING',
          component: 'advertisement_carousel',
          message: 'NO ACTIVE ADVERTISEMENTS',
          actionRequired: 'Check advertisement system and activate business ads'
        });
      }
      
      this.resetFailureCount('advertisement_carousel');
      
    } catch (error) {
      this.incrementFailureCount('advertisement_carousel');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'advertisement_carousel',
        message: 'ADVERTISEMENT SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Advertisement carousel down - business revenue affected'
      });
    }
  }

  // Check business campaign system
  private async checkBusinessCampaigns(alerts: SystemAlert[]) {
    try {
      // Check if business_prospects table exists, if not skip this check
      try {
        const prospects = await db.select({ count: sql`count(*)` })
          .from(businessProspects);
        
        if (!prospects[0] || prospects[0].count === 0) {
          alerts.push({
            timestamp: new Date().toISOString(),
            level: 'WARNING',
            component: 'business_campaigns',
            message: 'NO BUSINESS PROSPECTS',
            actionRequired: 'Populate business prospect database for campaign system'
          });
        }
      } catch (tableError: any) {
        if (tableError.code === '42P01') {
          // Table doesn't exist - this is normal, skip the check
          this.resetFailureCount('business_campaigns');
          return;
        }
        throw tableError;
      }
      
      this.resetFailureCount('business_campaigns');
      
    } catch (error) {
      this.incrementFailureCount('business_campaigns');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'business_campaigns',
        message: 'BUSINESS CAMPAIGN SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Business outreach system down - new customer acquisition stopped'
      });
    }
  }

  // Check chat and AI system
  private async checkChatSystem(alerts: SystemAlert[]) {
    try {
      const recentMessages = await db.select({ count: sql`count(*)` })
        .from(chatMessages)
        .where(gte(chatMessages.createdAt, new Date(Date.now() - 60 * 60 * 1000))); // Last hour
      
      this.resetFailureCount('chat_system');
      
    } catch (error) {
      this.incrementFailureCount('chat_system');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'chat_system',
        message: 'CHAT SYSTEM FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Chat and AI assistant down - user engagement affected'
      });
    }
  }

  // Check email service
  private async checkEmailService(alerts: SystemAlert[]) {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        alerts.push({
          timestamp: new Date().toISOString(),
          level: 'CRITICAL',
          component: 'email_service',
          message: 'SENDGRID API KEY MISSING',
          actionRequired: 'IMMEDIATE: Configure SendGrid API key - emails will fail'
        });
      }
      
      this.resetFailureCount('email_service');
      
    } catch (error) {
      this.incrementFailureCount('email_service');
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'CRITICAL',
        component: 'email_service',
        message: 'EMAIL SERVICE FAILURE',
        errorDetails: error,
        actionRequired: 'IMMEDIATE: Email system down - business communications affected'
      });
    }
  }

  // Check system performance
  private async checkSystemPerformance(alerts: SystemAlert[], checkStart: number) {
    const totalCheckTime = Date.now() - checkStart;
    
    if (totalCheckTime > 10000) { // More than 10 seconds
      alerts.push({
        timestamp: new Date().toISOString(),
        level: 'WARNING',
        component: 'system_performance',
        message: `Slow system response: ${totalCheckTime}ms`,
        actionRequired: 'Check server performance and optimize slow components'
      });
    }
  }

  // Process and send alerts immediately
  private async processAlerts(alerts: SystemAlert[]) {
    for (const alert of alerts) {
      await this.sendImmediateAlert(alert);
      
      // Log to console with appropriate severity
      if (alert.level === 'CRITICAL') {
        console.error(`🚨 CRITICAL ALERT: ${alert.component} - ${alert.message}`);
        console.error(`ACTION REQUIRED: ${alert.actionRequired}`);
        if (alert.errorDetails) {
          console.error('Error Details:', alert.errorDetails);
        }
      } else if (alert.level === 'WARNING') {
        console.warn(`⚠️ WARNING: ${alert.component} - ${alert.message}`);
        console.warn(`Action: ${alert.actionRequired}`);
      } else {
        console.info(`ℹ️ INFO: ${alert.component} - ${alert.message}`);
      }
    }
  }

  // Send immediate alert to workspace
  private async sendImmediateAlert(alert: SystemAlert) {
    try {
      // Console alert with maximum visibility
      console.log("\n".repeat(3));
      console.log("=".repeat(80));
      console.log(`🚨 ${alert.level} ALERT - IMMEDIATE ACTION REQUIRED`);
      console.log(`Component: ${alert.component}`);
      console.log(`Message: ${alert.message}`);
      console.log(`Action: ${alert.actionRequired}`);
      console.log(`Time: ${alert.timestamp}`);
      if (alert.errorDetails) {
        console.log(`Details: ${JSON.stringify(alert.errorDetails, null, 2)}`);
      }
      console.log("=".repeat(80));
      console.log("\n".repeat(3));
      
      // Try to send email alert if email system is working
      if (alert.component !== 'email_service' && process.env.SENDGRID_API_KEY) {
        try {
          await sendEmail(
            'gohealme.org@gmail.com',
            `🚨 ${alert.level}: ${alert.component} - Ordinary People Community`,
            `
            <h2>🚨 ${alert.level} SYSTEM ALERT</h2>
            <p><strong>Component:</strong> ${alert.component}</p>
            <p><strong>Message:</strong> ${alert.message}</p>
            <p><strong>Action Required:</strong> ${alert.actionRequired}</p>
            <p><strong>Time:</strong> ${alert.timestamp}</p>
            ${alert.errorDetails ? `<p><strong>Error Details:</strong> ${JSON.stringify(alert.errorDetails)}</p>` : ''}
            <p>Platform status requires immediate attention to prevent downtime.</p>
            `
          );
        } catch (emailError) {
          console.error("Failed to send email alert:", emailError);
        }
      }
      
    } catch (error) {
      console.error("CRITICAL: Failed to send alert:", error);
    }
  }

  // Track consecutive failures for escalation
  private incrementFailureCount(component: string) {
    const current = this.consecutiveFailures.get(component) || 0;
    this.consecutiveFailures.set(component, current + 1);
    
    if (current >= 3) {
      console.error(`🚨 ESCALATION: ${component} has failed ${current + 1} consecutive times`);
    }
  }

  private resetFailureCount(component: string) {
    this.consecutiveFailures.delete(component);
  }

  // Generate comprehensive status report
  public generateStatusReport() {
    const report = {
      timestamp: new Date().toISOString(),
      systemStatus: 'OPERATIONAL',
      lastHealthCheck: this.lastHealthCheck.toISOString(),
      monitoring: 'ACTIVE',
      criticalComponents: this.CRITICAL_COMPONENTS,
      failureCount: Object.fromEntries(this.consecutiveFailures),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    };
    
    console.log("📊 === SYSTEM STATUS REPORT ===");
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  }
}

// Export singleton instance
export const criticalAlerts = CriticalAlertSystem.getInstance();