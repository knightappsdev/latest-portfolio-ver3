import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../config/emailjs';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  source: string;
  timestamp: string;
}

export interface LeadCaptureData {
  email: string;
  page: string;
  referrer: string;
  timestamp: string;
}

export interface VisitorTrackingData {
  timestamp: string;
  page: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  timeZone: string;
  language: string;
}

// Send contact form email
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: any }> => {
  try {
    const templateParams = {
      to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.CONTACT,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Contact email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
};

// Send newsletter subscription email
export const sendNewsletterEmail = async (data: NewsletterData): Promise<{ success: boolean; error?: any }> => {
  try {
    const templateParams = {
      to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
      subscriber_email: data.email,
      source: data.source,
      timestamp: data.timestamp,
      subject: 'New Newsletter Subscription'
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.NEWSLETTER,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Newsletter email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return { success: false, error };
  }
};

// Send lead capture notification
export const sendLeadCaptureEmail = async (data: LeadCaptureData): Promise<{ success: boolean; error?: any }> => {
  try {
    const templateParams = {
      to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
      lead_email: data.email,
      page: data.page,
      referrer: data.referrer,
      timestamp: data.timestamp,
      subject: 'New Lead Captured from Portfolio'
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.LEAD_CAPTURE,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Lead capture email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending lead capture email:', error);
    return { success: false, error };
  }
};

// Send visitor tracking notification
export const sendVisitorTrackingEmail = async (data: VisitorTrackingData): Promise<{ success: boolean; error?: any }> => {
  try {
    const visitorInfo = `
      Page: ${data.page}
      Referrer: ${data.referrer}
      User Agent: ${data.userAgent}
      Screen Resolution: ${data.screenResolution}
      Time Zone: ${data.timeZone}
      Language: ${data.language}
    `;

    const templateParams = {
      to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
      visitor_info: visitorInfo,
      page: data.page,
      timestamp: data.timestamp,
      subject: 'New Visitor on Portfolio'
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.VISITOR_TRACKING,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Visitor tracking email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending visitor tracking email:', error);
    return { success: false, error };
  }
};
