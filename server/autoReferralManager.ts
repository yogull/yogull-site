import { storage } from './storage';
import { referralIncentiveService } from './referralIncentiveService';

interface ReferralRecord {
  userId: number;
  username: string;
  email: string;
  joinedViaLink: string;
  originalReferrer?: number;
  joinDate: Date;
  directReferrals: number[];
  totalReferrals: number;
  freeAdsEarned: number;
  freeAdsUsed: number;
  lastInstructionsSent?: Date;
}

class AutoReferralManager {
  private static instance: AutoReferralManager;
  private referralDatabase: Map<number, ReferralRecord> = new Map();

  public static getInstance(): AutoReferralManager {
    if (!AutoReferralManager.instance) {
      AutoReferralManager.instance = new AutoReferralManager();
    }
    return AutoReferralManager.instance;
  }

  // Record new user signup via referral link
  async recordNewSignup(userId: number, username: string, email: string, referralLink?: string): Promise<void> {
    try {
      console.log(`🔗 Recording new signup: User ${userId} (${username}) via link: ${referralLink}`);

      let originalReferrer = undefined;
      
      // Extract referrer from link if present
      if (referralLink && referralLink.includes('ref=')) {
        const match = referralLink.match(/ref=user_(\d+)_/);
        if (match) {
          originalReferrer = parseInt(match[1]);
          console.log(`👥 User ${userId} was referred by User ${originalReferrer}`);
        }
      }

      // Create referral record
      const record: ReferralRecord = {
        userId,
        username,
        email,
        joinedViaLink: referralLink || 'direct',
        originalReferrer,
        joinDate: new Date(),
        directReferrals: [],
        totalReferrals: 0,
        freeAdsEarned: 0,
        freeAdsUsed: 0
      };

      this.referralDatabase.set(userId, record);

      // If they were referred, update the referrer's count
      if (originalReferrer) {
        await this.updateReferrerCount(originalReferrer, userId);
      }

      // Send welcome and referral instructions
      await this.sendReferralInstructions(userId, true);

      console.log(`✅ Referral record created for User ${userId}`);

    } catch (error) {
      console.error('Error recording new signup:', error);
    }
  }

  // Update referrer's count when they bring someone in
  private async updateReferrerCount(referrerId: number, newUserId: number): Promise<void> {
    try {
      let referrerRecord = this.referralDatabase.get(referrerId);
      
      if (!referrerRecord) {
        // Create record for existing user if not exists
        const referrer = await storage.getUser(referrerId);
        if (referrer) {
          referrerRecord = {
            userId: referrerId,
            username: referrer.name || `User${referrerId}`,
            email: referrer.email || '',
            joinedViaLink: 'existing_user',
            joinDate: new Date(referrer.createdAt || Date.now()),
            directReferrals: [],
            totalReferrals: 0,
            freeAdsEarned: 0,
            freeAdsUsed: 0
          };
          this.referralDatabase.set(referrerId, referrerRecord);
        }
      }

      if (referrerRecord) {
        // Add new referral
        referrerRecord.directReferrals.push(newUserId);
        referrerRecord.totalReferrals = referrerRecord.directReferrals.length;
        
        // Calculate free ads (1 per 2 referrals)
        const newFreeAds = Math.floor(referrerRecord.totalReferrals / 2);
        const additionalAds = newFreeAds - referrerRecord.freeAdsEarned;
        
        if (additionalAds > 0) {
          referrerRecord.freeAdsEarned = newFreeAds;
          console.log(`🎉 User ${referrerId} earned ${additionalAds} new free ads! Total: ${newFreeAds}`);
          
          // Send reward notification
          await this.sendRewardNotification(referrerId, additionalAds, referrerRecord.totalReferrals);
        }

        // Send updated status
        await this.sendReferralInstructions(referrerId, false);
      }

    } catch (error) {
      console.error('Error updating referrer count:', error);
    }
  }

