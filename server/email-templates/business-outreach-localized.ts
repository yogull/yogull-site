// Multi-language email templates for business outreach campaigns

export interface LocalizedEmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export const businessOutreachTemplates: Record<string, LocalizedEmailTemplate> = {
  // English (UK, US, Canada, Australia)
  en: {
    subject: "🚀 Revolutionary Marketing Tool - Amplify Your Business Reach",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1>🚀 MARKETING REVOLUTION!</h1>
          <h2>OPC's Multi-Share System Changes Everything</h2>
          <p style="font-size: 18px;">The Most Powerful Social Media Marketing Tool Ever Created</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #ef4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; font-size: 18px; font-weight: bold;">
            💥 WOW! LOOK WHAT WE CAN DO! 💥<br>
            ONE POST = UNLIMITED SOCIAL MEDIA REACH
          </div>
          
          <h3>Dear Business Owner,</h3>
          
          <p>Imagine posting content ONCE and having it automatically appear on:</p>
          <ul>
            <li><strong>✅ Facebook (even without being friends)</strong></li>
            <li><strong>✅ Twitter</strong></li>
            <li><strong>✅ Instagram</strong></li>
            <li><strong>✅ LinkedIn</strong></li>
            <li><strong>✅ YouTube</strong></li>
            <li><strong>✅ Connected users' feeds automatically</strong></li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3>🎯 BREAKTHROUGH TECHNOLOGY</h3>
            <p><strong>Our connected users system means your content reaches their social media audiences - even if you're not friends with them on those platforms!</strong></p>
          </div>
          
          <h3>Business Benefits:</h3>
          <ul>
            <li>🔥 <strong>Viral Potential:</strong> One post can reach thousands through community amplification</li>
            <li>⚡ <strong>Zero Extra Work:</strong> Post once, share everywhere automatically</li>
            <li>🎯 <strong>Break Barriers:</strong> Access audiences you've never reached before</li>
            <li>🚀 <strong>Professional Integration:</strong> OAuth-powered, secure, and reliable</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gohealme.org" style="background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px;">🚀 JOIN NOW & START AMPLIFYING!</a>
          </div>
          
          <p><strong>Don't miss this marketing revolution!</strong> Join thousands of users already leveraging OPC's multi-share system to explode their social media reach.</p>
          
          <p style="text-align: center; font-style: italic; color: #666;">
            OPC (Ordinary People Community) - Where Marketing Meets Innovation
          </p>
        </div>
      </div>
    `,
    textContent: `
🚀 MARKETING REVOLUTION!

Dear Business Owner,

Discover the most powerful social media marketing tool ever created!

ONE POST = UNLIMITED REACH
Post ONCE from OPC and automatically share to:
✅ Facebook (even without being friends)
✅ Twitter 
✅ Instagram
✅ LinkedIn
✅ YouTube
✅ Connected users' social media feeds

BREAKTHROUGH TECHNOLOGY:
Our connected users system means your content reaches their social media audiences - even if you're not friends with them on those platforms!

Business Benefits:
🔥 Viral Potential: One post can reach thousands
⚡ Zero Extra Work: Post once, share everywhere
🎯 Break Barriers: Access new audiences
🚀 Professional Integration: Secure OAuth system

Join now: https://gohealme.org

Don't miss this marketing revolution!

OPC (Ordinary People Community) - Where Marketing Meets Innovation
    `
  },

  // French (France)
  fr: {
    subject: "🚀 Outil Marketing Révolutionnaire - Amplifiez la Portée de Votre Entreprise",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1>🚀 RÉVOLUTION MARKETING!</h1>
          <h2>Le Système Multi-Partage d'OPC Change Tout</h2>
          <p style="font-size: 18px;">L'Outil Marketing Réseaux Sociaux le Plus Puissant Jamais Créé</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #ef4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; font-size: 18px; font-weight: bold;">
            💥 WOW! REGARDEZ CE QUE NOUS POUVONS FAIRE! 💥<br>
            UN POST = PORTÉE ILLIMITÉE SUR LES RÉSEAUX SOCIAUX
          </div>
          
          <h3>Cher Propriétaire d'Entreprise,</h3>
          
          <p>Imaginez publier du contenu UNE FOIS et le voir apparaître automatiquement sur:</p>
          <ul>
            <li><strong>✅ Facebook (même sans être amis)</strong></li>
            <li><strong>✅ Twitter</strong></li>
            <li><strong>✅ Instagram</strong></li>
            <li><strong>✅ LinkedIn</strong></li>
            <li><strong>✅ YouTube</strong></li>
            <li><strong>✅ Les flux des utilisateurs connectés automatiquement</strong></li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3>🎯 TECHNOLOGIE RÉVOLUTIONNAIRE</h3>
            <p><strong>Notre système d'utilisateurs connectés signifie que votre contenu atteint leurs audiences sur les réseaux sociaux - même si vous n'êtes pas amis avec eux sur ces plateformes!</strong></p>
          </div>
          
          <h3>Avantages pour les Entreprises:</h3>
          <ul>
            <li>🔥 <strong>Potentiel Viral:</strong> Un post peut atteindre des milliers de personnes grâce à l'amplification communautaire</li>
            <li>⚡ <strong>Zéro Travail Supplémentaire:</strong> Publiez une fois, partagez partout automatiquement</li>
            <li>🎯 <strong>Briser les Barrières:</strong> Accédez à des audiences jamais atteintes auparavant</li>
            <li>🚀 <strong>Intégration Professionnelle:</strong> Alimenté par OAuth, sécurisé et fiable</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gohealme.org" style="background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px;">🚀 REJOIGNEZ MAINTENANT & COMMENCEZ L'AMPLIFICATION!</a>
          </div>
          
          <p><strong>Ne ratez pas cette révolution marketing!</strong> Rejoignez les milliers d'utilisateurs qui exploitent déjà le système multi-partage d'OPC pour exploser leur portée sur les réseaux sociaux.</p>
          
          <p style="text-align: center; font-style: italic; color: #666;">
            OPC (Ordinary People Community) - Où le Marketing Rencontre l'Innovation
          </p>
        </div>
      </div>
    `,
    textContent: `
🚀 RÉVOLUTION MARKETING!

Cher Propriétaire d'Entreprise,

Découvrez l'outil marketing réseaux sociaux le plus puissant jamais créé!

UN POST = PORTÉE ILLIMITÉE
Publiez UNE FOIS depuis OPC et partagez automatiquement sur:
✅ Facebook (même sans être amis)
✅ Twitter 
✅ Instagram
✅ LinkedIn
✅ YouTube
✅ Les flux des réseaux sociaux des utilisateurs connectés

TECHNOLOGIE RÉVOLUTIONNAIRE:
Notre système d'utilisateurs connectés signifie que votre contenu atteint leurs audiences sur les réseaux sociaux - même si vous n'êtes pas amis avec eux sur ces plateformes!

Avantages pour les Entreprises:
🔥 Potentiel Viral: Un post peut atteindre des milliers
⚡ Zéro Travail Supplémentaire: Publiez une fois, partagez partout
🎯 Briser les Barrières: Accéder à de nouvelles audiences
🚀 Intégration Professionnelle: Système OAuth sécurisé

Rejoignez maintenant: https://gohealme.org

Ne ratez pas cette révolution marketing!

OPC (Ordinary People Community) - Où le Marketing Rencontre l'Innovation
    `
  },

