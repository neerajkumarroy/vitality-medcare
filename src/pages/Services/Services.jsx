import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { services } from "./servicesData";
import "./Services.css";

const Services = () => {
  return (
    <main className="services-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="services-hero">
        <div className="services-hero-container">
          {/* LEFT CONTENT */}

          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="services-section-label">OUR MEDICAL SERVICES</span>

            <h1>
              Complete Care.
              <span>One Trusted Clinic.</span>
            </h1>

            <p>
              From routine checkups to specialist consultations, our healthcare
              services are designed to support you and your family at every
              stage of life.
            </p>

            <div className="services-hero-actions">
              <Link to="/book-appointment" className="services-primary-btn">
                Book Appointment
                <ArrowRight size={16} />
              </Link>

              <span className="services-availability">
                <span className="services-live-dot"></span>
                Appointments available today
              </span>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            className="services-hero-visual"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="services-hero-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=90"
                alt="Doctor providing medical care"
              />
            </div>

            {/* FLOATING CARD */}

            <div className="services-hero-card">
              <div className="services-hero-card-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Trusted Care</strong>

                <span>Experienced Medical Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES GRID
      ===================================================== */}

      <section className="services-list">
        <div className="services-list-container">
          {/* SECTION HEADER */}

          <div className="services-list-header">
            <div>
              <span className="services-section-label">WHAT WE OFFER</span>

              <h2>
                Healthcare Designed
                <span>Around Your Needs.</span>
              </h2>
            </div>

            <p>
              Our experienced healthcare team combines medical expertise, modern
              practices, and personalized attention to provide dependable care.
            </p>
          </div>

          {/* SERVICE CARDS */}

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  className="service-card"
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                >
                  {/* CARD TOP */}

                  <div className="service-card-top">
                    <div className="service-icon">
                      <Icon size={24} />
                    </div>

                    <span className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h3>{service.title}</h3>

                  {/* DESCRIPTION */}

                  <p>{service.description}</p>

                  {/* LINK */}

                  <Link to="/book-appointment" className="service-card-link">
                    Book Consultation
                    <ArrowRight size={15} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CARE CTA
      ===================================================== */}

      <section className="services-care">
        <div className="services-care-container">
          <div className="services-care-icon">
            <ShieldCheck size={27} />
          </div>

          <div className="services-care-content">
            <span>PERSONALIZED MEDICAL CARE</span>

            <h2>
              Not Sure Which Service
              <strong>You Need?</strong>
            </h2>

            <p>
              Our team can help guide you toward the appropriate consultation
              based on your health concerns.
            </p>
          </div>

          <Link to="/book-appointment" className="services-care-button">
            Talk to Our Team
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="services-final-cta">
        <div className="services-final-container">
          <div>
            <span>TAKE THE NEXT STEP</span>

            <h2>
              Your Health Deserves
              <strong>Expert Care.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="services-final-button">
            Book an Appointment
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
