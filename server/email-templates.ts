// Multilingual email templates for verification and welcome emails

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const verificationEmailTemplates: Record<string, EmailTemplate> = {
  en: {
    subject: '🔐 Verify Your Email - The People\'s Health Community',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Verify Your Email 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            The People's Health Community
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Welcome to The People's Health Community!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Please verify your email address to complete your account setup and join our health-focused community.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Verify My Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Security Note:</strong> This link will expire in 24 hours for your protection.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            The People's Health Community Team<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
Verify Your Email - The People's Health Community

Welcome to The People's Health Community!

Please verify your email address to complete your account setup and join our health-focused community.

Verify your email by clicking this link: {{verificationLink}}

This link will expire in 24 hours for your protection.

The People's Health Community Team
gohealme.org@gmail.com
    `
  },

  fr: {
    subject: '🔐 Vérifiez Votre Email - La Communauté Santé du Peuple',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Vérifiez Votre Email 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            La Communauté Santé du Peuple
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Bienvenue dans La Communauté Santé du Peuple!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Veuillez vérifier votre adresse email pour compléter la configuration de votre compte et rejoindre notre communauté axée sur la santé.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Vérifier Mon Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Note de Sécurité:</strong> Ce lien expirera dans 24 heures pour votre protection.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Équipe La Communauté Santé du Peuple<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
Vérifiez Votre Email - La Communauté Santé du Peuple

Bienvenue dans La Communauté Santé du Peuple!

Veuillez vérifier votre adresse email pour compléter la configuration de votre compte et rejoindre notre communauté axée sur la santé.

Vérifiez votre email en cliquant sur ce lien: {{verificationLink}}

Ce lien expirera dans 24 heures pour votre protection.

Équipe La Communauté Santé du Peuple
gohealme.org@gmail.com
    `
  },

  de: {
    subject: '🔐 E-Mail Bestätigen - Die Gesundheitsgemeinschaft des Volkes',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            E-Mail Bestätigen 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            Die Gesundheitsgemeinschaft des Volkes
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Willkommen bei Der Gesundheitsgemeinschaft des Volkes!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihre Kontoeinrichtung abzuschließen und unserer gesundheitsorientierten Gemeinschaft beizutreten.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Meine E-Mail Bestätigen
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Sicherheitshinweis:</strong> Dieser Link läuft in 24 Stunden ab, um Sie zu schützen.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Team der Gesundheitsgemeinschaft des Volkes<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
E-Mail Bestätigen - Die Gesundheitsgemeinschaft des Volkes

Willkommen bei Der Gesundheitsgemeinschaft des Volkes!

Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihre Kontoeinrichtung abzuschließen und unserer gesundheitsorientierten Gemeinschaft beizutreten.

Bestätigen Sie Ihre E-Mail durch Klicken auf diesen Link: {{verificationLink}}

Dieser Link läuft in 24 Stunden ab, um Sie zu schützen.

Team der Gesundheitsgemeinschaft des Volkes
gohealme.org@gmail.com
    `
  },

  es: {
    subject: '🔐 Verifica Tu Email - La Comunidad de Salud del Pueblo',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Verifica Tu Email 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            La Comunidad de Salud del Pueblo
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            ¡Bienvenido a La Comunidad de Salud del Pueblo!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Por favor verifica tu dirección de email para completar la configuración de tu cuenta y unirte a nuestra comunidad enfocada en la salud.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Verificar Mi Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Nota de Seguridad:</strong> Este enlace expirará en 24 horas para tu protección.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Equipo La Comunidad de Salud del Pueblo<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
Verifica Tu Email - La Comunidad de Salud del Pueblo

¡Bienvenido a La Comunidad de Salud del Pueblo!

Por favor verifica tu dirección de email para completar la configuración de tu cuenta y unirte a nuestra comunidad enfocada en la salud.

Verifica tu email haciendo clic en este enlace: {{verificationLink}}

Este enlace expirará en 24 horas para tu protección.

Equipo La Comunidad de Salud del Pueblo
gohealme.org@gmail.com
    `
  },

  it: {
    subject: '🔐 Verifica La Tua Email - La Comunità della Salute del Popolo',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Verifica La Tua Email 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            La Comunità della Salute del Popolo
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Benvenuto nella Comunità della Salute del Popolo!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Per favore verifica il tuo indirizzo email per completare la configurazione del tuo account e unirti alla nostra comunità focalizzata sulla salute.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Verifica La Mia Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            Se il pulsante non funziona, copia e incolla questo link nel tuo browser:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Nota di Sicurezza:</strong> Questo link scadrà tra 24 ore per la tua protezione.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Team La Comunità della Salute del Popolo<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
Verifica La Tua Email - La Comunità della Salute del Popolo

Benvenuto nella Comunità della Salute del Popolo!

Per favore verifica il tuo indirizzo email per completare la configurazione del tuo account e unirti alla nostra comunità focalizzata sulla salute.

Verifica la tua email cliccando su questo link: {{verificationLink}}

Questo link scadrà tra 24 ore per la tua protezione.

Team La Comunità della Salute del Popolo
gohealme.org@gmail.com
    `
  },

  nl: {
    subject: '🔐 Verifieer Je Email - De Volksgezondheids Gemeenschap',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            Verifieer Je Email 🔐
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
            De Volksgezondheids Gemeenschap
          </p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Welkom bij De Volksgezondheids Gemeenschap!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Verifieer je emailadres om je account in te stellen en deel te nemen aan onze gezondheidsgemeenschap.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Verifieer Mijn Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
            Als de knop niet werkt, kopieer en plak deze link in je browser:<br>
            <a href="{{verificationLink}}" style="color: #8b5cf6; word-break: break-all;">{{verificationLink}}</a>
          </p>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Beveiligingsnotitie:</strong> Deze link verloopt binnen 24 uur voor je bescherming.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Team De Volksgezondheids Gemeenschap<br>
            gohealme.org@gmail.com
          </p>
        </div>
      </div>
    `,
    text: `
Verifieer Je Email - De Volksgezondheids Gemeenschap

Welkom bij De Volksgezondheids Gemeenschap!

Verifieer je emailadres om je account in te stellen en deel te nemen aan onze gezondheidsgemeenschap.

Verifieer je email door op deze link te klikken: {{verificationLink}}

Deze link verloopt binnen 24 uur voor je bescherming.

Team De Volksgezondheids Gemeenschap
gohealme.org@gmail.com
    `
  }
};