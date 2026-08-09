import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Contact.css";

const Contact = () => {
  return (
    <main className="contact-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">
        <div className="contact-hero-container">
          {/* LEFT */}

          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="contact-label">GET IN TOUCH</span>

            <h1>
              We're Here
              <span>To Help.</span>
            </h1>

            <p>
              Have a question about our services, doctors, or appointments? Our
              team is ready to help you find the right care for your health
              needs.
            </p>

            <div className="contact-hero-actions">
              <Link to="/book-appointment" className="contact-primary-btn">
                Book Appointment
                <ArrowRight size={16} />
              </Link>

              <a href="tel:+911234567890" className="contact-call-btn">
                <Phone size={15} />
                Call Clinic
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            className="contact-hero-visual"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-hero-image">
              <img
                src="https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1100&q=90"
                alt="Medical clinic consultation"
              />
            </div>

            <div className="contact-trust-card">
              <div className="contact-trust-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Trusted Healthcare</strong>
                <span>Patient-focused medical care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <section className="contact-info-section">
        <div className="contact-info-container">
          <div className="contact-info-heading">
            <span className="contact-label">CONTACT INFORMATION</span>

            <h2>
              Let's Start a<strong>Conversation.</strong>
            </h2>

            <p>
              Reach out to our clinic using any of the options below. Our team
              will be happy to assist you.
            </p>
          </div>

          <div className="contact-info-grid">
            {/* PHONE */}

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Phone size={19} />
              </div>

              <div>
                <span>CALL US</span>

                <h3>+91 12345 67890</h3>

                <p>Mon – Sat, 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            {/* EMAIL */}

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>EMAIL US</span>

                <h3>care@vitalitymedcare.com</h3>

                <p>We usually respond within one business day.</p>
              </div>
            </div>

            {/* ADDRESS */}

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin size={19} />
              </div>

              <div>
                <span>VISIT US</span>

                <h3>Vitality MedCare Clinic</h3>

                <p>Rajpur Road, Dehradun, Uttarakhand 248001</p>
              </div>
            </div>

            {/* HOURS */}

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Clock3 size={19} />
              </div>

              <div>
                <span>OPENING HOURS</span>

                <h3>9:00 AM – 7:00 PM</h3>

                <p>Monday – Saturday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-container">
          {/* LEFT CONTENT */}

          <div className="contact-form-intro">
            <span className="contact-label">SEND US A MESSAGE</span>

            <h2>
              How Can We
              <strong>Help You?</strong>
            </h2>

            <p>
              Fill out the form and our team will get back to you as soon as
              possible.
            </p>

            <div className="contact-form-benefits">
              <div>
                <CheckCircle2 size={16} />
                <span>Friendly healthcare team</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Quick response</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Confidential communication</span>
              </div>
            </div>
          </div>

          {/* FORM */}

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="name">Full Name</label>

                <input id="name" type="text" placeholder="Enter your name" />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email Address</label>

                <input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="phone">Phone Number</label>

                <input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>

              <div className="contact-field">
                <label htmlFor="subject">Subject</label>

                <select id="subject">
                  <option value="">Select a subject</option>

                  <option value="appointment">Appointment</option>

                  <option value="services">Medical Services</option>

                  <option value="general">General Enquiry</option>

                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="message">Your Message</label>

              <textarea
                id="message"
                rows="6"
                placeholder="Tell us how we can help..."
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message
              <ArrowRight size={16} />
            </button>

            <p className="contact-form-note">
              By submitting this form, you agree that our team may contact you
              regarding your enquiry.
            </p>
          </motion.form>
        </div>
      </section>

      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="contact-location-section">
        <div className="contact-location-container">
          <div className="contact-location-content">
            <span className="contact-label">FIND OUR CLINIC</span>

            <h2>
              Conveniently
              <strong>Located For You.</strong>
            </h2>

            <p>
              Visit Vitality MedCare for consultations, preventive care, health
              checkups, and specialist medical services.
            </p>

            <div className="contact-location-details">
              <div>
                <MapPin size={17} />

                <span>
                  Rajpur Road, Dehradun (248001),
                  <br />
                  India
                </span>
              </div>

              <div>
                <Clock3 size={17} />

                <span>
                  Monday – Saturday
                  <br />
                  9:00 AM – 7:00 PM
                </span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Rajpur+Road+Dehradun+Uttarakhand"
              target="_blank"
              rel="noreferrer"
              className="contact-map-btn"
            >
              Get Directions
              <ArrowRight size={15} />
            </a>
          </div>

          {/* MAP PLACEHOLDER */}

          <div className="contact-map">
            <div className="contact-map-grid"></div>

            <div className="contact-map-pin">
              <div>
                <MapPin size={23} />
              </div>

              <span>Vitality MedCare</span>
            </div>

            <div className="contact-map-label">
              <MapPin size={13} />
              Rajpur Road, Dehradun
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPOINTMENT CTA
      ===================================================== */}

      <section className="contact-final-cta">
        <div className="contact-final-container">
          <div className="contact-final-icon">
            <CalendarDays size={24} />
          </div>

          <div className="contact-final-content">
            <span>READY TO TAKE THE NEXT STEP?</span>

            <h2>
              Your Health Deserves
              <strong>Expert Care.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="contact-final-btn">
            Book an Appointment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Contact;
