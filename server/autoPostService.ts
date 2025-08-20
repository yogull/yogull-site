/**
 * Auto Post Service - Automated Content Posting System
 * Populates discussion categories with starter content
 */

import { db } from './db';
import { communityDiscussions, discussionCategories } from '@shared/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

interface StarterPost {
  categoryId: number;
  title: string;
  content: string;
  tags: string[];
  authorId: number; // System user ID
}

// Starter content for each discussion category
const starterPosts: StarterPost[] = [
  // Health & Wellness
  {
    categoryId: 1,
    title: "Welcome to Health & Wellness Discussions",
    content: "This is your space to discuss nutrition, fitness, mental health, and overall wellbeing. Share your health journey, ask questions, and support others in the community. What health topics are most important to you?",
    tags: ["welcome", "health", "wellness", "community"],
    authorId: 4 // John Proctor
  },
  {
    categoryId: 1,
    title: "Daily Health Habits That Make a Difference",
    content: "Small daily changes can lead to significant health improvements. What simple habits have you found most effective? Walking, hydration, sleep routine, or something else? Let's share practical tips that work in real life.",
    tags: ["habits", "daily", "health", "tips"],
    authorId: 4
  },

  // Environmental Issues
  {
    categoryId: 2,
    title: "Environmental Concerns in Your Local Area",
    content: "Climate change affects us all differently depending on where we live. What environmental issues are you seeing in your community? Air quality, local wildlife changes, weather patterns? Share your observations and concerns.",
    tags: ["environment", "local", "climate", "community"],
    authorId: 4
  },
  {
    categoryId: 2,
    title: "Simple Ways to Reduce Environmental Impact",
    content: "Every small action counts when it comes to protecting our environment. What practical changes have you made in your daily life? Recycling, energy saving, transport choices? Let's discuss realistic environmental actions.",
    tags: ["sustainability", "practical", "environmental", "action"],
    authorId: 4
  },

  // Government & Policy
  {
    categoryId: 3,
    title: "Government Policies Affecting Ordinary People",
    content: "Political decisions impact our daily lives in many ways. What government policies are affecting you and your family right now? Healthcare, housing, employment, education? This is your space to discuss real impacts on ordinary people.",
    tags: ["government", "policy", "ordinary people", "impact"],
    authorId: 4
  },
  {
    categoryId: 3,
    title: "How Can Ordinary People Make Their Voice Heard?",
    content: "Sometimes it feels like government doesn't listen to ordinary people. What are effective ways to influence policy and make your voice count? Local councils, petitions, community action? Share your experiences and ideas.",
    tags: ["democracy", "voice", "ordinary people", "action"],
    authorId: 4
  },

  // Exercise & Fitness
  {
    categoryId: 10,
    title: "Fitness for Real People with Real Lives",
    content: "Not everyone has time for hour-long gym sessions. What exercise routines work for busy people? Quick workouts, walking, home exercises? Let's share realistic fitness solutions that fit into ordinary schedules.",
    tags: ["fitness", "realistic", "busy", "exercise"],
    authorId: 4
  },

  // Mental Health
  {
    categoryId: 5,
    title: "Mental Health Support in Our Community",
    content: "Mental health affects many of us, and having community support makes a difference. This is a safe space to share experiences, resources, and support each other. What helps you maintain good mental health?",
    tags: ["mental health", "support", "community", "wellbeing"],
    authorId: 4
  },

  // Supplements & Vitamins
  {
    categoryId: 18,
    title: "Supplement Experiences - What Actually Works?",
    content: "With so many supplements available, it's hard to know what's worth trying. Share your experiences with vitamins and supplements. What has helped you, and what was a waste of money? Real experiences from real people.",
    tags: ["supplements", "vitamins", "experience", "reviews"],
    authorId: 4
  },

  // 5G Health Issues
  {
    categoryId: 21,
    title: "5G Technology and Health Concerns",
    content: "Many people have concerns about 5G technology and its potential health effects. What are your thoughts and experiences? Are you noticing any changes since 5G rollout in your area? Let's discuss this important topic openly.",
    tags: ["5G", "health", "technology", "concerns"],
    authorId: 4
  },

  // Wi-Fi Frequency
  {
    categoryId: 22,
    title: "Wi-Fi Frequency and Electromagnetic Sensitivity",
    content: "Some people report sensitivity to Wi-Fi and electromagnetic frequencies. Have you experienced any symptoms you think might be related to Wi-Fi exposure? Sleep issues, headaches, fatigue? Share your experiences and coping strategies.",
    tags: ["wifi", "electromagnetic", "sensitivity", "health"],
    authorId: 4
  },

  // Ivermectin
  {
    categoryId: 23,
    title: "Ivermectin Discussions and Experiences",
    content: "There's been much discussion about Ivermectin and its various uses. Share your knowledge, experiences, or questions about this medication. What information sources do you trust? Let's have an open, respectful discussion.",
    tags: ["ivermectin", "medication", "health", "discussion"],
    authorId: 4
  },

  // Council Issues
  {
    categoryId: 24,
    title: "Local Council Decisions - Are They Serving Ordinary People?",
    content: "Local councils make decisions that directly affect our daily lives. Are your local councillors doing what's best for ordinary people? Planning permissions, local services, community facilities? Share your experiences with local government.",
    tags: ["council", "local government", "ordinary people", "services"],
    authorId: 4
  }
];

