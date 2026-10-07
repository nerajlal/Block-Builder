import { Link } from "react-router";

export function Header() {
  return (
    <header className="top">
      <div className="wrap nav">
        <Link className="logo" to="/" aria-label="Page Booster home">
          <span className="logo-icon">✦</span>Page Booster
        </Link>
        <nav className="navlinks" aria-label="Main navigation">
          <Link to="/#features">Features</Link>
          <Link to="/#how">How it works</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/support">Support</Link>
        </nav>
        <a className="btn btn-small" href="https://apps.shopify.com/product-discount-3">
          Add to Shopify <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
