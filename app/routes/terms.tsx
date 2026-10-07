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
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Terms of Service</div>
            <h1>Our terms and conditions.</h1>
            <p>Please read these terms carefully before using Block Builder.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap faq">
            <p style={{ color: "var(--muted)", fontSize: "18px", lineHeight: "1.6" }}>
              This is a placeholder for the terms of service. You can update this file with your actual terms of service content.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
