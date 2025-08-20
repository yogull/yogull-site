interface ModerationResult {
  allowed: boolean;
  reason?: string;
  severity: 'low' | 'medium' | 'high' | 'severe';
  blockedWords?: string[];
  suggestions?: string;
}

class ContentModerationService {
  // Severe violations - immediate block (user specified guidelines)
  private severeViolations = [
    // Racial slurs and ethnic hate speech (user specified)
    'nigger', 'nigga', 'blacky', 'black bastard', 'chink', 'spic', 'wetback', 
    'kike', 'gook', 'raghead', 'paki', 'towel head', 'coon', 'jigaboo',
    
    // Death and injury threats (user specified)
    'kill yourself', 'kys', 'go die', 'should die', 'deserve to die',
    'break your neck', 'slit your throat', 'beat you to death',
    'hope you get hurt', 'wish you were dead', 'end your life',
    
    // Homophobic and transphobic slurs
    'faggot', 'fag', 'dyke', 'tranny', 'shemale',
    
    // Extreme violent threats
    'murder', 'lynch', 'hang you', 'shoot you', 'stab you', 'rape',
    'bomb', 'terrorist', 'genocide', 'massacre'
  ];

  // High severity - likely block with review
  private highSeverity = [
    // Bodily harm statements (user specified)
    'break your bones', 'smash your face', 'cut you up', 'hurt you bad',
    'beat you up', 'punch your lights out', 'kick your ass', // depending on context
    
    // Extremist terminology
    'white power', 'white supremacy', 'nazi', 'hitler', 'heil', 'aryan',
    'jihad' // when used threateningly
  ];

  // Medium severity - warning or context review
  private mediumSeverity = [
    // Discriminatory but not slurs
    'retard', 'retarded', 'mongoloid', 'spastic', 'psycho when attacking person',
    'lame when attacking person', 'blind when attacking person'
  ];

  // Acceptable profanity (user specified as OK)
  private acceptableProfanity = [
    'fuck', 'fucking', 'shit', 'bastard', 'bollocks', 'damn', 'hell', 
    'crap', 'bloody', 'arse', 'ass', 'piss', 'motherfucker', 'bullshit',
    'bitch when not attacking person', 'cunt when not attacking person'
  ];

  // Context-aware patterns
  private contextPatterns = [
    {
      words: ['bitch', 'bitches'],
      allowedContexts: ['that song is a bitch to play', 'life is a bitch', 'son of a bitch'],
      blockedContexts: ['you are a bitch', 'stupid bitch', 'dumb bitch']
    },
    {
      words: ['gay'],
      allowedContexts: ['gay rights', 'gay marriage', 'gay community', 'LGBTQ'],
      blockedContexts: ['that is so gay', 'gay as an insult']
    }
  ];

  moderateContent(content: string, context: 'post' | 'comment' | 'message' = 'post'): ModerationResult {
    const normalizedContent = content.toLowerCase().trim();
    
    // Check for severe violations first
    const severeMatches = this.findMatches(normalizedContent, this.severeViolations);
    if (severeMatches.length > 0) {
      return {
        allowed: false,
        reason: 'Content contains hate speech or severely offensive language that violates our community standards.',
        severity: 'severe',
        blockedWords: severeMatches,
        suggestions: 'Please review our Terms and Conditions for acceptable language guidelines.'
      };
    }

    // Check for high severity violations
    const highMatches = this.findMatches(normalizedContent, this.highSeverity);
    if (highMatches.length > 0) {
      return {
        allowed: false,
        reason: 'Content contains threatening or violent language that is not permitted.',
        severity: 'high',
        blockedWords: highMatches,
        suggestions: 'Consider rephrasing your message without violent or threatening language.'
      };
    }

    // Check for medium severity with context
    const mediumMatches = this.findMatches(normalizedContent, this.mediumSeverity);
    if (mediumMatches.length > 0) {
      const hasEducationalContext = this.hasEducationalContext(normalizedContent);
      if (!hasEducationalContext) {
        return {
          allowed: false,
          reason: 'Content contains language that may be offensive to some community members.',
          severity: 'medium',
          blockedWords: mediumMatches,
          suggestions: 'Try using more inclusive language. Consider how your words might affect others in our community.'
        };
      }
    }

    // Check context-dependent words
    const contextViolation = this.checkContextualUsage(normalizedContent);
    if (contextViolation) {
      return {
        allowed: false,
        reason: contextViolation.reason,
        severity: 'medium',
        blockedWords: contextViolation.words,
        suggestions: contextViolation.suggestion
      };
    }

    // Content is acceptable
    return {
      allowed: true,
      severity: 'low'
    };
  }

