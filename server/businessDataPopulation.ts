import { db } from "./db";
import { mockBusinessData } from "@shared/schema";
import { eq } from "drizzle-orm";

export class BusinessDataPopulation {
  // Local community businesses with authentic small business focus
  private businessData = [
    // UK Local Businesses
    {
      businessName: "The Corner Bakery",
      category: "Local Bakery",
      address: "15 Church Lane",
      city: "Nottingham",
      country: "United Kingdom",
      latitude: 52.9548,
      longitude: -1.1581,
      description: "Family-run bakery serving fresh bread and pastries since 1987",
      imageUrl: "https://via.placeholder.com/200x120/D2691E/FFFFFF?text=THE+CORNER+BAKERY",
      website: "https://cornerbakery-nottingham.co.uk",
      phone: "+44 115 987 6543",
      email: "hello@cornerbakery-nottingham.co.uk"
    },
    {
      businessName: "Manchester Local Cafe",
      category: "Independent Coffee Shop",
      address: "78 Market Street",
      city: "Manchester",
      country: "United Kingdom",
      latitude: 53.4808,
      longitude: -2.2426,
      description: "Cozy local cafe serving artisan coffee and homemade cakes",
      imageUrl: "https://via.placeholder.com/200x120/8B4513/FFFFFF?text=MANCHESTER+CAFE",
      website: "https://manchesterlocalcafe.co.uk",
      phone: "+44 161 234 5678",
      email: "info@manchesterlocalcafe.co.uk"
    },
    {
      businessName: "Birmingham Health Store",
      category: "Local Pharmacy",
      address: "23 High Street",
      city: "Birmingham",
      country: "United Kingdom",
      latitude: 52.4862,
      longitude: -1.8904,
      description: "Independent pharmacy focusing on natural health and wellness",
      imageUrl: "https://via.placeholder.com/200x120/228B22/FFFFFF?text=HEALTH+STORE",
      website: "https://birminghamhealthstore.co.uk",
      phone: "+44 121 456 7890",
      email: "care@birminghamhealthstore.co.uk"
    },
    {
      businessName: "Yorkshire Tea Shop",
      category: "Tea & Coffee Shop",
      address: "56 The Shambles",
      city: "York",
      country: "United Kingdom",
      latitude: 53.9591,
      longitude: -1.0815,
      description: "Traditional tea shop serving Yorkshire tea and homemade scones",
      imageUrl: "https://via.placeholder.com/200x120/8B4513/FFFFFF?text=YORKSHIRE+TEA",
      website: "https://yorkshire-teashop.co.uk",
      phone: "+44 1904 567 890",
      email: "tea@yorkshire-teashop.co.uk"
    },
    {
      businessName: "Glasgow Fish & Chips",
      category: "Fish & Chip Shop",
      address: "89 Buchanan Street",
      city: "Glasgow",
      country: "United Kingdom",
      latitude: 55.8642,
      longitude: -4.2518,
      description: "Traditional Scottish fish and chips with locally sourced haddock",
      imageUrl: "https://via.placeholder.com/200x120/4682B4/FFFFFF?text=FISH+CHIPS",
      website: "https://glasgow-fishchips.co.uk",
      phone: "+44 141 234 5678",
      email: "fresh@glasgow-fishchips.co.uk"
    },
    
    // France Local Businesses
    {
      businessName: "Épicerie du Quartier",
      category: "Local Grocery",
      address: "12 Rue Saint-Antoine",
      city: "Paris",
      country: "France",
      latitude: 48.8566,
      longitude: 2.3522,
      description: "Neighborhood grocery store with local French products and wine",
      imageUrl: "https://via.placeholder.com/200x120/4169E1/FFFFFF?text=EPICERIE+LOCAL",
      website: "https://epicerie-quartier-paris.fr",
      phone: "+33 1 42 34 56 78",
      email: "bonjour@epicerie-quartier-paris.fr"
    },
    {
      businessName: "Boulangerie Familiale Martin",
      category: "Family Bakery",
      address: "67 Rue de la République",
      city: "Lyon",
      country: "France",
      latitude: 45.7640,
      longitude: 4.8357,
      description: "Four generations of traditional French baking with artisanal breads",
      imageUrl: "https://via.placeholder.com/200x120/8B4513/FFFFFF?text=BOULANGERIE+MARTIN",
      website: "https://boulangerie-martin-lyon.fr",
      phone: "+33 4 78 90 12 34",
      email: "famille@boulangerie-martin-lyon.fr"
    },
    {
      businessName: "Fromagerie du Coin",
      category: "Cheese Shop",
      address: "45 Rue Mouffetard",
      city: "Paris",
      country: "France",
      latitude: 48.8434,
      longitude: 2.3510,
      description: "Artisanal French cheese shop with over 200 varieties and wine pairings",
      imageUrl: "https://via.placeholder.com/200x120/FFD700/000000?text=FROMAGERIE",
      website: "https://fromagerie-coin-paris.fr",
      phone: "+33 1 43 31 50 47",
      email: "fromage@fromagerie-coin-paris.fr"
    },
    {
      businessName: "Tabac Presse Marseille",
      category: "Newsagent & Tobacco",
      address: "78 La Canebière",
      city: "Marseille",
      country: "France",
      latitude: 43.2965,
      longitude: 5.3698,
      description: "Local newsagent with newspapers, magazines, lottery tickets and tobacco",
      imageUrl: "https://via.placeholder.com/200x120/DC143C/FFFFFF?text=TABAC+PRESSE",
      website: "https://tabac-marseille.fr",
      phone: "+33 4 91 54 32 10",
      email: "info@tabac-marseille.fr"
    },
    
    // Germany Local Businesses
    {
      businessName: "Berliner Nachbarschaftsladen",
      category: "Community Store",
      address: "34 Kastanienallee",
      city: "Berlin",
      country: "Germany",
      latitude: 52.5200,
      longitude: 13.4050,
      description: "Local neighborhood store supporting Berlin community with organic goods",
      imageUrl: "https://via.placeholder.com/200x120/DC143C/FFFFFF?text=NACHBARSCHAFT",
      website: "https://nachbarschaftsladen-berlin.de",
      phone: "+49 30 1234 5678",
      email: "hallo@nachbarschaftsladen-berlin.de"
    },
    {
      businessName: "Familien Apotheke Weber",
      category: "Family Pharmacy",
      address: "45 Sendlinger Straße",
      city: "Munich",
      country: "Germany",
      latitude: 48.1351,
      longitude: 11.5820,
      description: "Three-generation family pharmacy serving Munich community since 1952",
      imageUrl: "https://via.placeholder.com/200x120/228B22/FFFFFF?text=APOTHEKE+WEBER",
      website: "https://apotheke-weber-muenchen.de",
      phone: "+49 89 9876 5432",
      email: "familie@apotheke-weber-muenchen.de"
    },
    {
      businessName: "Fleischerei Mueller",
      category: "Traditional Butcher",
      address: "23 Hauptstraße",
      city: "Munich",
      country: "Germany",
      latitude: 48.1351,
      longitude: 11.5820,
      description: "Traditional German butcher shop with locally sourced meats and sausages",
      imageUrl: "https://via.placeholder.com/200x120/8B0000/FFFFFF?text=FLEISCHEREI",
      website: "https://fleischerei-mueller-muenchen.de",
      phone: "+49 89 123 456 78",
      email: "wurst@fleischerei-mueller-muenchen.de"
    },
    {
      businessName: "Apotheke am Markt",
      category: "Traditional Pharmacy",
      address: "67 Marktplatz",
      city: "Hamburg",
      country: "Germany",
      latitude: 53.5511,
      longitude: 9.9937,
      description: "Family pharmacy serving Hamburg community with natural remedies",
      imageUrl: "https://via.placeholder.com/200x120/006400/FFFFFF?text=APOTHEKE",
      website: "https://apotheke-markt-hamburg.de",
      phone: "+49 40 987 654 32",
      email: "gesundheit@apotheke-markt-hamburg.de"
    },
    
    // Spain Local Businesses
    {
      businessName: "Tienda del Barrio González",
      category: "Neighborhood Shop",
      address: "67 Calle de Atocha",
      city: "Madrid",
      country: "Spain",
      latitude: 40.4168,
      longitude: -3.7038,
      description: "Family-owned neighborhood store serving Madrid community for 30 years",
      imageUrl: "https://via.placeholder.com/200x120/FF4500/FFFFFF?text=TIENDA+GONZALEZ",
      website: "https://tienda-gonzalez-madrid.es",
      phone: "+34 91 123 45 67",
      email: "familia@tienda-gonzalez-madrid.es"
    },
    {
      businessName: "Farmacia Familiar Rossi",
      category: "Independent Pharmacy",
      address: "23 Carrer de Gràcia",
      city: "Barcelona",
      country: "Spain",
      latitude: 41.3851,
      longitude: 2.1734,
      description: "Independent pharmacy focused on personalized community healthcare",
      imageUrl: "https://via.placeholder.com/200x120/FF6347/FFFFFF?text=FARMACIA+ROSSI",
      website: "https://farmacia-rossi-barcelona.es",
      phone: "+34 93 876 54 32",
      email: "cuidado@farmacia-rossi-barcelona.es"
    },
    {
      businessName: "Carnicería Los Hermanos",
      category: "Local Butcher",
      address: "34 Calle Mayor",
      city: "Madrid",
      country: "Spain",
      latitude: 40.4168,
      longitude: -3.7038,
      description: "Traditional Spanish butcher shop with Iberian ham and local meats",
      imageUrl: "https://via.placeholder.com/200x120/B22222/FFFFFF?text=CARNICERIA",
      website: "https://carniceria-hermanos-madrid.es",
      phone: "+34 91 234 567 89",
      email: "carne@carniceria-hermanos-madrid.es"
    },
    {
      businessName: "Panadería San Miguel",
      category: "Traditional Bakery",
      address: "56 Plaza del Sol",
      city: "Seville",
      country: "Spain",
      latitude: 37.3886,
      longitude: -5.9823,
      description: "Authentic Spanish bakery with fresh bread and pastries since 1952",
      imageUrl: "https://via.placeholder.com/200x120/DAA520/000000?text=PANADERIA",
      website: "https://panaderia-sanmiguel-sevilla.es",
      phone: "+34 95 456 789 01",
      email: "pan@panaderia-sanmiguel-sevilla.es"
    },
    
    // Italy Local Businesses
    {
      businessName: "Alimentari della Nonna",
      category: "Local Deli",
      address: "12 Via dei Cappuccini",
      city: "Rome",
      country: "Italy",
      latitude: 41.9028,
      longitude: 12.4964,
      description: "Traditional Italian deli with homemade pasta and local specialties",
      imageUrl: "https://via.placeholder.com/200x120/228B22/FFFFFF?text=ALIMENTARI+NONNA",
      website: "https://alimentari-nonna-roma.it",
      phone: "+39 06 1234 5678",
      email: "nonna@alimentari-nonna-roma.it"
    },
    {
      businessName: "Bar Centrale Francesco",
      category: "Local Cafe",
      address: "34 Via Brera",
      city: "Milan",
      country: "Italy",
      latitude: 45.4642,
      longitude: 9.1900,
      description: "Neighborhood bar serving authentic espresso and fresh cornetti",
      imageUrl: "https://via.placeholder.com/200x120/8B4513/FFFFFF?text=BAR+FRANCESCO",
      website: "https://bar-francesco-milano.it",
      phone: "+39 02 9876 5432",
      email: "francesco@bar-francesco-milano.it"
    },
    
    // Netherlands Community Businesses
    {
      businessName: "SPAR Neighborhood Market",
      category: "Local Supermarket",
      address: "89 Nieuwmarkt",
      city: "Amsterdam",
      country: "Netherlands",
      latitude: 52.3676,
      longitude: 4.9041,
      description: "Convenient local SPAR with fresh Dutch products and daily essentials",
      imageUrl: "https://via.placeholder.com/200x120/228B22/FFFFFF?text=SPAR+LOCAL",
      website: "https://spar-amsterdam-nieuwmarkt.nl",
      phone: "+31 20 123 45 67",
      email: "nieuwmarkt@spar.nl"
    },
    {
      businessName: "De Gezonde Buurt Apotheek",
      category: "Community Pharmacy",
      address: "56 Oudegracht",
      city: "Utrecht",
      country: "Netherlands",
      latitude: 52.0907,
      longitude: 5.1214,
      description: "Independent pharmacy serving Utrecht families with personalized care",
      imageUrl: "https://via.placeholder.com/200x120/4169E1/FFFFFF?text=APOTHEEK+BUURT",
      website: "https://gezonde-buurt-utrecht.nl",
      phone: "+31 30 876 54 32",
      email: "zorg@gezonde-buurt-utrecht.nl"
    },
    {
      businessName: "Kaaswinkel De Vriendschap",
      category: "Dutch Cheese Shop",
      address: "23 Prinsengracht",
      city: "Amsterdam",
      country: "Netherlands",
      latitude: 52.3676,
      longitude: 4.9041,
      description: "Traditional Dutch cheese shop with Gouda, Edam and local specialties",
      imageUrl: "https://via.placeholder.com/200x120/FF8C00/FFFFFF?text=KAASWINKEL",
      website: "https://kaaswinkel-vriendschap.nl",
      phone: "+31 20 987 65 43",
      email: "kaas@kaaswinkel-vriendschap.nl"
    },
    
    // USA Community Businesses
    {
      businessName: "Downtown Community Market",
      category: "Local Grocery",
      address: "234 Main Street",
      city: "New York",
      country: "United States",
      latitude: 40.7589,
      longitude: -73.9851,
      description: "Family-owned market serving fresh produce to downtown community",
      imageUrl: "https://via.placeholder.com/200x120/4682B4/FFFFFF?text=COMMUNITY+MARKET",
      website: "https://downtownmarket-nyc.com",
      phone: "+1 212 555 0123",
      email: "hello@downtownmarket-nyc.com"
    },
    {
      businessName: "Walgreens",
      category: "Community Pharmacy",
      address: "567 Sunset Blvd",
      city: "Los Angeles",
      country: "United States",
      latitude: 34.0522,
      longitude: -118.2437,
      description: "Trusted neighborhood pharmacy with healthcare services",
      imageUrl: "https://via.placeholder.com/200x120/DC143C/FFFFFF?text=WALGREENS",
      website: "https://www.walgreens.com",
      phone: "+1 323 555 0456",
      email: "sunset@walgreens.com"
    },
    {
      businessName: "Chicago Corner Deli",
      category: "Local Deli",
      address: "456 State Street",
      city: "Chicago",
      country: "United States",
      latitude: 41.8781,
      longitude: -87.6298,
      description: "Family-owned deli serving fresh sandwiches and Chicago specialties",
      imageUrl: "https://via.placeholder.com/200x120/FF4500/FFFFFF?text=CORNER+DELI",
      website: "https://chicago-cornerdeli.com",
      phone: "+1 312 555 0789",
      email: "sandwiches@chicago-cornerdeli.com"
    },
    {
      businessName: "Miami Beach Pharmacy",
      category: "Independent Pharmacy",
      address: "789 Ocean Drive",
      city: "Miami",
      country: "United States",
      latitude: 25.7617,
      longitude: -80.1918,
      description: "Local pharmacy serving Miami Beach community with bilingual service",
      imageUrl: "https://via.placeholder.com/200x120/00CED1/FFFFFF?text=BEACH+PHARMACY",
      website: "https://miamibeach-pharmacy.com",
      phone: "+1 305 555 0234",
      email: "care@miamibeach-pharmacy.com"
    },
    
    // Canada Community Businesses
    {
      businessName: "Tim Hortons",
      category: "Coffee Shop",
      address: "123 Yonge Street",
      city: "Toronto",
      country: "Canada",
      latitude: 43.6532,
      longitude: -79.3832,
      description: "Canada's beloved coffee shop with fresh donuts and community gathering space",
      imageUrl: "https://via.placeholder.com/200x120/FF0000/FFFFFF?text=TIM+HORTONS",
      website: "https://www.timhortons.ca",
      phone: "+1 416 555 0789",
      email: "toronto@timhortons.ca"
    },
    {
      businessName: "Vancouver Corner Pharmacy",
      category: "Independent Pharmacy",
      address: "234 Commercial Drive",
      city: "Vancouver",
      country: "Canada",
      latitude: 49.2827,
      longitude: -123.1207,
      description: "Family-owned pharmacy serving Vancouver neighborhood for 25 years",
      imageUrl: "https://via.placeholder.com/200x120/0066CC/FFFFFF?text=CORNER+PHARMACY",
      website: "https://cornerpharmacy-vancouver.ca",
      phone: "+1 604 555 0321",
      email: "care@cornerpharmacy-vancouver.ca"
    },
    {
      businessName: "Calgary Coffee Roasters",
      category: "Local Coffee Roaster",
      address: "789 Stephen Avenue",
      city: "Calgary",
      country: "Canada",
      latitude: 51.0447,
      longitude: -114.0719,
      description: "Independent coffee roasters with locally sourced beans and brewing classes",
      imageUrl: "https://via.placeholder.com/200x120/8B4513/FFFFFF?text=COFFEE+ROASTERS",
      website: "https://calgary-coffeeroasters.ca",
      phone: "+1 403 555 0123",
      email: "beans@calgary-coffeeroasters.ca"
    },
    {
      businessName: "Halifax Fish Market",
      category: "Fresh Seafood",
      address: "234 Barrington Street",
      city: "Halifax",
      country: "Canada",
      latitude: 44.6488,
      longitude: -63.5752,
      description: "Fresh Atlantic seafood market with daily catches and Maritime specialties",
      imageUrl: "https://via.placeholder.com/200x120/1E90FF/FFFFFF?text=FISH+MARKET",
      website: "https://halifax-fishmarket.ca",
      phone: "+1 902 555 0456",
      email: "fresh@halifax-fishmarket.ca"
    },
    
    // Australia Community Businesses
    {
      businessName: "IGA Fresh Market",
      category: "Local Supermarket",
      address: "145 Crown Street",
      city: "Sydney",
      country: "Australia",
      latitude: -33.8688,
      longitude: 151.2093,
      description: "Independent grocer supporting local Australian families and producers",
      imageUrl: "https://via.placeholder.com/200x120/228B22/FFFFFF?text=IGA+FRESH",
      website: "https://iga-crownstreet-sydney.com.au",
      phone: "+61 2 9876 5432",
      email: "fresh@iga-crownstreet-sydney.com.au"
    },
    {
      businessName: "Collins Street Pharmacy",
      category: "Community Pharmacy",
      address: "78 Collins Street",
      city: "Melbourne",
      country: "Australia",
      latitude: -37.8136,
      longitude: 144.9631,
      description: "Family pharmacy providing personalized healthcare to Melbourne community",
      imageUrl: "https://via.placeholder.com/200x120/4169E1/FFFFFF?text=COLLINS+PHARMACY",
      website: "https://collins-pharmacy-melbourne.com.au",
      phone: "+61 3 1234 5678",
      email: "care@collins-pharmacy-melbourne.com.au"
    },
    {
      businessName: "Perth Local Bakery",
      category: "Traditional Bakery",
      address: "456 Hay Street",
      city: "Perth",
      country: "Australia",
      latitude: -31.9505,
      longitude: 115.8605,
      description: "Family bakery serving fresh bread, meat pies and Australian pastries",
      imageUrl: "https://via.placeholder.com/200x120/D2691E/FFFFFF?text=PERTH+BAKERY",
      website: "https://perth-localbakery.com.au",
      phone: "+61 8 9123 4567",
      email: "fresh@perth-localbakery.com.au"
    },
    {
      businessName: "Brisbane Corner Store",
      category: "Corner Shop",
      address: "789 Queen Street",
      city: "Brisbane",
      country: "Australia",
      latitude: -27.4698,
      longitude: 153.0251,
      description: "Local corner store with newspapers, snacks and essential groceries",
      imageUrl: "https://via.placeholder.com/200x120/32CD32/FFFFFF?text=CORNER+STORE",
      website: "https://brisbane-cornerstore.com.au",
      phone: "+61 7 3456 7890",
      email: "shop@brisbane-cornerstore.com.au"
    }
  ];

