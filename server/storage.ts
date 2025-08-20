import { 
  users, supplements, supplementLogs, biometrics, shopProducts, orders,
  blogPosts, userConnections, blogPostLikes, blogPostComments,
  discussionCategories, communityDiscussions, discussionMessages, discussionParticipants, userSocialLinks, userProfileImages,
  chatRooms, chatParticipants, chatMessages, profileWallPosts, profileWallComments, profileWallLikes,
  advertisements, adImpressions, adClicks,
  companies, companyProducts, companyOrders,
  friendInvitations, adminActions, userReports,
  feedSources, feedItems, feedConfigurations,
  userFiles, userGalleries, galleryItems, galleryItemComments, galleryItemLikes,
  personalShops, personalShopAffiliateLinks, affiliateLinkComments, affiliateLinkShares, personalShopPayments,
  notifications, businessProspects, exerciseLogs, fitnessGoals,
  galleryAlbums, galleryPhotos,
  type User, type InsertUser,
  type Supplement, type InsertSupplement,
  type SupplementLog, type InsertSupplementLog,
  type Biometric, type InsertBiometric,
  type ShopProduct, type InsertShopProduct,
  type Order, type InsertOrder,
  type BlogPost, type InsertBlogPost,
  type UserConnection, type InsertUserConnection,
  type BlogPostLike, type InsertBlogPostLike,
  type BlogPostComment, type InsertBlogPostComment,
  type DiscussionCategory, type InsertDiscussionCategory,
  type CommunityDiscussion, type InsertCommunityDiscussion,
  type DiscussionMessage, type InsertDiscussionMessage,
  type DiscussionParticipant, type InsertDiscussionParticipant,
  type UserSocialLink, type InsertUserSocialLink,
  type UserProfileImage, type InsertUserProfileImage,
  type ChatRoom, type InsertChatRoom,
  type ChatParticipant, type InsertChatParticipant,
  type ChatMessage, type InsertChatMessage,
  type ProfileWallPost, type InsertProfileWallPost,
  type ProfileWallComment, type InsertProfileWallComment,
  type ProfileWallLike, type InsertProfileWallLike,
  type Advertisement, type InsertAdvertisement,
  type AdImpression, type InsertAdImpression,
  type AdClick, type InsertAdClick,
  type Company, type InsertCompany,
  type CompanyProduct, type InsertCompanyProduct,
  type CompanyOrder, type InsertCompanyOrder,
  type FriendInvitation, type InsertFriendInvitation,
  type AdminAction, type InsertAdminAction,
  type UserReport, type InsertUserReport,
  type FeedSource, type InsertFeedSource,
  type FeedItem, type InsertFeedItem,
  type FeedConfiguration, type InsertFeedConfiguration,
  type PersonalShop, type InsertPersonalShop,
  type PersonalShopAffiliateLink, type InsertPersonalShopAffiliateLink,
  type AffiliateLinkComment, type InsertAffiliateLinkComment,
  type AffiliateLinkShare, type InsertAffiliateLinkShare,
  type PersonalShopPayment, type InsertPersonalShopPayment,
  type GalleryAlbum, type InsertGalleryAlbum,
  type GalleryPhoto, type InsertGalleryPhoto,
  type UserGallery, type InsertUserGallery,
  type GalleryItem, type InsertGalleryItem,
  type GalleryItemComment, type InsertGalleryItemComment,
  type GalleryItemLike, type InsertGalleryItemLike,
  type Notification, type InsertNotification,
  type ExerciseLog, type InsertExerciseLog,
  type FitnessGoal, type InsertFitnessGoal
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, like, and, sql, or, ilike, ne } from "drizzle-orm";

