import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./About.css";

const About = () => {
  return (
    <main className="about-page">
      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <section className="about-hero">
        <div className="about-hero-container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-section-label">ABOUT OUR CLINIC</span>

            <h1>
              Healthcare With
              <span>Heart & Experience.</span>
            </h1>

            <p>
              For more than 15 years, we have been committed to providing
              trusted, compassionate, and patient-focused healthcare for
              individuals and families.
            </p>

            <div className="about-hero-actions">
              <Link to="/book-appointment" className="about-primary-btn">
                Book Appointment
                <ArrowRight size={16} />
              </Link>

              <Link to="/doctors" className="about-secondary-btn">
                Meet Our Doctors
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="about-hero-visual"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-hero-image">
              <img
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1100&q=90"
                alt="Medical team"
              />
            </div>

            <div className="about-experience-card">
              <strong>15+</strong>

              <span>
                Years of
                <br />
                Trusted Healthcare
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="about-story">
        <div className="about-story-container">
          <motion.div
            className="about-story-image"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=90"
              alt="Doctor speaking with patient"
            />

            <div className="about-story-badge">
              <HeartPulse size={19} />

              <span>Patient First</span>
            </div>
          </motion.div>

          <motion.div
            className="about-story-content"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-section-label">OUR STORY</span>

            <h2>
              More Than Healthcare,
              <span>A Commitment to You.</span>
            </h2>

            <p>
              Our clinic was built with one simple belief: healthcare should
              feel personal. Every patient deserves to be heard, understood, and
              treated with respect.
            </p>

            <p>
              Over the years, our team has combined medical expertise with
              modern healthcare practices to create a comfortable environment
              where patients and families can confidently take care of their
              health.
            </p>

            <div className="about-story-points">
              <div>
                <CheckCircle2 size={17} />
                <span>Experienced Medical Professionals</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Modern Healthcare Practices</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Personalized Patient Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION
      ===================================================== */}

      <section className="about-mission">
        <div className="about-mission-container">
          <div className="about-mission-header">
            <span className="about-section-label">WHAT DRIVES US</span>

            <h2>
              Care With Purpose.
              <span>Every Single Day.</span>
            </h2>
          </div>

          <div className="about-mission-grid">
            <motion.div className="about-mission-card" whileHover={{ y: -5 }}>
              <div className="about-mission-icon">
                <HeartPulse size={25} />
              </div>

              <h3>Our Mission</h3>

              <p>
                To provide accessible, compassionate, and dependable healthcare
                that improves the wellbeing of every patient we serve.
              </p>
            </motion.div>

            <motion.div className="about-mission-card" whileHover={{ y: -5 }}>
              <div className="about-mission-icon">
                <ShieldCheck size={25} />
              </div>

              <h3>Our Vision</h3>

              <p>
                To create a trusted healthcare experience where modern medical
                expertise and genuine human care come together.
              </p>
            </motion.div>

            <motion.div className="about-mission-card" whileHover={{ y: -5 }}>
              <div className="about-mission-icon">
                <Users size={25} />
              </div>

              <h3>Our Values</h3>

              <p>
                Compassion, integrity, excellence, and respect guide every
                interaction with our patients and their families.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="about-stats">
        <div className="about-stats-container">
          <div className="about-stat">
            <strong>15+</strong>

            <span>Years Experience</span>
          </div>

          <div className="about-stat">
            <strong>10K+</strong>

            <span>Patients Served</span>
          </div>

          <div className="about-stat">
            <strong>25+</strong>

            <span>Medical Specialists</span>
          </div>

          <div className="about-stat">
            <strong>4.9/5</strong>

            <span>Patient Rating</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">
        <div className="about-cta-container">
          <div>
            <span>YOUR HEALTH MATTERS</span>

            <h2>
              Let's Take Care of
              <strong>Your Health.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="about-cta-btn">
            Book an Appointment
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
