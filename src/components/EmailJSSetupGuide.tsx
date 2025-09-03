import React, { useState } from 'react';

const EmailJSSetupGuide: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);

  if (!showGuide) {
    return (
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={() => setShowGuide(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center"
        >
          <i className="bi bi-info-circle mr-2"></i>
          EmailJS Setup
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">EmailJS Setup Guide</h2>
          <button
            onClick={() => setShowGuide(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-lime-400 mb-3">Step 1: Create EmailJS Service</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Go to <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">emailjs.com</a></li>
              <li>Create an account or log in</li>
              <li>Go to "Email Services" and click "Add New Service"</li>
              <li>Choose your email provider (Gmail, Outlook, etc.)</li>
              <li>Set the Service ID to: <code className="bg-dark-700 px-2 py-1 rounded text-lime-400">service_portfolio</code></li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-lime-400 mb-3">Step 2: Create Email Templates</h3>
            <p className="mb-3">Create these 4 templates in your EmailJS dashboard:</p>
            
            <div className="space-y-4">
              <div className="bg-dark-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">1. Contact Form Template</h4>
                <p className="text-sm mb-2">Template ID: <code className="text-lime-400">template_contact</code></p>
                <div className="text-sm">
                  <p><strong>Subject:</strong> New Contact Form Message: {`{{subject}}`}</p>
                  <p><strong>Body:</strong></p>
                  <pre className="text-xs mt-2 bg-dark-900 p-2 rounded overflow-x-auto">
{`New message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Reply to: {{reply_to}}`}
                  </pre>
                </div>
              </div>

              <div className="bg-dark-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">2. Newsletter Template</h4>
                <p className="text-sm mb-2">Template ID: <code className="text-lime-400">template_newsletter</code></p>
                <div className="text-sm">
                  <p><strong>Subject:</strong> New Newsletter Subscription</p>
                  <p><strong>Body:</strong></p>
                  <pre className="text-xs mt-2 bg-dark-900 p-2 rounded overflow-x-auto">
{`New newsletter subscription:

Email: {{subscriber_email}}
Source: {{source}}
Timestamp: {{timestamp}}`}
                  </pre>
                </div>
              </div>

              <div className="bg-dark-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">3. Lead Capture Template</h4>
                <p className="text-sm mb-2">Template ID: <code className="text-lime-400">template_lead</code></p>
                <div className="text-sm">
                  <p><strong>Subject:</strong> New Lead Captured from Portfolio</p>
                  <p><strong>Body:</strong></p>
                  <pre className="text-xs mt-2 bg-dark-900 p-2 rounded overflow-x-auto">
{`New lead captured:

Email: {{lead_email}}
Page: {{page}}
Referrer: {{referrer}}
Timestamp: {{timestamp}}`}
                  </pre>
                </div>
              </div>

              <div className="bg-dark-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">4. Visitor Tracking Template</h4>
                <p className="text-sm mb-2">Template ID: <code className="text-lime-400">template_visitor</code></p>
                <div className="text-sm">
                  <p><strong>Subject:</strong> New Visitor on Portfolio</p>
                  <p><strong>Body:</strong></p>
                  <pre className="text-xs mt-2 bg-dark-900 p-2 rounded overflow-x-auto">
{`New visitor tracked:

{{visitor_info}}

Timestamp: {{timestamp}}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-lime-400 mb-3">Step 3: Configure Settings</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Set "To Email" in all templates to: <code className="bg-dark-700 px-2 py-1 rounded text-lime-400">connect@ofemo.uk</code></li>
              <li>Test each template to ensure they work correctly</li>
              <li>Make sure your service is active and not in sandbox mode</li>
            </ul>
          </div>

          <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-lime-400 mb-2">✅ Current Configuration</h3>
            <div className="text-sm space-y-1">
              <p><strong>Public Key:</strong> <code className="text-lime-400">pBhzX7eS3wvw0wIDk</code></p>
              <p><strong>Service ID:</strong> <code className="text-lime-400">service_portfolio</code></p>
              <p><strong>Recipient:</strong> <code className="text-lime-400">connect@ofemo.uk</code></p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">⚠️ Important Notes</h3>
            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
              <li>EmailJS has a free tier limit of 200 emails/month</li>
              <li>Test all forms after setup to ensure delivery</li>
              <li>Check your spam folder for test emails</li>
              <li>Consider upgrading to a paid plan for production use</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setShowGuide(false)}
            className="px-6 py-3 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailJSSetupGuide;