  // Send automated referral instructions to users
  private async sendReferralInstructions(userId: number, isNewUser: boolean): Promise<void> {
    try {
      const record = this.referralDatabase.get(userId);
      if (!record) return;

      const baseUrl = 'https://ordinarypeoplecommunity.com';
      const referralLink = `${baseUrl}?ref=user_${userId}_${Date.now()}&source=referral_program`;
      
      const welcomeMessage = isNewUser ? 
        `🎉 Welcome to Ordinary People Community, ${record.username}!\n\n` : 
        `📊 Referral Status Update for ${record.username}:\n\n`;

      const instructions = `
${welcomeMessage}🚀 FREE MONEY-MAKING PLATFORM - EVERYTHING DONE FOR YOU!

We've built you a complete business system for FREE:
✅ Your own professional website (no coding needed)
✅ Your own online shop (ready to sell immediately)
✅ Potential customers already here (25+ active users growing daily)
✅ Payment processing built-in (secure transactions)
✅ Marketing system included (referral rewards)

💰 MAKING MONEY IS NOW SIMPLE:
Instead of spending thousands building your own website and shop, you get everything FREE and can start earning immediately!

📈 YOUR CURRENT REFERRAL STATUS:
✅ Referrals Brought In: ${record.totalReferrals}
✅ Free Ads Earned: ${record.freeAdsEarned}
✅ Free Ads Available: ${record.freeAdsEarned - record.freeAdsUsed}
✅ Total Value Earned: £${(record.freeAdsEarned * 24).toFixed(0)}

🔗 YOUR UNIQUE REFERRAL LINK:
${referralLink}

💡 THREE WAYS TO MAKE MONEY:
1. PERSONAL SHOP: Sell your products to community members (keep 100% profits)
2. BUSINESS ADS: Advertise your services (£24/year or use free referral ads)
3. REFERRAL REWARDS: Every 2 people you bring = 1 free ad (£24 value)

🎯 AUTOMATIC REFERRAL REWARDS:
• Every 2 people who sign up = 1 FREE advertisement (worth £24)
• Refer 10 people = 5 free ads (£120 value)
• Refer 20 people = 10 free ads (£240 value)
• Refer 40 people = 20 free ads (£480 value)

🌟 WHY THIS IS AMAZING FOR EVERYONE:
Instead of spending £5,000-£15,000 to build your own website and shop, you get:
• Professional website design (worth £2,000+)
• E-commerce shop setup (worth £3,000+)  
• Payment processing (worth £500+ annually)
• Marketing system (worth £1,000+ annually)
• Ready-made customer base (priceless!)

👥 CUSTOMERS ALREADY HERE:
• 25+ active users browsing daily
• Health-conscious buyers looking for products
• Business owners seeking services
• Community members ready to support each other

📱 BEST PLACES TO SHARE YOUR LINK:
• Facebook groups about health/wellness
• WhatsApp family and friend groups  
• Twitter health/community hashtags
• LinkedIn professional networks
• Local community Facebook pages
• Health forums and discussion boards
• Text to friends interested in health/business

🤖 FULLY AUTOMATED BRAIN SYSTEM:
• Tracks every signup automatically
• Calculates your rewards instantly
• Sends you updates when you earn free ads
• No manual work needed - everything is automatic
• Free ads credited to your account immediately

💡 REAL EXAMPLE:
Sarah shared her link with 40 friends → 20 joined → She earned 10 free ads (£240 value) → Used them to advertise her homemade soaps → Sold £800 worth of products to community members!

${record.totalReferrals > 0 ? 
`🏆 EXCELLENT! You've brought ${record.totalReferrals} people to our community. Keep going!` : 
`🚀 START TODAY: Share your link and watch your free business advertising credits grow automatically!`}

This is your FREE business opportunity - no investment required!
- OPC Automated Business System
      `;

      // In a real system, this would send via email/SMS/platform messaging
      console.log(`📧 Sending referral instructions to User ${userId}:`);
      console.log(instructions);
      
      record.lastInstructionsSent = new Date();

    } catch (error) {
      console.error('Error sending referral instructions:', error);
    }
  }

  // Send reward notification when user earns free ads
  private async sendRewardNotification(userId: number, newAds: number, totalReferrals: number): Promise<void> {
    try {
      const record = this.referralDatabase.get(userId);
      if (!record) return;

      const notification = `
🎉 CONGRATULATIONS ${record.username}!

You just earned ${newAds} FREE ADVERTISEMENT${newAds > 1 ? 'S' : ''}!

📊 ACHIEVEMENT UNLOCKED:
✅ Total Referrals: ${totalReferrals}
✅ New Free Ads: ${newAds}
✅ Total Free Ads: ${record.freeAdsEarned}
✅ Value Earned: £${(newAds * 24).toFixed(0)}
✅ Total Value: £${(record.freeAdsEarned * 24).toFixed(0)}

🚀 USE YOUR FREE ADS:
• Visit the Business Directory
• Click "Advertise Your Business"
• Create your advertisement
• Select "Use Free Ad" at checkout

🎯 KEEP GOING:
• Each 2 more referrals = another free ad
• No limit on how many you can earn
• Free ads never expire

Keep sharing your referral link!
- OPC Automated Reward System
      `;

      console.log(`🏆 Sending reward notification to User ${userId}:`);
      console.log(notification);

    } catch (error) {
      console.error('Error sending reward notification:', error);
    }
  }

  // Get referral status for a user
  async getReferralStatus(userId: number): Promise<ReferralRecord | null> {
    return this.referralDatabase.get(userId) || null;
  }

  // Use a free ad
  async useFreeAd(userId: number): Promise<boolean> {
    const record = this.referralDatabase.get(userId);
    if (!record) return false;

    const availableAds = record.freeAdsEarned - record.freeAdsUsed;
    if (availableAds > 0) {
      record.freeAdsUsed += 1;
      console.log(`✅ User ${userId} used a free ad. Remaining: ${availableAds - 1}`);
      return true;
    }

    return false;
  }

  // Get all referral records for admin
  async getAllReferralRecords(): Promise<ReferralRecord[]> {
    return Array.from(this.referralDatabase.values());
  }

  // Auto-process new signups (called by signup endpoint)
  async processSignup(userData: { id: number, username: string, email: string }, referralLink?: string): Promise<void> {
    await this.recordNewSignup(userData.id, userData.username, userData.email, referralLink);
  }

  // Daily maintenance - send reminder instructions to active referrers
  async sendDailyReminders(): Promise<void> {
    try {
      console.log('🔄 Running daily referral reminders...');
      
      for (const record of this.referralDatabase.values()) {
        // Send reminders to users who have made referrals but haven't been contacted in 3 days
        const daysSinceLastInstructions = record.lastInstructionsSent 
          ? (Date.now() - record.lastInstructionsSent.getTime()) / (1000 * 60 * 60 * 24)
          : 999;

        if (record.totalReferrals > 0 && daysSinceLastInstructions > 3) {
          await this.sendReferralInstructions(record.userId, false);
          console.log(`📧 Sent reminder to active referrer User ${record.userId}`);
        }
      }

      console.log('✅ Daily referral reminders completed');
    } catch (error) {
      console.error('Error sending daily reminders:', error);
    }
  }
}

export const autoReferralManager = AutoReferralManager.getInstance();