  // German (Germany)
  de: {
    subject: "🚀 Revolutionäres Marketing-Tool - Verstärken Sie Ihre Unternehmensreichweite",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1>🚀 MARKETING-REVOLUTION!</h1>
          <h2>OPCs Multi-Share-System Verändert Alles</h2>
          <p style="font-size: 18px;">Das Mächtigste Social Media Marketing-Tool, das je Entwickelt Wurde</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #ef4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; font-size: 18px; font-weight: bold;">
            💥 WOW! SCHAUEN SIE, WAS WIR KÖNNEN! 💥<br>
            EIN POST = UNBEGRENZTE SOCIAL MEDIA REICHWEITE
          </div>
          
          <h3>Lieber Geschäftsinhaber,</h3>
          
          <p>Stellen Sie sich vor, Sie veröffentlichen Inhalte EINMAL und sie erscheinen automatisch auf:</p>
          <ul>
            <li><strong>✅ Facebook (auch ohne befreundet zu sein)</strong></li>
            <li><strong>✅ Twitter</strong></li>
            <li><strong>✅ Instagram</strong></li>
            <li><strong>✅ LinkedIn</strong></li>
            <li><strong>✅ YouTube</strong></li>
            <li><strong>✅ Feeds verbundener Nutzer automatisch</strong></li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3>🎯 DURCHBRUCH-TECHNOLOGIE</h3>
            <p><strong>Unser System verbundener Nutzer bedeutet, dass Ihr Inhalt ihre Social Media Zielgruppen erreicht - auch wenn Sie nicht mit ihnen auf diesen Plattformen befreundet sind!</strong></p>
          </div>
          
          <h3>Geschäftsvorteile:</h3>
          <ul>
            <li>🔥 <strong>Virales Potenzial:</strong> Ein Post kann Tausende durch Community-Verstärkung erreichen</li>
            <li>⚡ <strong>Null Zusatzarbeit:</strong> Einmal posten, überall automatisch teilen</li>
            <li>🎯 <strong>Barrieren Durchbrechen:</strong> Zielgruppen erreichen, die Sie nie zuvor erreicht haben</li>
            <li>🚀 <strong>Professionelle Integration:</strong> OAuth-betrieben, sicher und zuverlässig</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gohealme.org" style="background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px;">🚀 JETZT BEITRETEN & VERSTÄRKUNG STARTEN!</a>
          </div>
          
          <p><strong>Verpassen Sie diese Marketing-Revolution nicht!</strong> Schließen Sie sich Tausenden von Nutzern an, die bereits OPCs Multi-Share-System nutzen, um ihre Social Media Reichweite zu explodieren.</p>
          
          <p style="text-align: center; font-style: italic; color: #666;">
            OPC (Ordinary People Community) - Wo Marketing auf Innovation Trifft
          </p>
        </div>
      </div>
    `,
    textContent: `
🚀 MARKETING-REVOLUTION!

Lieber Geschäftsinhaber,

Entdecken Sie das mächtigste Social Media Marketing-Tool, das je entwickelt wurde!

EIN POST = UNBEGRENZTE REICHWEITE
Posten Sie EINMAL von OPC und teilen Sie automatisch auf:
✅ Facebook (auch ohne befreundet zu sein)
✅ Twitter 
✅ Instagram
✅ LinkedIn
✅ YouTube
✅ Social Media Feeds verbundener Nutzer

DURCHBRUCH-TECHNOLOGIE:
Unser System verbundener Nutzer bedeutet, dass Ihr Inhalt ihre Social Media Zielgruppen erreicht - auch wenn Sie nicht mit ihnen auf diesen Plattformen befreundet sind!

Geschäftsvorteile:
🔥 Virales Potenzial: Ein Post kann Tausende erreichen
⚡ Null Zusatzarbeit: Einmal posten, überall teilen
🎯 Barrieren Durchbrechen: Neue Zielgruppen erreichen
🚀 Professionelle Integration: Sicheres OAuth-System

Jetzt beitreten: https://gohealme.org

Verpassen Sie diese Marketing-Revolution nicht!

OPC (Ordinary People Community) - Wo Marketing auf Innovation Trifft
    `
  },

  // Spanish (Spain)
  es: {
    subject: "🚀 Herramienta de Marketing Revolucionaria - Amplifica el Alcance de Tu Negocio",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1>🚀 ¡REVOLUCIÓN DEL MARKETING!</h1>
          <h2>El Sistema Multi-Compartir de OPC Lo Cambia Todo</h2>
          <p style="font-size: 18px;">La Herramienta de Marketing en Redes Sociales Más Poderosa Jamás Creada</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #ef4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; font-size: 18px; font-weight: bold;">
            💥 ¡WOW! ¡MIRA LO QUE PODEMOS HACER! 💥<br>
            UNA PUBLICACIÓN = ALCANCE ILIMITADO EN REDES SOCIALES
          </div>
          
          <h3>Estimado Propietario de Negocio,</h3>
          
          <p>Imagina publicar contenido UNA VEZ y que aparezca automáticamente en:</p>
          <ul>
            <li><strong>✅ Facebook (incluso sin ser amigos)</strong></li>
            <li><strong>✅ Twitter</strong></li>
            <li><strong>✅ Instagram</strong></li>
            <li><strong>✅ LinkedIn</strong></li>
            <li><strong>✅ YouTube</strong></li>
            <li><strong>✅ Feeds de usuarios conectados automáticamente</strong></li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3>🎯 TECNOLOGÍA REVOLUCIONARIA</h3>
            <p><strong>¡Nuestro sistema de usuarios conectados significa que tu contenido llega a sus audiencias en redes sociales - incluso si no eres amigo de ellos en esas plataformas!</strong></p>
          </div>
          
          <h3>Beneficios para Negocios:</h3>
          <ul>
            <li>🔥 <strong>Potencial Viral:</strong> Una publicación puede llegar a miles a través de amplificación comunitaria</li>
            <li>⚡ <strong>Cero Trabajo Extra:</strong> Publica una vez, comparte en todas partes automáticamente</li>
            <li>🎯 <strong>Rompe Barreras:</strong> Accede a audiencias que nunca has alcanzado antes</li>
            <li>🚀 <strong>Integración Profesional:</strong> Impulsado por OAuth, seguro y confiable</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gohealme.org" style="background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px;">🚀 ¡ÚNETE AHORA Y COMIENZA A AMPLIFICAR!</a>
          </div>
          
          <p><strong>¡No te pierdas esta revolución del marketing!</strong> Únete a miles de usuarios que ya están aprovechando el sistema multi-compartir de OPC para hacer explotar su alcance en redes sociales.</p>
          
          <p style="text-align: center; font-style: italic; color: #666;">
            OPC (Ordinary People Community) - Donde el Marketing se Encuentra con la Innovación
          </p>
        </div>
      </div>
    `,
    textContent: `
🚀 ¡REVOLUCIÓN DEL MARKETING!

Estimado Propietario de Negocio,

¡Descubre la herramienta de marketing en redes sociales más poderosa jamás creada!

UNA PUBLICACIÓN = ALCANCE ILIMITADO
Publica UNA VEZ desde OPC y comparte automáticamente en:
✅ Facebook (incluso sin ser amigos)
✅ Twitter 
✅ Instagram
✅ LinkedIn
✅ YouTube
✅ Feeds de redes sociales de usuarios conectados

TECNOLOGÍA REVOLUCIONARIA:
¡Nuestro sistema de usuarios conectados significa que tu contenido llega a sus audiencias en redes sociales - incluso si no eres amigo de ellos en esas plataformas!

Beneficios para Negocios:
🔥 Potencial Viral: Una publicación puede llegar a miles
⚡ Cero Trabajo Extra: Publica una vez, comparte en todas partes
🎯 Rompe Barreras: Accede a nuevas audiencias
🚀 Integración Profesional: Sistema OAuth seguro

Únete ahora: https://gohealme.org

¡No te pierdas esta revolución del marketing!

OPC (Ordinary People Community) - Donde el Marketing se Encuentra con la Innovación
    `
  },

