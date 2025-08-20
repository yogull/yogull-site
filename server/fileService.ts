import { db } from "./storage";
import { userFiles, insertUserFileSchema } from "@shared/schema";
import { eq, and } from "drizzle-orm";

interface FileUploadData {
  userId: number;
  file: Buffer;
  originalName: string;
  mimeType: string;
  fileType: 'image' | 'video' | 'cover_photo' | 'profile_picture';
  cropData?: any;
}

export class FileService {
  static async saveFile(data: FileUploadData) {
    try {
      // Convert buffer to base64
      const fileData = data.file.toString('base64');
      
      // Create file record
      const fileRecord = {
        userId: data.userId,
        fileName: `${Date.now()}_${data.originalName}`,
        originalName: data.originalName,
        mimeType: data.mimeType,
        fileSize: data.file.length,
        fileData: fileData,
        fileType: data.fileType,
        cropData: data.cropData || null,
        isActive: true
      };

      // Validate with schema
      const validatedData = insertUserFileSchema.parse(fileRecord);
      
      // Save to database
      const result = await db.insert(userFiles).values(validatedData).returning();
      
      return result[0];
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file');
    }
  }

  static async getFile(fileId: number, userId: number) {
    try {
      const file = await db
        .select()
        .from(userFiles)
        .where(and(
          eq(userFiles.id, fileId),
          eq(userFiles.userId, userId),
          eq(userFiles.isActive, true)
        ))
        .limit(1);

      return file[0] || null;
    } catch (error) {
      console.error('Error getting file:', error);
      throw new Error('Failed to get file');
    }
  }

  static async getUserFiles(userId: number, fileType?: string) {
    try {
      if (fileType) {
        const files = await db
          .select()
          .from(userFiles)
          .where(and(
            eq(userFiles.userId, userId),
            eq(userFiles.isActive, true),
            eq(userFiles.fileType, fileType)
          ))
          .orderBy(userFiles.createdAt);
        return files;
      }

      const files = await db
        .select()
        .from(userFiles)
        .where(and(
          eq(userFiles.userId, userId),
          eq(userFiles.isActive, true)
        ))
        .orderBy(userFiles.createdAt);
      return files;
    } catch (error) {
      console.error('Error getting user files:', error);
      throw new Error('Failed to get user files');
    }
  }

  static async deleteFile(fileId: number, userId: number) {
    try {
      // Soft delete - mark as inactive
      const result = await db
        .update(userFiles)
        .set({ isActive: false })
        .where(and(
          eq(userFiles.id, fileId),
          eq(userFiles.userId, userId)
        ))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  static async updateCropData(fileId: number, userId: number, cropData: any) {
    try {
      const result = await db
        .update(userFiles)
        .set({ cropData })
        .where(and(
          eq(userFiles.id, fileId),
          eq(userFiles.userId, userId),
          eq(userFiles.isActive, true)
        ))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error updating crop data:', error);
      throw new Error('Failed to update crop data');
    }
  }

  static getFileDataUrl(file: any): string {
    return `data:${file.mimeType};base64,${file.fileData}`;
  }

  static async setProfilePicture(userId: number, fileId: number) {
    try {
      // First, unset any existing profile pictures
      await db
        .update(userFiles)
        .set({ fileType: 'image' })
        .where(and(
          eq(userFiles.userId, userId),
          eq(userFiles.fileType, 'profile_picture')
        ));

      // Set the new profile picture
      const result = await db
        .update(userFiles)
        .set({ fileType: 'profile_picture' })
        .where(and(
          eq(userFiles.id, fileId),
          eq(userFiles.userId, userId),
          eq(userFiles.isActive, true)
        ))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error setting profile picture:', error);
      throw new Error('Failed to set profile picture');
    }
  }

  static async setCoverPhoto(userId: number, fileId: number) {
    try {
      // First, unset any existing cover photos
      await db
        .update(userFiles)
        .set({ fileType: 'image' })
        .where(and(
          eq(userFiles.userId, userId),
          eq(userFiles.fileType, 'cover_photo')
        ));

      // Set the new cover photo
      const result = await db
        .update(userFiles)
        .set({ fileType: 'cover_photo' })
        .where(and(
          eq(userFiles.id, fileId),
          eq(userFiles.userId, userId),
          eq(userFiles.isActive, true)
        ))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error setting cover photo:', error);
      throw new Error('Failed to set cover photo');
    }
  }
}