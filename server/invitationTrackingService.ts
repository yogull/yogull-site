import { db } from './db';
import { eq, and, gte, sql } from 'drizzle-orm';

interface InvitationClick {
  id: string;
  invitationId: string;
  platform: string;
  targetUser: string;
  clickedAt: Date;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
}

interface InvitationConversion {
  id: string;
  invitationId: string;
  clickId: string;
  userId: number;
  platform: string;
  targetUser: string;
  signupAt: Date;
  conversionTime: number; // seconds from click to signup
}

interface BusinessEmailTracking {
  id: string;
  businessId: number;
  emailType: 'initial' | 'follow_up_1' | 'follow_up_2' | 'final';
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  respondedAt?: Date;
  status: 'sent' | 'opened' | 'clicked' | 'responded' | 'expired';
  responseContent?: string;
}

class InvitationTrackingService {
  private inviteClicks: Map<string, InvitationClick> = new Map();
  private conversions: Map<string, InvitationConversion> = new Map();
  private businessTracking: Map<string, BusinessEmailTracking> = new Map();

  // Track invitation click
  async trackInvitationClick(
    invitationId: string,
    platform: string,
    targetUser: string,
    ipAddress: string,
    userAgent: string,
    referrer?: string
  ): Promise<string> {
    const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const click: InvitationClick = {
      id: clickId,
      invitationId,
      platform,
      targetUser,
      clickedAt: new Date(),
      ipAddress,
      userAgent,
      referrer
    };

    this.inviteClicks.set(clickId, click);
    
    console.log(`🔗 Invitation click tracked: ${platform}/${targetUser} -> ${clickId}`);
    return clickId;
  }

  // Track successful signup conversion
  async trackSignupConversion(
    userId: number,
    clickId?: string,
    platform?: string,
    referralSource?: string
  ): Promise<void> {
    const conversionId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (clickId && this.inviteClicks.has(clickId)) {
      const click = this.inviteClicks.get(clickId)!;
      const conversionTime = Math.floor((Date.now() - click.clickedAt.getTime()) / 1000);
      
      const conversion: InvitationConversion = {
        id: conversionId,
        invitationId: click.invitationId,
        clickId,
        userId,
        platform: click.platform,
        targetUser: click.targetUser,
        signupAt: new Date(),
        conversionTime
      };

      this.conversions.set(conversionId, conversion);
      
      console.log(`✅ CONVERSION SUCCESS: ${click.platform}/${click.targetUser} -> User ${userId} (${conversionTime}s)`);
    } else if (platform && referralSource) {
      // Direct signup tracking without click ID
      const conversion: InvitationConversion = {
        id: conversionId,
        invitationId: `direct_${platform}_${referralSource}`,
        clickId: 'direct',
        userId,
        platform,
        targetUser: referralSource,
        signupAt: new Date(),
        conversionTime: 0
      };

      this.conversions.set(conversionId, conversion);
      
      console.log(`✅ DIRECT CONVERSION: ${platform}/${referralSource} -> User ${userId}`);
    }
  }

  // Track business email engagement
  async trackBusinessEmail(
    businessId: number,
    emailType: BusinessEmailTracking['emailType'],
    action: 'sent' | 'opened' | 'clicked' | 'responded',
    responseContent?: string
  ): Promise<void> {
    const trackingId = `biz_${businessId}_${emailType}`;
    
    let tracking = this.businessTracking.get(trackingId);
    if (!tracking) {
      tracking = {
        id: trackingId,
        businessId,
        emailType,
        sentAt: new Date(),
        status: 'sent'
      };
    }

    const now = new Date();
    
    switch (action) {
      case 'opened':
        tracking.openedAt = now;
        tracking.status = 'opened';
        break;
      case 'clicked':
        tracking.clickedAt = now;
        tracking.status = 'clicked';
        break;
      case 'responded':
        tracking.respondedAt = now;
        tracking.status = 'responded';
        tracking.responseContent = responseContent;
        break;
    }

    this.businessTracking.set(trackingId, tracking);
    
    console.log(`📧 Business email tracking: ${businessId} ${emailType} -> ${action}`);
  }