  // Italian (Italy)
  it: {
    subject: "🚀 Strumento di Marketing Rivoluzionario - Amplifica la Portata della Tua Azienda",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1>🚀 RIVOLUZIONE DEL MARKETING!</h1>
          <h2>Il Sistema Multi-Condivisione di OPC Cambia Tutto</h2>
          <p style="font-size: 18px;">Lo Strumento di Marketing Social Media Più Potente Mai Creato</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #ef4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; font-size: 18px; font-weight: bold;">
            💥 WOW! GUARDA COSA POSSIAMO FARE! 💥<br>
            UN POST = PORTATA ILLIMITATA SUI SOCIAL MEDIA
          </div>
          
          <h3>Caro Proprietario di Azienda,</h3>
          
          <p>Immagina di pubblicare contenuti UNA VOLTA e vederli apparire automaticamente su:</p>
          <ul>
            <li><strong>✅ Facebook (anche senza essere amici)</strong></li>
            <li><strong>✅ Twitter</strong></li>
            <li><strong>✅ Instagram</strong></li>
            <li><strong>✅ LinkedIn</strong></li>
            <li><strong>✅ YouTube</strong></li>
            <li><strong>✅ Feed degli utenti connessi automaticamente</strong></li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3>🎯 TECNOLOGIA RIVOLUZIONARIA</h3>
            <p><strong>Il nostro sistema di utenti connessi significa che i tuoi contenuti raggiungono le loro audience sui social media - anche se non siete amici su quelle piattaforme!</strong></p>
          </div>
          
          <h3>Vantaggi per le Aziende:</h3>
          <ul>
            <li>🔥 <strong>Potenziale Virale:</strong> Un post può raggiungere migliaia attraverso l'amplificazione della community</li>
            <li>⚡ <strong>Zero Lavoro Extra:</strong> Posta una volta, condividi ovunque automaticamente</li>
            <li>🎯 <strong>Rompi le Barriere:</strong> Accedi a audience che non hai mai raggiunto prima</li>
            <li>🚀 <strong>Integrazione Professionale:</strong> Alimentato da OAuth, sicuro e affidabile</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gohealme.org" style="background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; margin: 10px;">🚀 UNISCITI ORA E INIZIA AD AMPLIFICARE!</a>
          </div>
          
          <p><strong>Non perdere questa rivoluzione del marketing!</strong> Unisciti a migliaia di utenti che stanno già sfruttando il sistema multi-condivisione di OPC per far esplodere la loro portata sui social media.</p>
          
          <p style="text-align: center; font-style: italic; color: #666;">
            OPC (Ordinary People Community) - Dove il Marketing Incontra l'Innovazione
          </p>
        </div>
      </div>
    `,
    textContent: `
🚀 RIVOLUZIONE DEL MARKETING!

Caro Proprietario di Azienda,

Scopri lo strumento di marketing social media più potente mai creato!

UN POST = PORTATA ILLIMITATA
Posta UNA VOLTA da OPC e condividi automaticamente su:
✅ Facebook (anche senza essere amici)
✅ Twitter 
✅ Instagram
✅ LinkedIn
✅ YouTube
✅ Feed dei social media degli utenti connessi

TECNOLOGIA RIVOLUZIONARIA:
Il nostro sistema di utenti connessi significa che i tuoi contenuti raggiungono le loro audience sui social media - anche se non siete amici su quelle piattaforme!

Vantaggi per le Aziende:
🔥 Potenziale Virale: Un post può raggiungere migliaia
⚡ Zero Lavoro Extra: Posta una volta, condividi ovunque
🎯 Rompi le Barriere: Accedi a nuove audience
🚀 Integrazione Professionale: Sistema OAuth sicuro

Unisciti ora: https://gohealme.org

Non perdere questa rivoluzione del marketing!

OPC (Ordinary People Community) - Dove il Marketing Incontra l'Innovazione
    `
  }
};

// Country to language mapping
export const countryLanguageMap: Record<string, string> = {
  // English-speaking countries
  'United Kingdom': 'en',
  'United States': 'en',
  'Canada': 'en',
  'Australia': 'en',
  'New Zealand': 'en',
  'Ireland': 'en',
  'South Africa': 'en',
  
  // French-speaking countries
  'France': 'fr',
  'Belgium': 'fr',
  'Switzerland': 'fr',
  'Monaco': 'fr',
  
  // German-speaking countries
  'Germany': 'de',
  'Austria': 'de',
  
  // Spanish-speaking countries
  'Spain': 'es',
  'Mexico': 'es',
  'Argentina': 'es',
  'Colombia': 'es',
  'Peru': 'es',
  'Venezuela': 'es',
  'Chile': 'es',
  'Ecuador': 'es',
  'Guatemala': 'es',
  'Cuba': 'es',
  'Bolivia': 'es',
  'Dominican Republic': 'es',
  'Honduras': 'es',
  'Paraguay': 'es',
  'Nicaragua': 'es',
  'El Salvador': 'es',
  'Costa Rica': 'es',
  'Panama': 'es',
  'Uruguay': 'es',
  
  // Italian-speaking countries
  'Italy': 'it',
  'San Marino': 'it',
  'Vatican City': 'it'
};

export function getLocalizedTemplate(country: string): LocalizedEmailTemplate {
  const languageCode = countryLanguageMap[country] || 'en';
  return businessOutreachTemplates[languageCode] || businessOutreachTemplates.en;
}

export function getSupportedLanguages(): string[] {
  return Object.keys(businessOutreachTemplates);
}

export function getSupportedCountries(): string[] {
  return Object.keys(countryLanguageMap);
}