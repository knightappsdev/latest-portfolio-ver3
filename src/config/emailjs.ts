// EmailJS Configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'pBhzX7eS3wvw0wIDk',
  PRIVATE_KEY: 'yKi1LxWA0oTzBMW1D2Ix5',
  SERVICE_ID: 'service_portfolio', // You'll need to create this service in EmailJS
  TEMPLATES: {
    CONTACT: 'template_contact', // You'll need to create this template
    NEWSLETTER: 'template_newsletter', // You'll need to create this template
    LEAD_CAPTURE: 'template_lead', // You'll need to create this template
    VISITOR_TRACKING: 'template_visitor' // You'll need to create this template
  },
  RECIPIENT_EMAIL: 'connect@ofemo.uk'
};

// Template variables mapping for different email types
export const EMAIL_TEMPLATES = {
  CONTACT: {
    to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
    from_name: '{{from_name}}',
    from_email: '{{from_email}}',
    subject: '{{subject}}',
    message: '{{message}}',
    reply_to: '{{from_email}}'
  },
  NEWSLETTER: {
    to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
    subscriber_email: '{{subscriber_email}}',
    source: '{{source}}',
    timestamp: '{{timestamp}}'
  },
  LEAD_CAPTURE: {
    to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
    lead_email: '{{lead_email}}',
    page: '{{page}}',
    referrer: '{{referrer}}',
    timestamp: '{{timestamp}}'
  },
  VISITOR_TRACKING: {
    to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
    visitor_info: '{{visitor_info}}',
    page: '{{page}}',
    timestamp: '{{timestamp}}'
  }
};