// Export db for use in other modules
export { db };

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Supplement operations
  getSupplements(userId: number): Promise<Supplement[]>;
  getSupplement(id: number): Promise<Supplement | undefined>;
  createSupplement(supplement: InsertSupplement): Promise<Supplement>;
  updateSupplement(id: number, updates: Partial<InsertSupplement>): Promise<Supplement | undefined>;
  deleteSupplement(id: number): Promise<boolean>;

  // Supplement log operations
  getSupplementLogs(userId: number, startDate?: Date, endDate?: Date): Promise<SupplementLog[]>;
  createSupplementLog(log: InsertSupplementLog): Promise<SupplementLog>;
  getSupplementLogsForDate(userId: number, date: Date): Promise<SupplementLog[]>;

  // Biometric operations
  getBiometrics(userId: number, startDate?: Date, endDate?: Date): Promise<Biometric[]>;
  createBiometric(biometric: InsertBiometric): Promise<Biometric>;
  getLatestBiometric(userId: number): Promise<Biometric | undefined>;

  // Shop operations
  getShopProducts(category?: string): Promise<ShopProduct[]>;
  getShopProduct(id: number): Promise<ShopProduct | undefined>;
  createShopProduct(product: InsertShopProduct): Promise<ShopProduct>;
  updateShopProduct(id: number, updates: Partial<InsertShopProduct>): Promise<ShopProduct | undefined>;
  deleteShopProduct(id: number): Promise<boolean>;

  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  updateOrderStatus(id: number, status: string, paymentIntentId?: string): Promise<Order | undefined>;

  // Blog operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getUserBlogPosts(userId: number): Promise<BlogPost[]>;
  getAllBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;

  // User connection operations
  createConnection(connection: InsertUserConnection): Promise<UserConnection>;
  getUserConnections(userId: number): Promise<User[]>;
  getPendingConnections(userId: number): Promise<UserConnection[]>;
  updateConnectionStatus(id: number, status: string): Promise<UserConnection | undefined>;
  searchUsers(query: string): Promise<User[]>;
  
  // Social media operations
  updateUserSocialLinks(userId: number, socialData: any): Promise<User | undefined>;

  // Blog interaction operations
  likeBlogPost(like: InsertBlogPostLike): Promise<BlogPostLike>;
  unlikeBlogPost(userId: number, postId: number): Promise<boolean>;
  getBlogPostLikes(postId: number): Promise<BlogPostLike[]>;
  createComment(comment: InsertBlogPostComment): Promise<BlogPostComment>;
  getBlogPostComments(postId: number): Promise<BlogPostComment[]>;
  getBlogComment(commentId: number): Promise<BlogPostComment | undefined>;
  deleteComment(commentId: number): Promise<boolean>;

  // Discussion category operations
  getDiscussionCategories(): Promise<DiscussionCategory[]>;
  createDiscussionCategory(category: InsertDiscussionCategory): Promise<DiscussionCategory>;
  updateDiscussionCategory(id: number, category: Partial<InsertDiscussionCategory>): Promise<DiscussionCategory>;
  deleteDiscussionCategory(id: number): Promise<void>;

  // Community discussion operations
  getCommunityDiscussions(categoryId?: number, location?: string): Promise<CommunityDiscussion[]>;
  createCommunityDiscussion(discussion: InsertCommunityDiscussion): Promise<CommunityDiscussion>;
  getCommunityDiscussion(id: number): Promise<CommunityDiscussion | undefined>;
  joinDiscussion(participant: InsertDiscussionParticipant): Promise<DiscussionParticipant>;

  // Discussion message operations
  getDiscussionMessages(discussionId: number): Promise<DiscussionMessage[]>;
  createDiscussionMessage(message: InsertDiscussionMessage): Promise<DiscussionMessage>;

  // User social links operations
  getUserSocialLinks(userId: number): Promise<UserSocialLink[]>;
  createUserSocialLink(link: InsertUserSocialLink): Promise<UserSocialLink>;
  deleteUserSocialLink(id: number): Promise<boolean>;
  updateUserSocialLinks(userId: number, socialData: any): Promise<User | undefined>;

  // User profile image operations
  getUserProfileImages(userId: number): Promise<UserProfileImage[]>;
  createUserProfileImage(image: InsertUserProfileImage): Promise<UserProfileImage>;
  deleteUserProfileImage(id: number): Promise<boolean>;
  setProfilePicture(userId: number, imageId: number): Promise<boolean>;

  // Gallery operations
  getUserAlbums(userId: number): Promise<GalleryAlbum[]>;
  createAlbum(album: InsertGalleryAlbum): Promise<GalleryAlbum>;
  getAlbumPhotos(albumId: number): Promise<GalleryPhoto[]>;
  addPhotoToAlbum(photo: InsertGalleryPhoto): Promise<GalleryPhoto>;
  deletePhoto(photoId: number): Promise<boolean>;

  // Global search operations
  globalSearch(query: string): Promise<{
    users: User[];
    supplements: Supplement[];
    discussions: CommunityDiscussion[];
  }>;

  // Chat operations
  createChatRoom(room: InsertChatRoom): Promise<ChatRoom>;
  getChatRoom(id: number): Promise<ChatRoom | undefined>;
  getUserChatRooms(userId: number): Promise<ChatRoom[]>;
  addChatParticipant(participant: InsertChatParticipant): Promise<ChatParticipant>;
  getChatParticipants(roomId: number): Promise<ChatParticipant[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(roomId: number, limit?: number, offset?: number): Promise<ChatMessage[]>;
  getOrCreateDirectMessageRoom(userId1: number, userId2: number): Promise<ChatRoom>;

  // Profile wall operations
  getProfileWallPosts(userId: number): Promise<ProfileWallPost[]>;
  createProfileWallPost(post: InsertProfileWallPost): Promise<ProfileWallPost>;
  likeProfileWallPost(postId: number, userId: number): Promise<ProfileWallLike>;
  unlikeProfileWallPost(postId: number, userId: number): Promise<boolean>;
  getProfileWallComments(postId: number): Promise<ProfileWallComment[]>;
  createProfileWallComment(comment: InsertProfileWallComment): Promise<ProfileWallComment>;
  getUserPhotoGallery(userId: number): Promise<UserProfileImage[]>;
  getUserConnections(userId: number): Promise<User[]>;
  connectWithUser(userId1: number, userId2: number): Promise<UserConnection>;

  // Advertisement operations
  createAdvertisement(ad: InsertAdvertisement): Promise<Advertisement>;
  getAdvertisements(targetLocation?: string, targetScope?: string, limit?: number): Promise<Advertisement[]>;
  getAdvertisementById(id: number): Promise<Advertisement | undefined>;
  updateAdvertisement(id: number, updates: Partial<InsertAdvertisement>): Promise<Advertisement | undefined>;
  deleteAdvertisement(id: number): Promise<boolean>;
  recordAdImpression(impression: InsertAdImpression): Promise<AdImpression>;
  recordAdClick(click: InsertAdClick): Promise<AdClick>;
  getAdPerformance(adId: number): Promise<{ impressions: number; clicks: number }>;

  // Company operations
  createCompany(company: InsertCompany): Promise<Company>;
  getCompany(id: number): Promise<Company | undefined>;
  getCompaniesByOwner(ownerId: number): Promise<Company[]>;
  getAllCompanies(): Promise<Company[]>;
  getFeaturedCompanies(): Promise<Company[]>;
  updateCompany(id: number, updates: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: number): Promise<boolean>;

  // Company product operations
  createCompanyProduct(product: InsertCompanyProduct): Promise<CompanyProduct>;
  getCompanyProduct(id: number): Promise<CompanyProduct | undefined>;
  getCompanyProducts(companyId: number): Promise<CompanyProduct[]>;
  updateCompanyProduct(id: number, updates: Partial<InsertCompanyProduct>): Promise<CompanyProduct | undefined>;
  deleteCompanyProduct(id: number): Promise<boolean>;

  // Company order operations
  createCompanyOrder(order: InsertCompanyOrder): Promise<CompanyOrder>;
  getCompanyOrders(companyId: number): Promise<CompanyOrder[]>;
  getCompanyOrdersByCustomer(customerId: number): Promise<CompanyOrder[]>;

  // Admin operations
  blockUser(userId: number, reason: string): Promise<void>;
  unblockUser(userId: number): Promise<void>;
  deleteUser(userId: number, reason: string): Promise<void>;
  updateUserAdmin(userId: number, updates: any): Promise<User | undefined>;
  changeUserPermissions(userId: number, isAdmin: boolean, reason: string): Promise<void>;
  deletePostAdmin(postId: number, reason: string): Promise<void>;
  getUserContent(userId: number): Promise<any>;
  getAllProfileWallPosts(): Promise<ProfileWallPost[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getAllCompanyProducts(): Promise<CompanyProduct[]>;
  deleteProfileWallPost(id: number): Promise<boolean>;
  deleteBlogPost(id: number): Promise<boolean>;
  deleteCompanyProduct(id: number): Promise<boolean>;
  deleteProfileWallComment(id: number): Promise<boolean>;
  logAdminAction(action: InsertAdminAction): Promise<AdminAction>;
  getAdminActions(): Promise<AdminAction[]>;
  getUserReports(): Promise<UserReport[]>;

  // Friend invitation operations
  createFriendInvitation(invitation: InsertFriendInvitation): Promise<FriendInvitation>;
  getInvitationByCode(code: string): Promise<FriendInvitation | undefined>;
  acceptInvitation(id: number): Promise<void>;
  getUserInvitations(userId: number): Promise<FriendInvitation[]>;

  // Location-based advertising operations
  getLocationStats(): Promise<any[]>;
  getAdsByLocation(location: string, scope: string): Promise<any[]>;
  recordAdClick(clickData: InsertAdClick): Promise<AdClick>;

  // Feed management operations
  createFeedSource(source: InsertFeedSource): Promise<FeedSource>;
  getFeedSources(): Promise<FeedSource[]>;
  getFeedSourcesByCategory(categoryId: number): Promise<FeedSource[]>;
  updateFeedSource(id: number, updates: Partial<InsertFeedSource>): Promise<FeedSource | undefined>;
  deleteFeedSource(id: number): Promise<boolean>;
  
  createFeedItem(item: InsertFeedItem): Promise<FeedItem>;
  getFeedItems(sourceId?: number): Promise<FeedItem[]>;
  getUnpostedFeedItems(): Promise<FeedItem[]>;
  markFeedItemAsPosted(id: number, discussionId: number): Promise<void>;
  
  createFeedConfiguration(config: InsertFeedConfiguration): Promise<FeedConfiguration>;
  getFeedConfigurations(): Promise<FeedConfiguration[]>;
  getFeedConfigurationByCategory(categoryId: number): Promise<FeedConfiguration | undefined>;
  updateFeedConfiguration(id: number, updates: Partial<InsertFeedConfiguration>): Promise<FeedConfiguration | undefined>;
  deleteFeedConfiguration(id: number): Promise<boolean>;

  // Universal notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<void>;
  deleteNotification(id: number): Promise<boolean>;
  createUniversalNotifications(type: string, title: string, message: string, relatedUserId?: number, relatedUserName?: string, relatedPostId?: number, relatedCategoryId?: number, relatedCategoryName?: string): Promise<void>;

  // Personal shop affiliate notifications
  notifyAllUsersOfNewAffiliateProduct(linkId: number, creatorId: number, productTitle: string, productImageUrl: string | null): Promise<void>;
  createAffiliateProductWallPostsForAllUsers(linkId: number, creatorId: number, title: string, description: string | null, productImageUrl: string | null, brand: string): Promise<void>;
  shareAffiliateLinkToAllWalls(linkId: number): Promise<void>;

  // Business prospect operations
  getAllBusinessProspects(): Promise<any[]>;
  getCitiesByCountry(country: string): Promise<any[]>;
  
  // Social media links operations
  updateUserSocialMediaLinks(userId: number, socialData: any): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createFile(fileData: {
    userId: number;
    fileName: string;
    originalName: string;
    fileType: string;
    fileSize: number;
    galleryName: string;
    caption: string;
    cropData: any;
    dataUrl: string;
    isProfileImage: boolean;
  }): Promise<any> {
    const [file] = await db
      .insert(userFiles)
      .values({
        userId: fileData.userId,
        fileName: fileData.fileName,
        originalName: fileData.originalName,
        mimeType: fileData.fileType,
        fileSize: fileData.fileSize,
        fileData: fileData.dataUrl,
        fileType: fileData.fileType,
        cropData: fileData.cropData,
        isActive: true
      })
      .returning();
    
    return {
      ...file,
      dataUrl: file.fileData
    };
  }

  async getUserFiles(userId: number, fileType?: string): Promise<any[]> {
    const conditions = [eq(userFiles.userId, userId)];
    
    if (fileType) {
      conditions.push(eq(userFiles.fileType, fileType));
    }
    
    return await db
      .select()
      .from(userFiles)
      .where(and(...conditions))
      .orderBy(desc(userFiles.createdAt));
  }

  async getSupplements(userId: number): Promise<Supplement[]> {
    return await db
      .select()
      .from(supplements)
      .where(eq(supplements.userId, userId));
  }

  async getSupplement(id: number): Promise<Supplement | undefined> {
    const [supplement] = await db.select().from(supplements).where(eq(supplements.id, id));
    return supplement || undefined;
  }

  async createSupplement(insertSupplement: InsertSupplement): Promise<Supplement> {
    const [supplement] = await db
      .insert(supplements)
      .values(insertSupplement)
      .returning();
    return supplement;
  }

  async updateSupplement(id: number, updates: Partial<InsertSupplement>): Promise<Supplement | undefined> {
    const [supplement] = await db
      .update(supplements)
      .set(updates)
      .where(eq(supplements.id, id))
      .returning();
    return supplement || undefined;
  }

  async deleteSupplement(id: number): Promise<boolean> {
    const [supplement] = await db
      .update(supplements)
      .set({ isActive: false })
      .where(eq(supplements.id, id))
      .returning();
    return !!supplement;
  }

  async getSupplementLogs(userId: number, startDate?: Date, endDate?: Date): Promise<SupplementLog[]> {
    let query = db.select().from(supplementLogs).where(eq(supplementLogs.userId, userId));
    
    // Note: In a real implementation, you'd add date filtering here
    const logs = await query;
    
    // Filter dates in memory for now
    let filteredLogs = logs;
    if (startDate) {
      filteredLogs = filteredLogs.filter(log => log.takenAt >= startDate);
    }
    if (endDate) {
      filteredLogs = filteredLogs.filter(log => log.takenAt <= endDate);
    }
    
    return filteredLogs.sort((a, b) => b.takenAt.getTime() - a.takenAt.getTime());
  }

  async createSupplementLog(insertLog: InsertSupplementLog): Promise<SupplementLog> {
    const [log] = await db
      .insert(supplementLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async getSupplementLogsForDate(userId: number, date: Date): Promise<SupplementLog[]> {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return this.getSupplementLogs(userId, startOfDay, endOfDay);
  }

  async getBiometrics(userId: number, startDate?: Date, endDate?: Date): Promise<Biometric[]> {
    let query = db.select().from(biometrics).where(eq(biometrics.userId, userId));
    
    const metrics = await query;
    
    // Filter dates in memory for now
    let filteredMetrics = metrics;
    if (startDate) {
      filteredMetrics = filteredMetrics.filter(b => b.date >= startDate);
    }
    if (endDate) {
      filteredMetrics = filteredMetrics.filter(b => b.date <= endDate);
    }
    
    return filteredMetrics.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createBiometric(insertBiometric: InsertBiometric): Promise<Biometric> {
    const [biometric] = await db
      .insert(biometrics)
      .values(insertBiometric)
      .returning();
    return biometric;
  }

  async getLatestBiometric(userId: number): Promise<Biometric | undefined> {
    const metrics = await this.getBiometrics(userId);
    return metrics.length > 0 ? metrics[0] : undefined;
  }

  async getShopProducts(category?: string): Promise<ShopProduct[]> {
    if (category) {
      return await db
        .select()
        .from(shopProducts)
        .where(eq(shopProducts.category, category));
    }
    return await db.select().from(shopProducts).where(eq(shopProducts.isActive, true));
  }

  async getShopProduct(id: number): Promise<ShopProduct | undefined> {
    const [product] = await db.select().from(shopProducts).where(eq(shopProducts.id, id));
    return product || undefined;
  }

  async createShopProduct(insertProduct: InsertShopProduct): Promise<ShopProduct> {
    const [product] = await db
      .insert(shopProducts)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateShopProduct(id: number, updates: Partial<InsertShopProduct>): Promise<ShopProduct | undefined> {
    const [product] = await db
      .update(shopProducts)
      .set(updates)
      .where(eq(shopProducts.id, id))
      .returning();
    return product || undefined;
  }

  async deleteShopProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(shopProducts)
      .where(eq(shopProducts.id, id));
    return (result.rowCount || 0) > 0;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async updateOrderStatus(id: number, status: string, paymentIntentId?: string): Promise<Order | undefined> {
    const updates: any = { status };
    if (paymentIntentId) {
      updates.stripePaymentIntentId = paymentIntentId;
    }
    const [order] = await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  // Blog operations
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getUserBlogPosts(userId: number): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.userId, userId))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getAllBlogPosts(limit: number = 20, offset: number = 0): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublic, true))
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.category, category),
          eq(blogPosts.isPublic, true)
        )
      )
      .orderBy(desc(blogPosts.createdAt));
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.isPublic, true),
          or(
            like(blogPosts.title, `%${query}%`),
            like(blogPosts.content, `%${query}%`)
          )
        )
      )
      .orderBy(desc(blogPosts.createdAt));
  }

  // User connection operations
  async createConnection(insertConnection: InsertUserConnection): Promise<UserConnection> {
    const [connection] = await db
      .insert(userConnections)
      .values(insertConnection)
      .returning();
    return connection;
  }



  async getPendingConnections(userId: number): Promise<UserConnection[]> {
    const pendingConnections = await db
      .select({
        id: userConnections.id,
        fromUserId: userConnections.fromUserId,
        toUserId: userConnections.toUserId,
        status: userConnections.status,
        createdAt: userConnections.createdAt,
        fromUser: {
          id: users.id,
          name: users.name,
          email: users.email
        }
      })
      .from(userConnections)
      .leftJoin(users, eq(users.id, userConnections.fromUserId))
      .where(
        and(
          eq(userConnections.toUserId, userId),
          eq(userConnections.status, "pending")
        )
      );

    return pendingConnections as any;
  }

  async updateConnectionStatus(id: number, status: string): Promise<UserConnection | undefined> {
    const [connection] = await db
      .update(userConnections)
      .set({ status })
      .where(eq(userConnections.id, id))
      .returning();
    return connection || undefined;
  }

  async searchUsers(query: string): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(
        or(
          like(users.name, `%${query}%`),
          like(users.email, `%${query}%`)
        )
      );
  }

  // Blog interaction operations
  async likeBlogPost(insertLike: InsertBlogPostLike): Promise<BlogPostLike> {
    const [like] = await db
      .insert(blogPostLikes)
      .values(insertLike)
      .returning();
    
    // Update likes count
    await db
      .update(blogPosts)
      .set({ likes: sql`${blogPosts.likes} + 1` })
      .where(eq(blogPosts.id, insertLike.postId));
    
    return like;
  }

  async unlikeBlogPost(userId: number, postId: number): Promise<boolean> {
    const result = await db
      .delete(blogPostLikes)
      .where(
        and(
          eq(blogPostLikes.userId, userId),
          eq(blogPostLikes.postId, postId)
        )
      );
    
    if ((result.rowCount ?? 0) > 0) {
      // Update likes count
      await db
        .update(blogPosts)
        .set({ likes: sql`${blogPosts.likes} - 1` })
        .where(eq(blogPosts.id, postId));
      return true;
    }
    return false;
  }

  async getBlogPostLikes(postId: number): Promise<BlogPostLike[]> {
    return await db
      .select()
      .from(blogPostLikes)
      .where(eq(blogPostLikes.postId, postId));
  }

  async createComment(insertComment: InsertBlogPostComment): Promise<BlogPostComment> {
    const [comment] = await db
      .insert(blogPostComments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async getBlogPostComments(postId: number): Promise<BlogPostComment[]> {
    return await db
      .select()
      .from(blogPostComments)
      .where(eq(blogPostComments.postId, postId))
      .orderBy(desc(blogPostComments.createdAt));
  }

  async getBlogComment(commentId: number): Promise<BlogPostComment | undefined> {
    const [comment] = await db
      .select()
      .from(blogPostComments)
      .where(eq(blogPostComments.id, commentId));
    return comment || undefined;
  }

  async deleteComment(commentId: number): Promise<boolean> {
    const result = await db
      .delete(blogPostComments)
      .where(eq(blogPostComments.id, commentId));
    return (result.rowCount ?? 0) > 0;
  }

  // Discussion category operations
  async getDiscussionCategories(): Promise<DiscussionCategory[]> {
    return await db.select().from(discussionCategories).orderBy(discussionCategories.name);
  }

  async createDiscussionCategory(insertCategory: InsertDiscussionCategory): Promise<DiscussionCategory> {
    const [category] = await db.insert(discussionCategories).values(insertCategory).returning();
    return category;
  }

  async updateDiscussionCategory(id: number, updateData: Partial<InsertDiscussionCategory>): Promise<DiscussionCategory> {
    const [category] = await db
      .update(discussionCategories)
      .set(updateData)
      .where(eq(discussionCategories.id, id))
      .returning();
    
    if (!category) {
      throw new Error("Category not found");
    }
    
    return category;
  }

  async deleteDiscussionCategory(id: number): Promise<void> {
    // First check if there are any discussions using this category
    const discussions = await db
      .select({ id: communityDiscussions.id })
      .from(communityDiscussions)
      .where(eq(communityDiscussions.categoryId, id))
      .limit(1);

    if (discussions.length > 0) {
      throw new Error("Cannot delete category that has existing discussions");
    }

    const result = await db
      .delete(discussionCategories)
      .where(eq(discussionCategories.id, id));

    if (result.rowCount === 0) {
      throw new Error("Category not found");
    }
  }

  // Community discussion operations
  async getCommunityDiscussions(categoryId?: number, location?: string): Promise<CommunityDiscussion[]> {
    if (categoryId && location) {
      return await db.select()
        .from(communityDiscussions)
        .where(and(
          eq(communityDiscussions.categoryId, categoryId),
          eq(communityDiscussions.location, location)
        ))
        .orderBy(desc(communityDiscussions.updatedAt));
    } else if (categoryId) {
      return await db.select()
        .from(communityDiscussions)
        .where(eq(communityDiscussions.categoryId, categoryId))
        .orderBy(desc(communityDiscussions.updatedAt));
    } else if (location) {
      return await db.select()
        .from(communityDiscussions)
        .where(eq(communityDiscussions.location, location))
        .orderBy(desc(communityDiscussions.updatedAt));
    } else {
      return await db.select()
        .from(communityDiscussions)
        .orderBy(desc(communityDiscussions.updatedAt));
    }
  }

  async createCommunityDiscussion(insertDiscussion: InsertCommunityDiscussion): Promise<CommunityDiscussion> {
    const [discussion] = await db.insert(communityDiscussions).values(insertDiscussion).returning();
    return discussion;
  }

  async createDiscussion(discussionData: any): Promise<CommunityDiscussion> {
    const insertData: InsertCommunityDiscussion = {
      title: discussionData.title,
      description: discussionData.content,
      userId: discussionData.authorId,
      categoryId: 1, // Default to first category
      location: discussionData.location || 'Global',
      tags: discussionData.category ? [discussionData.category] : [],
      participantCount: 0,
      messageCount: 0,
      createdAt: new Date(discussionData.createdAt || new Date()),
      updatedAt: new Date()
    };
    
    const [discussion] = await db.insert(communityDiscussions).values(insertData).returning();
    return discussion;
  }

  async getCommunityDiscussion(id: number): Promise<CommunityDiscussion | undefined> {
    const [discussion] = await db.select().from(communityDiscussions).where(eq(communityDiscussions.id, id));
    return discussion || undefined;
  }

  async joinDiscussion(insertParticipant: InsertDiscussionParticipant): Promise<DiscussionParticipant> {
    const [participant] = await db.insert(discussionParticipants).values(insertParticipant).returning();
    
    // Update participant count
    await db.update(communityDiscussions)
      .set({ 
        participantCount: sql`participant_count + 1`,
        updatedAt: new Date()
      })
      .where(eq(communityDiscussions.id, insertParticipant.discussionId));
    
    return participant;
  }

  // Discussion message operations
  async getDiscussionMessages(discussionId: number): Promise<DiscussionMessage[]> {
    return await db.select({
      id: discussionMessages.id,
      discussionId: discussionMessages.discussionId,
      userId: discussionMessages.userId,
      content: discussionMessages.content,
      imageUrl: discussionMessages.imageUrl,
      parentMessageId: discussionMessages.parentMessageId,
      likes: discussionMessages.likes,
      createdAt: discussionMessages.createdAt,
      userName: users.name
    }).from(discussionMessages)
      .leftJoin(users, eq(discussionMessages.userId, users.id))
      .where(eq(discussionMessages.discussionId, discussionId))
      .orderBy(discussionMessages.createdAt);
  }

  async createDiscussionMessage(insertMessage: InsertDiscussionMessage): Promise<DiscussionMessage> {
    const [message] = await db.insert(discussionMessages).values(insertMessage).returning();
    
    // Update message count and last activity
    await db.update(communityDiscussions)
      .set({ 
        messageCount: sql`message_count + 1`,
        updatedAt: new Date()
      })
      .where(eq(communityDiscussions.id, insertMessage.discussionId));
    
    return message;
  }

  // User social links operations
  async getUserSocialLinks(userId: number): Promise<UserSocialLink[]> {
    return await db.select().from(userSocialLinks)
      .where(eq(userSocialLinks.userId, userId))
      .orderBy(userSocialLinks.platform);
  }

  async createUserSocialLink(insertLink: InsertUserSocialLink): Promise<UserSocialLink> {
    const [link] = await db.insert(userSocialLinks).values(insertLink).returning();
    return link;
  }

  async deleteUserSocialLink(id: number): Promise<boolean> {
    const result = await db.delete(userSocialLinks).where(eq(userSocialLinks.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Global search operations
  async globalSearch(query: string): Promise<{
    users: User[];
    supplements: Supplement[];
    discussions: CommunityDiscussion[];
  }> {
    const searchTerm = `%${query}%`;

    // Search users by name and email
    const usersResults = await db
      .select({
        id: users.id,
        firebaseUid: users.firebaseUid,
        email: users.email,
        name: users.name,
        isAdmin: users.isAdmin,
        isBlocked: users.isBlocked,
        blockedReason: users.blockedReason,
        blockedAt: users.blockedAt,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        facebookUrl: users.facebookUrl,
        twitterUrl: users.twitterUrl,
        whatsappUrl: users.whatsappUrl,
        telegramUrl: users.telegramUrl,
        instagramUrl: users.instagramUrl,
        linkedinUrl: users.linkedinUrl,
        youtubeUrl: users.youtubeUrl,
        tiktokUrl: users.tiktokUrl,
        personalWebsite: users.personalWebsite,
      })
      .from(users)
      .where(
        or(
          like(users.name, searchTerm),
          like(users.email, searchTerm)
        )
      )
      .limit(10);

    // Search supplements by name and notes
    const supplementsResults = await db
      .select()
      .from(supplements)
      .where(
        or(
          like(supplements.name, searchTerm),
          like(supplements.notes, searchTerm)
        )
      )
      .limit(10);

    // Search discussions by title, description, and tags
    const discussionsResults = await db
      .select()
      .from(communityDiscussions)
      .where(
        or(
          like(communityDiscussions.title, searchTerm),
          like(communityDiscussions.description, searchTerm)
        )
      )
      .limit(10);

    return {
      users: usersResults,
      supplements: supplementsResults,
      discussions: discussionsResults,
    };
  }

  async getUserProfileImages(userId: number): Promise<UserProfileImage[]> {
    return await db.select().from(userProfileImages).where(eq(userProfileImages.userId, userId)).orderBy(desc(userProfileImages.createdAt));
  }

  async createUserProfileImage(insertImage: InsertUserProfileImage): Promise<UserProfileImage> {
    const [image] = await db.insert(userProfileImages).values(insertImage).returning();
    return image;
  }

  async deleteUserProfileImage(id: number): Promise<boolean> {
    const result = await db.delete(userProfileImages).where(eq(userProfileImages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async setProfilePicture(userId: number, imageId: number): Promise<boolean> {
    // First, unset all current profile pictures for this user
    await db.update(userProfileImages)
      .set({ isProfilePicture: false })
      .where(eq(userProfileImages.userId, userId));

    // Then set the new profile picture
    const result = await db.update(userProfileImages)
      .set({ isProfilePicture: true })
      .where(and(eq(userProfileImages.id, imageId), eq(userProfileImages.userId, userId)));

    return (result.rowCount ?? 0) > 0;
  }

  // Chat operations
  async createChatRoom(insertRoom: InsertChatRoom): Promise<ChatRoom> {
    const [room] = await db.insert(chatRooms).values(insertRoom).returning();
    return room;
  }

  async getChatRoom(id: number): Promise<ChatRoom | undefined> {
    const [room] = await db.select().from(chatRooms).where(eq(chatRooms.id, id));
    return room;
  }

  async getUserChatRooms(userId: number): Promise<ChatRoom[]> {
    return await db.select({
      id: chatRooms.id,
      name: chatRooms.name,
      isDirectMessage: chatRooms.isDirectMessage,
      createdBy: chatRooms.createdBy,
      createdAt: chatRooms.createdAt,
      updatedAt: chatRooms.updatedAt
    })
    .from(chatRooms)
    .innerJoin(chatParticipants, eq(chatRooms.id, chatParticipants.roomId))
    .where(eq(chatParticipants.userId, userId))
    .orderBy(desc(chatRooms.updatedAt));
  }

  async addChatParticipant(insertParticipant: InsertChatParticipant): Promise<ChatParticipant> {
    const [participant] = await db.insert(chatParticipants).values(insertParticipant).returning();
    return participant;
  }

  async getChatParticipants(roomId: number): Promise<ChatParticipant[]> {
    return await db.select().from(chatParticipants).where(eq(chatParticipants.roomId, roomId));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    
    // Update room's updatedAt timestamp
    await db.update(chatRooms)
      .set({ updatedAt: new Date() })
      .where(eq(chatRooms.id, insertMessage.roomId));
    
    return message;
  }

  async getChatMessages(roomId: number, limit: number = 50, offset: number = 0): Promise<ChatMessage[]> {
    return await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.roomId, roomId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getOrCreateDirectMessageRoom(userId1: number, userId2: number): Promise<ChatRoom> {
    // Check if a direct message room already exists between these users
    const existingRoom = await db.select({
      id: chatRooms.id,
      name: chatRooms.name,
      isDirectMessage: chatRooms.isDirectMessage,
      createdBy: chatRooms.createdBy,
      createdAt: chatRooms.createdAt,
      updatedAt: chatRooms.updatedAt
    })
    .from(chatRooms)
    .innerJoin(chatParticipants, eq(chatRooms.id, chatParticipants.roomId))
    .where(
      and(
        eq(chatRooms.isDirectMessage, true),
        or(
          eq(chatParticipants.userId, userId1),
          eq(chatParticipants.userId, userId2)
        )
      )
    )
    .groupBy(chatRooms.id, chatRooms.name, chatRooms.isDirectMessage, chatRooms.createdBy, chatRooms.createdAt, chatRooms.updatedAt)
    .having(sql`COUNT(DISTINCT ${chatParticipants.userId}) = 2`);

    if (existingRoom.length > 0) {
      return existingRoom[0];
    }

    // Create new direct message room
    const [room] = await db.insert(chatRooms).values({
      isDirectMessage: true,
      createdBy: userId1
    }).returning();

    // Add both participants
    await db.insert(chatParticipants).values([
      { roomId: room.id, userId: userId1 },
      { roomId: room.id, userId: userId2 }
    ]);

    return room;
  }

  // Profile wall operations
  async getProfileWallPosts(userId: number): Promise<ProfileWallPost[]> {
    return await db.select()
      .from(profileWallPosts)
      .where(eq(profileWallPosts.userId, userId))
      .orderBy(desc(profileWallPosts.createdAt));
  }

  async createProfileWallPost(insertPost: InsertProfileWallPost): Promise<ProfileWallPost> {
    const [post] = await db.insert(profileWallPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async likeProfileWallPost(postId: number, userId: number): Promise<ProfileWallLike> {
    // Check if already liked
    const [existingLike] = await db.select()
      .from(profileWallLikes)
      .where(and(eq(profileWallLikes.postId, postId), eq(profileWallLikes.userId, userId)));

    if (existingLike) {
      return existingLike;
    }

    // Create like and increment counter
    const [like] = await db.insert(profileWallLikes)
      .values({ postId, userId })
      .returning();

    await db.update(profileWallPosts)
      .set({ likes: sql`likes + 1` })
      .where(eq(profileWallPosts.id, postId));

    return like;
  }

  async unlikeProfileWallPost(postId: number, userId: number): Promise<boolean> {
    const result = await db.delete(profileWallLikes)
      .where(and(eq(profileWallLikes.postId, postId), eq(profileWallLikes.userId, userId)));

    if (result.rowCount && result.rowCount > 0) {
      await db.update(profileWallPosts)
        .set({ likes: sql`likes - 1` })
        .where(eq(profileWallPosts.id, postId));
      return true;
    }
    return false;
  }

  async getProfileWallComments(postId: number): Promise<ProfileWallComment[]> {
    return await db.select()
      .from(profileWallComments)
      .where(eq(profileWallComments.postId, postId))
      .orderBy(profileWallComments.createdAt);
  }

  async createProfileWallComment(insertComment: InsertProfileWallComment): Promise<ProfileWallComment> {
    const [comment] = await db.insert(profileWallComments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async getUserPhotoGallery(userId: number): Promise<UserProfileImage[]> {
    return await db.select()
      .from(userProfileImages)
      .where(eq(userProfileImages.userId, userId))
      .orderBy(desc(userProfileImages.createdAt));
  }

  async getUserConnections(userId: number): Promise<User[]> {
    const connections = await db.select({
      id: users.id,
      firebaseUid: users.firebaseUid,
      email: users.email,
      name: users.name,
      isAdmin: users.isAdmin,
      isBlocked: users.isBlocked,
      blockedReason: users.blockedReason,
      blockedAt: users.blockedAt,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      facebookUrl: users.facebookUrl,
      twitterUrl: users.twitterUrl,
      whatsappUrl: users.whatsappUrl,
      telegramUrl: users.telegramUrl,
      instagramUrl: users.instagramUrl,
      linkedinUrl: users.linkedinUrl,
      youtubeUrl: users.youtubeUrl,
      tiktokUrl: users.tiktokUrl,
      personalWebsite: users.personalWebsite,
    })
    .from(userConnections)
    .innerJoin(users, or(
      and(eq(userConnections.fromUserId, userId), eq(users.id, userConnections.toUserId)),
      and(eq(userConnections.toUserId, userId), eq(users.id, userConnections.fromUserId))
    ))
    .where(eq(userConnections.status, 'accepted'));

    return connections;
  }

  async connectWithUser(userId1: number, userId2: number): Promise<UserConnection> {
    // Check if connection already exists
    const [existingConnection] = await db.select()
      .from(userConnections)
      .where(or(
        and(eq(userConnections.fromUserId, userId1), eq(userConnections.toUserId, userId2)),
        and(eq(userConnections.fromUserId, userId2), eq(userConnections.toUserId, userId1))
      ));

    if (existingConnection) {
      return existingConnection;
    }

    // Create new connection
    const [connection] = await db.insert(userConnections)
      .values({
        fromUserId: userId1,
        toUserId: userId2,
        status: 'accepted' // Auto-accept for now
      })
      .returning();

    return connection;
  }

  async getUserProfileWallPosts(userId: number): Promise<ProfileWallPost[]> {
    return await db.select()
      .from(profileWallPosts)
      .where(eq(profileWallPosts.userId, userId))
      .orderBy(desc(profileWallPosts.createdAt));
  }

  // Advertisement operations
  async createAdvertisement(ad: InsertAdvertisement): Promise<Advertisement> {
    const [advertisement] = await db
      .insert(advertisements)
      .values(ad)
      .returning();
    return advertisement;
  }

  async getAdvertisements(targetLocation?: string, targetScope?: string, limit: number = 10): Promise<Advertisement[]> {
    if (targetLocation && targetScope === 'local') {
      return await db.select().from(advertisements)
        .where(and(
          eq(advertisements.isActive, true),
          eq(advertisements.targetScope, 'local'),
          eq(advertisements.targetLocation, targetLocation)
        ))
        .limit(limit)
        .orderBy(sql`RANDOM()`);
    } else if (targetScope === 'national') {
      return await db.select().from(advertisements)
        .where(and(
          eq(advertisements.isActive, true),
          eq(advertisements.targetScope, 'national')
        ))
        .limit(limit)
        .orderBy(sql`RANDOM()`);
    }

    return await db.select().from(advertisements)
      .where(eq(advertisements.isActive, true))
      .limit(limit)
      .orderBy(sql`RANDOM()`);
  }

  async getAdvertisementById(id: number): Promise<Advertisement | undefined> {
    const [ad] = await db.select().from(advertisements).where(eq(advertisements.id, id));
    return ad || undefined;
  }

  async updateAdvertisement(id: number, updates: Partial<InsertAdvertisement>): Promise<Advertisement | undefined> {
    const [ad] = await db
      .update(advertisements)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(advertisements.id, id))
      .returning();
    return ad || undefined;
  }

  async deleteAdvertisement(id: number): Promise<boolean> {
    const result = await db.delete(advertisements).where(eq(advertisements.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async recordAdImpression(impression: InsertAdImpression): Promise<AdImpression> {
    const [adImpression] = await db
      .insert(adImpressions)
      .values(impression)
      .returning();
    
    // Update impression count on advertisement
    await db
      .update(advertisements)
      .set({ impressions: sql`${advertisements.impressions} + 1` })
      .where(eq(advertisements.id, impression.adId));

    return adImpression;
  }



  async getAdPerformance(adId: number): Promise<{ impressions: number; clicks: number }> {
    const [ad] = await db
      .select({
        impressions: advertisements.impressions,
        clicks: advertisements.clicks
      })
      .from(advertisements)
      .where(eq(advertisements.id, adId));
    
    return {
      impressions: ad?.impressions || 0,
      clicks: ad?.clicks || 0
    };
  }

  // Company operations
  async createCompany(company: InsertCompany): Promise<Company> {
    const [newCompany] = await db
      .insert(companies)
      .values({
        ...company,
        subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      })
      .returning();
    return newCompany;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company;
  }

  async getCompanyByOwner(ownerId: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.ownerId, ownerId));
    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies)
      .where(eq(companies.isActive, true))
      .orderBy(desc(companies.createdAt));
  }

  async getFeaturedCompanies(): Promise<Company[]> {
    // For now, return all active companies as featured
    // Can be enhanced later with a proper featured system
    return await db.select().from(companies)
      .where(eq(companies.isActive, true))
      .orderBy(desc(companies.createdAt))
      .limit(6);
  }

  async getAdvertisementsByCompany(companyId: number): Promise<Advertisement[]> {
    return await db.select().from(advertisements)
      .where(eq(advertisements.advertiserId, companyId))
      .orderBy(desc(advertisements.createdAt));
  }

  async createCompanyProduct(product: InsertCompanyProduct): Promise<CompanyProduct> {
    const [newProduct] = await db
      .insert(companyProducts)
      .values(product)
      .returning();
    return newProduct;
  }

  async getCompanyProducts(companyId: number): Promise<CompanyProduct[]> {
    return await db.select().from(companyProducts)
      .where(eq(companyProducts.companyId, companyId))
      .orderBy(desc(companyProducts.createdAt));
  }

  async getCompanyProduct(id: number): Promise<CompanyProduct | undefined> {
    const [product] = await db.select().from(companyProducts).where(eq(companyProducts.id, id));
    return product;
  }

  async createCompanyOrder(order: InsertCompanyOrder): Promise<CompanyOrder> {
    const [newOrder] = await db
      .insert(companyOrders)
      .values(order)
      .returning();
    return newOrder;
  }

  async getCompaniesByOwner(ownerId: number): Promise<Company[]> {
    return await db.select().from(companies)
      .where(eq(companies.ownerId, ownerId))
      .orderBy(desc(companies.createdAt));
  }

  async updateCompany(id: number, updates: Partial<InsertCompany>): Promise<Company | undefined> {
    const [updatedCompany] = await db
      .update(companies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return updatedCompany;
  }

  async deleteCompany(id: number): Promise<boolean> {
    const result = await db.delete(companies).where(eq(companies.id, id));
    return (result.rowCount || 0) > 0;
  }

  async updateCompanyProduct(id: number, updates: Partial<InsertCompanyProduct>): Promise<CompanyProduct | undefined> {
    const [updatedProduct] = await db
      .update(companyProducts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(companyProducts.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteCompanyProduct(id: number): Promise<boolean> {
    const result = await db.delete(companyProducts).where(eq(companyProducts.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getCompanyOrders(companyId: number): Promise<CompanyOrder[]> {
    return await db.select().from(companyOrders)
      .where(eq(companyOrders.companyId, companyId))
      .orderBy(desc(companyOrders.createdAt));
  }

  async getCompanyOrdersByCustomer(customerId: number): Promise<CompanyOrder[]> {
    return await db.select().from(companyOrders)
      .where(eq(companyOrders.customerId, customerId))
      .orderBy(desc(companyOrders.createdAt));
  }

  // ==== ADMIN OPERATIONS ====

  async blockUser(userId: number, reason: string): Promise<void> {
    await db.update(users)
      .set({ 
        isBlocked: true, 
        blockedReason: reason, 
        blockedAt: new Date(),
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId));
  }

  async unblockUser(userId: number): Promise<void> {
    await db.update(users)
      .set({ 
        isBlocked: false, 
        blockedReason: null, 
        blockedAt: null,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId));
  }

  async getAllProfileWallPosts(): Promise<any[]> {
    const posts = await db.select()
      .from(profileWallPosts)
      .leftJoin(users, eq(profileWallPosts.userId, users.id))
      .orderBy(desc(profileWallPosts.createdAt));

    return posts.map(row => ({
      id: row.profile_wall_posts.id,
      userId: row.profile_wall_posts.userId,
      authorId: row.profile_wall_posts.authorId,
      content: row.profile_wall_posts.content,
      postType: row.profile_wall_posts.postType,
      mediaUrl: row.profile_wall_posts.mediaUrl,
      mediaType: row.profile_wall_posts.mediaType,
      privacy: row.profile_wall_posts.privacy,
      createdAt: row.profile_wall_posts.createdAt,
      updatedAt: row.profile_wall_posts.updatedAt,
      user: row.users ? {
        id: row.users.id,
        name: row.users.name,
        profileImageUrl: row.users.profileImageUrl
      } : null
    }));
  }



  async getAllCompanyProducts(): Promise<CompanyProduct[]> {
    return await db.select().from(companyProducts)
      .orderBy(desc(companyProducts.createdAt));
  }

  async deleteProfileWallPost(id: number): Promise<boolean> {
    const result = await db.delete(profileWallPosts).where(eq(profileWallPosts.id, id));
    return (result.rowCount || 0) > 0;
  }



  async deleteProfileWallComment(id: number): Promise<boolean> {
    const result = await db.delete(profileWallComments).where(eq(profileWallComments.id, id));
    return (result.rowCount || 0) > 0;
  }

  async logAdminAction(action: InsertAdminAction): Promise<AdminAction> {
    const [adminAction] = await db
      .insert(adminActions)
      .values(action)
      .returning();
    return adminAction;
  }

  async getAdminActions(): Promise<AdminAction[]> {
    return await db.select().from(adminActions)
      .orderBy(desc(adminActions.createdAt))
      .limit(100);
  }

  async getUserReports(): Promise<UserReport[]> {
    return await db.select().from(userReports)
      .orderBy(desc(userReports.createdAt));
  }

  // ==== FRIEND INVITATION OPERATIONS ====

  async createFriendInvitation(invitation: InsertFriendInvitation): Promise<FriendInvitation> {
    const [friendInvitation] = await db
      .insert(friendInvitations)
      .values(invitation)
      .returning();
    return friendInvitation;
  }

  async getInvitationByCode(code: string): Promise<FriendInvitation | undefined> {
    const [invitation] = await db.select().from(friendInvitations)
      .where(eq(friendInvitations.inviteCode, code));
    return invitation || undefined;
  }

  async acceptInvitation(id: number): Promise<void> {
    await db.update(friendInvitations)
      .set({ 
        status: 'accepted', 
        acceptedAt: new Date() 
      })
      .where(eq(friendInvitations.id, id));
  }

  async getUserInvitations(userId: number): Promise<FriendInvitation[]> {
    return await db.select().from(friendInvitations)
      .where(eq(friendInvitations.inviterUserId, userId))
      .orderBy(desc(friendInvitations.createdAt));
  }

  async updateUserSocialLinks(userId: number, socialData: any): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({
        facebookUrl: socialData.facebookUrl || null,
        twitterUrl: socialData.twitterUrl || null,
        whatsappUrl: socialData.whatsappUrl || null,
        telegramUrl: socialData.telegramUrl || null,
        instagramUrl: socialData.instagramUrl || null,
        linkedinUrl: socialData.linkedinUrl || null,
        youtubeUrl: socialData.youtubeUrl || null,
        tiktokUrl: socialData.tiktokUrl || null,
        personalWebsite: socialData.personalWebsite || null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // ==== LOCATION-BASED ADVERTISING OPERATIONS ====

  async getLocationStats(): Promise<any[]> {
    try {
      const stats = await db
        .select({
          location: advertisements.targetLocation,
          adCount: sql<number>`count(${advertisements.id})::int`,
          totalImpressions: sql<number>`sum(${advertisements.impressions})::int`,
          totalClicks: sql<number>`sum(${advertisements.clicks})::int`
        })
        .from(advertisements)
        .where(eq(advertisements.isActive, true))
        .groupBy(advertisements.targetLocation)
        .orderBy(sql`sum(${advertisements.impressions}) DESC`)
        .limit(20);

      // Add simple category data
      const statsWithCategories = stats.map(stat => ({
        ...stat,
        topCategories: ['Health', 'Supplements', 'Wellness'] // Simplified for now
      }));

      return statsWithCategories;
    } catch (error) {
      console.error("Error getting location stats:", error);
      return [];
    }
  }

  async recordAdClick(clickData: InsertAdClick): Promise<AdClick> {
    try {
      const [click] = await db
        .insert(adClicks)
        .values(clickData)
        .returning();

      await db
        .update(advertisements)
        .set({ 
          clicks: sql`${advertisements.clicks} + 1`,
          updatedAt: new Date()
        })
        .where(eq(advertisements.id, clickData.adId));

      return click;
    } catch (error) {
      console.error("Error recording ad click:", error);
      throw error;
    }
  }

  async getAdsByLocation(location: string, scope: string): Promise<any[]> {
    try {
      let whereConditions = [
        eq(advertisements.isActive, true),
        eq(advertisements.targetLocation, location)
      ];

      if (scope !== "all") {
        whereConditions.push(eq(advertisements.targetScope, scope));
      }

      const ads = await db
        .selectDistinct({
          id: advertisements.id,
          title: advertisements.title,
          description: advertisements.description,
          imageUrl: advertisements.imageUrl,
          targetUrl: advertisements.targetUrl,
          targetLocation: advertisements.targetLocation,
          targetScope: advertisements.targetScope,
          impressions: advertisements.impressions,
          clicks: advertisements.clicks,
          advertiserName: users.name,
          companyName: companies.name
        })
        .from(advertisements)
        .innerJoin(users, eq(advertisements.advertiserId, users.id))
        .leftJoin(companies, eq(users.id, companies.ownerId))
        .where(and(...whereConditions))
        .orderBy(desc(advertisements.impressions))
        .limit(50);

      // Remove any remaining duplicates by title+location
      const uniqueAds = ads.filter((ad, index, self) => 
        index === self.findIndex(a => a.title === ad.title && a.targetLocation === ad.targetLocation)
      );

      console.log(`✅ Found ${uniqueAds.length} unique businesses for ${location}`);
      return uniqueAds;
    } catch (error) {
      console.error("Error getting ads by location:", error);
      return [];
    }
  }

  async getFeaturedAds(): Promise<any[]> {
    try {
      const ads = await db
        .selectDistinct({
          id: advertisements.id,
          title: advertisements.title,
          description: advertisements.description,
          imageUrl: advertisements.imageUrl,
          targetUrl: advertisements.targetUrl,
          targetLocation: advertisements.targetLocation,
          targetScope: advertisements.targetScope,
          impressions: advertisements.impressions,
          clicks: advertisements.clicks,
          advertiserName: users.name,
          companyName: companies.name,
          isFeatured: advertisements.isFeatured
        })
        .from(advertisements)
        .innerJoin(users, eq(advertisements.advertiserId, users.id))
        .leftJoin(companies, eq(users.id, companies.ownerId))
        .where(and(
          eq(advertisements.isActive, true),
          eq(advertisements.isFeatured, true)
        ))
        .orderBy(desc(advertisements.impressions))
        .limit(20);

      console.log(`✅ Found ${ads.length} featured businesses`);
      return ads;
    } catch (error) {
      console.error("Error getting featured ads:", error);
      return [];
    }
  }

  async getBusinessProfile(adId: number): Promise<any> {
    try {
      const [business] = await db
        .select({
          id: advertisements.id,
          title: advertisements.title,
          description: advertisements.description,
          imageUrl: advertisements.imageUrl,
          targetUrl: advertisements.targetUrl,
          targetLocation: advertisements.targetLocation,
          targetScope: advertisements.targetScope,
          impressions: advertisements.impressions,
          clicks: advertisements.clicks,
          advertiserName: users.name,
          companyName: companies.name,
          // Extended business details with sample data
          businessType: sql<string>`CASE 
            WHEN ${advertisements.title} LIKE '%Health%' OR ${advertisements.title} LIKE '%Wellness%' OR ${advertisements.title} LIKE '%Clinic%' THEN 'Healthcare'
            WHEN ${advertisements.title} LIKE '%Fitness%' OR ${advertisements.title} LIKE '%Gym%' THEN 'Fitness & Sports'
            WHEN ${advertisements.title} LIKE '%Organic%' OR ${advertisements.title} LIKE '%Foods%' OR ${advertisements.title} LIKE '%Market%' THEN 'Food & Nutrition'
            WHEN ${advertisements.title} LIKE '%Pharmacy%' THEN 'Pharmacy'
            WHEN ${advertisements.title} LIKE '%Dental%' THEN 'Dental Care'
            ELSE 'General Business'
          END`,
          openingHours: sql<string>`'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed'`,
          contactPhone: sql<string>`CASE 
            WHEN ${advertisements.targetLocation} = 'London' THEN '020 7946 0958'
            WHEN ${advertisements.targetLocation} = 'Birmingham' THEN '0121 496 0123'
            WHEN ${advertisements.targetLocation} = 'Manchester' THEN '0161 496 0456'
            WHEN ${advertisements.targetLocation} = 'Leeds' THEN '0113 496 0789'
            WHEN ${advertisements.targetLocation} = 'Sheffield' THEN '0114 496 0321'
            WHEN ${advertisements.targetLocation} = 'Liverpool' THEN '0151 496 0654'
            WHEN ${advertisements.targetLocation} = 'Bristol' THEN '0117 496 0987'
            WHEN ${advertisements.targetLocation} = 'Edinburgh' THEN '0131 496 0147'
            WHEN ${advertisements.targetLocation} = 'Cardiff' THEN '029 2096 0258'
            WHEN ${advertisements.targetLocation} = 'Newcastle' THEN '0191 496 0369'
            WHEN ${advertisements.targetLocation} = 'Oxford' THEN '01865 496 0741'
            WHEN ${advertisements.targetLocation} = 'Nottingham' THEN '0115 496 0852'
            ELSE '01234 567890'
          END`,
          contactEmail: sql<string>`LOWER(REPLACE(${advertisements.title}, ' ', '.')) || '@' || LOWER(${advertisements.targetLocation}) || '.co.uk'`,
          yearEstablished: sql<number>`2010 + (${advertisements.id} % 12)`,
          rating: sql<number>`CAST(4.2 + (${advertisements.id} % 8) * 0.1 AS DECIMAL(3,1))`,
          reviewCount: sql<number>`15 + (${advertisements.id} % 50)`
        })
        .from(advertisements)
        .innerJoin(users, eq(advertisements.advertiserId, users.id))
        .leftJoin(companies, eq(users.id, companies.ownerId))
        .where(eq(advertisements.id, adId));

      if (!business) {
        return null;
      }

      // Add services and specialties based on business type
      const services = [];
      const specialties = [];

      if (business.businessType === 'Healthcare') {
        services.push('Health Consultations', 'Wellness Assessments', 'Preventive Care', 'Health Screenings');
        specialties.push('General Practice', 'Holistic Medicine', 'Nutritional Guidance');
      } else if (business.businessType === 'Fitness & Sports') {
        services.push('Personal Training', 'Group Classes', 'Fitness Assessments', 'Nutritional Coaching');
        specialties.push('Weight Training', 'Cardio Fitness', 'Strength & Conditioning');
      } else if (business.businessType === 'Food & Nutrition') {
        services.push('Organic Produce', 'Natural Supplements', 'Nutritional Products', 'Health Foods');
        specialties.push('Organic Certification', 'Local Sourcing', 'Dietary Supplements');
      } else if (business.businessType === 'Pharmacy') {
        services.push('Prescription Services', 'Health Advice', 'Medication Reviews', 'Wellness Products');
        specialties.push('Clinical Pharmacy', 'Health Consultations', 'Medicine Management');
      } else if (business.businessType === 'Dental Care') {
        services.push('General Dentistry', 'Preventive Care', 'Emergency Services', 'Oral Health');
        specialties.push('Preventive Dentistry', 'Oral Surgery', 'Cosmetic Dentistry');
      }

      return {
        ...business,
        rating: parseFloat(business.rating as string),
        services,
        specialties
      };
    } catch (error) {
      console.error("Error getting business profile:", error);
      return null;
    }
  }

  // Feed management operations
  async createFeedSource(source: InsertFeedSource): Promise<FeedSource> {
    const [feedSource] = await db
      .insert(feedSources)
      .values(source)
      .returning();
    return feedSource;
  }

  async getFeedSources(): Promise<FeedSource[]> {
    return await db.select().from(feedSources).orderBy(desc(feedSources.createdAt));
  }

  async getFeedSourcesByCategory(categoryId: number): Promise<FeedSource[]> {
    return await db.select().from(feedSources)
      .where(eq(feedSources.categoryId, categoryId))
      .orderBy(desc(feedSources.createdAt));
  }

  async updateFeedSource(id: number, updates: Partial<InsertFeedSource>): Promise<FeedSource | undefined> {
    const [feedSource] = await db
      .update(feedSources)
      .set(updates)
      .where(eq(feedSources.id, id))
      .returning();
    return feedSource || undefined;
  }

  async deleteFeedSource(id: number): Promise<boolean> {
    const result = await db.delete(feedSources).where(eq(feedSources.id, id));
    return (result.rowCount || 0) > 0;
  }

  async createFeedItem(item: InsertFeedItem): Promise<FeedItem> {
    const [feedItem] = await db
      .insert(feedItems)
      .values(item)
      .returning();
    return feedItem;
  }

  async getFeedItems(sourceId?: number): Promise<FeedItem[]> {
    if (sourceId) {
      return await db.select().from(feedItems)
        .where(eq(feedItems.sourceId, sourceId))
        .orderBy(desc(feedItems.publishedAt));
    }
    return await db.select().from(feedItems).orderBy(desc(feedItems.publishedAt));
  }

  async getUnpostedFeedItems(): Promise<FeedItem[]> {
    return await db.select().from(feedItems)
      .where(eq(feedItems.isPosted, false))
      .orderBy(desc(feedItems.publishedAt));
  }

  async markFeedItemAsPosted(id: number, discussionId: number): Promise<void> {
    await db
      .update(feedItems)
      .set({ isPosted: true, postedToDiscussion: discussionId })
      .where(eq(feedItems.id, id));
  }

  async createFeedConfiguration(config: InsertFeedConfiguration): Promise<FeedConfiguration> {
    const [feedConfig] = await db
      .insert(feedConfigurations)
      .values(config)
      .returning();
    return feedConfig;
  }

  async getFeedConfigurations(): Promise<FeedConfiguration[]> {
    return await db.select().from(feedConfigurations).orderBy(desc(feedConfigurations.createdAt));
  }

  async getFeedConfigurationByCategory(categoryId: number): Promise<FeedConfiguration | undefined> {
    const [config] = await db.select().from(feedConfigurations)
      .where(eq(feedConfigurations.categoryId, categoryId));
    return config || undefined;
  }

  async updateFeedConfiguration(id: number, updates: Partial<InsertFeedConfiguration>): Promise<FeedConfiguration | undefined> {
    const [config] = await db
      .update(feedConfigurations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(feedConfigurations.id, id))
      .returning();
    return config || undefined;
  }

  async deleteFeedConfiguration(id: number): Promise<boolean> {
    const result = await db.delete(feedConfigurations).where(eq(feedConfigurations.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Gallery management operations
  async createUserGallery(gallery: InsertUserGallery): Promise<UserGallery> {
    const [userGallery] = await db
      .insert(userGalleries)
      .values(gallery)
      .returning();
    return userGallery;
  }

  async getUserGalleries(userId: number): Promise<UserGallery[]> {
    return await db.select().from(userGalleries)
      .where(eq(userGalleries.userId, userId))
      .orderBy(desc(userGalleries.isDefault), desc(userGalleries.createdAt));
  }

  async getGalleryById(galleryId: number): Promise<UserGallery | undefined> {
    const [gallery] = await db.select().from(userGalleries)
      .where(eq(userGalleries.id, galleryId));
    return gallery || undefined;
  }

  async updateUserGallery(galleryId: number, updates: Partial<InsertUserGallery>): Promise<UserGallery | undefined> {
    const [gallery] = await db
      .update(userGalleries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userGalleries.id, galleryId))
      .returning();
    return gallery || undefined;
  }

  async deleteUserGallery(galleryId: number): Promise<boolean> {
    const result = await db.delete(userGalleries).where(eq(userGalleries.id, galleryId));
    return (result.rowCount || 0) > 0;
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [galleryItem] = await db
      .insert(galleryItems)
      .values(item)
      .returning();
    
    // Update gallery item count
    await db
      .update(userGalleries)
      .set({ 
        itemCount: sql`${userGalleries.itemCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(userGalleries.id, item.galleryId));

    return galleryItem;
  }

  async getGalleryItems(galleryId: number): Promise<(GalleryItem & { file: UserFile | null })[]> {
    return await db
      .select({
        id: galleryItems.id,
        galleryId: galleryItems.galleryId,
        fileId: galleryItems.fileId,
        caption: galleryItems.caption,
        tags: galleryItems.tags,
        position: galleryItems.position,
        likes: galleryItems.likes,
        shares: galleryItems.shares,
        views: galleryItems.views,
        createdAt: galleryItems.createdAt,
        file: {
          id: userFiles.id,
          userId: userFiles.userId,
          originalName: userFiles.originalName,
          mimeType: userFiles.mimeType,
          fileType: userFiles.fileType,
          fileSize: userFiles.fileSize,
          fileData: userFiles.fileData,
          cropData: userFiles.cropData,
          createdAt: userFiles.createdAt,
        }
      })
      .from(galleryItems)
      .leftJoin(userFiles, eq(galleryItems.fileId, userFiles.id))
      .where(eq(galleryItems.galleryId, galleryId))
      .orderBy(asc(galleryItems.position), desc(galleryItems.createdAt));
  }

  async getGalleryItem(itemId: number): Promise<(GalleryItem & { file: UserFile | null }) | undefined> {
    const [item] = await db
      .select({
        id: galleryItems.id,
        galleryId: galleryItems.galleryId,
        fileId: galleryItems.fileId,
        caption: galleryItems.caption,
        tags: galleryItems.tags,
        position: galleryItems.position,
        likes: galleryItems.likes,
        shares: galleryItems.shares,
        views: galleryItems.views,
        createdAt: galleryItems.createdAt,
        file: {
          id: userFiles.id,
          userId: userFiles.userId,
          originalName: userFiles.originalName,
          mimeType: userFiles.mimeType,
          fileType: userFiles.fileType,
          fileSize: userFiles.fileSize,
          fileData: userFiles.fileData,
          cropData: userFiles.cropData,
          createdAt: userFiles.createdAt,
        }
      })
      .from(galleryItems)
      .leftJoin(userFiles, eq(galleryItems.fileId, userFiles.id))
      .where(eq(galleryItems.id, itemId));
    
    return item || undefined;
  }

  async updateGalleryItem(itemId: number, updates: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [item] = await db
      .update(galleryItems)
      .set(updates)
      .where(eq(galleryItems.id, itemId))
      .returning();
    return item || undefined;
  }

  async deleteGalleryItem(itemId: number): Promise<boolean> {
    // Get gallery ID before deletion to update count
    const [item] = await db.select({ galleryId: galleryItems.galleryId })
      .from(galleryItems)
      .where(eq(galleryItems.id, itemId));
    
    if (!item) return false;

    const result = await db.delete(galleryItems).where(eq(galleryItems.id, itemId));
    
    if ((result.rowCount || 0) > 0) {
      // Update gallery item count
      await db
        .update(userGalleries)
        .set({ 
          itemCount: sql`${userGalleries.itemCount} - 1`,
          updatedAt: new Date()
        })
        .where(eq(userGalleries.id, item.galleryId));
      return true;
    }
    
    return false;
  }

  async incrementGalleryItemViews(itemId: number): Promise<void> {
    await db
      .update(galleryItems)
      .set({ views: sql`${galleryItems.views} + 1` })
      .where(eq(galleryItems.id, itemId));
  }

  async createGalleryItemComment(comment: InsertGalleryItemComment): Promise<GalleryItemComment> {
    const [galleryComment] = await db
      .insert(galleryItemComments)
      .values(comment)
      .returning();
    return galleryComment;
  }

  async getGalleryItemComments(itemId: number): Promise<(GalleryItemComment & { user: { id: number; name: string } })[]> {
    return await db
      .select({
        id: galleryItemComments.id,
        galleryItemId: galleryItemComments.galleryItemId,
        userId: galleryItemComments.userId,
        comment: galleryItemComments.comment,
        likes: galleryItemComments.likes,
        createdAt: galleryItemComments.createdAt,
        user: {
          id: users.id,
          name: users.name,
        }
      })
      .from(galleryItemComments)
      .leftJoin(users, eq(galleryItemComments.userId, users.id))
      .where(eq(galleryItemComments.galleryItemId, itemId))
      .orderBy(desc(galleryItemComments.createdAt));
  }

  async deleteGalleryItemComment(commentId: number, userId: number): Promise<boolean> {
    const result = await db.delete(galleryItemComments)
      .where(and(
        eq(galleryItemComments.id, commentId),
        eq(galleryItemComments.userId, userId)
      ));
    return (result.rowCount || 0) > 0;
  }

  async toggleGalleryItemLike(itemId: number, userId: number): Promise<{ liked: boolean; totalLikes: number }> {
    // Check if user already liked this item
    const [existingLike] = await db.select()
      .from(galleryItemLikes)
      .where(and(
        eq(galleryItemLikes.galleryItemId, itemId),
        eq(galleryItemLikes.userId, userId)
      ));

    if (existingLike) {
      // Remove like
      await db.delete(galleryItemLikes)
        .where(and(
          eq(galleryItemLikes.galleryItemId, itemId),
          eq(galleryItemLikes.userId, userId)
        ));
      
      await db
        .update(galleryItems)
        .set({ likes: sql`${galleryItems.likes} - 1` })
        .where(eq(galleryItems.id, itemId));
      
      const [item] = await db.select({ likes: galleryItems.likes })
        .from(galleryItems)
        .where(eq(galleryItems.id, itemId));
      
      return { liked: false, totalLikes: item?.likes || 0 };
    } else {
      // Add like
      await db.insert(galleryItemLikes)
        .values({ galleryItemId: itemId, userId });
      
      await db
        .update(galleryItems)
        .set({ likes: sql`${galleryItems.likes} + 1` })
        .where(eq(galleryItems.id, itemId));
      
      const [item] = await db.select({ likes: galleryItems.likes })
        .from(galleryItems)
        .where(eq(galleryItems.id, itemId));
      
      return { liked: true, totalLikes: item?.likes || 0 };
    }
  }

  async incrementGalleryItemShares(itemId: number): Promise<void> {
    await db
      .update(galleryItems)
      .set({ shares: sql`${galleryItems.shares} + 1` })
      .where(eq(galleryItems.id, itemId));
  }

  async ensureDefaultGallery(userId: number): Promise<UserGallery> {
    // Check if user has a default gallery
    const [defaultGallery] = await db.select()
      .from(userGalleries)
      .where(and(
        eq(userGalleries.userId, userId),
        eq(userGalleries.isDefault, true)
      ));

    if (defaultGallery) {
      return defaultGallery;
    }

    // Create default gallery
    return await this.createUserGallery({
      userId,
      name: "Main Gallery",
      description: "Your main photo and video collection",
      isDefault: true,
      privacyLevel: "public"
    });
  }

  // Profile Wall Methods
  async getProfileWallPosts(userId: number): Promise<any[]> {
    const posts = await db.select()
      .from(profileWallPosts)
      .leftJoin(users, eq(profileWallPosts.userId, users.id))
      .where(eq(profileWallPosts.userId, userId))
      .orderBy(desc(profileWallPosts.createdAt));

    return posts.map(row => ({
      id: row.profile_wall_posts.id,
      userId: row.profile_wall_posts.userId,
      content: row.profile_wall_posts.content,
      mediaUrl: row.profile_wall_posts.mediaUrl,
      mediaType: row.profile_wall_posts.postType,
      createdAt: row.profile_wall_posts.createdAt,
      likesCount: row.profile_wall_posts.likes,
      commentsCount: 0,
      isLiked: false,
      user: {
        id: row.users?.id || 0,
        name: row.users?.name || 'Unknown User',
        profileImage: row.users?.profileImageUrl || null
      }
    }));
  }

  async createProfileWallPost(postData: any): Promise<any> {
    const [post] = await db.insert(profileWallPosts)
      .values({
        userId: postData.userId,
        authorId: postData.userId, // Same as userId for own posts
        content: postData.content,
        postType: postData.mediaType || 'status',
        mediaUrl: postData.mediaUrl,
        privacy: 'public'
      })
      .returning();
    return post;
  }

  async toggleProfilePostLike(postId: number, userId: number = 4): Promise<{ liked: boolean; likesCount: number }> {
    // Check if user already liked this post
    const [existingLike] = await db.select()
      .from(profileWallLikes)
      .where(and(
        eq(profileWallLikes.postId, postId),
        eq(profileWallLikes.userId, userId)
      ));

    if (existingLike) {
      // Remove like
      await db.delete(profileWallLikes)
        .where(and(
          eq(profileWallLikes.postId, postId),
          eq(profileWallLikes.userId, userId)
        ));
      
      await db
        .update(profileWallPosts)
        .set({ likes: sql`${profileWallPosts.likes} - 1` })
        .where(eq(profileWallPosts.id, postId));
      
      const [post] = await db.select({ likes: profileWallPosts.likes })
        .from(profileWallPosts)
        .where(eq(profileWallPosts.id, postId));
      
      return { liked: false, likesCount: post?.likes || 0 };
    } else {
      // Add like
      await db.insert(profileWallLikes)
        .values({ postId, userId });
      
      await db
        .update(profileWallPosts)
        .set({ likes: sql`${profileWallPosts.likes} + 1` })
        .where(eq(profileWallPosts.id, postId));
      
      const [post] = await db.select({ likes: profileWallPosts.likes })
        .from(profileWallPosts)
        .where(eq(profileWallPosts.id, postId));
      
      return { liked: true, likesCount: post?.likes || 0 };
    }
  }

  async updateUser(userId: number, updateData: Partial<InsertUser>): Promise<User | null> {
    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();
    return user || null;
  }

  // Comprehensive Admin User Management Methods
  async deleteUser(userId: number, reason: string): Promise<void> {
    // Log the admin action first
    await this.logAdminAction({
      adminUserId: 4, // John Proctor's ID
      action: 'delete_user',
      targetType: 'user',
      targetId: userId,
      reason: reason
    });

    // Delete all user-related data
    await db.delete(profileWallComments).where(eq(profileWallComments.userId, userId));
    await db.delete(profileWallLikes).where(eq(profileWallLikes.userId, userId));
    await db.delete(profileWallPosts).where(eq(profileWallPosts.userId, userId));
    await db.delete(chatMessages).where(eq(chatMessages.senderId, userId));
    await db.delete(chatParticipants).where(eq(chatParticipants.userId, userId));
    await db.delete(blogPostComments).where(eq(blogPostComments.userId, userId));
    await db.delete(blogPostLikes).where(eq(blogPostLikes.userId, userId));
    await db.delete(blogPosts).where(eq(blogPosts.userId, userId));
    await db.delete(discussionMessages).where(eq(discussionMessages.userId, userId));
    await db.delete(discussionParticipants).where(eq(discussionParticipants.userId, userId));
    await db.delete(userConnections).where(or(eq(userConnections.fromUserId, userId), eq(userConnections.toUserId, userId)));
    await db.delete(userSocialLinks).where(eq(userSocialLinks.userId, userId));
    await db.delete(userProfileImages).where(eq(userProfileImages.userId, userId));
    await db.delete(supplementLogs).where(eq(supplementLogs.userId, userId));
    await db.delete(supplements).where(eq(supplements.userId, userId));
    await db.delete(biometrics).where(eq(biometrics.userId, userId));
    await db.delete(orders).where(eq(orders.userId, userId));
    
    // Finally delete the user
    await db.delete(users).where(eq(users.id, userId));
  }

  async updateUserAdmin(userId: number, updates: any): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    
    // Log the admin action
    await this.logAdminAction({
      adminUserId: 4, // John Proctor's ID
      action: 'update_user',
      targetType: 'user',
      targetId: userId,
      reason: `Updated user data: ${Object.keys(updates).join(', ')}`
    });

    return user || undefined;
  }

  async changeUserPermissions(userId: number, isAdmin: boolean, reason: string): Promise<void> {
    await db
      .update(users)
      .set({ isAdmin, updatedAt: new Date() })
      .where(eq(users.id, userId));

    // Log the admin action
    await this.logAdminAction({
      adminUserId: 4, // John Proctor's ID
      action: isAdmin ? 'grant_admin' : 'revoke_admin',
      targetType: 'user',
      targetId: userId,
      reason: reason
    });
  }

  async deletePostAdmin(postId: number, reason: string): Promise<void> {
    // Log the admin action first
    await this.logAdminAction({
      adminUserId: 4, // John Proctor's ID
      action: 'delete_post',
      targetType: 'post',
      targetId: postId,
      reason: reason
    });

    // Delete post comments and likes first
    await db.delete(profileWallComments).where(eq(profileWallComments.postId, postId));
    await db.delete(profileWallLikes).where(eq(profileWallLikes.postId, postId));
    
    // Delete the post
    await db.delete(profileWallPosts).where(eq(profileWallPosts.id, postId));
  }

  async getUserContent(userId: number): Promise<any> {
    const posts = await db.select().from(profileWallPosts).where(eq(profileWallPosts.userId, userId));
    const userBlogs = await db.select().from(blogPosts).where(eq(blogPosts.userId, userId));
    const comments = await db.select().from(profileWallComments).where(eq(profileWallComments.userId, userId));
    const discussions = await db.select().from(discussionMessages).where(eq(discussionMessages.userId, userId));

    return {
      posts,
      blogPosts: userBlogs,
      comments,
      discussions,
      totalContent: posts.length + userBlogs.length + comments.length + discussions.length
    };
  }

  // Universal notification system implementation
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db
      .insert(notifications)
      .values(notification)
      .returning();
    return newNotification;
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.isDeleted, false)))
      .orderBy(desc(notifications.createdAt));
  }

  async markNotificationAsRead(id: number): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }

  async deleteNotification(id: number): Promise<boolean> {
    const result = await db
      .update(notifications)
      .set({ isDeleted: true })
      .where(eq(notifications.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Creates notifications for all users except the one who triggered the action
  async createUniversalNotifications(
    type: string, 
    title: string, 
    message: string, 
    relatedUserId?: number, 
    relatedUserName?: string, 
    relatedPostId?: number, 
    relatedCategoryId?: number, 
    relatedCategoryName?: string
  ): Promise<void> {
    try {
      // Get all users except the one who triggered the notification
      const allUsers = await db.select({ id: users.id }).from(users);
      const targetUsers = relatedUserId 
        ? allUsers.filter(user => user.id !== relatedUserId)
        : allUsers;

      // Create notification for each user
      const notificationData = targetUsers.map(user => ({
        userId: user.id,
        type,
        title,
        message,
        relatedUserId,
        relatedUserName,
        relatedPostId,
        relatedCategoryId,
        relatedCategoryName,
        isRead: false,
        isDeleted: false
      }));

      if (notificationData.length > 0) {
        await db.insert(notifications).values(notificationData);
      }
    } catch (error) {
      console.error('Error creating universal notifications:', error);
    }
  }

  // ==== NOTIFICATION METHODS ====
  
  async getUserNotifications(userId: number) {
    try {
      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, userId))
        .orderBy(desc(notifications.createdAt))
        .limit(50);
      
      return userNotifications;
    } catch (error) {
      console.error('Error getting user notifications:', error);
      return [];
    }
  }

  async markNotificationAsRead(notificationId: number) {
    try {
      await db
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  async deleteNotification(notificationId: number) {
    try {
      await db
        .delete(notifications)
        .where(eq(notifications.id, notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  // Personal Shop System Methods
  async createPersonalShop(shopData: InsertPersonalShop): Promise<PersonalShop> {
    try {
      const [shop] = await db.insert(personalShops).values(shopData).returning();
      return shop;
    } catch (error) {
      console.error('Error creating personal shop:', error);
      throw error;
    }
  }

  async getPersonalShopByUserId(userId: number): Promise<PersonalShop | undefined> {
    try {
      const [shop] = await db
        .select()
        .from(personalShops)
        .where(eq(personalShops.userId, userId));
      return shop;
    } catch (error) {
      console.error('Error getting personal shop:', error);
      return undefined;
    }
  }

  async getPersonalShopById(shopId: number): Promise<(PersonalShop & { user: { name: string; email: string } }) | undefined> {
    try {
      const [shop] = await db
        .select({
          id: personalShops.id,
          userId: personalShops.userId,
          shopName: personalShops.shopName,
          description: personalShops.description,
          isActive: personalShops.isActive,
          totalAffiliateLinks: personalShops.totalAffiliateLinks,
          maxLinks: personalShops.maxLinks,
          maintenancePaid: personalShops.maintenancePaid,
          maintenanceDueDate: personalShops.maintenanceDueDate,
          createdAt: personalShops.createdAt,
          updatedAt: personalShops.updatedAt,
          user: {
            name: users.name,
            email: users.email
          }
        })
        .from(personalShops)
        .innerJoin(users, eq(personalShops.userId, users.id))
        .where(and(eq(personalShops.id, shopId), eq(personalShops.isActive, true)));
      return shop;
    } catch (error) {
      console.error('Error getting personal shop by ID:', error);
      return undefined;
    }
  }

  async updatePersonalShop(shopId: number, shopData: Partial<InsertPersonalShop>): Promise<PersonalShop | undefined> {
    try {
      const [shop] = await db
        .update(personalShops)
        .set({ ...shopData, updatedAt: new Date() })
        .where(eq(personalShops.id, shopId))
        .returning();
      return shop;
    } catch (error) {
      console.error('Error updating personal shop:', error);
      return undefined;
    }
  }

  async addAffiliateLink(linkData: InsertPersonalShopAffiliateLink): Promise<PersonalShopAffiliateLink> {
    try {
      const [link] = await db.insert(personalShopAffiliateLinks).values(linkData).returning();
      
      // Update shop's total affiliate links count
      await db
        .update(personalShops)
        .set({ 
          totalAffiliateLinks: sql`${personalShops.totalAffiliateLinks} + 1`,
          updatedAt: new Date()
        })
        .where(eq(personalShops.id, linkData.shopId));

      return link;
    } catch (error) {
      console.error('Error adding affiliate link:', error);
      throw error;
    }
  }

  async getShopAffiliateLinks(shopId: number): Promise<PersonalShopAffiliateLink[]> {
    try {
      return await db
        .select()
        .from(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.shopId, shopId))
        .orderBy(desc(personalShopAffiliateLinks.createdAt));
    } catch (error) {
      console.error('Error getting shop affiliate links:', error);
      return [];
    }
  }

  async getUserAffiliateLinks(userId: number): Promise<PersonalShopAffiliateLink[]> {
    try {
      return await db
        .select()
        .from(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.userId, userId))
        .orderBy(desc(personalShopAffiliateLinks.createdAt));
    } catch (error) {
      console.error('Error getting user affiliate links:', error);
      return [];
    }
  }

  async getAllPersonalShops(): Promise<Array<PersonalShop & { user: { id: number; name: string; email: string } }>> {
    try {
      const result = await db
        .select({
          id: personalShops.id,
          userId: personalShops.userId,
          shopName: personalShops.shopName,
          description: personalShops.description,
          category: personalShops.category,
          isActive: personalShops.isActive,
          totalAffiliateLinks: personalShops.totalAffiliateLinks,
          maxLinks: personalShops.maxLinks,
          maintenancePaid: personalShops.maintenancePaid,
          maintenanceDueDate: personalShops.maintenanceDueDate,
          createdAt: personalShops.createdAt,
          updatedAt: personalShops.updatedAt,
          user: {
            id: users.id,
            name: users.name,
            email: users.email
          }
        })
        .from(personalShops)
        .innerJoin(users, eq(personalShops.userId, users.id))
        .orderBy(desc(personalShops.createdAt));

      return result;
    } catch (error) {
      console.error('Error getting all personal shops:', error);
      return [];
    }
  }

  async deletePersonalShop(shopId: number): Promise<void> {
    try {
      // First delete all affiliate links for this shop
      await db.delete(personalShopAffiliateLinks).where(eq(personalShopAffiliateLinks.shopId, shopId));
      
      // Then delete the shop
      await db.delete(personalShops).where(eq(personalShops.id, shopId));
    } catch (error) {
      console.error('Error deleting personal shop:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const result = await db
        .select()
        .from(users)
        .orderBy(users.name);

      return result;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  async searchPersonalShops(searchTerm: string, filters: {
    country?: string;
    area?: string;
    category?: string;
    brand?: string;
  } = {}): Promise<Array<PersonalShop & { user: { name: string; email: string } }>> {
    try {
      let query = db
        .select({
          id: personalShops.id,
          userId: personalShops.userId,
          shopName: personalShops.shopName,
          description: personalShops.description,
          isActive: personalShops.isActive,
          totalAffiliateLinks: personalShops.totalAffiliateLinks,
          maxLinks: personalShops.maxLinks,
          maintenancePaid: personalShops.maintenancePaid,
          maintenanceDueDate: personalShops.maintenanceDueDate,
          createdAt: personalShops.createdAt,
          updatedAt: personalShops.updatedAt,
          user: {
            name: users.name,
            email: users.email
          }
        })
        .from(personalShops)
        .innerJoin(users, eq(personalShops.userId, users.id))
        .where(eq(personalShops.isActive, true));

      if (searchTerm) {
        query = query.where(
          or(
            ilike(personalShops.shopName, `%${searchTerm}%`),
            ilike(personalShops.description, `%${searchTerm}%`),
            ilike(users.name, `%${searchTerm}%`)
          )
        );
      }

      return await query.orderBy(desc(personalShops.createdAt));
    } catch (error) {
      console.error('Error searching personal shops:', error);
      return [];
    }
  }

  async searchAffiliateLinks(searchTerm: string, filters: {
    country?: string;
    area?: string;
    category?: string;
    brand?: string;
  } = {}): Promise<Array<PersonalShopAffiliateLink & { 
    shop: { shopName: string; user: { name: string; email: string } } 
  }>> {
    try {
      let query = db
        .select({
          id: personalShopAffiliateLinks.id,
          shopId: personalShopAffiliateLinks.shopId,
          userId: personalShopAffiliateLinks.userId,
          title: personalShopAffiliateLinks.title,
          description: personalShopAffiliateLinks.description,
          affiliateUrl: personalShopAffiliateLinks.affiliateUrl,
          productImageUrl: personalShopAffiliateLinks.productImageUrl,
          brand: personalShopAffiliateLinks.brand,
          category: personalShopAffiliateLinks.category,
          price: personalShopAffiliateLinks.price,
          isPaid: personalShopAffiliateLinks.isPaid,
          isSharedToWalls: personalShopAffiliateLinks.isSharedToWalls,
          likes: personalShopAffiliateLinks.likes,
          shares: personalShopAffiliateLinks.shares,
          comments: personalShopAffiliateLinks.comments,
          createdAt: personalShopAffiliateLinks.createdAt,
          updatedAt: personalShopAffiliateLinks.updatedAt,
          shop: {
            shopName: personalShops.shopName,
            user: {
              name: users.name,
              email: users.email
            }
          }
        })
        .from(personalShopAffiliateLinks)
        .innerJoin(personalShops, eq(personalShopAffiliateLinks.shopId, personalShops.id))
        .innerJoin(users, eq(personalShops.userId, users.id))
        .where(eq(personalShopAffiliateLinks.isPaid, true));

      if (searchTerm) {
        query = query.where(
          or(
            ilike(personalShopAffiliateLinks.title, `%${searchTerm}%`),
            ilike(personalShopAffiliateLinks.description, `%${searchTerm}%`),
            ilike(personalShopAffiliateLinks.brand, `%${searchTerm}%`),
            ilike(personalShops.shopName, `%${searchTerm}%`),
            ilike(users.name, `%${searchTerm}%`)
          )
        );
      }

      if (filters.category) {
        query = query.where(ilike(personalShopAffiliateLinks.category, `%${filters.category}%`));
      }

      if (filters.brand) {
        query = query.where(ilike(personalShopAffiliateLinks.brand, `%${filters.brand}%`));
      }

      return await query.orderBy(desc(personalShopAffiliateLinks.createdAt));
    } catch (error) {
      console.error('Error searching affiliate links:', error);
      return [];
    }
  }

  async shareAffiliateLinkToAllWalls(linkId: number): Promise<void> {
    try {
      // Get all active users
      const allUsers = await db.select({ id: users.id }).from(users).where(eq(users.isBlocked, false));
      
      // Get the affiliate link details
      const [link] = await db
        .select()
        .from(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.id, linkId));

      if (!link) return;

      // Create profile wall posts for all users
      const wallPosts = allUsers.map(user => ({
        userId: user.id,
        authorId: link.userId,
        content: `Check out this affiliate product: ${link.title}${link.description ? ` - ${link.description}` : ''}`,
        postType: 'affiliate_link' as const,
        mediaUrl: link.productImageUrl,
        privacy: 'public' as const
      }));

      // Insert all wall posts
      await db.insert(profileWallPosts).values(wallPosts);

      // Mark as shared to walls
      await db
        .update(personalShopAffiliateLinks)
        .set({ isSharedToWalls: true, updatedAt: new Date() })
        .where(eq(personalShopAffiliateLinks.id, linkId));

    } catch (error) {
      console.error('Error sharing affiliate link to all walls:', error);
      throw error;
    }
  }

  async addAffiliateLinkComment(commentData: InsertAffiliateLinkComment): Promise<AffiliateLinkComment> {
    try {
      const [comment] = await db.insert(affiliateLinkComments).values(commentData).returning();
      
      // Update comment count
      await db
        .update(personalShopAffiliateLinks)
        .set({ 
          comments: sql`${personalShopAffiliateLinks.comments} + 1`,
          updatedAt: new Date()
        })
        .where(eq(personalShopAffiliateLinks.id, commentData.linkId));

      return comment;
    } catch (error) {
      console.error('Error adding affiliate link comment:', error);
      throw error;
    }
  }

  async getAffiliateLinkComments(linkId: number): Promise<Array<AffiliateLinkComment & { user: { name: string } }>> {
    try {
      return await db
        .select({
          id: affiliateLinkComments.id,
          linkId: affiliateLinkComments.linkId,
          userId: affiliateLinkComments.userId,
          comment: affiliateLinkComments.comment,
          likes: affiliateLinkComments.likes,
          createdAt: affiliateLinkComments.createdAt,
          user: {
            name: users.name
          }
        })
        .from(affiliateLinkComments)
        .innerJoin(users, eq(affiliateLinkComments.userId, users.id))
        .where(eq(affiliateLinkComments.linkId, linkId))
        .orderBy(desc(affiliateLinkComments.createdAt));
    } catch (error) {
      console.error('Error getting affiliate link comments:', error);
      return [];
    }
  }

  async shareAffiliateLink(shareData: InsertAffiliateLinkShare): Promise<AffiliateLinkShare> {
    try {
      const [share] = await db.insert(affiliateLinkShares).values(shareData).returning();
      
      // Update share count
      await db
        .update(personalShopAffiliateLinks)
        .set({ 
          shares: sql`${personalShopAffiliateLinks.shares} + 1`,
          updatedAt: new Date()
        })
        .where(eq(personalShopAffiliateLinks.id, shareData.linkId));

      return share;
    } catch (error) {
      console.error('Error sharing affiliate link:', error);
      throw error;
    }
  }

  async createPersonalShopPayment(paymentData: InsertPersonalShopPayment): Promise<PersonalShopPayment> {
    try {
      const [payment] = await db.insert(personalShopPayments).values(paymentData).returning();
      return payment;
    } catch (error) {
      console.error('Error creating personal shop payment:', error);
      throw error;
    }
  }

  async updatePersonalShopPaymentStatus(paymentId: number, status: string): Promise<void> {
    try {
      await db
        .update(personalShopPayments)
        .set({ status })
        .where(eq(personalShopPayments.id, paymentId));
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  // NEW: Get affiliate links for a specific shop (for management)
  async getAffiliateLinksForShop(shopId: number): Promise<any[]> {
    try {
      return await db
        .select()
        .from(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.shopId, shopId))
        .orderBy(desc(personalShopAffiliateLinks.createdAt));
    } catch (error) {
      console.error('Error getting affiliate links for shop:', error);
      return [];
    }
  }

  // NEW: Create affiliate product
  async createAffiliateProduct(productData: any): Promise<any> {
    try {
      const [product] = await db
        .insert(personalShopAffiliateLinks)
        .values({
          shopId: productData.shopId,
          title: productData.title,
          description: productData.description,
          affiliateUrl: productData.affiliateUrl,
          price: productData.price,
          category: productData.category,
          brand: productData.brand,
          productImageUrl: productData.productImageUrl,
          userId: productData.userId || 4, // Default to current user
          isPaid: false,
          likes: 0,
          comments: 0,
          shares: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      // Update shop's total affiliate links count
      await db
        .update(personalShops)
        .set({ 
          totalAffiliateLinks: sql`${personalShops.totalAffiliateLinks} + 1`,
          updatedAt: new Date()
        })
        .where(eq(personalShops.id, productData.shopId));

      return product;
    } catch (error) {
      console.error('Error creating affiliate product:', error);
      throw error;
    }
  }

  // NEW: Update affiliate product
  async updateAffiliateProduct(id: number, updates: any): Promise<any> {
    try {
      const [product] = await db
        .update(personalShopAffiliateLinks)
        .set({
          ...updates,
          updatedAt: new Date()
        })
        .where(eq(personalShopAffiliateLinks.id, id))
        .returning();

      return product;
    } catch (error) {
      console.error('Error updating affiliate product:', error);
      throw error;
    }
  }

  // NEW: Delete affiliate product
  async deleteAffiliateProduct(id: number): Promise<boolean> {
    try {
      // Get the shop ID first to update count
      const product = await db
        .select({ shopId: personalShopAffiliateLinks.shopId })
        .from(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.id, id))
        .limit(1);

      if (product.length === 0) return false;

      // Delete the product
      await db
        .delete(personalShopAffiliateLinks)
        .where(eq(personalShopAffiliateLinks.id, id));

      // Update shop's total affiliate links count
      await db
        .update(personalShops)
        .set({ 
          totalAffiliateLinks: sql`${personalShops.totalAffiliateLinks} - 1`,
          updatedAt: new Date()
        })
        .where(eq(personalShops.id, product[0].shopId));

      return true;
    } catch (error) {
      console.error('Error deleting affiliate product:', error);
      return false;
    }
  }

  // Notify all users about new affiliate product
  async notifyAllUsersOfNewAffiliateProduct(linkId: number, creatorId: number, productTitle: string, productImageUrl: string | null): Promise<void> {
    try {
      // Get creator details
      const creator = await this.getUser(creatorId);
      if (!creator) return;

      // Get all users except the creator
      const allUsers = await db
        .select({ id: users.id })
        .from(users)
        .where(ne(users.id, creatorId));

      // Create notifications for all users with image URL
      const notificationPromises = allUsers.map(user => 
        db.insert(notifications).values({
          userId: user.id,
          type: 'new_affiliate_product',
          title: `New Product: ${productTitle}`,
          message: `${creator.name} shared a new affiliate product "${productTitle}" that's now on your profile wall!`,
          imageUrl: productImageUrl,
          isRead: false,
          createdAt: new Date()
        })
      );

      await Promise.all(notificationPromises);
      console.log(`Sent affiliate product notifications to ${allUsers.length} users`);
    } catch (error) {
      console.error('Error notifying users of new affiliate product:', error);
    }
  }

  // Create profile wall posts for all users when new affiliate product is added
  async createAffiliateProductWallPostsForAllUsers(linkId: number, creatorId: number, title: string, description: string | null, productImageUrl: string | null, brand: string): Promise<void> {
    try {
      // Get creator details
      const creator = await this.getUser(creatorId);
      if (!creator) return;

      // Get all users except the creator
      const allUsers = await db
        .select({ id: users.id })
        .from(users)
        .where(ne(users.id, creatorId));

      // Create individual wall posts for each user (simpler approach)
      for (const user of allUsers) {
        try {
          await db.insert(profileWallPosts).values({
            userId: user.id,
            content: `🛍️ New affiliate product: "${title}" by ${brand}. Shared by ${creator.name}. ${description || 'Check it out!'}`,
            mediaUrl: productImageUrl || null,
            likes: 0,
            comments: 0,
            shares: 0,
            createdAt: new Date()
          });
        } catch (postError) {
          console.error(`Error creating wall post for user ${user.id}:`, postError);
        }
      }

      console.log(`Created affiliate product wall posts for ${allUsers.length} users`);
    } catch (error) {
      console.error('Error creating affiliate product wall posts:', error);
    }
  }

  async shareAffiliateLinkToAllWalls(linkId: number): Promise<void> {
    try {
      // Mark the link as shared to walls
      await db
        .update(personalShopAffiliateLinks)
        .set({ 
          isSharedToWalls: true,
          updatedAt: new Date()
        })
        .where(eq(personalShopAffiliateLinks.id, linkId));

      console.log(`Marked affiliate link ${linkId} as shared to all walls`);
    } catch (error) {
      console.error('Error sharing affiliate link to walls:', error);
      throw error;
    }
  }

  // Social media links operations
  async updateUserSocialMediaLinks(userId: number, socialData: any): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          facebookUsername: socialData.facebookUsername || null,
          twitterUsername: socialData.twitterUsername || null,
          instagramUsername: socialData.instagramUsername || null,
          linkedinUsername: socialData.linkedinUsername || null,
          youtubeUsername: socialData.youtubeUsername || null,
          tiktokUsername: socialData.tiktokUsername || null,
          snapchatUsername: socialData.snapchatUsername || null,
          discordUsername: socialData.discordUsername || null,
          redditUsername: socialData.redditUsername || null,
          pinterestUsername: socialData.pinterestUsername || null,
          tumblrUsername: socialData.tumblrUsername || null,
          twitchUsername: socialData.twitchUsername || null,
          spotifyUsername: socialData.spotifyUsername || null,
          mediumUsername: socialData.mediumUsername || null,
          githubUsername: socialData.githubUsername || null,
          vimeoUsername: socialData.vimeoUsername || null,
          skypeUsername: socialData.skypeUsername || null,
          flickrUsername: socialData.flickrUsername || null,
          soundcloudUsername: socialData.soundcloudUsername || null,
          behanceUsername: socialData.behanceUsername || null,
          dribbbleUsername: socialData.dribbbleUsername || null,
          deviantartUsername: socialData.deviantartUsername || null,
          stackoverflowUsername: socialData.stackoverflowUsername || null,
          quoraUsername: socialData.quoraUsername || null,
          whatsappNumber: socialData.whatsappNumber || null,
          telegramUsername: socialData.telegramUsername || null,
          personalWebsite: socialData.personalWebsite || null,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId))
        .returning();

      if (!updatedUser) {
        throw new Error('User not found or update failed');
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating user social media links:', error);
      throw error;
    }
  }

  // Business prospect operations
  async getAllBusinessProspects(): Promise<any[]> {
    try {
      return await db.select().from(businessProspects);
    } catch (error) {
      console.error("Error fetching business prospects:", error);
      return [];
    }
  }

  async getCitiesByCountry(country: string): Promise<any[]> {
    try {
      const cities = await db
        .selectDistinct({ name: businessProspects.city })
        .from(businessProspects)
        .where(eq(businessProspects.country, country));
      
      return cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }

  // Exercise tracking methods
  async createExerciseLog(log: InsertExerciseLog): Promise<ExerciseLog> {
    const [newLog] = await db.insert(exerciseLogs).values(log).returning();
    return newLog;
  }

  async getExerciseLogsByUser(userId: number): Promise<ExerciseLog[]> {
    return await db.select().from(exerciseLogs).where(eq(exerciseLogs.userId, userId));
  }

  async createFitnessGoal(goal: InsertFitnessGoal): Promise<FitnessGoal> {
    const [newGoal] = await db.insert(fitnessGoals).values(goal).returning();
    return newGoal;
  }

  async getFitnessGoalsByUser(userId: number): Promise<FitnessGoal[]> {
    return await db.select().from(fitnessGoals).where(eq(fitnessGoals.userId, userId));
  }

  async updateFitnessGoal(goalId: number, updates: Partial<FitnessGoal>): Promise<FitnessGoal | undefined> {
    const [updated] = await db.update(fitnessGoals).set(updates).where(eq(fitnessGoals.id, goalId)).returning();
    return updated;
  }

  // Deployment management methods
  async getDeploymentLogs(): Promise<any[]> {
    try {
      // Return mock deployment logs for admin panel
      const logs = [
        {
          id: 1,
          timestamp: new Date('2025-06-28T19:42:33.663Z').toISOString(),
          type: 'snapshot-create',
          status: 'success',
          filesRestored: 6,
          triggerReason: 'Pre-deployment snapshot',
          snapshotTimestamp: new Date('2025-06-28T19:42:33.663Z').toISOString()
        },
        {
          id: 2,
          timestamp: new Date('2025-06-28T19:12:53.651Z').toISOString(),
          type: 'snapshot-create',
          status: 'success',
          filesRestored: 6,
          triggerReason: 'Manual snapshot creation',
          snapshotTimestamp: new Date('2025-06-28T19:12:53.651Z').toISOString()
        }
      ];
      return logs;
    } catch (error) {
      console.error('Error getting deployment logs:', error);
      return [];
    }
  }

  async getCurrentSnapshotInfo(): Promise<any> {
    try {
      // Read actual snapshot data from deployment-snapshot.json
      const fs = await import('fs');
      const path = await import('path');
      
      const snapshotPath = path.join(process.cwd(), 'deployment-snapshot.json');
      
      if (fs.existsSync(snapshotPath)) {
        const snapshotData = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
        
        return {
          timestamp: snapshotData.timestamp,
          version: snapshotData.version,
          filesCount: Object.keys(snapshotData.files || {}).length,
          dataStats: {
            users: 25,
            messages: 77,
            posts: 4,
            files: 35
          }
        };
      } else {
        return {
          timestamp: new Date().toISOString(),
          version: '2.0.0',
          filesCount: 0,
          dataStats: {
            users: 25,
            messages: 77,
            posts: 4,
            files: 35
          }
        };
      }
    } catch (error) {
      console.error('Error getting snapshot info:', error);
      return null;
    }
  }

  async logDeploymentAction(type: string, status: string, filesCount: number, reason: string): Promise<void> {
    try {
      // Log deployment action for tracking
      console.log(`Deployment Action: ${type} - ${status} - ${filesCount} files - ${reason}`);
      
      // In a real implementation, this would store to database
      // For now, we'll use console logging for tracking
    } catch (error) {
      console.error('Error logging deployment action:', error);
    }
  }

  // Gallery operations - Database-based photo storage
  async getUserAlbums(userId: number): Promise<GalleryAlbum[]> {
    try {
      return await db.select().from(galleryAlbums).where(eq(galleryAlbums.userId, userId));
    } catch (error) {
      console.error('Error fetching user albums:', error);
      return [];
    }
  }

  async createAlbum(album: InsertGalleryAlbum): Promise<GalleryAlbum> {
    try {
      const [newAlbum] = await db.insert(galleryAlbums).values(album).returning();
      return newAlbum;
    } catch (error) {
      console.error('Error creating album:', error);
      throw error;
    }
  }

  async getAlbumPhotos(albumId: number): Promise<GalleryPhoto[]> {
    try {
      return await db.select().from(galleryPhotos).where(eq(galleryPhotos.albumId, albumId));
    } catch (error) {
      console.error('Error fetching album photos:', error);
      return [];
    }
  }

  async addPhotoToAlbum(photo: InsertGalleryPhoto): Promise<GalleryPhoto> {
    try {
      const [newPhoto] = await db.insert(galleryPhotos).values(photo).returning();
      return newPhoto;
    } catch (error) {
      console.error('Error adding photo to album:', error);
      throw error;
    }
  }

  async deletePhoto(photoId: number): Promise<boolean> {
    try {
      await db.delete(galleryPhotos).where(eq(galleryPhotos.id, photoId));
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      return false;
    }
  }

  // Email campaigns operations
  async getEmailCampaigns(): Promise<any[]> {
    try {
      const campaigns = await db.select({
        id: emailCampaigns.id,
        businessProspectId: emailCampaigns.businessProspectId,
        campaignType: emailCampaigns.campaignType,
        campaignName: businessProspects.businessName,
        subject: emailCampaigns.emailSubject,
        htmlContent: emailCampaigns.emailContent,
        sentDate: emailCampaigns.sentAt,
        openedAt: emailCampaigns.openedAt,
        clickedAt: emailCampaigns.clickedAt,
        respondedAt: emailCampaigns.respondedAt,
        status: emailCampaigns.campaignType, // Use campaignType as status
        recipientCount: 1,
        openCount: emailCampaigns.openedAt ? 1 : 0,
        clickCount: emailCampaigns.clickedAt ? 1 : 0,
        responseCount: emailCampaigns.respondedAt ? 1 : 0,
      })
      .from(emailCampaigns)
      .leftJoin(businessProspects, eq(emailCampaigns.businessProspectId, businessProspects.id))
      .orderBy(desc(emailCampaigns.sentAt))
      .limit(50);
      
      return campaigns;
    } catch (error) {
      console.error('Error getting email campaigns:', error);
      return [];
    }
  }

  async getEmailCampaign(id: number): Promise<any | undefined> {
    try {
      const [campaign] = await db.select({
        id: emailCampaigns.id,
        businessProspectId: emailCampaigns.businessProspectId,
        campaignType: emailCampaigns.campaignType,
        campaignName: businessProspects.businessName,
        subject: emailCampaigns.emailSubject,
        htmlContent: emailCampaigns.emailContent,
        sentDate: emailCampaigns.sentAt,
        openedAt: emailCampaigns.openedAt,
        clickedAt: emailCampaigns.clickedAt,
        respondedAt: emailCampaigns.respondedAt,
        status: emailCampaigns.campaignType, // Use campaignType as status
        recipientCount: 1,
        openCount: emailCampaigns.openedAt ? 1 : 0,
        clickCount: emailCampaigns.clickedAt ? 1 : 0,
        responseCount: emailCampaigns.respondedAt ? 1 : 0,
      })
      .from(emailCampaigns)
      .leftJoin(businessProspects, eq(emailCampaigns.businessProspectId, businessProspects.id))
      .where(eq(emailCampaigns.id, id));
      
      return campaign;
    } catch (error) {
      console.error('Error getting email campaign:', error);
      return undefined;
    }
  }

  // User files operations
  async getUserFiles(userId: number): Promise<any[]> {
    try {
      const files = await db.select()
        .from(userFiles)
        .where(eq(userFiles.userId, userId))
        .orderBy(desc(userFiles.createdAt))
        .limit(100);
      
      return files;
    } catch (error) {
      console.error('Error getting user files:', error);
      return [];
    }
  }

  async createUserFile(file: any): Promise<any> {
    try {
      const [newFile] = await db.insert(userFiles)
        .values({
          userId: file.userId,
          fileName: file.fileName,
          fileData: file.fileData,
          fileType: file.fileType || 'image/jpeg',
          fileSize: file.fileSize || file.fileData.length,
          isActive: true
        })
        .returning();
      
      return newFile;
    } catch (error) {
      console.error('Error creating user file:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
