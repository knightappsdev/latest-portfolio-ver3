// Server-side email service for production use
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

// Send contact form email via server
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: any }> => {
  try {
    const response = await fetch('/contact-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
};

// Send newsletter subscription via server
export const sendNewsletterEmail = async (data: NewsletterData): Promise<{ success: boolean; error?: any }> => {
  try {
    const response = await fetch('/newsletter-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Failed to subscribe');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error };
  }
};

// Fallback to EmailJS if server-side fails
export const sendEmailWithFallback = async (formData: ContactFormData): Promise<{ success: boolean; error?: any }> => {
  // Try server-side first
  const serverResult = await sendContactEmail(formData);
  
  if (serverResult.success) {
    return serverResult;
  }

  // Fallback to EmailJS
  try {
    const { sendContactEmail: emailJSContact } = await import('./emailService');
    return await emailJSContact(formData);
  } catch (error) {
    console.error('Both server-side and EmailJS failed:', error);
    return { success: false, error };
  }
};
