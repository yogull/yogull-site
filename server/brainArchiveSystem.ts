/**
 * BRAIN ARCHIVE SYSTEM - PERMANENT DISCUSSION MANAGEMENT
 * 
 * This system implements John's sliding window requirement:
 * - Keep latest 50 discussions active
 * - Archive older discussions to brain storage
 * - Enable searchable categories and subcategories
 * - Auto-categorize discussions based on keyword detection
 */

import fs from 'fs';
import path from 'path';

interface ArchivedDiscussion {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  location?: string;
  tags: string[];
  createdAt: string;
  archivedDate: string;
  participantCount?: number;
  messageCount?: number;
}

interface BrainArchive {
  discussions: ArchivedDiscussion[];
  categories: Record<string, ArchivedDiscussion[]>;
  subcategories: Record<string, ArchivedDiscussion[]>;
  lastUpdated: string;
}

const ARCHIVE_PATH = path.join(process.cwd(), 'DISCUSSION_BRAIN_ARCHIVE.json');

export class BrainArchiveSystem {
  private archive: BrainArchive = {
    discussions: [],
    categories: {},
    subcategories: {},
    lastUpdated: new Date().toISOString()
  };

  constructor() {
    this.loadArchive();
  }

  private loadArchive() {
    try {
      if (fs.existsSync(ARCHIVE_PATH)) {
        const data = fs.readFileSync(ARCHIVE_PATH, 'utf8');
        this.archive = JSON.parse(data);
      } else {
        this.archive = {
          discussions: [],
          categories: {},
          subcategories: {},
          lastUpdated: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error loading brain archive:', error);
      this.archive = {
        discussions: [],
        categories: {},
        subcategories: {},
        lastUpdated: new Date().toISOString()
      };
    }
  }

  private saveArchive() {
    try {
      this.archive.lastUpdated = new Date().toISOString();
      fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(this.archive, null, 2));
      console.log(`📚 Brain archive saved with ${this.archive.discussions.length} discussions`);
    } catch (error) {
      console.error('Error saving brain archive:', error);
    }
  }

  archiveDiscussions(discussions: ArchivedDiscussion[]) {
    discussions.forEach(discussion => {
      // Add to main archive
      this.archive.discussions.push(discussion);

      // Organize by category
      if (!this.archive.categories[discussion.category]) {
        this.archive.categories[discussion.category] = [];
      }
      this.archive.categories[discussion.category].push(discussion);

      // Organize by subcategory
      if (!this.archive.subcategories[discussion.subcategory]) {
        this.archive.subcategories[discussion.subcategory] = [];
      }
      this.archive.subcategories[discussion.subcategory].push(discussion);
    });

    this.saveArchive();
    console.log(`✅ Archived ${discussions.length} discussions to brain storage`);
  }

  searchArchive(query: string): ArchivedDiscussion[] {
    const lowercaseQuery = query.toLowerCase();
    
    return this.archive.discussions.filter(discussion => 
      discussion.title.toLowerCase().includes(lowercaseQuery) ||
      discussion.description.toLowerCase().includes(lowercaseQuery) ||
      discussion.category.toLowerCase().includes(lowercaseQuery) ||
      discussion.subcategory.toLowerCase().includes(lowercaseQuery) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getCategories(): Record<string, ArchivedDiscussion[]> {
    return this.archive.categories;
  }

  getSubcategories(): Record<string, ArchivedDiscussion[]> {
    return this.archive.subcategories;
  }

  getDiscussionsByCategory(category: string): ArchivedDiscussion[] {
    return this.archive.categories[category] || [];
  }

  getDiscussionsBySubcategory(subcategory: string): ArchivedDiscussion[] {
    return this.archive.subcategories[subcategory] || [];
  }

  getArchiveStats() {
    return {
      totalDiscussions: this.archive.discussions.length,
      totalCategories: Object.keys(this.archive.categories).length,
      totalSubcategories: Object.keys(this.archive.subcategories).length,
      lastUpdated: this.archive.lastUpdated
    };
  }
}

export const brainArchive = new BrainArchiveSystem();