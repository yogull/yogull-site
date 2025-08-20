import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export class SourceCodeDownloadService {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
    this.setupDownloadEndpoints();
  }

  private setupDownloadEndpoints() {
    // Download complete source code as zip
    this.app.get('/api/download/source-code', (req: Request, res: Response) => {
      this.generateSourceCodeZip(res);
    });

    // Serve the static zip if it exists
    this.app.get('/ordinary-people-community-core.zip', (req: Request, res: Response) => {
      const zipPath = path.join(process.cwd(), 'ordinary-people-community-core.zip');
      
      if (fs.existsSync(zipPath)) {
        res.download(zipPath, 'ordinary-people-community-core.zip');
      } else {
        // Generate zip on demand
        this.generateSourceCodeZip(res);
      }
    });
  }

  private generateSourceCodeZip(res: Response) {
    try {
      console.log('🔄 Generating source code zip file...');
      
      // Set response headers for zip download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="ordinary-people-community-core.zip"');

      // Create zip archive
      const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
      });

      // Pipe archive to response
      archive.pipe(res);

      // Add project files to zip
      this.addProjectFilesToZip(archive);

      // Finalize the archive
      archive.finalize();

      console.log('✅ Source code zip generated successfully');

    } catch (error) {
      console.error('❌ Failed to generate source code zip:', error);
      res.status(500).json({ error: 'Failed to generate source code download' });
    }
  }

  private addProjectFilesToZip(archive: archiver.Archiver) {
    const rootDir = process.cwd();

    // Essential project files and directories to include
    const includePatterns = [
      // Root configuration files
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'vite.config.ts',
      'tailwind.config.ts',
      'postcss.config.js',
      'drizzle.config.ts',
      'components.json',
      '.env.example',
      'replit.md',

      // Client source code
      'client/src/**/*',
      'client/public/**/*',
      'client/index.html',

      // Server source code
      'server/**/*.ts',
      'server/**/*.js',
      'server/email-templates/**/*',
      'server/routes/**/*',
      'server/services/**/*',

      // Shared code
      'shared/**/*',

      // Documentation
      '*.md',
      'docs/**/*',

      // Database
      'migrations/**/*',
      
      // Public assets
      'public/**/*'
    ];

    // Files and directories to exclude
    const excludePatterns = [
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      '.next/**/*',
      'coverage/**/*',
      '.git/**/*',
      '.vscode/**/*',
      '.replit',
      '*.log',
      '.env',
      'deployment-snapshots/**/*',
      'attached_assets/**/*',
      '*.zip'
    ];

    try {
      // Add client directory
      if (fs.existsSync(path.join(rootDir, 'client'))) {
        archive.directory(path.join(rootDir, 'client'), 'client', {
          ignore: (filePath: string) => {
            return filePath.includes('node_modules') || 
                   filePath.includes('dist') || 
                   filePath.includes('.git');
          }
        });
      }

      // Add server directory
      if (fs.existsSync(path.join(rootDir, 'server'))) {
        archive.directory(path.join(rootDir, 'server'), 'server', {
          ignore: (filePath: string) => {
            return filePath.includes('node_modules') || 
                   filePath.includes('dist') || 
                   filePath.includes('.git');
          }
        });
      }

      // Add shared directory
      if (fs.existsSync(path.join(rootDir, 'shared'))) {
        archive.directory(path.join(rootDir, 'shared'), 'shared');
      }

      // Add public directory
      if (fs.existsSync(path.join(rootDir, 'public'))) {
        archive.directory(path.join(rootDir, 'public'), 'public');
      }

      // Add root configuration files
      const rootFiles = [
        'package.json',
        'package-lock.json', 
        'tsconfig.json',
        'vite.config.ts',
        'tailwind.config.ts',
        'postcss.config.js',
        'drizzle.config.ts',
        'components.json',
        '.env.example',
        'replit.md',
        'README.md'
      ];

      rootFiles.forEach(fileName => {
        const filePath = path.join(rootDir, fileName);
        if (fs.existsSync(filePath)) {
          archive.file(filePath, { name: fileName });
        }
      });

      // Add README for the download
      const readmeContent = `# Ordinary People Community - Complete Source Code

This is the complete source code for the Ordinary People Community platform.

## Project Structure

- \`client/\` - React frontend application
- \`server/\` - Node.js Express backend
- \`shared/\` - Shared types and utilities
- \`public/\` - Static assets

## Installation

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Copy environment variables:
   \`\`\`
   cp .env.example .env
   \`\`\`

3. Start development server:
   \`\`\`
   npm run dev
   \`\`\`

## Features

- React + TypeScript frontend
- Express.js backend
- PostgreSQL database with Drizzle ORM
- Firebase authentication
- Real-time chat system
- Social media functionality
- Business directory
- Health tracking
- AI assistance

## License

Copyright (c) 2025 John Proctor. All rights reserved.
The People's Health Community Platform

Generated: ${new Date().toISOString()}
`;

      archive.append(readmeContent, { name: 'README.md' });

      console.log('📁 Added all project files to zip archive');

    } catch (error) {
      console.error('❌ Error adding files to zip:', error);
      throw error;
    }
  }

  // Generate static zip file for faster downloads
  async generateStaticZip(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const zipPath = path.join(process.cwd(), 'ordinary-people-community-core.zip');
        
        // Create file stream
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
          zlib: { level: 9 }
        });

        output.on('close', () => {
          console.log(`✅ Static zip created: ${archive.pointer()} bytes`);
          resolve(true);
        });

        archive.on('error', (err) => {
          throw err;
        });

        archive.pipe(output);
        this.addProjectFilesToZip(archive);
        archive.finalize();

      } catch (error) {
        console.error('❌ Failed to generate static zip:', error);
        reject(false);
      }
    });
  }
}

export default SourceCodeDownloadService;