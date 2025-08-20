import Parser from 'rss-parser';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category?: string;
}

interface NewsSource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

const NEWS_SOURCES_BY_REGION: { [key: string]: NewsSource[] } = {
  'UK': [
    {
      id: 'bbc',
      name: 'BBC News',
      url: 'http://feeds.bbci.co.uk/news/rss.xml',
      description: 'Latest news from BBC',
      category: 'UK National'
    },
    {
      id: 'guardian',
      name: 'The Guardian',
      url: 'https://www.theguardian.com/uk/rss',
      description: 'UK news from The Guardian',
      category: 'UK National'
    },
    {
      id: 'telegraph',
      name: 'The Telegraph',
      url: 'https://www.telegraph.co.uk/news/rss.xml',
      description: 'Telegraph news feed',
      category: 'UK National'
    },
    {
      id: 'independent',
      name: 'The Independent',
      url: 'https://www.independent.co.uk/news/uk/rss',
      description: 'UK news from The Independent',
      category: 'UK National'
    },
    {
      id: 'sky',
      name: 'Sky News',
      url: 'http://feeds.skynews.com/feeds/rss/home.xml',
      description: 'Sky News latest stories',
      category: 'UK National'
    },
    {
      id: 'dailymail',
      name: 'Daily Mail',
      url: 'https://www.dailymail.co.uk/news/index.rss',
      description: 'Daily Mail news feed',
      category: 'UK National'
    }
  ],
  'US': [
    {
      id: 'cnn',
      name: 'CNN',
      url: 'http://rss.cnn.com/rss/edition.rss',
      description: 'CNN breaking news and top stories',
      category: 'US National'
    },
    {
      id: 'nytimes',
      name: 'New York Times',
      url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      description: 'New York Times top stories',
      category: 'US National'
    },
    {
      id: 'washingtonpost',
      name: 'Washington Post',
      url: 'http://feeds.washingtonpost.com/rss/national',
      description: 'Washington Post national news',
      category: 'US National'
    },
    {
      id: 'usatoday',
      name: 'USA Today',
      url: 'http://rssfeeds.usatoday.com/usatoday-NewsTopStories',
      description: 'USA Today top stories',
      category: 'US National'
    },
    {
      id: 'fox',
      name: 'Fox News',
      url: 'http://feeds.foxnews.com/foxnews/latest',
      description: 'Fox News latest stories',
      category: 'US National'
    }
  ],
  'Canada': [
    {
      id: 'cbc',
      name: 'CBC News',
      url: 'https://www.cbc.ca/cmlink/rss-topstories',
      description: 'CBC News top stories',
      category: 'Canadian National'
    },
    {
      id: 'globemail',
      name: 'Globe and Mail',
      url: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/canada/',
      description: 'Globe and Mail Canada news',
      category: 'Canadian National'
    },
    {
      id: 'nationalpost',
      name: 'National Post',
      url: 'https://nationalpost.com/feed/',
      description: 'National Post news feed',
      category: 'Canadian National'
    }
  ],
  'Australia': [
    {
      id: 'abc-au',
      name: 'ABC News Australia',
      url: 'https://www.abc.net.au/news/feed/2942460/rss.xml',
      description: 'ABC News Australia top stories',
      category: 'Australian National'
    },
    {
      id: 'theage',
      name: 'The Age',
      url: 'https://www.theage.com.au/rss/feed.xml',
      description: 'The Age news feed',
      category: 'Australian National'
    },
    {
      id: 'smh',
      name: 'Sydney Morning Herald',
      url: 'https://www.smh.com.au/rss/feed.xml',
      description: 'Sydney Morning Herald news',
      category: 'Australian National'
    }
  ],
  'Germany': [
    {
      id: 'dw',
      name: 'Deutsche Welle',
      url: 'https://rss.dw.com/rdf/rss-en-all',
      description: 'Deutsche Welle English news',
      category: 'German National'
    },
    {
      id: 'spiegel',
      name: 'Der Spiegel',
      url: 'https://www.spiegel.de/schlagzeilen/index.rss',
      description: 'Der Spiegel news feed',
      category: 'German National'
    }
  ],
  'France': [
    {
      id: 'france24',
      name: 'France 24',
      url: 'https://www.france24.com/en/rss',
      description: 'France 24 English news',
      category: 'French National'
    },
    {
      id: 'lemonde',
      name: 'Le Monde',
      url: 'https://www.lemonde.fr/rss/une.xml',
      description: 'Le Monde news feed',
      category: 'French National'
    }
  ],
  'India': [
    {
      id: 'timesofindia',
      name: 'Times of India',
      url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
      description: 'Times of India top stories',
      category: 'Indian National'
    },
    {
      id: 'hindu',
      name: 'The Hindu',
      url: 'https://www.thehindu.com/feeder/default.rss',
      description: 'The Hindu news feed',
      category: 'Indian National'
    }
  ]
};

