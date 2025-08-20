import { pgTable, text, serial, integer, boolean, timestamp, jsonb, unique, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio"),
  location: text("location"),
  profileImageUrl: text("profile_image_url"),
  coverImageFileId: integer("cover_image_file_id"),
  isAdmin: boolean("is_admin").default(false).notNull(),
  isBlocked: boolean("is_blocked").default(false).notNull(),
  blockedReason: text("blocked_reason"),
  blockedAt: timestamp("blocked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // Social Media Links
  facebookUrl: text("facebook_url"),
  twitterUrl: text("twitter_url"),
  whatsappUrl: text("whatsapp_url"),
  telegramUrl: text("telegram_url"),
  instagramUrl: text("instagram_url"),
  linkedinUrl: text("linkedin_url"),
  youtubeUrl: text("youtube_url"),
  tiktokUrl: text("tiktok_url"),
  snapchatUrl: text("snapchat_url"),
  discordUrl: text("discord_url"),
  redditUrl: text("reddit_url"),
  pinterestUrl: text("pinterest_url"),
  tumblrUrl: text("tumblr_url"),
  twitchUrl: text("twitch_url"),
  spotifyUrl: text("spotify_url"),
  mediumUrl: text("medium_url"),
  githubUrl: text("github_url"),
  vimeoUrl: text("vimeo_url"),
  skypeUrl: text("skype_url"),
  flickrUrl: text("flickr_url"),
  soundcloudUrl: text("soundcloud_url"),
  behanceUrl: text("behance_url"),
  dribbbleUrl: text("dribbble_url"),
  deviantartUrl: text("deviantart_url"),
  stackoverflowUrl: text("stackoverflow_url"),
  quoraUrl: text("quora_url"),
  // Social Media Usernames for Multi-Share
  facebookUsername: text("facebook_username"),
  twitterUsername: text("twitter_username"),
  instagramUsername: text("instagram_username"),
  linkedinUsername: text("linkedin_username"),
  youtubeUsername: text("youtube_username"),
  tiktokUsername: text("tiktok_username"),
  snapchatUsername: text("snapchat_username"),
  discordUsername: text("discord_username"),
  redditUsername: text("reddit_username"),
  pinterestUsername: text("pinterest_username"),
  tumblrUsername: text("tumblr_username"),
  twitchUsername: text("twitch_username"),
  spotifyUsername: text("spotify_username"),
  mediumUsername: text("medium_username"),
  githubUsername: text("github_username"),
  vimeoUsername: text("vimeo_username"),
  skypeUsername: text("skype_username"),
  flickrUsername: text("flickr_username"),
  soundcloudUsername: text("soundcloud_username"),
  behanceUsername: text("behance_username"),
  dribbbleUsername: text("dribbble_username"),
  deviantartUsername: text("deviantart_username"),
  stackoverflowUsername: text("stackoverflow_username"),
  quoraUsername: text("quora_username"),
  whatsappNumber: text("whatsapp_number"),
  telegramUsername: text("telegram_username"),
});

