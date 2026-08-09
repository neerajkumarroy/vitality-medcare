import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-main">
        <div className="footer-container">
          {/* BRAND */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-mark">+</div>

              <div className="footer-logo-text">
                <strong>Vitality</strong>
                <span>MedCare</span>
              </div>
            </Link>

            <p>
              Compassionate healthcare, experienced doctors, and modern medical
              services designed around you and your family's wellbeing.
            </p>

            <div className="footer-trust">
              <ShieldCheck size={17} />

              <span>Trusted healthcare since 2010</span>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div className="footer-column">
            <h3>Quick Links</h3>

            <nav>
              <Link to="/">Home</Link>

              <Link to="/about">About Us</Link>

              <Link to="/services">Services</Link>

              <Link to="/doctors">Our Doctors</Link>

              <Link to="/blog">Medical Blog</Link>

              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          {/* SERVICES */}

          <div className="footer-column">
            <h3>Our Services</h3>

            <nav>
              <Link to="/services">General Medicine</Link>

              <Link to="/services">Cardiology</Link>

              <Link to="/services">Pediatric Care</Link>

              <Link to="/services">Preventive Care</Link>

              <Link to="/services">Health Checkups</Link>

              <Link to="/services">Family Healthcare</Link>
            </nav>
          </div>

          {/* CONTACT */}

          <div className="footer-column footer-contact">
            <h3>Contact Us</h3>

            <div className="footer-contact-item">
              <div>
                <MapPin size={16} />
              </div>

              <span>
                Rajpur Road,
                <br />
                Dehradun, Uttarakhand
              </span>
            </div>

            <div className="footer-contact-item">
              <div>
                <Phone size={16} />
              </div>

              <a href="tel:+911234567890">+91 12345 67890</a>
            </div>

            <div className="footer-contact-item">
              <div>
                <Mail size={16} />
              </div>

              <a href="mailto:care@vitalitymedcare.com">
                care@vitalitymedcare.com
              </a>
            </div>

            <div className="footer-contact-item">
              <div>
                <Clock3 size={16} />
              </div>

              <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {new Date().getFullYear()} Vitality MedCare. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>

            <Link to="/terms">Terms of Service</Link>
          </div>

          <span className="footer-location">Dehradun, Uttarakhand</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
