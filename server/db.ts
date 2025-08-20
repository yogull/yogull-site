import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Use Supabase database URL if available, otherwise fall back to current DATABASE_URL
let databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

// Use stable Neon database (Supabase connection string appears invalid)
if (process.env.DATABASE_URL) {
  console.log('🗄️ Using Neon PostgreSQL database (stable)');
  databaseUrl = process.env.DATABASE_URL;
}

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL or SUPABASE_DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

console.log('🗄️ Database connection:', databaseUrl.includes('supabase') ? 'Supabase PostgreSQL' : 'Neon PostgreSQL');

// Create postgres client with proper SSL configuration for both Neon and Supabase
const client = postgres(databaseUrl, {
  prepare: false,
  ssl: databaseUrl.includes('supabase') ? { rejectUnauthorized: false } : 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 30, // Increased timeout for Supabase
  onnotice: () => {}, // Suppress notices
});

export const db = drizzle(client, { schema });