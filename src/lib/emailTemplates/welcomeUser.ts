// lib/mail/welcomeEventAppTemplate.ts

export const welcomeEventAppTemplate = (name: string): string => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Welcome to EventHub</title>
      <style>
        body {
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          text-align: center;
        }

        .logo {
          max-width: 180px;
          margin-bottom: 20px;
        }

        .message {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }

        .cta {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4CAF50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }

        .support {
          font-size: 14px;
          color: #777777;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo"
          src="https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png"
          alt="EventHub Logo" />
        <div class="message">Welcome to EventHub!</div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>
            Thank you for signing up with EventHub. Your account has been successfully created,
            and you’re now part of our growing community of event organisers and participants.
          </p>
          <p>
            You can now explore upcoming events, create your own, and connect with others.
          </p>
          <a href="https://your-event-app-domain.com/signin" class="cta">
            Get Started
          </a>
        </div>
        <div class="support">
          Need help? Reach out to us at
          <a href="mailto:support@eventhub.com">support@eventhub.com</a>.
        </div>
      </div>
    </body>
  </html>`;
};