export const supplements = pgTable("supplements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(), // daily, weekly, etc.
  timeOfDay: text("time_of_day").notNull(), // morning, afternoon, evening
  specificTime: text("specific_time"), // e.g., "8:00 AM"
  notes: text("notes"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  category: text("category").notNull(), // cardio, strength, flexibility, sports
  description: text("description"),
  targetMuscles: text("target_muscles"), // chest, legs, core, full body
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  duration: integer("duration"), // minutes
  calories: integer("calories"), // estimated calories burned
  equipment: text("equipment"), // none, dumbbells, resistance bands, etc.
  instructions: text("instructions"),
  videoUrl: text("video_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // full-body, upper-body, lower-body, cardio
  difficulty: text("difficulty").notNull(),
  estimatedDuration: integer("estimated_duration"), // minutes
  estimatedCalories: integer("estimated_calories"),
  isPublic: boolean("is_public").default(false).notNull(),
  likes: integer("likes").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull().references(() => workouts.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  sets: integer("sets").default(1).notNull(),
  reps: integer("reps"), // for strength exercises
  duration: integer("duration"), // for cardio/time-based exercises in seconds
  restTime: integer("rest_time").default(60), // seconds between sets
  weight: real("weight"), // kg for strength exercises
  notes: text("notes"),
  orderIndex: integer("order_index").notNull(), // order in workout
});

export const exerciseLogs = pgTable("exercise_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  exerciseId: integer("exercise_id").references(() => exercises.id),
  workoutId: integer("workout_id").references(() => workouts.id),
  date: timestamp("date").defaultNow().notNull(),
  sets: integer("sets").default(1).notNull(),
  reps: integer("reps"),
  duration: integer("duration"), // seconds
  weight: real("weight"), // kg
  caloriesBurned: integer("calories_burned"),
  difficulty: text("difficulty"), // how it felt: easy, moderate, hard
  notes: text("notes"),
  completed: boolean("completed").default(true).notNull(),
});

export const fitnessGoals = pgTable("fitness_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  goalType: text("goal_type").notNull(), // weight_loss, muscle_gain, endurance, strength
  title: text("title").notNull(),
  description: text("description"),
  targetValue: real("target_value"), // target weight, workout frequency, etc.
  currentValue: real("current_value").default(0),
  unit: text("unit"), // kg, workouts/week, minutes/day
  targetDate: timestamp("target_date"),
  isActive: boolean("is_active").default(true).notNull(),
  achieved: boolean("achieved").default(false).notNull(),
  achievedAt: timestamp("achieved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const supplementLogs = pgTable("supplement_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  supplementId: integer("supplement_id").notNull().references(() => supplements.id),
  takenAt: timestamp("taken_at").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const biometrics = pgTable("biometrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  steps: integer("steps"),
  sleepHours: integer("sleep_hours"), // in minutes
  weight: integer("weight"), // in grams for precision
  bloodPressureSystolic: integer("blood_pressure_systolic"),
  bloodPressureDiastolic: integer("blood_pressure_diastolic"),
  heartRate: integer("heart_rate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shopProducts = pgTable("shop_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // price in cents
  imageUrl: text("image_url").notNull(),
  affiliateUrl: text("affiliate_url").notNull(),
  category: text("category").notNull(),
  benefits: text("benefits").array(),
  ingredients: text("ingredients").array(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => shopProducts.id),
  quantity: integer("quantity").notNull().default(1),
  totalAmount: integer("total_amount").notNull(), // in cents
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("General"),
  imageUrl: text("image_url"),
  tags: text("tags").array(),
  likes: integer("likes").notNull().default(0),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userConnections = pgTable("user_connections", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull().references(() => users.id),
  toUserId: integer("to_user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"), // pending, accepted, blocked
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPostLikes = pgTable("blog_post_likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  postId: integer("post_id").notNull().references(() => blogPosts.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPostComments = pgTable("blog_post_comments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  postId: integer("post_id").notNull().references(() => blogPosts.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const discussionCategories = pgTable("discussion_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  color: text("color").notNull().default("#3b82f6"),
  icon: text("icon").notNull().default("fas fa-comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityDiscussions = pgTable("community_discussions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  categoryId: integer("category_id").notNull().references(() => discussionCategories.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  tags: text("tags").array(),
  participantCount: integer("participant_count").notNull().default(1),
  messageCount: integer("message_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const discussionMessages = pgTable("discussion_messages", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id").notNull().references(() => communityDiscussions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  parentMessageId: integer("parent_message_id"),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const discussionParticipants = pgTable("discussion_participants", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id").notNull().references(() => communityDiscussions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const userSocialLinks = pgTable("user_social_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  platform: text("platform").notNull(), // facebook, twitter, instagram, linkedin, youtube, tiktok
  url: text("url").notNull(),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryAlbums = pgTable("gallery_albums", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  coverPhotoId: integer("cover_photo_id"),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryPhotos = pgTable("gallery_photos", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull().references(() => galleryAlbums.id),
  userId: integer("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProfileImages = pgTable("user_profile_images", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  isProfilePicture: boolean("is_profile_picture").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enhanced media system supporting images and videos
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(), // image, video
  mimeType: text("mime_type").notNull(), // image/jpeg, video/mp4, etc.
  fileSize: integer("file_size"), // in bytes
  caption: text("caption"),
  altText: text("alt_text"),
  entityType: text("entity_type"), // blog_post, discussion, profile, supplement
  entityId: integer("entity_id"), // ID of the related entity
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  isAdmin: z.boolean().optional(),
});

export const insertSupplementSchema = createInsertSchema(supplements).omit({
  id: true,
  createdAt: true,
});

export const insertSupplementLogSchema = createInsertSchema(supplementLogs).omit({
  id: true,
  createdAt: true,
});

export const insertBiometricSchema = createInsertSchema(biometrics).omit({
  id: true,
  createdAt: true,
});

export const insertShopProductSchema = createInsertSchema(shopProducts).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  likes: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserConnectionSchema = createInsertSchema(userConnections).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostLikeSchema = createInsertSchema(blogPostLikes).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostCommentSchema = createInsertSchema(blogPostComments).omit({
  id: true,
  createdAt: true,
});

export const insertDiscussionCategorySchema = createInsertSchema(discussionCategories).omit({
  id: true,
  createdAt: true,
});

export const insertCommunityDiscussionSchema = createInsertSchema(communityDiscussions).omit({
  id: true,
  participantCount: true,
  messageCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDiscussionMessageSchema = createInsertSchema(discussionMessages).omit({
  id: true,
  likes: true,
  createdAt: true,
});

export const insertDiscussionParticipantSchema = createInsertSchema(discussionParticipants).omit({
  id: true,
  joinedAt: true,
});

export const insertUserSocialLinkSchema = createInsertSchema(userSocialLinks).omit({
  id: true,
  createdAt: true,
});

export const insertGalleryAlbumSchema = createInsertSchema(galleryAlbums).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryPhotoSchema = createInsertSchema(galleryPhotos).omit({
  id: true,
  likes: true,
  createdAt: true,
});

// Gallery type exports
export type GalleryAlbum = typeof galleryAlbums.$inferSelect;
export type InsertGalleryAlbum = z.infer<typeof insertGalleryAlbumSchema>;
export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = z.infer<typeof insertGalleryPhotoSchema>;

export const insertUserProfileImageSchema = createInsertSchema(userProfileImages).omit({
  id: true,
  createdAt: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
});

// Feed Sources for external content aggregation
export const feedSources = pgTable("feed_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sourceType: text("source_type").notNull(), // 'rss', 'api', 'scraper'
  sourceUrl: text("source_url").notNull(),
  categoryId: integer("category_id").references(() => discussionCategories.id),
  targetTopic: text("target_topic"), // illness name, government topic, etc.
  isActive: boolean("is_active").default(true).notNull(),
  fetchFrequency: text("fetch_frequency").default('twice_daily').notNull(), // 'daily', 'twice_daily', 'weekly'
  lastFetchedAt: timestamp("last_fetched_at"),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// External content items fetched from feeds
export const feedItems = pgTable("feed_items", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").notNull().references(() => feedSources.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  originalUrl: text("original_url"),
  authorName: text("author_name"),
  publishedAt: timestamp("published_at"),
  isPosted: boolean("is_posted").default(false).notNull(),
  postedToDiscussion: integer("posted_to_discussion").references(() => communityDiscussions.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin feed configurations
export const feedConfigurations = pgTable("feed_configurations", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => discussionCategories.id),
  autoPostEnabled: boolean("auto_post_enabled").default(true).notNull(),
  postsPerDay: integer("posts_per_day").default(2).notNull(),
  filterKeywords: text("filter_keywords").array(), // keywords to filter content
  excludeKeywords: text("exclude_keywords").array(), // keywords to exclude content
  minContentLength: integer("min_content_length").default(100).notNull(),
  maxContentLength: integer("max_content_length").default(2000).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Permanent file storage for profile pictures and media
export const userFiles = pgTable("user_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  fileData: text("file_data").notNull(), // Base64 encoded file data
  fileType: text("file_type").notNull(), // 'image', 'video', 'cover_photo', 'profile_picture'
  cropData: jsonb("crop_data"), // Store crop positioning data
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserFileSchema = createInsertSchema(userFiles).omit({
  id: true,
  createdAt: true,
});

// Profile wall posts - like Facebook timeline posts
export const profileWallPosts = pgTable("profile_wall_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id), // Profile owner
  authorId: integer("author_id").notNull().references(() => users.id), // Who posted
  content: text("content").notNull(),
  postType: text("post_type").default("status").notNull(), // status, image, video, feeling
  mediaUrl: text("media_url"), // URL for images/videos
  feeling: text("feeling"), // happy, sad, excited, etc.
  location: text("location"),
  privacy: text("privacy").default("public").notNull(), // public, friends, private
  likes: integer("likes").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Comments on profile wall posts
export const profileWallComments = pgTable("profile_wall_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => profileWallPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  parentCommentId: integer("parent_comment_id"), // For reply threads
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Profile wall post likes
export const profileWallLikes = pgTable("profile_wall_likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => profileWallPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat system tables
export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),
  name: text("name"), // Optional room name for group chats
  isDirectMessage: boolean("is_direct_message").default(true).notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatParticipants = pgTable("chat_participants", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull().references(() => chatRooms.id),
  userId: integer("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull().references(() => chatRooms.id),
  senderId: integer("sender_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  messageType: text("message_type").default("text").notNull(), // text, ai_response, system
  isAiResponse: boolean("is_ai_response").default(false).notNull(),
  parentMessageId: integer("parent_message_id"), // For AI responses
  createdAt: timestamp("created_at").defaultNow().notNull(),
  editedAt: timestamp("edited_at"),
});

export const insertChatRoomSchema = createInsertSchema(chatRooms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChatParticipantSchema = createInsertSchema(chatParticipants).omit({
  id: true,
  joinedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
  editedAt: true,
});

export const insertProfileWallPostSchema = createInsertSchema(profileWallPosts).omit({
  id: true,
  likes: true,
  shares: true,
  createdAt: true,
  updatedAt: true,
});

// Advertisement tables for location-based carousel advertising
export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  advertiserId: integer("advertiser_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  targetUrl: text("target_url"), // URL to redirect when clicked
  targetLocation: text("target_location"), // city/region like "Nottingham", "London"
  targetScope: text("target_scope").notNull().default("local"), // "local" or "national"
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  budget: integer("budget").default(0), // daily budget in pence
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adImpressions = pgTable("ad_impressions", {
  id: serial("id").primaryKey(),
  adId: integer("ad_id").notNull().references(() => advertisements.id),
  userId: integer("user_id").references(() => users.id),
  userLocation: text("user_location"),
  discussionCategoryId: integer("discussion_category_id").references(() => discussionCategories.id),
  impressedAt: timestamp("impressed_at").defaultNow().notNull(),
});

export const adClicks = pgTable("ad_clicks", {
  id: serial("id").primaryKey(),
  adId: integer("ad_id").notNull().references(() => advertisements.id),
  userId: integer("user_id").references(() => users.id),
  userLocation: text("user_location"),
  discussionCategoryId: integer("discussion_category_id").references(() => discussionCategories.id),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export const insertAdvertisementSchema = createInsertSchema(advertisements).omit({
  id: true,
  impressions: true,
  clicks: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdImpressionSchema = createInsertSchema(adImpressions).omit({
  id: true,
  impressedAt: true,
});

export const insertAdClickSchema = createInsertSchema(adClicks).omit({
  id: true,
  clickedAt: true,
});

// Advertisement Comments for community engagement
export const advertisementComments = pgTable("advertisement_comments", {
  id: serial("id").primaryKey(),
  adId: integer("ad_id").notNull().references(() => advertisements.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const advertisementCommentLikes = pgTable("advertisement_comment_likes", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id").notNull().references(() => advertisementComments.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueLike: unique().on(table.commentId, table.userId),
}));

export const insertAdvertisementCommentSchema = createInsertSchema(advertisementComments).omit({
  id: true,
  likes: true,
  shares: true,
  createdAt: true,
  updatedAt: true,
});

// Business prospect system for automated advertising outreach
export const businessProspects = pgTable("business_prospects", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  category: text("category").notNull(), // "restaurant", "retail", "services", etc.
  website: text("website"),
  description: text("description"),
  
  // Email campaign tracking
  initialEmailSent: boolean("initial_email_sent").default(false),
  initialEmailSentAt: timestamp("initial_email_sent_at"),
  followUpEmailSent: boolean("follow_up_email_sent").default(false),
  followUpEmailSentAt: timestamp("follow_up_email_sent_at"),
  
  // Response tracking
  emailOpened: boolean("email_opened").default(false),
  emailOpenedAt: timestamp("email_opened_at"),
  confirmLinkClicked: boolean("confirm_link_clicked").default(false),
  confirmLinkClickedAt: timestamp("confirm_link_clicked_at"),
  optedOut: boolean("opted_out").default(false),
  optedOutAt: timestamp("opted_out_at"),
  
  // Status and automation
  campaignStatus: text("campaign_status").notNull().default("pending"), // "pending", "initial_sent", "follow_up_sent", "confirmed", "opted_out", "expired"
  adSpaceAssigned: boolean("ad_space_assigned").default(false),
  adSpaceExpiredAt: timestamp("ad_space_expired_at"),
  replacementOffered: boolean("replacement_offered").default(false),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Email campaign templates and tracking
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  businessProspectId: integer("business_prospect_id").notNull().references(() => businessProspects.id),
  campaignType: text("campaign_type").notNull(), // "initial", "follow_up", "replacement_notice"
  emailSubject: text("email_subject").notNull(),
  emailContent: text("email_content").notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  respondedAt: timestamp("responded_at"),
});

// Mock business data for filling ad spaces
export const mockBusinessData = pgTable("mock_business_data", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  category: text("category").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  isActive: boolean("is_active").default(true),
});

export const insertBusinessProspectSchema = createInsertSchema(businessProspects);

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns);

export const insertMockBusinessDataSchema = createInsertSchema(mockBusinessData);

export type BusinessProspect = typeof businessProspects.$inferSelect;
export type InsertBusinessProspect = z.infer<typeof insertBusinessProspectSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type MockBusinessData = typeof mockBusinessData.$inferSelect;

// Company/Advertiser tables
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  logo: text("logo"),
  isActive: boolean("is_active").default(true).notNull(),
  subscriptionExpiry: timestamp("subscription_expiry"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companyProducts = pgTable("company_products", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in pence
  imageUrl: text("image_url"),
  category: text("category"),
  isActive: boolean("is_active").default(true).notNull(),
  stock: integer("stock").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companyOrders = pgTable("company_orders", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  customerId: integer("customer_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => companyProducts.id),
  quantity: integer("quantity").notNull(),
  totalAmount: integer("total_amount").notNull(), // in pence
  status: text("status").default("pending").notNull(), // pending, completed, cancelled
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanyProductSchema = createInsertSchema(companyProducts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanyOrderSchema = createInsertSchema(companyOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFeedSourceSchema = createInsertSchema(feedSources).omit({
  id: true,
  lastFetchedAt: true,
  createdAt: true,
});

export const insertFeedItemSchema = createInsertSchema(feedItems).omit({
  id: true,
  isPosted: true,
  postedToDiscussion: true,
  createdAt: true,
});

export const insertFeedConfigurationSchema = createInsertSchema(feedConfigurations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Personal Shop System - User Affiliate Shops
export const personalShops = pgTable("personal_shops", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  shopName: text("shop_name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  totalAffiliateLinks: integer("total_affiliate_links").default(0).notNull(),
  maxLinks: integer("max_links").default(20).notNull(), // Maximum 20 links
  maintenancePaid: boolean("maintenance_paid").default(false).notNull(),
  maintenanceDueDate: timestamp("maintenance_due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Personal Shop Affiliate Links - £1 per link
export const personalShopAffiliateLinks = pgTable("personal_shop_affiliate_links", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => personalShops.id),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  affiliateUrl: text("affiliate_url").notNull(), // Only visible to shop owner
  productImageUrl: text("product_image_url"),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  price: text("price"),
  isPaid: boolean("is_paid").default(false).notNull(), // £1 payment per link
  isSharedToWalls: boolean("is_shared_to_walls").default(false).notNull(),
  likes: integer("likes").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Comments on affiliate link posts
export const affiliateLinkComments = pgTable("affiliate_link_comments", {
  id: serial("id").primaryKey(),
  linkId: integer("link_id").notNull().references(() => personalShopAffiliateLinks.id),
  userId: integer("user_id").notNull().references(() => users.id),
  comment: text("comment").notNull(),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Shares of affiliate links
export const affiliateLinkShares = pgTable("affiliate_link_shares", {
  id: serial("id").primaryKey(),
  linkId: integer("link_id").notNull().references(() => personalShopAffiliateLinks.id),
  userId: integer("user_id").notNull().references(() => users.id),
  shareType: text("share_type").notNull(), // "profile_wall", "social_media"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Personal Shop Payments - £1 per affiliate link + £2 maintenance per 20 links
export const personalShopPayments = pgTable("personal_shop_payments", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => personalShops.id),
  userId: integer("user_id").notNull().references(() => users.id),
  paymentType: text("payment_type").notNull(), // "affiliate_link", "maintenance"
  amount: integer("amount").notNull(), // Amount in pence (£1 = 100)
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").default("pending").notNull(), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contextual Productivity Boost Rewards System
export const productivityRewards = pgTable("productivity_rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  rewardType: text("reward_type").notNull(), // "daily_streak", "engagement_boost", "content_creation", "social_connection", "learning_milestone"
  context: text("context").notNull(), // "morning", "afternoon", "evening", "weekend", "workday"
  triggerAction: text("trigger_action").notNull(), // "post_created", "comment_made", "login_streak", "social_share", "profile_update"
  rewardTitle: text("reward_title").notNull(),
  rewardDescription: text("reward_description").notNull(),
  pointsEarned: integer("points_earned").default(0).notNull(),
  badgeUnlocked: text("badge_unlocked"), // Badge identifier if applicable
  streakDay: integer("streak_day").default(1).notNull(),
  isContextual: boolean("is_contextual").default(true).notNull(), // Based on time/activity context
  energyBoost: integer("energy_boost").default(0).notNull(), // Virtual energy points
  productivityScore: integer("productivity_score").default(0).notNull(), // Overall productivity metric
  isAchieved: boolean("is_achieved").default(true).notNull(),
  achievedAt: timestamp("achieved_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"), // Some rewards may expire
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User Productivity Metrics and Context
export const userProductivityMetrics = pgTable("user_productivity_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").defaultNow().notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  dailyStreak: integer("daily_streak").default(0).notNull(),
  weeklyGoalProgress: integer("weekly_goal_progress").default(0).notNull(), // Percentage
  mostActiveTimeOfDay: text("most_active_time_of_day"), // "morning", "afternoon", "evening"
  preferredActivityType: text("preferred_activity_type"), // "social", "content", "learning", "discussion"
  energyLevel: integer("energy_level").default(100).notNull(), // 0-100 scale
  productivityRating: integer("productivity_rating").default(5).notNull(), // 1-10 scale
  contextualBoosts: jsonb("contextual_boosts"), // JSON array of active boosts
  lastActiveContext: text("last_active_context"), // Last detected activity context
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Productivity Boost Activities
export const productivityBoostActivities = pgTable("productivity_boost_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(), // "post", "comment", "share", "login", "profile_update", "social_connect"
  activityContext: text("activity_context").notNull(), // Time and situational context
  pointsAwarded: integer("points_awarded").default(0).notNull(),
  boostMultiplier: real("boost_multiplier").default(1.0).notNull(), // Contextual multiplier
  timeOfDay: text("time_of_day").notNull(), // "morning", "afternoon", "evening", "night"
  dayOfWeek: text("day_of_week").notNull(), // "monday", "tuesday", etc.
  deviceType: text("device_type"), // "mobile", "desktop", "tablet"
  engagementScore: integer("engagement_score").default(0).notNull(), // Quality of activity
  isStreakContributor: boolean("is_streak_contributor").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contextual Productivity Goals
export const productivityGoals = pgTable("productivity_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  goalType: text("goal_type").notNull(), // "daily", "weekly", "monthly", "custom"
  goalCategory: text("goal_category").notNull(), // "engagement", "content", "social", "learning"
  goalTitle: text("goal_title").notNull(),
  goalDescription: text("goal_description").notNull(),
  targetValue: integer("target_value").notNull(), // Target number/points
  currentProgress: integer("current_progress").default(0).notNull(),
  contextRequirement: text("context_requirement"), // "morning_only", "workday", "weekend", etc.
  rewardPoints: integer("reward_points").default(0).notNull(),
  rewardBadge: text("reward_badge"), // Badge to unlock on completion
  isActive: boolean("is_active").default(true).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfileWallCommentSchema = createInsertSchema(profileWallComments).omit({
  id: true,
  likes: true,
  createdAt: true,
});

export const insertProfileWallLikeSchema = createInsertSchema(profileWallLikes).omit({
  id: true,
  createdAt: true,
});

export const insertPersonalShopSchema = createInsertSchema(personalShops).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPersonalShopAffiliateLinkSchema = createInsertSchema(personalShopAffiliateLinks).omit({
  id: true,
  likes: true,
  shares: true,
  comments: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAffiliateLinkCommentSchema = createInsertSchema(affiliateLinkComments).omit({
  id: true,
  likes: true,
  createdAt: true,
});

export const insertAffiliateLinkShareSchema = createInsertSchema(affiliateLinkShares).omit({
  id: true,
  createdAt: true,
});

export const insertPersonalShopPaymentSchema = createInsertSchema(personalShopPayments).omit({
  id: true,
  createdAt: true,
});

// Exercise system types
export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
  createdAt: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
  likes: true,
  shares: true,
  createdAt: true,
});

export const insertWorkoutExerciseSchema = createInsertSchema(workoutExercises).omit({
  id: true,
});

export const insertExerciseLogSchema = createInsertSchema(exerciseLogs).omit({
  id: true,
});

export const insertFitnessGoalSchema = createInsertSchema(fitnessGoals).omit({
  id: true,
  currentValue: true,
  achieved: true,
  achievedAt: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type InsertWorkoutExercise = z.infer<typeof insertWorkoutExerciseSchema>;
export type ExerciseLog = typeof exerciseLogs.$inferSelect;
export type InsertExerciseLog = z.infer<typeof insertExerciseLogSchema>;
export type FitnessGoal = typeof fitnessGoals.$inferSelect;
export type InsertFitnessGoal = z.infer<typeof insertFitnessGoalSchema>;
export type InsertSupplement = z.infer<typeof insertSupplementSchema>;
export type Supplement = typeof supplements.$inferSelect;
export type InsertSupplementLog = z.infer<typeof insertSupplementLogSchema>;
export type SupplementLog = typeof supplementLogs.$inferSelect;
export type InsertBiometric = z.infer<typeof insertBiometricSchema>;
export type Biometric = typeof biometrics.$inferSelect;
export type InsertShopProduct = z.infer<typeof insertShopProductSchema>;
export type ShopProduct = typeof shopProducts.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertUserConnection = z.infer<typeof insertUserConnectionSchema>;
export type UserConnection = typeof userConnections.$inferSelect;
export type InsertBlogPostLike = z.infer<typeof insertBlogPostLikeSchema>;
export type BlogPostLike = typeof blogPostLikes.$inferSelect;
export type InsertBlogPostComment = z.infer<typeof insertBlogPostCommentSchema>;
export type BlogPostComment = typeof blogPostComments.$inferSelect;
export type InsertDiscussionCategory = z.infer<typeof insertDiscussionCategorySchema>;
export type DiscussionCategory = typeof discussionCategories.$inferSelect;
export type InsertCommunityDiscussion = z.infer<typeof insertCommunityDiscussionSchema>;
export type CommunityDiscussion = typeof communityDiscussions.$inferSelect;
export type InsertDiscussionMessage = z.infer<typeof insertDiscussionMessageSchema>;
export type DiscussionMessage = typeof discussionMessages.$inferSelect;
export type InsertDiscussionParticipant = z.infer<typeof insertDiscussionParticipantSchema>;
export type DiscussionParticipant = typeof discussionParticipants.$inferSelect;
export type InsertUserSocialLink = z.infer<typeof insertUserSocialLinkSchema>;
export type UserSocialLink = typeof userSocialLinks.$inferSelect;
export type InsertUserProfileImage = z.infer<typeof insertUserProfileImageSchema>;
export type UserProfileImage = typeof userProfileImages.$inferSelect;
export type InsertChatRoom = z.infer<typeof insertChatRoomSchema>;
export type ChatRoom = typeof chatRooms.$inferSelect;
export type InsertChatParticipant = z.infer<typeof insertChatParticipantSchema>;
export type ChatParticipant = typeof chatParticipants.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertProfileWallPost = z.infer<typeof insertProfileWallPostSchema>;
export type ProfileWallPost = typeof profileWallPosts.$inferSelect;
export type InsertProfileWallComment = z.infer<typeof insertProfileWallCommentSchema>;
export type ProfileWallComment = typeof profileWallComments.$inferSelect;
export type InsertProfileWallLike = z.infer<typeof insertProfileWallLikeSchema>;
export type ProfileWallLike = typeof profileWallLikes.$inferSelect;

// Personal Shop types
export type InsertPersonalShop = z.infer<typeof insertPersonalShopSchema>;
export type PersonalShop = typeof personalShops.$inferSelect;
export type InsertPersonalShopAffiliateLink = z.infer<typeof insertPersonalShopAffiliateLinkSchema>;
export type PersonalShopAffiliateLink = typeof personalShopAffiliateLinks.$inferSelect;
export type InsertAffiliateLinkComment = z.infer<typeof insertAffiliateLinkCommentSchema>;
export type AffiliateLinkComment = typeof affiliateLinkComments.$inferSelect;
export type InsertAffiliateLinkShare = z.infer<typeof insertAffiliateLinkShareSchema>;
export type AffiliateLinkShare = typeof affiliateLinkShares.$inferSelect;
export type InsertPersonalShopPayment = z.infer<typeof insertPersonalShopPaymentSchema>;
export type PersonalShopPayment = typeof personalShopPayments.$inferSelect;

// Advertisement types
export type InsertAdvertisement = z.infer<typeof insertAdvertisementSchema>;
export type Advertisement = typeof advertisements.$inferSelect;
export type InsertAdImpression = z.infer<typeof insertAdImpressionSchema>;
export type AdImpression = typeof adImpressions.$inferSelect;
export type InsertAdClick = z.infer<typeof insertAdClickSchema>;
export type AdClick = typeof adClicks.$inferSelect;

// Company types
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompanyProduct = z.infer<typeof insertCompanyProductSchema>;
export type CompanyProduct = typeof companyProducts.$inferSelect;
export type InsertCompanyOrder = z.infer<typeof insertCompanyOrderSchema>;
export type CompanyOrder = typeof companyOrders.$inferSelect;
export type InsertFeedSource = z.infer<typeof insertFeedSourceSchema>;
export type FeedSource = typeof feedSources.$inferSelect;
export type InsertFeedItem = z.infer<typeof insertFeedItemSchema>;
export type FeedItem = typeof feedItems.$inferSelect;
export type InsertFeedConfiguration = z.infer<typeof insertFeedConfigurationSchema>;
export type FeedConfiguration = typeof feedConfigurations.$inferSelect;

// Friend invitation system
export const friendInvitations = pgTable("friend_invitations", {
  id: serial("id").primaryKey(),
  inviterUserId: integer("inviter_user_id").notNull().references(() => users.id),
  inviteeEmail: text("invitee_email").notNull(),
  inviteCode: text("invite_code").notNull().unique(),
  status: text("status").notNull().default("pending"), // pending, accepted, expired
  message: text("message"),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin action logs for monitoring
export const adminActions = pgTable("admin_actions", {
  id: serial("id").primaryKey(),
  adminUserId: integer("admin_user_id").notNull().references(() => users.id),
  targetUserId: integer("target_user_id").references(() => users.id),
  action: text("action").notNull(), // block_user, delete_post, delete_comment, etc.
  targetType: text("target_type").notNull(), // user, post, comment, advertisement, etc.
  targetId: integer("target_id"),
  reason: text("reason"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Gallery system for organizing media
export const userGalleries = pgTable("user_galleries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  isDefault: boolean("is_default").default(false),
  privacyLevel: text("privacy_level").notNull().default("public"), // public, friends, private
  coverImageId: integer("cover_image_id"),
  itemCount: integer("item_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Gallery items (images/videos within galleries)
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  galleryId: integer("gallery_id").notNull().references(() => userGalleries.id, { onDelete: "cascade" }),
  fileId: integer("file_id").notNull().references(() => userFiles.id, { onDelete: "cascade" }),
  caption: text("caption"),
  tags: text("tags").array(),
  position: integer("position").default(0),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Gallery item comments
export const galleryItemComments = pgTable("gallery_item_comments", {
  id: serial("id").primaryKey(),
  galleryItemId: integer("gallery_item_id").notNull().references(() => galleryItems.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id),
  comment: text("comment").notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Gallery item likes
export const galleryItemLikes = pgTable("gallery_item_likes", {
  id: serial("id").primaryKey(),
  galleryItemId: integer("gallery_item_id").notNull().references(() => galleryItems.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueLike: unique().on(table.galleryItemId, table.userId),
}));

// User reports for admin review
export const userReports = pgTable("user_reports", {
  id: serial("id").primaryKey(),
  reporterUserId: integer("reporter_user_id").notNull().references(() => users.id),
  reportedUserId: integer("reported_user_id").references(() => users.id),
  reportType: text("report_type").notNull(), // spam, harassment, inappropriate_content, etc.
  targetType: text("target_type").notNull(), // user, post, comment, advertisement
  targetId: integer("target_id"),
  reason: text("reason").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, reviewed, resolved, dismissed
  adminNotes: text("admin_notes"),
  resolvedByAdminId: integer("resolved_by_admin_id").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schema definitions for new tables
export const insertFriendInvitationSchema = createInsertSchema(friendInvitations).omit({
  id: true,
  createdAt: true,
});

export const insertAdminActionSchema = createInsertSchema(adminActions).omit({
  id: true,
  createdAt: true,
});

export const insertUserReportSchema = createInsertSchema(userReports).omit({
  id: true,
  createdAt: true,
});

export type InsertFriendInvitation = z.infer<typeof insertFriendInvitationSchema>;
export type FriendInvitation = typeof friendInvitations.$inferSelect;
export type InsertAdminAction = z.infer<typeof insertAdminActionSchema>;
export type AdminAction = typeof adminActions.$inferSelect;
export type InsertUserReport = z.infer<typeof insertUserReportSchema>;
export type UserReport = typeof userReports.$inferSelect;

// Gallery schema definitions
export const insertUserGallerySchema = createInsertSchema(userGalleries).omit({
  id: true,
  itemCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  likes: true,
  shares: true,
  views: true,
  createdAt: true,
});

export const insertGalleryItemCommentSchema = createInsertSchema(galleryItemComments).omit({
  id: true,
  likes: true,
  createdAt: true,
});

export const insertGalleryItemLikeSchema = createInsertSchema(galleryItemLikes).omit({
  id: true,
  createdAt: true,
});

export type InsertUserGallery = z.infer<typeof insertUserGallerySchema>;
export type UserGallery = typeof userGalleries.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItemComment = z.infer<typeof insertGalleryItemCommentSchema>;
export type GalleryItemComment = typeof galleryItemComments.$inferSelect;
export type InsertGalleryItemLike = z.infer<typeof insertGalleryItemLikeSchema>;
export type GalleryItemLike = typeof galleryItemLikes.$inferSelect;

// Universal notification system for all platform activity
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // "new_post", "new_comment", "auto_post", "discussion_reply", "new_affiliate_product"
  title: text("title").notNull(),
  message: text("message").notNull(),
  relatedUserId: integer("related_user_id").references(() => users.id), // Who made the post/comment
  relatedUserName: text("related_user_name"), // Cache the user name
  relatedPostId: integer("related_post_id"), // Link to post/comment/discussion
  relatedCategoryId: integer("related_category_id").references(() => discussionCategories.id),
  relatedCategoryName: text("related_category_name"), // Cache category name
  imageUrl: text("image_url"), // For affiliate product images or other visual notifications
  isRead: boolean("is_read").default(false).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
