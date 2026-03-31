'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <section className="hero-section" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="container">
          <Navbar />
        </div>
      </section>

      <div className="legal-content">
        <div className="legal-container">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: November 10, 2025</p>

          <div className="legal-body">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <div className="alert-box">
                <p>
                  Welcome to Startup India Incubation ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Register for an account</li>
                <li>Apply for incubation programs</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and contact information (email, phone number)</li>
                <li>Business information (company name, industry, stage)</li>
                <li>Educational background</li>
                <li>Professional experience</li>
                <li>Payment information</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information about your device, including:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages viewed</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect or receive to:</p>
              <ul>
                <li>Process your applications and registrations</li>
                <li>Provide and maintain our services</li>
                <li>Send you administrative information</li>
                <li>Send you marketing and promotional communications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Information Sharing and Disclosure</h2>
              <p>We may share your information in the following situations:</p>
              <ul>
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf</li>
                <li><strong>For Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition</li>
                <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent</li>
                <li><strong>Legal Obligations:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Your Privacy Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. For more information, please see our <Link href="/cookies" className="legal-link">Cookie Policy</Link>.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <div className="alert-box">
                <ul>
                  <li><strong>Email:</strong> startupsindiaofficial@gmail.com</li>
                  <li><strong>Phone:</strong> +91 9599033080</li>
                  <li><strong>Address:</strong> 3rd Floor, United Arcade, Pillar No. 143, Shop.No.8, Attapur, Hyderabad, Telangana 500048</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .legal-page {
          background: #ffffff;
        }

        .legal-content {
          padding: 4rem 2rem;
          background: #fafafa;
        }

        .legal-container {
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .legal-title {
          font-size: 3rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .legal-updated {
          font-size: 0.9375rem;
          color: #666666;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e5e5e5;
        }

        .legal-body {
          color: #333333;
        }

        .legal-section {
          margin-bottom: 3rem;
        }

        .legal-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }

        .legal-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }

        .legal-section p {
          font-size: 1rem;
          line-height: 1.8;
          color: #333333;
          margin-bottom: 1rem;
        }

        .legal-section ul,
        .legal-section ol {
          margin: 1rem 0 1rem 1.5rem;
        }

        .legal-section li {
          font-size: 1rem;
          line-height: 1.8;
          color: #333333;
          margin-bottom: 0.5rem;
        }

        .legal-section ol li {
          margin-bottom: 0.75rem;
        }

        .legal-section strong {
          color: #1a1a1a;
          font-weight: 600;
        }

        .legal-link {
          color: #e63946;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .legal-link:hover {
          color: #ff6b9d;
        }

        .note {
          background: #fff3cd;
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
          font-style: italic;
        }

        .alert-box {
          background: #f0f9ff;
          border-left: 4px solid #3b82f6;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
        }

        .warning-box {
          background: #fff7ed;
          border-left: 4px solid #f59e0b;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
        }

        @media (max-width: 768px) {
          .legal-content {
            padding: 2rem 1rem;
          }

          .legal-container {
            padding: 2rem 1.5rem;
          }

          .legal-title {
            font-size: 2rem;
          }

          .legal-section h2 {
            font-size: 1.5rem;
          }

          .legal-section h3 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}
