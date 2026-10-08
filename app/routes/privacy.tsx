import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — Block Builder" },
  { name: "description", content: "Privacy policy for the Block Builder app." },
];

export default function Privacy() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Privacy</div>
            <h1>Privacy Policy.</h1>
            <p>Last Updated: October 8, 2026</p>
          </div>
        </section>

        <section className="section" style={{ paddingBottom: "8rem" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <h2 style={{ marginTop: "0", fontSize: "24px" }}>Our Commitment</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              Block Builder ("the App", "we", "us") provides theme customization tools for Shopify merchants. We are committed to protecting the privacy of our merchants and their customers. This policy describes how we collect, use, and share personal information when you install or use the App.
            </p>

            <h2 style={{ marginTop: "40px", fontSize: "24px" }}>Information We Collect</h2>
            
            <h3 style={{ marginTop: "20px", fontSize: "18px" }}>From Merchants</h3>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              When you install the App, we are automatically able to access certain types of information from your Shopify account: store URL, email address, and theme information to manage your account and billing.
            </p>

            <h3 style={{ marginTop: "20px", fontSize: "18px" }}>From Customers</h3>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              We do not directly collect sensitive customer information. We only process data required to render the app blocks correctly on your storefront.
            </p>

            <h2 style={{ marginTop: "40px", fontSize: "24px" }}>How We Use Your Information</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              We use the personal information we collect in order to provide the service and to operate the App. Additionally, we use this information:
            </p>
            <ul style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              <li>To ensure the app blocks render correctly on your storefront.</li>
              <li>To communicate with you regarding technical support or account updates.</li>
              <li>To generate AI-assisted text for your product features upon request.</li>
            </ul>

            <div className="callout" style={{ marginTop: "40px" }}>
              <strong>🛡️ Data Security & Retention:</strong> We use industry-standard encryption to protect all data. We retain store information for as long as you use the App. When you uninstall, we delete all associated data from our servers within 48 hours, in compliance with Shopify's data protection policies.
            </div>

            <h2 style={{ marginTop: "40px", fontSize: "24px" }}>Your Rights (GDPR & CCPA)</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6" }}>
              If you are a European or California resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. We process these requests automatically via Shopify's official webhooks. For manual inquiries, please contact us at the email below.
            </p>

            <div style={{ marginTop: "60px", backgroundColor: "#e4f1eb", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ color: "var(--green)", fontSize: "24px", lineHeight: "1", paddingTop: "2px" }}>
                <i className="fa fa-envelope"></i>
              </div>
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#1a1a1a" }}>Privacy Questions?</h3>
                <p style={{ margin: "0", color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>
                  For more information about our privacy practices or if you would like to make a complaint, please contact us by email at <a href="mailto:apps@task19.com" style={{ color: "var(--green)", fontWeight: "600" }}>apps@task19.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
