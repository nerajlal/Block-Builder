import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <div>
          © {new Date().getFullYear()} Page Booster · Built by <a href="https://task19.com/">Task19 Technologies</a>
        </div>
        <div className="foot-links">
          <Link to="/support">Support</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
