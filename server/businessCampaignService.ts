import { db } from "./db";
import { businessProspects, emailCampaigns, mockBusinessData, advertisements } from "@shared/schema";
import { eq, and, lt, isNull } from "drizzle-orm";
import { sendEmail } from "./email";

export class BusinessCampaignService {
  private static instance: BusinessCampaignService;
  private intervalId: NodeJS.Timeout | null = null;

  public static getInstance(): BusinessCampaignService {
    if (!BusinessCampaignService.instance) {
      BusinessCampaignService.instance = new BusinessCampaignService();
    }
    return BusinessCampaignService.instance;
  }

  // Initialize the automated campaign system
  public async startAutomatedCampaigns() {
    console.log("🚀 Starting automated business campaign system...");
    
    // Fill initial business data if empty
    await this.populateInitialBusinessData();
    
    // Start periodic campaign checks (every hour)
    this.intervalId = setInterval(async () => {
      await this.processAutomatedCampaigns();
      await this.processSevenDayReplacements();
    }, 60 * 60 * 1000); // 1 hour

    // Run initial campaign check
    await this.processAutomatedCampaigns();
    await this.processSevenDayReplacements();
  }

  // Stop the automated system
  public stopAutomatedCampaigns() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("🛑 Business campaign system stopped");
    }
  }

  // Populate initial business data and create prospects for email campaigns
  private async populateInitialBusinessData() {
    const existingProspects = await db.select().from(businessProspects).limit(1);
    if (existingProspects.length > 0) return;

    console.log("📊 Populating business prospects for email campaigns...");

    const businessData = [
      // UK Businesses
      { businessName: "The Crown Pub", category: "restaurant", address: "123 High Street", city: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, description: "Traditional British pub with authentic ales and hearty meals", website: "https://thecrownpub.co.uk", phone: "+44 20 7123 4567", email: "manager@thecrownpub.co.uk" },
      { businessName: "Manchester Tech Solutions", category: "services", address: "45 Innovation Drive", city: "Manchester", country: "United Kingdom", latitude: 53.4808, longitude: -2.2426, description: "IT consulting and digital transformation services", website: "https://manchestertech.co.uk", phone: "+44 161 234 5678", email: "hello@manchestertech.co.uk" },
      { businessName: "Edinburgh Coffee Roasters", category: "retail", address: "78 Royal Mile", city: "Edinburgh", country: "United Kingdom", latitude: 55.9533, longitude: -3.1883, description: "Artisan coffee roasters with premium Scottish blends", website: "https://edinburghcoffee.co.uk", phone: "+44 131 456 7890", email: "orders@edinburghcoffee.co.uk" },
      
      // US Businesses
      { businessName: "Brooklyn Artisan Bakery", category: "restaurant", address: "456 Brooklyn Avenue", city: "New York", country: "United States", latitude: 40.6782, longitude: -73.9442, description: "Handcrafted breads and pastries made daily", website: "https://brooklynbakery.com", phone: "+1 718 555 0123", email: "info@brooklynbakery.com" },
      { businessName: "Seattle Design Studio", category: "services", address: "789 Creative Lane", city: "Seattle", country: "United States", latitude: 47.6062, longitude: -122.3321, description: "Modern graphic design and branding solutions", website: "https://seattledesign.com", phone: "+1 206 555 0456", email: "hello@seattledesign.com" },
      
      // Canadian Businesses
      { businessName: "Toronto Wellness Center", category: "health", address: "321 Wellness Boulevard", city: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, description: "Holistic health and wellness services", website: "https://torontowellness.ca", phone: "+1 416 555 0789", email: "appointments@torontowellness.ca" },
      { businessName: "Vancouver Outdoor Gear", category: "retail", address: "654 Mountain View Road", city: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207, description: "Premium outdoor equipment and adventure gear", website: "https://vancouveroutdoor.ca", phone: "+1 604 555 0321", email: "sales@vancouveroutdoor.ca" },
      
      // Australian Businesses
      { businessName: "Sydney Surf Shop", category: "retail", address: "987 Beach Road", city: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, description: "Surfboards, wetsuits and beach lifestyle gear", website: "https://sydneysurf.com.au", phone: "+61 2 9876 5432", email: "info@sydneysurf.com.au" },
      { businessName: "Melbourne Coffee Culture", category: "restaurant", address: "147 Collins Street", city: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, description: "Award-winning coffee culture and breakfast", website: "https://melbournecoffee.com.au", phone: "+61 3 9654 3210", email: "hello@melbournecoffee.com.au" },
    ];

    // Create business prospects for email campaigns
    for (const business of businessData) {
      await db.insert(businessProspects).values({
        businessName: business.businessName,
        email: business.email,
        phone: business.phone,
        address: business.address,
        city: business.city,
        country: business.country,
        latitude: business.latitude,
        longitude: business.longitude,
        category: business.category,
        website: business.website,
        description: business.description,
        campaignStatus: "pending"
      });
    }

    console.log(`✅ Added ${businessData.length} business prospects for email campaigns`);
  }

  // Main automated campaign processing
  public async processAutomatedCampaigns() {
    try {
      console.log("🔄 Processing automated business campaigns...");
      
      await this.sendInitialEmails();
      await this.sendFollowUpEmails();
      await this.handleExpiredAdSpaces();
      
      console.log("✅ Campaign processing completed");
    } catch (error) {
      console.error("❌ Error in campaign processing:", error);
    }
  }

  // Send initial promotional emails to new prospects
  private async sendInitialEmails() {
    // Get businesses that haven't received initial emails yet
    const prospects = await db.select().from(businessProspects)
      .where(eq(businessProspects.initialEmailSent, false))
      .limit(10); // Process 10 at a time

    for (const prospect of prospects) {
      await this.sendInitialPromoEmail(prospect);
    }
  }

  // Send follow-up emails after 1 week
  private async sendFollowUpEmails() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const prospects = await db.select().from(businessProspects)
      .where(and(
        eq(businessProspects.initialEmailSent, true),
        eq(businessProspects.followUpEmailSent, false),
        eq(businessProspects.confirmLinkClicked, false),
        eq(businessProspects.optedOut, false),
        lt(businessProspects.initialEmailSentAt, oneWeekAgo)
      ))
      .limit(5);

    for (const prospect of prospects) {
      await this.sendFollowUpEmail(prospect);
    }
  }

  // Handle expired ad spaces and offer to replacements
  private async handleExpiredAdSpaces() {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    
    const expiredProspects = await db.select().from(businessProspects)
      .where(and(
        eq(businessProspects.followUpEmailSent, true),
        eq(businessProspects.confirmLinkClicked, false),
        eq(businessProspects.optedOut, false),
        lt(businessProspects.followUpEmailSentAt, twoWeeksAgo),
        eq(businessProspects.replacementOffered, false)
      ));

    for (const prospect of expiredProspects) {
      await this.offerAdSpaceToReplacement(prospect);
    }
  }

  // Send initial promotional email
  private async sendInitialPromoEmail(prospect: any) {
    const confirmUrl = `${process.env.BASE_URL || 'https://ordinarypeoplecommunity.com'}/business-confirm/${prospect.id}`;
    const optOutUrl = `${process.env.BASE_URL || 'https://ordinarypeoplecommunity.com'}/business-optout/${prospect.id}`;

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Exclusive Advertising Opportunity - Ordinary People Community</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Hello ${prospect.businessName}!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Exclusive Advertising Opportunity in ${prospect.city}</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 20px;">
            <strong>Great news!</strong> We've selected your business for a premium advertising opportunity on our rapidly growing community platform.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Why Ordinary People Community?</h3>
            <ul style="padding-left: 20px;">
                <li><strong>Growing Community:</strong> Thousands of engaged users in your area</li>
                <li><strong>Local Targeting:</strong> Reach customers specifically in ${prospect.city}</li>
                <li><strong>Carousel Advertising:</strong> Premium rotating banner placement</li>
                <li><strong>Business Profile:</strong> Dedicated storefront with map integration</li>
                <li><strong>Location Discovery:</strong> Featured in our travel-friendly business finder</li>
            </ul>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #2d5a2d; margin-top: 0;">Special Launch Pricing</h3>
            <p style="font-size: 24px; font-weight: bold; color: #2d5a2d; margin: 10px 0;">Only £24 per year</p>
            <p style="margin: 5px 0; color: #666;">Complete advertising package included</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">
                ✅ Yes, I Want This Opportunity!
            </a>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>⚠️ Limited Time:</strong> This offer is reserved for your business for 7 days. If no response is received, this advertising space will be offered to another business in your area.
            </p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 14px; color: #666;">
                Questions? Reply to this email or visit our platform to learn more.<br>
                Not interested? <a href="${optOutUrl}" style="color: #666;">Click here to opt out</a>
            </p>
        </div>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
        <p>Ordinary People Community Team<br>
        Building connections away from elite control</p>
    </div>
</body>
</html>`;

    try {
      const success = await sendEmail(
        prospect.email,
        `🚀 Exclusive ${prospect.city} Advertising Opportunity - £24/Year`,
        emailContent
      );

      // Update prospect status
      await db.update(businessProspects)
        .set({
          initialEmailSent: true,
          initialEmailSentAt: new Date(),
          campaignStatus: "initial_sent"
        })
        .where(eq(businessProspects.id, prospect.id));

      // Log the campaign
      await db.insert(emailCampaigns).values({
        businessProspectId: prospect.id,
        campaignType: "initial",
        emailSubject: `🚀 Exclusive ${prospect.city} Advertising Opportunity - £24/Year`,
        emailContent: emailContent
      });

      console.log(`✅ Initial email sent to ${prospect.businessName} (${prospect.email})`);
    } catch (error) {
      console.error(`❌ Failed to send initial email to ${prospect.email}:`, error);
    }
  }

  // Send follow-up email after 1 week
  private async sendFollowUpEmail(prospect: any) {
    const confirmUrl = `${process.env.BASE_URL || 'https://ordinarypeoplecommunity.com'}/business-confirm/${prospect.id}`;
    const optOutUrl = `${process.env.BASE_URL || 'https://ordinarypeoplecommunity.com'}/business-optout/${prospect.id}`;

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Final Opportunity - Your Advertising Space Expires Soon</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">⏰ Final Notice</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">${prospect.businessName} - ${prospect.city}</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 20px;">
            <strong>Hello again!</strong> We haven't heard back about your exclusive advertising opportunity on Ordinary People Community.
        </p>
        
        <div style="background: #f8d7da; padding: 20px; border-left: 4px solid #dc3545; margin: 20px 0;">
            <h3 style="color: #721c24; margin-top: 0;">⚠️ Your Space Expires in 7 Days</h3>
            <p style="margin: 10px 0;">
                After 7 days with no response, your reserved advertising space will be automatically offered to another business in ${prospect.city}. 
                Don't miss this opportunity!
            </p>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #2d5a2d; margin-top: 0;">Last Chance - £24/Year</h3>
            <ul style="text-align: left; padding-left: 20px; color: #2d5a2d;">
                <li>Premium carousel advertising placement</li>
                <li>Dedicated business profile with map</li>
                <li>Location-based customer discovery</li>
                <li>Growing community in ${prospect.city}</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">
                🚀 Secure My Advertising Space Now!
            </a>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>After 7 days:</strong> This space will be offered to your competitors. Act now to secure your spot!
            </p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 14px; color: #666;">
                Questions? Reply to this email immediately.<br>
                Not interested? <a href="${optOutUrl}" style="color: #666;">Click here to opt out</a>
            </p>
        </div>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
        <p>Ordinary People Community Team<br>
        Final opportunity notification</p>
    </div>
</body>
</html>`;

    try {
      const success = await sendEmail(
        prospect.email,
        `⏰ FINAL NOTICE: ${prospect.city} Advertising Space Expires in 7 Days`,
        emailContent
      );

      // Update prospect status
      await db.update(businessProspects)
        .set({
          followUpEmailSent: true,
          followUpEmailSentAt: new Date(),
          campaignStatus: "follow_up_sent"
        })
        .where(eq(businessProspects.id, prospect.id));

      // Log the campaign
      await db.insert(emailCampaigns).values({
        businessProspectId: prospect.id,
        campaignType: "follow_up",
        emailSubject: `⏰ FINAL NOTICE: ${prospect.city} Advertising Space Expires in 7 Days`,
        emailContent: emailContent
      });

      console.log(`✅ Follow-up email sent to ${prospect.businessName} (${prospect.email})`);
    } catch (error) {
      console.error(`❌ Failed to send follow-up email to ${prospect.email}:`, error);
    }
  }

  // Offer ad space to replacement business when original expires
  private async offerAdSpaceToReplacement(expiredProspect: any) {
    try {
      // Find replacement businesses in the same city
      const replacements = await db.select().from(mockBusinessData)
        .where(and(
          eq(mockBusinessData.city, expiredProspect.city),
          eq(mockBusinessData.isActive, true)
        ))
        .limit(3);

      if (replacements.length === 0) return;

      // Select random replacement
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];

      // Create new prospect for replacement business
      const newProspect = await db.insert(businessProspects).values({
        businessName: replacement.businessName,
        email: replacement.email || `info@${replacement.businessName.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: replacement.phone,
        address: replacement.address,
        city: replacement.city,
        country: replacement.country,
        latitude: replacement.latitude,
        longitude: replacement.longitude,
        category: replacement.category,
        website: replacement.website,
        description: replacement.description,
        campaignStatus: "pending"
      }).returning();

      // Send replacement notification email to expired prospect
      const replacementEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Advertising Space Has Been Offered to Another Business</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Space Reassigned</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">${expiredProspect.businessName}</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 20px;">
            Hello,
        </p>
        
        <p>
            Since we didn't receive a response to our advertising opportunity for <strong>${expiredProspect.businessName}</strong> 
            in ${expiredProspect.city}, your reserved advertising space has been offered to another local business.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #6c757d; margin: 20px 0;">
            <p style="margin: 0;">
                <strong>New advertiser:</strong> ${replacement.businessName}<br>
                <strong>Location:</strong> ${replacement.address}, ${replacement.city}<br>
                <strong>Category:</strong> ${replacement.category}
            </p>
        </div>
        
        <p>
            We hope this helps demonstrate the value and demand for advertising space in your area. 
            If you'd like to discuss future opportunities, please don't hesitate to contact us.
        </p>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 14px; color: #666;">
                Thank you for your time.<br>
                Ordinary People Community Team
            </p>
        </div>
    </div>
</body>
</html>`;

      const success = await sendEmail(
        expiredProspect.email,
        `Your ${expiredProspect.city} Advertising Space Has Been Reassigned`,
        replacementEmailContent
      );

      // Update expired prospect status
      await db.update(businessProspects)
        .set({
          replacementOffered: true,
          campaignStatus: "expired"
        })
        .where(eq(businessProspects.id, expiredProspect.id));

      console.log(`✅ Ad space reassigned from ${expiredProspect.businessName} to ${replacement.businessName}`);

      // Send initial email to new prospect
      await this.sendInitialPromoEmail(newProspect[0]);

    } catch (error) {
      console.error(`❌ Failed to offer replacement for ${expiredProspect.businessName}:`, error);
    }
  }

  // Add new prospect manually
  public async addBusinessProspect(prospectData: any) {
    try {
      const prospect = await db.insert(businessProspects).values(prospectData).returning();
      await this.sendInitialPromoEmail(prospect[0]);
      return prospect[0];
    } catch (error) {
      console.error("❌ Failed to add business prospect:", error);
      throw error;
    }
  }

  // Handle confirmation clicks
  public async handleConfirmation(prospectId: number) {
    try {
      await db.update(businessProspects)
        .set({
          confirmLinkClicked: true,
          confirmLinkClickedAt: new Date(),
          campaignStatus: "confirmed"
        })
        .where(eq(businessProspects.id, prospectId));

      console.log(`✅ Business prospect ${prospectId} confirmed`);
    } catch (error) {
      console.error(`❌ Failed to handle confirmation for prospect ${prospectId}:`, error);
    }
  }

  // Handle opt-out clicks
  public async handleOptOut(prospectId: number) {
    try {
      await db.update(businessProspects)
        .set({
          optedOut: true,
          optedOutAt: new Date(),
          campaignStatus: "opted_out"
        })
        .where(eq(businessProspects.id, prospectId));

      console.log(`✅ Business prospect ${prospectId} opted out`);
    } catch (error) {
      console.error(`❌ Failed to handle opt-out for prospect ${prospectId}:`, error);
    }
  }

  // Process 7-day replacement cycle - remove expired ads and replace with new businesses
  public async processSevenDayReplacements() {
    console.log("🔄 Processing 7-day ad replacement cycle...");
    
    try {
      // Find businesses that had follow-up emails sent 7+ days ago and haven't responded
      const expiredCampaigns = await db
        .select()
        .from(businessProspects)
        .where(
          and(
            eq(businessProspects.followUpEmailSent, true),
            lt(businessProspects.followUpEmailSentAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
            eq(businessProspects.confirmLinkClicked, false),
            eq(businessProspects.campaignStatus, "follow_up_sent")
          )
        );

      console.log(`📊 Found ${expiredCampaigns.length} expired campaigns to replace`);

      for (const expiredProspect of expiredCampaigns) {
        await this.replaceExpiredAdvertisement(expiredProspect);
      }

      // Also check for ads that have been assigned but expired
      const expiredAds = await db
        .select()
        .from(businessProspects)
        .where(
          and(
            eq(businessProspects.adSpaceAssigned, true),
            lt(businessProspects.adSpaceExpiredAt, new Date())
          )
        );

      console.log(`📊 Found ${expiredAds.length} expired ad spaces to replace`);

      for (const expiredAd of expiredAds) {
        await this.replaceExpiredAdvertisement(expiredAd);
      }

    } catch (error) {
      console.error("❌ Error processing 7-day replacements:", error);
    }
  }

  // Replace an expired advertisement with a new business
  private async replaceExpiredAdvertisement(expiredProspect: any) {
    try {
      console.log(`🔄 Replacing expired ad for ${expiredProspect.businessName} in ${expiredProspect.city}`);

      // Mark the expired prospect as expired
      await db
        .update(businessProspects)
        .set({
          campaignStatus: "expired",
          adSpaceAssigned: false,
          adSpaceExpiredAt: null,
          updatedAt: new Date()
        })
        .where(eq(businessProspects.id, expiredProspect.id));

      // Remove their advertisement from the active ads table if it exists
      try {
        await db
          .delete(advertisements)
          .where(eq(advertisements.title, expiredProspect.businessName));
      } catch (deleteError) {
        console.log(`No existing advertisement found for ${expiredProspect.businessName} to remove`);
      }

      // Find a new business from the same city/country to replace them
      const replacementCandidate = await db
        .select()
        .from(businessProspects)
        .where(
          and(
            eq(businessProspects.city, expiredProspect.city),
            eq(businessProspects.campaignStatus, "pending"),
            eq(businessProspects.initialEmailSent, false)
          )
        )
        .limit(1);

      if (replacementCandidate.length > 0) {
        const newProspect = replacementCandidate[0];
        console.log(`✅ Found replacement: ${newProspect.businessName} in ${newProspect.city}`);
        
        // Send initial email to the new business
        await this.sendInitialPromoEmail(newProspect);
        
        // Create a temporary advertisement for the new business
        await this.createTemporaryAdvertisement(newProspect);
        
        console.log(`🔄 Replacement cycle completed: ${expiredProspect.businessName} → ${newProspect.businessName}`);
      } else {
        // If no local replacement, find from same country
        const countryReplacement = await db
          .select()
          .from(businessProspects)
          .where(
            and(
              eq(businessProspects.country, expiredProspect.country),
              eq(businessProspects.campaignStatus, "pending"),
              eq(businessProspects.initialEmailSent, false)
            )
          )
          .limit(1);

        if (countryReplacement.length > 0) {
          const newProspect = countryReplacement[0];
          console.log(`✅ Found country replacement: ${newProspect.businessName} in ${newProspect.city}`);
          
          await this.sendInitialPromoEmail(newProspect);
          await this.createTemporaryAdvertisement(newProspect);
          
          console.log(`🔄 Country replacement completed: ${expiredProspect.businessName} → ${newProspect.businessName}`);
        } else {
          console.log(`⚠️  No replacement found for ${expiredProspect.businessName} in ${expiredProspect.country}`);
        }
      }

    } catch (error) {
      console.error(`❌ Error replacing advertisement for ${expiredProspect.businessName}:`, error);
    }
  }

  // Create a temporary advertisement while waiting for business confirmation
  private async createTemporaryAdvertisement(prospect: any) {
    try {
      // Create a temporary ad that will be replaced if they don't respond
      const adData = {
        companyName: prospect.businessName,
        companyDescription: prospect.description || `${prospect.category} business in ${prospect.city}`,
        contactEmail: prospect.email,
        contactPhone: prospect.phone || '',
        address: prospect.address,
        city: prospect.city,
        country: prospect.country,
        website: prospect.website || `https://${prospect.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`,
        category: prospect.category,
        isActive: true,
        isPaid: false, // Will be set to true if they confirm and pay
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.insert(advertisements).values(adData);
      
      // Mark ad space as assigned with 7-day expiration
      await db
        .update(businessProspects)
        .set({
          adSpaceAssigned: true,
          adSpaceExpiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          updatedAt: new Date()
        })
        .where(eq(businessProspects.id, prospect.id));

      console.log(`📺 Temporary advertisement created for ${prospect.businessName}`);

    } catch (error) {
      console.error(`❌ Error creating temporary advertisement for ${prospect.businessName}:`, error);
    }
  }
}

export const businessCampaignService = BusinessCampaignService.getInstance();