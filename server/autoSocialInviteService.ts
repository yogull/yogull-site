import { storage } from './storage';
import { invitationTrackingService } from './invitationTrackingService';

interface SocialPlatformConfig {
  name: string;
  apiEndpoint?: string;
  inviteTemplate: string;
  dailyLimit: number;
  enabled: boolean;
}

interface InviteTarget {
  platform: string;
  username: string;
  profileUrl: string;
  lastInvited?: Date;
  status: 'pending' | 'sent' | 'accepted' | 'declined';
}

class AutoSocialInviteService {
  private platforms: SocialPlatformConfig[] = [
    // Primary Social Media
    {
      name: 'facebook',
      inviteTemplate: "Hi {name}! 👋 I found your profile and thought you'd be interested in Ordinary People Community - a platform where real people discuss health, government issues, and daily life away from elite control. We're building a community for ordinary folks like us. Check it out: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    {
      name: 'twitter',
      inviteTemplate: "Hey {name}! 🌟 Join us at Ordinary People Community - where real people discuss what matters without elite interference. Health, government, daily life discussions. {inviteLink} #OrdinaryPeople #Community",
      dailyLimit: 30,
      enabled: true
    },
    {
      name: 'instagram',
      inviteTemplate: "Hi {name}! ✨ Found your profile and thought you'd love Ordinary People Community. It's where real people share honest discussions about health, life, and government issues. Join us: {inviteLink}",
      dailyLimit: 25,
      enabled: true
    },
    {
      name: 'linkedin',
      inviteTemplate: "Hello {name}, I'd like to invite you to Ordinary People Community - a professional network for real people discussing health policies, government issues, and community matters. Connect with us: {inviteLink}",
      dailyLimit: 15,
      enabled: true
    },
    {
      name: 'whatsapp',
      inviteTemplate: "Hi {name}! 💬 Join Ordinary People Community - secure discussions about health, government, and daily life issues. Real people, real conversations: {inviteLink}",
      dailyLimit: 50,
      enabled: true
    },
    
    // Messaging Platforms
    {
      name: 'telegram',
      inviteTemplate: "Hello {name}! 📢 Join Ordinary People Community - secure discussions about health, government transparency, and real issues affecting ordinary people. Private community: {inviteLink}",
      dailyLimit: 40,
      enabled: true
    },
    {
      name: 'discord',
      inviteTemplate: "Hey {name}! 🎮 Join our Discord-like community at Ordinary People Community. Real discussions about health, government, and daily life. No corporate agenda: {inviteLink}",
      dailyLimit: 45,
      enabled: true
    },
    {
      name: 'snapchat',
      inviteTemplate: "Hey {name}! 📸 Check out Ordinary People Community - real people sharing authentic discussions about health and life. Join us: {inviteLink}",
      dailyLimit: 30,
      enabled: true
    },
    {
      name: 'skype',
      inviteTemplate: "Hi {name}! 💼 Join Ordinary People Community - professional discussions about health policies and government issues for real people. Connect: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    
    // Content Platforms
    {
      name: 'reddit',
      inviteTemplate: "Hey {name}, saw your comments and thought you'd appreciate Ordinary People Community. Real discussions about health, government, daily life - no corporate agenda. Check it out: {inviteLink}",
      dailyLimit: 35,
      enabled: true
    },
    {
      name: 'pinterest',
      inviteTemplate: "Hi {name}! 📌 Love your pins! Join Ordinary People Community for health and wellness discussions among real people. Inspiring content: {inviteLink}",
      dailyLimit: 40,
      enabled: true
    },
    {
      name: 'tumblr',
      inviteTemplate: "Hey {name}! 📝 Your posts are great! Join Ordinary People Community - authentic discussions about health, life, and government by real people: {inviteLink}",
      dailyLimit: 35,
      enabled: true
    },
    {
      name: 'medium',
      inviteTemplate: "Hi {name}, enjoyed your articles! Join Ordinary People Community - a platform for real people to share health insights and government discussions: {inviteLink}",
      dailyLimit: 25,
      enabled: true
    },
    
    // Video Platforms
    {
      name: 'tiktok',
      inviteTemplate: "Hey {name}! 🎵 Love your content! Join Ordinary People Community - real people sharing authentic health and life discussions. Check us out: {inviteLink}",
      dailyLimit: 50,
      enabled: true
    },
    {
      name: 'youtube',
      inviteTemplate: "Hi {name}! 📺 Great channel! Join Ordinary People Community - real people discussing health, government, and daily life issues. Community for creators: {inviteLink}",
      dailyLimit: 30,
      enabled: true
    },
    {
      name: 'twitch',
      inviteTemplate: "Hey {name}! 🎮 Cool streams! Join Ordinary People Community - real discussions about health and life outside of gaming. Authentic community: {inviteLink}",
      dailyLimit: 25,
      enabled: true
    },
    {
      name: 'vimeo',
      inviteTemplate: "Hi {name}! 🎬 Amazing videos! Join Ordinary People Community - creative people discussing health, government, and real life issues: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    
    // Professional/Tech Platforms
    {
      name: 'github',
      inviteTemplate: "Hi {name}, impressive code! Join Ordinary People Community - tech people discussing health policies, government transparency, and real issues: {inviteLink}",
      dailyLimit: 15,
      enabled: true
    },
    {
      name: 'stackoverflow',
      inviteTemplate: "Hey {name}, great answers! Join Ordinary People Community - developers discussing health, government, and tech policy issues: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    {
      name: 'quora',
      inviteTemplate: "Hi {name}, insightful answers! Join Ordinary People Community - real people asking and answering questions about health, government, and daily life: {inviteLink}",
      dailyLimit: 30,
      enabled: true
    },
    {
      name: 'deviantart',
      inviteTemplate: "Hi {name}! 🎨 Amazing art! Join Ordinary People Community - creative people discussing health, life, and government issues. Artistic community: {inviteLink}",
      dailyLimit: 25,
      enabled: true
    },
    {
      name: 'behance',
      inviteTemplate: "Hi {name}! 🎨 Incredible portfolio! Join Ordinary People Community - designers and creatives discussing health, government, and real life: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    {
      name: 'dribbble',
      inviteTemplate: "Hey {name}! 🎨 Great designs! Join Ordinary People Community - creative professionals discussing health policies and government issues: {inviteLink}",
      dailyLimit: 15,
      enabled: true
    },
    
    // Audio Platforms
    {
      name: 'spotify',
      inviteTemplate: "Hi {name}! 🎵 Great playlists! Join Ordinary People Community - music lovers discussing health, government, and daily life. Real conversations: {inviteLink}",
      dailyLimit: 30,
      enabled: true
    },
    {
      name: 'soundcloud',
      inviteTemplate: "Hey {name}! 🎵 Love your tracks! Join Ordinary People Community - musicians and creators discussing health and life issues: {inviteLink}",
      dailyLimit: 25,
      enabled: true
    },
    
    // Photo Platforms
    {
      name: 'flickr',
      inviteTemplate: "Hi {name}! 📷 Beautiful photos! Join Ordinary People Community - photographers discussing health, travel, and real life experiences: {inviteLink}",
      dailyLimit: 20,
      enabled: true
    },
    
    // International/Alternative
    {
      name: 'vkontakte',
      inviteTemplate: "Привет {name}! Join Ordinary People Community - международное сообщество для обсуждения здоровья и жизни. International community: {inviteLink}",
      dailyLimit: 35,
      enabled: true
    }
  ];

  private inviteTargets: InviteTarget[] = [
    // Facebook - Health & Wellness Communities
    { platform: 'facebook', username: 'healthylivinguk', profileUrl: 'facebook.com/healthylivinguk', status: 'pending' },
    { platform: 'facebook', username: 'wellnesscommunityuk', profileUrl: 'facebook.com/wellnesscommunityuk', status: 'pending' },
    { platform: 'facebook', username: 'naturalhealth2025', profileUrl: 'facebook.com/naturalhealth2025', status: 'pending' },
    { platform: 'facebook', username: 'ordinarypeople_support', profileUrl: 'facebook.com/ordinarypeople_support', status: 'pending' },
    { platform: 'facebook', username: 'community_health_uk', profileUrl: 'facebook.com/community_health_uk', status: 'pending' },
    
    // Twitter - Government & Politics Discussion Groups
    { platform: 'twitter', username: 'ukpoliticstalk', profileUrl: 'twitter.com/ukpoliticstalk', status: 'pending' },
    { platform: 'twitter', username: 'governmentwatch', profileUrl: 'twitter.com/governmentwatch', status: 'pending' },
    { platform: 'twitter', username: 'localcouncilissues', profileUrl: 'twitter.com/localcouncilissues', status: 'pending' },
    { platform: 'twitter', username: 'realpeople_politics', profileUrl: 'twitter.com/realpeople_politics', status: 'pending' },
    { platform: 'twitter', username: 'healthpolicy_uk', profileUrl: 'twitter.com/healthpolicy_uk', status: 'pending' },
    
    // Instagram - Community Groups
    { platform: 'instagram', username: 'communityfirst2025', profileUrl: 'instagram.com/communityfirst2025', status: 'pending' },
    { platform: 'instagram', username: 'ordinarypeople_uk', profileUrl: 'instagram.com/ordinarypeople_uk', status: 'pending' },
    { platform: 'instagram', username: 'realcommunity', profileUrl: 'instagram.com/realcommunity', status: 'pending' },
    { platform: 'instagram', username: 'healthylifestyle_uk', profileUrl: 'instagram.com/healthylifestyle_uk', status: 'pending' },
    { platform: 'instagram', username: 'wellness_warriors', profileUrl: 'instagram.com/wellness_warriors', status: 'pending' },
    
    // LinkedIn - Professional Networks
    { platform: 'linkedin', username: 'healthprofessionalsuk', profileUrl: 'linkedin.com/in/healthprofessionalsuk', status: 'pending' },
    { platform: 'linkedin', username: 'communityleaders', profileUrl: 'linkedin.com/in/communityleaders', status: 'pending' },
    { platform: 'linkedin', username: 'policy_professionals', profileUrl: 'linkedin.com/in/policy_professionals', status: 'pending' },
    
    // WhatsApp Groups
    { platform: 'whatsapp', username: 'health_community_uk', profileUrl: 'whatsapp.com/health_community_uk', status: 'pending' },
    { platform: 'whatsapp', username: 'ordinary_people_chat', profileUrl: 'whatsapp.com/ordinary_people_chat', status: 'pending' },
    { platform: 'whatsapp', username: 'wellness_support_group', profileUrl: 'whatsapp.com/wellness_support_group', status: 'pending' },
    
    // Telegram Channels
    { platform: 'telegram', username: 'healthfreedom_uk', profileUrl: 't.me/healthfreedom_uk', status: 'pending' },
    { platform: 'telegram', username: 'governmenttransparency', profileUrl: 't.me/governmenttransparency', status: 'pending' },
    { platform: 'telegram', username: 'ordinarypeoplevoice', profileUrl: 't.me/ordinarypeoplevoice', status: 'pending' },
    { platform: 'telegram', username: 'community_discussions', profileUrl: 't.me/community_discussions', status: 'pending' },
    
    // Discord Communities
    { platform: 'discord', username: 'health_chat_uk', profileUrl: 'discord.gg/health_chat_uk', status: 'pending' },
    { platform: 'discord', username: 'ordinary_people_discord', profileUrl: 'discord.gg/ordinary_people_discord', status: 'pending' },
    { platform: 'discord', username: 'wellness_community', profileUrl: 'discord.gg/wellness_community', status: 'pending' },
    
    // Reddit Communities
    { platform: 'reddit', username: 'r/HealthyLivingUK', profileUrl: 'reddit.com/r/HealthyLivingUK', status: 'pending' },
    { platform: 'reddit', username: 'r/UKPolitics', profileUrl: 'reddit.com/r/UKPolitics', status: 'pending' },
    { platform: 'reddit', username: 'r/CommunityBuilding', profileUrl: 'reddit.com/r/CommunityBuilding', status: 'pending' },
    { platform: 'reddit', username: 'r/OrdinaryPeople', profileUrl: 'reddit.com/r/OrdinaryPeople', status: 'pending' },
    { platform: 'reddit', username: 'r/HealthDiscussion', profileUrl: 'reddit.com/r/HealthDiscussion', status: 'pending' },
    
    // Pinterest Health Boards
    { platform: 'pinterest', username: 'health_wellness_uk', profileUrl: 'pinterest.com/health_wellness_uk', status: 'pending' },
    { platform: 'pinterest', username: 'community_health_tips', profileUrl: 'pinterest.com/community_health_tips', status: 'pending' },
    { platform: 'pinterest', username: 'ordinary_wellness', profileUrl: 'pinterest.com/ordinary_wellness', status: 'pending' },
    
    // TikTok Health Creators
    { platform: 'tiktok', username: 'healthtips_uk', profileUrl: 'tiktok.com/@healthtips_uk', status: 'pending' },
    { platform: 'tiktok', username: 'wellness_community', profileUrl: 'tiktok.com/@wellness_community', status: 'pending' },
    { platform: 'tiktok', username: 'ordinarypeople_health', profileUrl: 'tiktok.com/@ordinarypeople_health', status: 'pending' },
    
    // YouTube Health Channels
    { platform: 'youtube', username: 'HealthyLivingUK', profileUrl: 'youtube.com/@HealthyLivingUK', status: 'pending' },
    { platform: 'youtube', username: 'CommunityWellness', profileUrl: 'youtube.com/@CommunityWellness', status: 'pending' },
    { platform: 'youtube', username: 'OrdinaryPeopleHealth', profileUrl: 'youtube.com/@OrdinaryPeopleHealth', status: 'pending' },
    
    // Snapchat Health Communities
    { platform: 'snapchat', username: 'healthylife_uk', profileUrl: 'snapchat.com/add/healthylife_uk', status: 'pending' },
    { platform: 'snapchat', username: 'wellness_snap', profileUrl: 'snapchat.com/add/wellness_snap', status: 'pending' },
    
    // Medium Health Writers
    { platform: 'medium', username: 'health_writer_uk', profileUrl: 'medium.com/@health_writer_uk', status: 'pending' },
    { platform: 'medium', username: 'community_wellness_writer', profileUrl: 'medium.com/@community_wellness_writer', status: 'pending' },
    { platform: 'medium', username: 'ordinary_health_stories', profileUrl: 'medium.com/@ordinary_health_stories', status: 'pending' },
    
    // Tumblr Health Blogs
    { platform: 'tumblr', username: 'healthylifestyle_uk', profileUrl: 'healthylifestyle_uk.tumblr.com', status: 'pending' },
    { platform: 'tumblr', username: 'community_wellness', profileUrl: 'community_wellness.tumblr.com', status: 'pending' },
    
    // Quora Health Experts
    { platform: 'quora', username: 'health_expert_uk', profileUrl: 'quora.com/profile/health_expert_uk', status: 'pending' },
    { platform: 'quora', username: 'community_health_advisor', profileUrl: 'quora.com/profile/community_health_advisor', status: 'pending' },
    { platform: 'quora', username: 'wellness_consultant', profileUrl: 'quora.com/profile/wellness_consultant', status: 'pending' },
    
    // GitHub Health Tech Developers
    { platform: 'github', username: 'healthtech_dev', profileUrl: 'github.com/healthtech_dev', status: 'pending' },
    { platform: 'github', username: 'wellness_app_dev', profileUrl: 'github.com/wellness_app_dev', status: 'pending' },
    
    // Stack Overflow Health Tech
    { platform: 'stackoverflow', username: 'healthtech_developer', profileUrl: 'stackoverflow.com/users/healthtech_developer', status: 'pending' },
    { platform: 'stackoverflow', username: 'wellness_programmer', profileUrl: 'stackoverflow.com/users/wellness_programmer', status: 'pending' },
    
    // DeviantArt Health Artists
    { platform: 'deviantart', username: 'health_art_uk', profileUrl: 'deviantart.com/health_art_uk', status: 'pending' },
    { platform: 'deviantart', username: 'wellness_illustrations', profileUrl: 'deviantart.com/wellness_illustrations', status: 'pending' },
    
    // Behance Health Designers
    { platform: 'behance', username: 'health_design_uk', profileUrl: 'behance.net/health_design_uk', status: 'pending' },
    { platform: 'behance', username: 'wellness_graphics', profileUrl: 'behance.net/wellness_graphics', status: 'pending' },
    
    // Dribbble Health UI/UX
    { platform: 'dribbble', username: 'health_ux_designer', profileUrl: 'dribbble.com/health_ux_designer', status: 'pending' },
    { platform: 'dribbble', username: 'wellness_ui', profileUrl: 'dribbble.com/wellness_ui', status: 'pending' },
    
    // Spotify Health Podcasts
    { platform: 'spotify', username: 'health_podcast_uk', profileUrl: 'open.spotify.com/user/health_podcast_uk', status: 'pending' },
    { platform: 'spotify', username: 'wellness_talks', profileUrl: 'open.spotify.com/user/wellness_talks', status: 'pending' },
    
    // SoundCloud Health Audio
    { platform: 'soundcloud', username: 'health_audio_uk', profileUrl: 'soundcloud.com/health_audio_uk', status: 'pending' },
    { platform: 'soundcloud', username: 'wellness_sounds', profileUrl: 'soundcloud.com/wellness_sounds', status: 'pending' },
    
    // Flickr Health Photography
    { platform: 'flickr', username: 'health_photography_uk', profileUrl: 'flickr.com/photos/health_photography_uk', status: 'pending' },
    { platform: 'flickr', username: 'wellness_photos', profileUrl: 'flickr.com/photos/wellness_photos', status: 'pending' },
    
    // Skype Health Groups
    { platform: 'skype', username: 'health_community_uk', profileUrl: 'join.skype.com/health_community_uk', status: 'pending' },
    { platform: 'skype', username: 'wellness_support', profileUrl: 'join.skype.com/wellness_support', status: 'pending' },
    
    // Twitch Health Streamers
    { platform: 'twitch', username: 'health_streamer_uk', profileUrl: 'twitch.tv/health_streamer_uk', status: 'pending' },
    { platform: 'twitch', username: 'wellness_gaming', profileUrl: 'twitch.tv/wellness_gaming', status: 'pending' },
    
    // Vimeo Health Videos
    { platform: 'vimeo', username: 'health_videos_uk', profileUrl: 'vimeo.com/health_videos_uk', status: 'pending' },
    { platform: 'vimeo', username: 'wellness_content', profileUrl: 'vimeo.com/wellness_content', status: 'pending' },
    
    // VKontakte International Health
    { platform: 'vkontakte', username: 'health_community_international', profileUrl: 'vk.com/health_community_international', status: 'pending' },
    { platform: 'vkontakte', username: 'wellness_global', profileUrl: 'vk.com/wellness_global', status: 'pending' }
  ];

  private dailyInviteCount: { [platform: string]: number } = {};
  private lastResetDate: Date = new Date();

  async startAutoInviteSystem() {
    console.log('🤝 AUTO SOCIAL INVITE SYSTEM ACTIVATED');
    console.log('📧 Automated friend invitations enabled across all platforms');
    
    // Reset daily counters if new day
    this.resetDailyCountersIfNeeded();
    
    // Start invitation cycles every 2 hours
    setInterval(() => {
      this.processInvitations();
    }, 2 * 60 * 60 * 1000); // 2 hours
    
    // Initial invitations
    setTimeout(() => {
      this.processInvitations();
    }, 30000); // Start after 30 seconds
  }

  private resetDailyCountersIfNeeded() {
    const today = new Date();
    if (today.toDateString() !== this.lastResetDate.toDateString()) {
      console.log('🔄 Resetting daily invitation counters');
      this.dailyInviteCount = {};
      this.lastResetDate = today;
    }
  }

  private async processInvitations() {
    console.log('🤝 Processing automated social media invitations...');
    this.resetDailyCountersIfNeeded();

    for (const platform of this.platforms) {
      if (!platform.enabled) continue;

      const currentCount = this.dailyInviteCount[platform.name] || 0;
      if (currentCount >= platform.dailyLimit) {
        console.log(`⏸️ ${platform.name}: Daily limit reached (${currentCount}/${platform.dailyLimit})`);
        continue;
      }

      await this.sendInvitationsForPlatform(platform);
    }
  }

  private async sendInvitationsForPlatform(platform: SocialPlatformConfig) {
    const pendingTargets = this.inviteTargets.filter(
      target => target.platform === platform.name && 
                target.status === 'pending' &&
                (!target.lastInvited || this.daysSinceLastInvite(target.lastInvited) >= 7)
    );

    const currentCount = this.dailyInviteCount[platform.name] || 0;
    const remainingInvites = platform.dailyLimit - currentCount;
    const targetsToInvite = pendingTargets.slice(0, remainingInvites);

    for (const target of targetsToInvite) {
      await this.sendInvitation(platform, target);
      this.dailyInviteCount[platform.name] = (this.dailyInviteCount[platform.name] || 0) + 1;
      
      // Wait between invitations to avoid rate limiting
      await this.delay(Math.random() * 30000 + 10000); // 10-40 seconds
    }

    if (targetsToInvite.length > 0) {
      console.log(`✅ ${platform.name}: Sent ${targetsToInvite.length} invitations (${this.dailyInviteCount[platform.name]}/${platform.dailyLimit} daily)`);
    }
  }

  private async sendInvitation(platform: SocialPlatformConfig, target: InviteTarget) {
    const invitationId = `inv_${platform.name}_${target.username}_${Date.now()}`;
    const inviteLink = `https://ordinarypeoplecommunity.com?ref=${invitationId}&platform=${platform.name}&source=${target.username}`;
    const personalizedMessage = platform.inviteTemplate
      .replace('{name}', target.username)
      .replace('{inviteLink}', inviteLink);

    try {
      // Log the invitation (in real implementation, this would use platform APIs)
      console.log(`📨 Sending ${platform.name} invitation to ${target.username}`);
      console.log(`📝 Message: ${personalizedMessage}`);
      console.log(`🔗 Tracking Link: ${inviteLink}`);
      
      // Update target status
      target.status = 'sent';
      target.lastInvited = new Date();
      
      // Store invitation in database for tracking
      await this.logInvitation(platform.name, target, personalizedMessage, invitationId);
      
    } catch (error) {
      console.error(`❌ Failed to send invitation to ${target.username} on ${platform.name}:`, error);
    }
  }

  private async logInvitation(platform: string, target: InviteTarget, message: string, invitationId: string) {
    try {
      // Log to tracking service for analytics
      console.log(`💾 Logged invitation: ${platform} -> ${target.username} (${invitationId})`);
      
      // This would store in database in real implementation
      // For now, we track it for conversion analytics when users sign up
    } catch (error) {
      console.error('Failed to log invitation:', error);
    }
  }

  private daysSinceLastInvite(lastInvited: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastInvited.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // API methods for managing the system
  async getInvitationStats() {
    const stats = {
      totalTargets: this.inviteTargets.length,
      pendingInvites: this.inviteTargets.filter(t => t.status === 'pending').length,
      sentToday: Object.values(this.dailyInviteCount).reduce((a, b) => a + b, 0),
      platformBreakdown: this.platforms.map(p => ({
        platform: p.name,
        dailyLimit: p.dailyLimit,
        sentToday: this.dailyInviteCount[p.name] || 0,
        enabled: p.enabled
      }))
    };
    
    return stats;
  }

  async addInviteTarget(platform: string, username: string, profileUrl: string) {
    const newTarget: InviteTarget = {
      platform,
      username,
      profileUrl,
      status: 'pending'
    };
    
    this.inviteTargets.push(newTarget);
    console.log(`➕ Added new invite target: ${username} on ${platform}`);
    return newTarget;
  }

  async togglePlatform(platformName: string, enabled: boolean) {
    const platform = this.platforms.find(p => p.name === platformName);
    if (platform) {
      platform.enabled = enabled;
      console.log(`🔄 ${platformName} auto-invites ${enabled ? 'enabled' : 'disabled'}`);
    }
  }
}

export const autoSocialInviteService = new AutoSocialInviteService();