// Fallback global sources for unrecognized regions
const GLOBAL_NEWS_SOURCES: NewsSource[] = [
  {
    id: 'reuters-global',
    name: 'Reuters Global',
    url: 'http://feeds.reuters.com/reuters/topNews',
    description: 'Reuters global top news',
    category: 'Global'
  },
  {
    id: 'bbc-world',
    name: 'BBC World News',
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    description: 'BBC World news',
    category: 'Global'
  },
  {
    id: 'ap-news',
    name: 'Associated Press',
    url: 'https://feeds.ap.org/ap/topnews',
    description: 'Associated Press top news',
    category: 'Global'
  }
];

class NewsService {
  private parser: Parser;
  private cache: Map<string, { items: NewsItem[], timestamp: number }>;
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['media:content', 'media:thumbnail', 'dc:creator']
      }
    });
    this.cache = new Map();
  }

  async fetchNews(sourceId: string): Promise<NewsItem[]> {
    const source = this.findSourceById(sourceId);
    if (!source) {
      throw new Error(`News source ${sourceId} not found`);
    }

    // Check cache first
    const cached = this.cache.get(sourceId);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.items;
    }

    try {
      console.log(`Fetching RSS feed from ${source.name}: ${source.url}`);
      const feed = await this.parser.parseURL(source.url);
      
      const newsItems: NewsItem[] = feed.items.map((item, index) => ({
        id: item.guid || `${sourceId}-${index}-${Date.now()}`,
        title: item.title || 'No title',
        description: item.contentSnippet || item.content || item.summary || '',
        link: item.link || '',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        source: source.name,
        category: source.category
      }));

      // Cache the results
      this.cache.set(sourceId, {
        items: newsItems,
        timestamp: Date.now()
      });

      console.log(`Successfully fetched ${newsItems.length} news items from ${source.name}`);
      return newsItems;

    } catch (error: any) {
      console.error(`Error fetching news from ${source.name}:`, error);
      
      // Return cached data if available, even if expired
      if (cached) {
        console.log(`Returning cached data for ${source.name} due to fetch error`);
        return cached.items;
      }
      
      throw new Error(`Failed to fetch news from ${source.name}: ${error?.message || 'Unknown error'}`);
    }
  }

  findSourceById(sourceId: string): NewsSource | undefined {
    for (const region of Object.values(NEWS_SOURCES_BY_REGION)) {
      const source = region.find(s => s.id === sourceId);
      if (source) return source;
    }
    return GLOBAL_NEWS_SOURCES.find(s => s.id === sourceId);
  }

  getSourcesByRegion(region: string): NewsSource[] {
    return NEWS_SOURCES_BY_REGION[region] || GLOBAL_NEWS_SOURCES;
  }

  getAvailableRegions(): string[] {
    return Object.keys(NEWS_SOURCES_BY_REGION);
  }

  getAvailableSources(): NewsSource[] {
    // Return all sources from all regions
    const allSources: NewsSource[] = [];
    for (const region of Object.values(NEWS_SOURCES_BY_REGION)) {
      allSources.push(...region);
    }
    allSources.push(...GLOBAL_NEWS_SOURCES);
    return allSources;
  }

  clearCache(sourceId?: string): void {
    if (sourceId) {
      this.cache.delete(sourceId);
    } else {
      this.cache.clear();
    }
  }
}

export const newsService = new NewsService();
export type { NewsItem, NewsSource };