  private findMatches(content: string, wordList: string[]): string[] {
    const matches: string[] = [];
    
    for (const word of wordList) {
      // Handle wildcards in word list
      const pattern = word.replace(/\*/g, '[a-z]');
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      
      if (regex.test(content)) {
        matches.push(word);
      }
    }
    
    return matches;
  }

  private hasEducationalContext(content: string): boolean {
    const educationalIndicators = [
      'medical', 'academic', 'research', 'study', 'definition', 'historically',
      'quote', 'quoted', 'citing', 'reference', 'according to', 'as defined',
      'medical term', 'clinical', 'psychological', 'sociological'
    ];
    
    return educationalIndicators.some(indicator => 
      content.includes(indicator.toLowerCase())
    );
  }

  private checkContextualUsage(content: string): { reason: string; words: string[]; suggestion: string } | null {
    for (const pattern of this.contextPatterns) {
      for (const word of pattern.words) {
        if (content.includes(word.toLowerCase())) {
          // Check if it's in an allowed context
          const isAllowed = pattern.allowedContexts.some(context => 
            content.includes(context.toLowerCase())
          );
          
          // Check if it's in a blocked context
          const isBlocked = pattern.blockedContexts.some(context => 
            content.includes(context.toLowerCase())
          );
          
          if (isBlocked && !isAllowed) {
            return {
              reason: `The word "${word}" is being used in an inappropriate context that may be offensive.`,
              words: [word],
              suggestion: `Consider using the word "${word}" in a more respectful context, such as discussing equality or community support.`
            };
          }
        }
      }
    }
    
    return null;
  }

  // Method to check if user needs education vs punishment
  getUserAction(severity: 'low' | 'medium' | 'high' | 'severe', isRepeatOffender: boolean = false): {
    action: 'allow' | 'warn' | 'block' | 'review' | 'suspend';
    message: string;
    duration?: number; // in hours
  } {
    if (severity === 'severe') {
      return {
        action: isRepeatOffender ? 'suspend' : 'review',
        message: isRepeatOffender 
          ? 'Account suspended for repeated severe violations of community standards.'
          : 'Content blocked for manual review due to severe policy violation.',
        duration: isRepeatOffender ? 168 : undefined // 7 days
      };
    }
    
    if (severity === 'high') {
      return {
        action: isRepeatOffender ? 'suspend' : 'block',
        message: isRepeatOffender
          ? 'Account temporarily suspended for repeated violations.'
          : 'Content blocked. Please review our community guidelines.',
        duration: isRepeatOffender ? 24 : undefined
      };
    }
    
    if (severity === 'medium') {
      return {
        action: isRepeatOffender ? 'block' : 'warn',
        message: isRepeatOffender
          ? 'Content blocked due to previous warnings about similar language.'
          : 'Please consider using more inclusive language in our community.',
        duration: undefined
      };
    }
    
    return {
      action: 'allow',
      message: 'Content approved.'
    };
  }

  // Get educational content for different violation types
  getEducationalContent(severity: 'medium' | 'high' | 'severe'): {
    title: string;
    content: string;
    links: string[];
  } {
    switch (severity) {
      case 'severe':
        return {
          title: 'Understanding Hate Speech and Its Impact',
          content: 'Hate speech targets individuals or groups based on protected characteristics like race, religion, gender, or sexual orientation. It causes real harm to communities and individuals.',
          links: [
            '/terms-and-conditions#hate-speech',
            '/community-guidelines#inclusive-language',
            '/support/reporting-violations'
          ]
        };
      
      case 'high':
        return {
          title: 'Creating a Safe Community Environment',
          content: 'Threats and violent language create an unsafe environment for all community members. Even jokes about violence can be harmful to those who have experienced trauma.',
          links: [
            '/terms-and-conditions#violence-policy',
            '/community-guidelines#respectful-discourse',
            '/support/mental-health-resources'
          ]
        };
      
      case 'medium':
        return {
          title: 'Using Inclusive Language',
          content: 'Language evolves, and words that were once common can now be hurtful to community members. We encourage language that welcomes everyone.',
          links: [
            '/community-guidelines#language-guidelines',
            '/resources/inclusive-language-guide',
            '/support/community-standards'
          ]
        };
      
      default:
        return {
          title: 'Community Guidelines',
          content: 'Please review our community standards for creating a welcoming environment.',
          links: ['/terms-and-conditions']
        };
    }
  }
}

export const contentModeration = new ContentModerationService();
export { ModerationResult };