import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sendly OTP Verification',
  description: 'Example app demonstrating OTP verification with Sendly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .container {
              background: white;
              border-radius: 12px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
              padding: 40px;
              max-width: 400px;
              width: 100%;
            }
            h1 {
              color: #333;
              margin-bottom: 10px;
              font-size: 28px;
            }
            p {
              color: #666;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            label {
              display: block;
              color: #333;
              font-weight: 500;
              margin-bottom: 8px;
            }
            input {
              width: 100%;
              padding: 12px;
              border: 2px solid #e0e0e0;
              border-radius: 8px;
              font-size: 16px;
              transition: border-color 0.3s;
            }
            input:focus {
              outline: none;
              border-color: #667eea;
            }
            button {
              width: 100%;
              padding: 14px;
              background: #667eea;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.3s;
              margin-top: 20px;
            }
            button:hover {
              background: #5568d3;
            }
            button:disabled {
              background: #ccc;
              cursor: not-allowed;
            }
            .error {
              background: #fee;
              color: #c33;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 20px;
              border: 1px solid #fcc;
            }
            .success {
              background: #efe;
              color: #3c3;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 20px;
              border: 1px solid #cfc;
            }
            .link {
              color: #667eea;
              text-decoration: none;
              font-weight: 500;
            }
            .link:hover {
              text-decoration: underline;
            }
            .text-center {
              text-align: center;
            }
            .mt-20 {
              margin-top: 20px;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
