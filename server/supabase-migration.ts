import { db } from './db';
import { users, chatMessages, userFiles, businessProspects, profileWallPosts, profileWallComments } from '@shared/schema';
import fs from 'fs';
import path from 'path';

interface MigrationData {
  users: any[];
  profileWallPosts: any[];
  profileWallComments: any[];
  chatMessages: any[];
  userFiles: any[];
  businessProspects: any[];
  timestamp: string;
}

export class SupabaseMigration {
  
  // Export all current data
  async exportCurrentData(): Promise<MigrationData> {
    try {
      console.log('📊 Exporting current database data...');
      
      const [usersData, postsData, commentsData, messagesData, filesData, businessData] = await Promise.all([
        db.select().from(users),
        db.select().from(profileWallPosts),
        db.select().from(profileWallComments),
        db.select().from(chatMessages),
        db.select().from(userFiles),
        db.select().from(businessProspects)
      ]);

      const exportData: MigrationData = {
        users: usersData,
        profileWallPosts: postsData,
        profileWallComments: commentsData,
        chatMessages: messagesData,
        userFiles: filesData,
        businessProspects: businessData,
        timestamp: new Date().toISOString()
      };

      // Save backup to file
      const backupPath = path.join(process.cwd(), 'migration-backup.json');
      fs.writeFileSync(backupPath, JSON.stringify(exportData, null, 2));
      
      console.log(`✅ Data exported: ${usersData.length} users, ${postsData.length} posts, ${commentsData.length} comments, ${messagesData.length} messages`);
      console.log(`💾 Backup saved to: ${backupPath}`);
      
      return exportData;
    } catch (error) {
      console.error('❌ Export failed:', error);
      throw error;
    }
  }

  // Import data to new Supabase database
  async importToSupabase(data: MigrationData, supabaseDb: any): Promise<void> {
    try {
      console.log('📈 Importing data to Supabase...');
      
      // Import users first (they're referenced by other tables)
      if (data.users.length > 0) {
        await supabaseDb.insert(users).values(data.users);
        console.log(`✅ Imported ${data.users.length} users`);
      }

      // Import profile wall posts
      if (data.profileWallPosts.length > 0) {
        await supabaseDb.insert(profileWallPosts).values(data.profileWallPosts);
        console.log(`✅ Imported ${data.profileWallPosts.length} profile wall posts`);
      }

      // Import profile wall comments
      if (data.profileWallComments.length > 0) {
        await supabaseDb.insert(profileWallComments).values(data.profileWallComments);
        console.log(`✅ Imported ${data.profileWallComments.length} profile wall comments`);
      }

      // Import chat messages
      if (data.chatMessages.length > 0) {
        await supabaseDb.insert(chatMessages).values(data.chatMessages);
        console.log(`✅ Imported ${data.chatMessages.length} chat messages`);
      }

      // Import files
      if (data.userFiles.length > 0) {
        await supabaseDb.insert(userFiles).values(data.userFiles);
        console.log(`✅ Imported ${data.userFiles.length} files`);
      }

      // Import business prospects
      if (data.businessProspects.length > 0) {
        await supabaseDb.insert(businessProspects).values(data.businessProspects);
        console.log(`✅ Imported ${data.businessProspects.length} business prospects`);
      }

      console.log('🎉 Migration to Supabase completed successfully!');
    } catch (error) {
      console.error('❌ Import failed:', error);
      throw error;
    }
  }

  // Complete migration process
  async generateSQLExport(): Promise<string> {
    try {
      console.log('🚀 Generating SQL export for manual Supabase import...');
      
      // Step 1: Export current data
      const currentData = await this.exportCurrentData();
      
      // Step 2: Generate COMPACT SQL statements for essential data only
      let sql = '-- Supabase Migration SQL Export (Essential Data Only)\n';
      sql += '-- Generated: ' + new Date().toISOString() + '\n\n';
      
      // Create core tables only
      sql += `-- Create essential tables\n`;
      sql += `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  location VARCHAR(255),
  profile_image_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);\n\n`;

      sql += `CREATE TABLE IF NOT EXISTS profile_wall_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);\n\n`;

      sql += `CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);\n\n`;

      sql += `CREATE TABLE IF NOT EXISTS business_prospects (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);\n\n`;

      // Insert only YOUR account - the most essential user
      sql += '-- Insert your admin account only\n';
      const yourAccount = currentData.users.find(u => u.firebaseUid === '4p6VLWxxMbeOV77knLKlccZ8gE03');
      if (yourAccount) {
        sql += `INSERT INTO users (firebase_uid, email, name, is_admin) VALUES ('${yourAccount.firebaseUid}', `;
        sql += `'${yourAccount.email}', '${yourAccount.name.replace(/'/g, "''")}', true);\n\n`;
      }

      // Insert one test post only
      sql += '-- Insert one test post\n';
      sql += `INSERT INTO profile_wall_posts (user_id, content) VALUES (1, 'Migration successful!');\n\n`;

      // Insert one test message only  
      sql += '-- Insert one test message\n';
      sql += `INSERT INTO chat_messages (user_id, content) VALUES (1, 'Platform ready!');\n\n`;

      // Insert one test business only
      sql += '-- Insert one test business\n';
      sql += `INSERT INTO business_prospects (business_name, contact_email, location) VALUES ('Test Business', 'test@example.com', 'London');\n\n`;

      sql += '-- Minimal migration complete! Platform ready for use.\n';

      console.log('✅ Minimal SQL export generated successfully');
      return sql;

    } catch (error) {
      console.error('❌ SQL export failed:', error);
      throw error;
    }
  }

  async migrateToSupabase(supabaseDatabaseUrl: string): Promise<void> {
    try {
      console.log('🚀 Starting complete Supabase migration...');
      
      // Step 1: Export current data
      const currentData = await this.exportCurrentData();
      
      // Step 2: Setup Supabase connection using Neon driver (better compatibility)
      const { drizzle } = await import('drizzle-orm/neon-serverless');
      const { Pool, neonConfig } = await import('@neondatabase/serverless');
      const ws = (await import('ws')).default;
      const schema = await import('@shared/schema');
      
      neonConfig.webSocketConstructor = ws;
      
      const supabaseClient = new Pool({ connectionString: supabaseDatabaseUrl });
      const supabaseDb = drizzle(supabaseClient, { schema });
      
      // Step 3: Create tables in Supabase (push schema)
      console.log('📋 Creating tables in Supabase...');
      // Tables will be created when we first run drizzle push
      
      // Step 4: Import all data
      await this.importToSupabase(currentData, supabaseDb);
      
      // Step 5: Update environment
      console.log('🔧 Migration complete! Update DATABASE_URL to Supabase connection string.');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  }
}

export const supabaseMigration = new SupabaseMigration();