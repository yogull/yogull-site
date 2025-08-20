import Parser from 'rss-parser';
import { storage } from './storage';

export class AutoRSSService {
  private parser: Parser;
  private isRunning = false;
  private lastPostTime = 0;
  private readonly POST_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  constructor() {
    this.parser = new Parser();
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🗞️ Auto RSS Service started - posting news twice daily');
    
    // Run immediately on startup, then every hour to check if it's time
    this.checkAndPost();
    setInterval(() => this.checkAndPost(), 60 * 60 * 1000); // Check every hour
  }

  private async checkAndPost() {
    const now = Date.now();
    const timeSinceLastPost = now - this.lastPostTime;
    
    // Only post if 12 hours have passed since last post
    if (timeSinceLastPost >= this.POST_INTERVAL) {
      await this.postRandomNews();
      this.lastPostTime = now;
    }
  }

  async postRandomNews() {
    try {
      const feeds = [
        // UK Sources
        { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/rss.xml', category: 'UK News' },
        { name: 'BBC One', url: 'http://feeds.bbci.co.uk/news/england/rss.xml', category: 'UK News' },
        { name: 'GB News', url: 'https://www.gbnews.uk/feed', category: 'UK News' },
        { name: 'Sky News', url: 'http://feeds.skynews.com/feeds/rss/home.xml', category: 'UK News' },
        
        // Spanish Sources
        { name: 'El País', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada', category: 'Spanish News' },
        { name: 'El Mundo', url: 'https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml', category: 'Spanish News' },
        { name: 'RTVE Noticias', url: 'https://www.rtve.es/api/noticias.rss', category: 'Spanish News' },
        
        // Italian Sources
        { name: 'La Repubblica', url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml', category: 'Italian News' },
        { name: 'Corriere della Sera', url: 'https://xml2.corriereobjects.it/rss/homepage.xml', category: 'Italian News' },
        { name: 'ANSA', url: 'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml', category: 'Italian News' },
        
        // Hungarian Sources
        { name: 'Index.hu', url: 'https://index.hu/24ora/rss/', category: 'Hungarian News' },
        { name: 'HVG', url: 'https://hvg.hu/rss', category: 'Hungarian News' },
        { name: 'Telex', url: 'https://telex.hu/rss', category: 'Hungarian News' },
        
        // French Sources
        { name: 'Le Monde', url: 'https://www.lemonde.fr/rss/une.xml', category: 'French News' },
        { name: 'Le Figaro', url: 'https://www.lefigaro.fr/rss/figaro_actualites.xml', category: 'French News' },
        { name: 'France 24', url: 'https://www.france24.com/fr/rss', category: 'French News' },
        
        // German Sources
        { name: 'Der Spiegel', url: 'https://www.spiegel.de/schlagzeilen/index.rss', category: 'German News' },
        { name: 'Die Welt', url: 'https://www.welt.de/feeds/latest.rss', category: 'German News' },
        { name: 'Deutsche Welle', url: 'https://rss.dw.com/rdf/rss-de-all', category: 'German News' },
        
        // Portuguese/Brazilian Sources
        { name: 'O Globo', url: 'https://oglobo.globo.com/rss.xml', category: 'Brazilian News' },
        { name: 'Folha de S.Paulo', url: 'https://feeds.folha.uol.com.br/poder/rss091.xml', category: 'Brazilian News' },
        { name: 'Público PT', url: 'https://www.publico.pt/rss', category: 'Portuguese News' },
        
        // Russian Sources
        { name: 'RT', url: 'https://www.rt.com/rss/', category: 'Russian News' },
        { name: 'TASS', url: 'https://tass.com/rss/v2.xml', category: 'Russian News' },
        { name: 'Sputnik', url: 'https://sputniknews.com/export/rss2/archive/index.xml', category: 'Russian News' },
        
        // Chinese Sources
        { name: 'Xinhua', url: 'http://www.xinhuanet.com/english/rss/chinalatestnews.xml', category: 'Chinese News' },
        { name: 'China Daily', url: 'http://www.chinadaily.com.cn/rss/world_rss.xml', category: 'Chinese News' },
        { name: 'People\'s Daily', url: 'http://en.people.cn/rss/90777.xml', category: 'Chinese News' },
        
        // Japanese Sources
        { name: 'NHK World', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml', category: 'Japanese News' },
        { name: 'Japan Times', url: 'https://www.japantimes.co.jp/news/feed/', category: 'Japanese News' },
        { name: 'Kyodo News', url: 'https://english.kyodonews.net/rss/all.xml', category: 'Japanese News' },
        
        // Indian Sources
        { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', category: 'Indian News' },
        { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss', category: 'Indian News' },
        { name: 'NDTV', url: 'https://feeds.feedburner.com/ndtvnews-latest', category: 'Indian News' },
        
        // Middle Eastern Sources
        { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'Middle East News' },
        { name: 'Jerusalem Post', url: 'https://www.jpost.com/rss/rssfeedsfrontpage.aspx', category: 'Middle East News' },
        { name: 'Haaretz', url: 'https://www.haaretz.com/cmlink/1.628152', category: 'Middle East News' },
        
        // African Sources
        { name: 'News24 SA', url: 'https://feeds.news24.com/articles/news24/TopStories/rss', category: 'African News' },
        { name: 'Daily Maverick', url: 'https://www.dailymaverick.co.za/dmrss/', category: 'African News' },
        { name: 'AllAfrica', url: 'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf', category: 'African News' },
        
        // Australian Sources
        { name: 'ABC Australia', url: 'https://www.abc.net.au/news/feed/45910/rss.xml', category: 'Australian News' },
        { name: 'Sydney Morning Herald', url: 'https://www.smh.com.au/rss/feed.xml', category: 'Australian News' },
        { name: 'The Australian', url: 'https://www.theaustralian.com.au/feed/', category: 'Australian News' },
        
        // Canadian Sources
        { name: 'CBC News', url: 'https://www.cbc.ca/cmlink/rss-topstories', category: 'Canadian News' },
        { name: 'Globe and Mail', url: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/', category: 'Canadian News' },
        { name: 'CTV News', url: 'https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009', category: 'Canadian News' },
        
        // Nordic Sources
        { name: 'Dagens Nyheter', url: 'https://www.dn.se/nyheter/rss/', category: 'Swedish News' },
        { name: 'Aftenposten', url: 'https://www.aftenposten.no/rss/', category: 'Norwegian News' },
        { name: 'Helsingin Sanomat', url: 'https://www.hs.fi/rss/tuoreimmat.xml', category: 'Finnish News' },
        
        // Eastern European Sources
        { name: 'Pravda', url: 'https://www.pravda.com.ua/rss/', category: 'Ukrainian News' },
        { name: 'TVN24', url: 'https://tvn24.pl/najwazniejsze.xml', category: 'Polish News' },
        { name: 'Denik CZ', url: 'https://www.denik.cz/rss/ceske_noviny.html', category: 'Czech News' },
        
        // Latin American Sources
        { name: 'La Nación AR', url: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/', category: 'Argentine News' },
        { name: 'El Universal MX', url: 'https://www.eluniversal.com.mx/rss.xml', category: 'Mexican News' },
        { name: 'El Tiempo CO', url: 'https://www.eltiempo.com/rss.xml', category: 'Colombian News' },
        
        // Southeast Asian Sources
        { name: 'Straits Times', url: 'https://www.straitstimes.com/news/singapore/rss.xml', category: 'Singapore News' },
        { name: 'Bangkok Post', url: 'https://www.bangkokpost.com/rss/data/news.xml', category: 'Thai News' },
        { name: 'Jakarta Post', url: 'https://www.thejakartapost.com/rss', category: 'Indonesian News' },
        
        // Global Sources
        { name: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss', category: 'World News' },
        { name: 'BBC World', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', category: 'World News' },
        { name: 'Reuters World', url: 'http://feeds.reuters.com/Reuters/worldNews', category: 'World News' },
        { name: 'Associated Press', url: 'https://feeds.ap.org/ap/news', category: 'World News' }
      ];

      // Select random feed
      const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
      
      console.log(`🗞️ Fetching news from ${randomFeed.name}...`);
      
      const rssFeed = await this.parser.parseURL(randomFeed.url);
      
      if (rssFeed.items && rssFeed.items.length > 0) {
        // Get the most recent 3 items
        const recentItems = rssFeed.items.slice(0, 3);
        
        for (const item of recentItems) {
          const discussionData = {
            title: `📰 ${item.title?.substring(0, 180) || 'Breaking News'}`,
            content: `${item.contentSnippet || item.content || ''}\n\n🔗 Read more: ${item.link || ''}\n📺 Source: ${randomFeed.name}`,
            authorId: 4, // Admin user
            category: randomFeed.category,
            location: 'Global',
            createdAt: new Date().toISOString()
          };

          try {
            await storage.createDiscussion(discussionData);
            console.log(`✅ Posted news discussion: ${discussionData.title}`);
          } catch (error) {
            console.error('Failed to create discussion:', error);
          }
        }
        
        console.log(`🗞️ Successfully posted ${recentItems.length} news items from ${randomFeed.name}`);
      }
    } catch (error) {
      console.error('Auto RSS posting failed:', error);
      
      // Post fallback community topics if RSS fails
      await this.postFallbackTopics();
    }
  }

  private async postFallbackTopics() {
    const fallbackTopics = [
      {
        title: "🏛️ Daily Government Discussion",
        content: "What are your thoughts on recent government policies? Share your views on local council decisions, healthcare updates, or any government announcements affecting ordinary people.",
        category: "Government & Policy"
      },
      {
        title: "💬 Community Check-in",
        content: "How is everyone doing today? Share what's happening in your local area, discuss community events, or just connect with fellow ordinary people.",
        category: "Community"
      },
      {
        title: "🏥 Health & Wellness Share",
        content: "Share your health experiences, supplement updates, or wellness tips. Let's support each other in our health journeys away from elite-controlled healthcare.",
        category: "Health & Wellness"
      }
    ];

    const randomTopic = fallbackTopics[Math.floor(Math.random() * fallbackTopics.length)];
    
    const discussionData = {
      title: randomTopic.title,
      content: randomTopic.content,
      authorId: 4,
      category: randomTopic.category,
      location: 'Community',
      createdAt: new Date().toISOString()
    };

    try {
      await storage.createDiscussion(discussionData);
      console.log(`✅ Posted fallback discussion: ${discussionData.title}`);
    } catch (error) {
      console.error('Failed to create fallback discussion:', error);
    }
  }

  stop() {
    this.isRunning = false;
    console.log('🗞️ Auto RSS Service stopped');
  }
}