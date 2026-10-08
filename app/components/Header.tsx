import { Link } from "react-router";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="top">
      <div className="wrap nav">
        <Link className="logo" to="/" aria-label="Block Builder home" onClick={closeMenu}>
          <span className="logo-icon">✦</span>Block Builder
        </Link>
        
        {/* Hamburger Icon (visible on mobile only) */}
        <button 
          className="hamburger" 
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Desktop / Mobile Nav Container */}
        <div className={`nav-container ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header">
            <div className="logo" style={{ color: "white", margin: 0 }}>
              <span className="logo-icon" style={{ background: "var(--lime)", color: "var(--dark)" }}>✦</span>
              Block Builder
            </div>
            <button 
              className="close-mobile-menu" 
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <nav className="navlinks" aria-label="Main navigation">
            <Link to="/#features" onClick={closeMenu}>Features</Link>
            <Link to="/installation-guide" onClick={closeMenu}>Install Guide</Link>
            <Link to="/pricing" onClick={closeMenu}>Pricing</Link>
            <Link to="/support" onClick={closeMenu}>Support</Link>
          </nav>
          
          <a className="btn btn-small nav-cta" href="https://apps.shopify.com/product-discount-3">
            Add to Shopify <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