  public async populateBusinessData(): Promise<void> {
    try {
      console.log("🏢 Starting business data population with logos...");
      
      // Clear existing mock data
      await db.delete(mockBusinessData);
      
      // Insert new business data with logos
      for (const business of this.businessData) {
        await db.insert(mockBusinessData).values({
          businessName: business.businessName,
          category: business.category,
          address: business.address,
          city: business.city,
          country: business.country,
          latitude: business.latitude,
          longitude: business.longitude,
          description: business.description,
          imageUrl: business.imageUrl,
          website: business.website,
          phone: business.phone,
          email: business.email,
          isActive: true
        });
      }
      
      console.log(`✅ Successfully populated ${this.businessData.length} authentic community businesses from 9 countries`);
      console.log("Comprehensive mix: local bakeries, family pharmacies, corner shops, traditional butchers, cheese shops, fish markets, coffee roasters, and trusted community chains");
      
    } catch (error) {
      console.error("❌ Failed to populate business data:", error);
      throw error;
    }
  }

  public async getBusinessesByCountry(country: string) {
    return await db.select().from(mockBusinessData).where(eq(mockBusinessData.country, country));
  }

  public async getBusinessesByCity(city: string) {
    return await db.select().from(mockBusinessData).where(eq(mockBusinessData.city, city));
  }
}

export const businessDataPopulation = new BusinessDataPopulation();