  // Generate comprehensive analytics
  async getInvitationAnalytics(): Promise<{
    totalInvitationsSent: number;
    totalClicks: number;
    totalConversions: number;
    clickRate: number;
    conversionRate: number;
    platformBreakdown: Record<string, {
      invitationsSent: number;
      clicks: number;
      conversions: number;
      clickRate: number;
      conversionRate: number;
      avgConversionTime: number;
    }>;
    businessEmailStats: {
      totalEmailsSent: number;
      openRate: number;
      clickRate: number;
      responseRate: number;
      byType: Record<string, {
        sent: number;
        opened: number;
        clicked: number;
        responded: number;
      }>;
    };
  }> {
    const clicks = Array.from(this.inviteClicks.values());
    const conversions = Array.from(this.conversions.values());
    const businessEmails = Array.from(this.businessTracking.values());

    // Calculate platform breakdown
    const platformBreakdown: Record<string, any> = {};
    
    for (const click of clicks) {
      if (!platformBreakdown[click.platform]) {
        platformBreakdown[click.platform] = {
          invitationsSent: 0,
          clicks: 0,
          conversions: 0,
          clickRate: 0,
          conversionRate: 0,
          avgConversionTime: 0
        };
      }
      platformBreakdown[click.platform].clicks++;
    }

    for (const conversion of conversions) {
      if (platformBreakdown[conversion.platform]) {
        platformBreakdown[conversion.platform].conversions++;
      }
    }

    // Calculate rates
    const totalInvitationsSent = 700; // Daily capacity
    const totalClicks = clicks.length;
    const totalConversions = conversions.length;

    for (const platform in platformBreakdown) {
      const data = platformBreakdown[platform];
      data.clickRate = (data.clicks / totalInvitationsSent) * 100;
      data.conversionRate = data.clicks > 0 ? (data.conversions / data.clicks) * 100 : 0;
      
      const platformConversions = conversions.filter(c => c.platform === platform);
      data.avgConversionTime = platformConversions.length > 0 
        ? platformConversions.reduce((sum, c) => sum + c.conversionTime, 0) / platformConversions.length
        : 0;
    }

    // Business email analytics
    const businessEmailStats = {
      totalEmailsSent: businessEmails.length,
      openRate: businessEmails.filter(e => e.openedAt).length / businessEmails.length * 100,
      clickRate: businessEmails.filter(e => e.clickedAt).length / businessEmails.length * 100,
      responseRate: businessEmails.filter(e => e.respondedAt).length / businessEmails.length * 100,
      byType: {} as Record<string, any>
    };

    for (const email of businessEmails) {
      if (!businessEmailStats.byType[email.emailType]) {
        businessEmailStats.byType[email.emailType] = {
          sent: 0,
          opened: 0,
          clicked: 0,
          responded: 0
        };
      }
      
      const typeStats = businessEmailStats.byType[email.emailType];
      typeStats.sent++;
      if (email.openedAt) typeStats.opened++;
      if (email.clickedAt) typeStats.clicked++;
      if (email.respondedAt) typeStats.responded++;
    }

    return {
      totalInvitationsSent,
      totalClicks,
      totalConversions,
      clickRate: (totalClicks / totalInvitationsSent) * 100,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      platformBreakdown,
      businessEmailStats
    };
  }

  // Get top performing platforms
  async getTopPerformingPlatforms(limit: number = 5): Promise<Array<{
    platform: string;
    conversions: number;
    conversionRate: number;
    avgConversionTime: number;
  }>> {
    const analytics = await this.getInvitationAnalytics();
    
    return Object.entries(analytics.platformBreakdown)
      .map(([platform, data]) => ({
        platform,
        conversions: data.conversions,
        conversionRate: data.conversionRate,
        avgConversionTime: data.avgConversionTime
      }))
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, limit);
  }

  // Get business response status
  async getBusinessResponseStatus(): Promise<Array<{
    businessId: number;
    emailsSent: number;
    lastEmailType: string;
    status: string;
    daysSinceLastEmail: number;
    needsFollowUp: boolean;
  }>> {
    const businessEmails = Array.from(this.businessTracking.values());
    const businessMap = new Map<number, any>();

    for (const email of businessEmails) {
      if (!businessMap.has(email.businessId)) {
        businessMap.set(email.businessId, {
          businessId: email.businessId,
          emailsSent: 0,
          lastEmailType: '',
          status: 'sent',
          lastEmailDate: new Date(0),
          needsFollowUp: false
        });
      }

      const business = businessMap.get(email.businessId)!;
      business.emailsSent++;
      
      if (email.sentAt > business.lastEmailDate) {
        business.lastEmailType = email.emailType;
        business.status = email.status;
        business.lastEmailDate = email.sentAt;
      }
    }

    return Array.from(businessMap.values()).map(business => {
      const daysSinceLastEmail = Math.floor((Date.now() - business.lastEmailDate.getTime()) / (1000 * 60 * 60 * 24));
      const needsFollowUp = business.status !== 'responded' && daysSinceLastEmail >= 7;

      return {
        businessId: business.businessId,
        emailsSent: business.emailsSent,
        lastEmailType: business.lastEmailType,
        status: business.status,
        daysSinceLastEmail,
        needsFollowUp
      };
    });
  }
}

export const invitationTrackingService = new InvitationTrackingService();