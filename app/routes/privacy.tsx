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
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Privacy Policy</div>
            <h1>How we protect your data.</h1>
            <p>We believe in keeping your store's data safe and secure.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap faq">
            <p style={{ color: "var(--muted)", fontSize: "18px", lineHeight: "1.6" }}>
              This is a placeholder for the privacy policy. You can update this file with your actual privacy policy content.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
