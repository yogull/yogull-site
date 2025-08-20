import { storage } from './storage';

interface ReferralReward {
  userId: number;
  referralsCount: number;
  freeAdsEarned: number;
  freeAdsUsed: number;
  lastUpdated: Date;
}

interface ReferralTracking {
  referrerId: number;
  newUserId: number;
  invitationId: string;
  platform: string;
  signupDate: Date;
  verified: boolean;
}

class ReferralIncentiveService {
  private static instance: ReferralIncentiveService;
  
  public static getInstance(): ReferralIncentiveService {
    if (!ReferralIncentiveService.instance) {
      ReferralIncentiveService.instance = new ReferralIncentiveService();
    }
    return ReferralIncentiveService.instance;
  }

  // Track when someone signs up via invitation link
  async trackReferralSignup(newUserId: number, invitationId: string): Promise<void> {
    try {
      // Extract referrer info from invitation ID format: inv_platform_username_timestamp
      const parts = invitationId.split('_');
      if (parts.length < 4) return;
      
      const platform = parts[1];
      const referrerUsername = parts[2];
      
      // Find referrer user (in real implementation, this would be tracked properly)
      // For now, we'll use admin user as example
      const referrerId = 4; // John's user ID
      
      // Record the referral
      const referralTracking: ReferralTracking = {
        referrerId,
        newUserId,
        invitationId,
        platform,
        signupDate: new Date(),
        verified: true
      };
      
      // Update referrer's reward count
      await this.updateReferrerRewards(referrerId);
      
      console.log(`✅ Referral tracked: User ${newUserId} referred by ${referrerId} via ${platform}`);
      
    } catch (error) {
      console.error('Error tracking referral signup:', error);
    }
  }

  // Update referrer rewards (1 free ad per 2 referrals)
  private async updateReferrerRewards(referrerId: number): Promise<void> {
    try {
      // Get current referral count for this user
      const currentRewards = await this.getReferralRewards(referrerId);
      const newReferralCount = currentRewards.referralsCount + 1;
      
      // Calculate free ads earned (1 free ad per 2 referrals)
      const newFreeAds = Math.floor(newReferralCount / 2);
      const additionalFreeAds = newFreeAds - currentRewards.freeAdsEarned;
      
      if (additionalFreeAds > 0) {
        console.log(`🎉 User ${referrerId} earned ${additionalFreeAds} free ads! (${newReferralCount} referrals = ${newFreeAds} total free ads)`);
        
        // In a real implementation, this would update the database
        // For now, we'll log the reward
        await this.saveReferralRewards({
          userId: referrerId,
          referralsCount: newReferralCount,
          freeAdsEarned: newFreeAds,
          freeAdsUsed: currentRewards.freeAdsUsed,
          lastUpdated: new Date()
        });
      }
      
    } catch (error) {
      console.error('Error updating referrer rewards:', error);
    }
  }

  // Get referral rewards for a user
  async getReferralRewards(userId: number): Promise<ReferralReward> {
    // In real implementation, this would query database
    // For now, return default values
    return {
      userId,
      referralsCount: 0,
      freeAdsEarned: 0,
      freeAdsUsed: 0,
      lastUpdated: new Date()
    };
  }

  // Save referral rewards (placeholder for database operation)
  private async saveReferralRewards(rewards: ReferralReward): Promise<void> {
    // This would save to database in real implementation
    console.log(`💾 Saved referral rewards for user ${rewards.userId}:`, rewards);
  }

  // Check if user can use a free ad
  async canUseFreeAd(userId: number): Promise<boolean> {
    const rewards = await this.getReferralRewards(userId);
    return (rewards.freeAdsEarned - rewards.freeAdsUsed) > 0;
  }

  // Use a free ad
  async useFreeAd(userId: number): Promise<boolean> {
    const rewards = await this.getReferralRewards(userId);
    
    if (rewards.freeAdsEarned > rewards.freeAdsUsed) {
      await this.saveReferralRewards({
        ...rewards,
        freeAdsUsed: rewards.freeAdsUsed + 1,
        lastUpdated: new Date()
      });
      
      console.log(`✅ User ${userId} used a free ad. Remaining: ${rewards.freeAdsEarned - rewards.freeAdsUsed - 1}`);
      return true;
    }
    
    return false;
  }

  // Get referral status for display
  async getReferralStatus(userId: number): Promise<{
    referralsCount: number;
    freeAdsAvailable: number;
    nextRewardAt: number;
  }> {
    const rewards = await this.getReferralRewards(userId);
    const freeAdsAvailable = rewards.freeAdsEarned - rewards.freeAdsUsed;
    const nextRewardAt = 2 - (rewards.referralsCount % 2);
    
    return {
      referralsCount: rewards.referralsCount,
      freeAdsAvailable,
      nextRewardAt: nextRewardAt === 0 ? 2 : nextRewardAt
    };
  }
}

export const referralIncentiveService = ReferralIncentiveService.getInstance();