export class AutoPostService {
  private static instance: AutoPostService;
  private isRunning = false;

  public static getInstance(): AutoPostService {
    if (!AutoPostService.instance) {
      AutoPostService.instance = new AutoPostService();
    }
    return AutoPostService.instance;
  }

  async initializeDiscussionCategories(): Promise<void> {
    console.log('🚀 Starting automated discussion population...');
    
    try {
      for (const post of starterPosts) {
        // Check if category already has posts
        const existingPosts = await db
          .select({ count: sql<number>`count(*)` })
          .from(communityDiscussions)
          .where(eq(communityDiscussions.categoryId, post.categoryId));

        const postCount = existingPosts[0]?.count || 0;

        // Only add starter posts if category has fewer than 3 posts
        if (postCount < 3) {
          await this.createDiscussionPost(post);
          console.log(`✅ Added starter post to category ${post.categoryId}: "${post.title}"`);
          
          // Small delay between posts to avoid overwhelming the system
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      console.log('🎉 Discussion category population completed successfully');
    } catch (error) {
      console.error('❌ Error populating discussion categories:', error);
    }
  }

  private async createDiscussionPost(post: StarterPost): Promise<void> {
    try {
      await db.insert(communityDiscussions).values({
        title: post.title,
        description: post.content,
        userId: post.authorId,
        categoryId: post.categoryId,
        tags: post.tags,
        participantCount: 1,
        messageCount: 0,
        isActive: true
      });
    } catch (error) {
      console.error(`Failed to create discussion post: ${post.title}`, error);
      throw error;
    }
  }

  async addDailyContent(): Promise<void> {
    if (this.isRunning) return;
    
    this.isRunning = true;
    try {
      // Check how many posts were made today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaysPosts = await db
        .select({ count: sql<number>`count(*)` })
        .from(communityDiscussions)
        .where(and(
          eq(communityDiscussions.userId, 4), // System posts
          sql`DATE(created_at) = CURRENT_DATE`
        ));

      const postsToday = todaysPosts[0]?.count || 0;
      
      // Only post if fewer than 2 posts today
      if (postsToday < 2) {
        const categories = await db.select().from(discussionCategories);
        
        if (categories.length > 0) {
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          
          // Create a generic discussion starter
          const discussionStarter = {
            categoryId: randomCategory.id,
            title: `Daily Discussion: ${randomCategory.name}`,
            content: `What's on your mind about ${randomCategory.name.toLowerCase()}? Share your thoughts, questions, or experiences with the community. Every voice matters in our discussions.`,
            tags: ["daily", "discussion", randomCategory.name.toLowerCase().replace(/\s+/g, '-')],
            authorId: 4
          };

          await this.createDiscussionPost(discussionStarter);
          console.log(`✅ Added daily discussion to ${randomCategory.name} (${postsToday + 1}/2 today)`);
        }
      } else {
        console.log(`📝 Daily posting limit reached (2/2 posts today)`);
      }
    } catch (error) {
      console.error('❌ Error adding daily content:', error);
    } finally {
      this.isRunning = false;
    }
  }

  startDailyPosting(): void {
    // Initialize with starter posts
    this.initializeDiscussionCategories();
    
    // Add new content twice daily (every 12 hours)
    setInterval(() => {
      this.addDailyContent();
    }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
    
    console.log('📅 Daily posting scheduler started - new content every 12 hours');
  }
}

export const autoPostService = AutoPostService.getInstance();