import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Terms of Service — Block Builder" },
  { name: "description", content: "Terms of service for the Block Builder app." },
];

export default function Terms() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Terms</div>
            <h1>Terms of Service.</h1>
            <p>Last Updated: October 8, 2026</p>
          </div>
        </section>

        <section className="section" style={{ paddingBottom: "8rem" }}>
          <div className="wrap" style={{ maxWidth: "1000px" }}>
            <div className="terms-intro">
              <h2>Agreement to Terms</h2>
              <p>By installing or using Block Builder, you agree to these Terms of Service. Please read them carefully before using our app.</p>
            </div>

            <div className="terms-grid-3">
              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-mobile-screen"></i> What We Provide
                </div>
                <ul>
                  <li>Block builder widgets</li>
                  <li>Product-specific features</li>
                  <li>AI generation tools</li>
                  <li>Admin management panel</li>
                </ul>
              </div>

              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-circle-check" style={{ color: "var(--green)" }}></i> What You Can Do
                </div>
                <ul>
                  <li>Use for intended purpose</li>
                  <li>Configure settings</li>
                  <li>Contact support</li>
                  <li>Uninstall anytime</li>
                </ul>
              </div>

              <div className="terms-card red-li">
                <div className="terms-card-header">
                  <i className="fa-solid fa-ban" style={{ color: "#d92d20" }}></i> What You Can't Do
                </div>
                <ul>
                  <li>Use for illegal purposes</li>
                  <li>Reverse-engineer the app</li>
                  <li>Display false information</li>
                  <li>Violate Shopify policies</li>
                </ul>
              </div>
            </div>

            <div className="terms-grid-2">
              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-clipboard-list"></i> Your Responsibilities
                </div>
                <ul>
                  <li>Provide accurate info</li>
                  <li>Comply with applicable laws</li>
                  <li>Maintain account security</li>
                  <li>Use the app responsibly</li>
                </ul>
              </div>

              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-shield-halved"></i> Our Responsibilities
                </div>
                <ul>
                  <li>Provide app functionality</li>
                  <li>Maintain reasonable uptime</li>
                  <li>Protect your data</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
            </div>

            <div className="liability-box">
              <div className="liability-header">
                <i className="fa-solid fa-scale-balanced"></i>
                <h3>Limitation of Liability</h3>
                <p>To the maximum extent permitted by law:</p>
              </div>
              <div className="liability-grid">
                <div className="liability-item">
                  <h4>No Indirect Damages</h4>
                  <p>We're not liable for indirect or consequential damages.</p>
                </div>
                <div className="liability-item">
                  <h4>Limited Liability</h4>
                  <p>Total liability limited to fees paid in last 12 months.</p>
                </div>
                <div className="liability-item">
                  <h4>As-Is Service</h4>
                  <p>App provided "as is" without warranties.</p>
                </div>
              </div>
            </div>

            <div className="terms-grid-2">
              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-lock"></i> Privacy & Data
                </div>
                <p>We collect minimal data to provide the service. See our <a href="/privacy" style={{ color: "var(--green)", fontWeight: 600 }}>Privacy Policy</a> for complete details on data handling.</p>
              </div>

              <div className="terms-card">
                <div className="terms-card-header">
                  <i className="fa-solid fa-rotate-right"></i> Termination
                </div>
                <p>You may terminate by uninstalling the app. All data will be deleted within 48 hours. No refunds for partial months.</p>
              </div>
            </div>

            <div className="terms-contact">
              <div className="terms-contact-left">
                <i className="fa-solid fa-comments"></i>
                <span><strong>Questions about terms?</strong> Contact us for clarification or legal inquiries</span>
              </div>
              <a href="mailto:apps@task19.com" className="terms-contact-link">Contact Support <i className="fa-solid fa-angle-right"></i></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
