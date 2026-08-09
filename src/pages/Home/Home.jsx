import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <section className="medical-hero">
        {/* Background Decoration */}
        <div className="medical-hero-bg">
          <div className="hero-bg-circle hero-bg-circle-1"></div>
          <div className="hero-bg-circle hero-bg-circle-2"></div>
          <div className="hero-bg-grid"></div>
        </div>

        {/* Main Hero */}
        <div className="medical-hero-container">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            className="medical-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="medical-hero-badge">
              <Stethoscope size={14} />
              <span>Trusted Healthcare Since 2010</span>
            </div>

            {/* Heading */}
            <h1 className="medical-hero-title">
              Your Health,
              <span>Our Priority.</span>
            </h1>

            {/* Description */}
            <p className="medical-hero-text">
              Compassionate healthcare, experienced doctors, and modern medical
              solutions designed around you and your family's wellbeing.
            </p>

            {/* Buttons */}
            <div className="medical-hero-buttons">
              <Link to="/book-appointment" className="medical-primary-btn">
                <CalendarDays size={16} />

                <span>Book Appointment</span>

                <ArrowRight size={16} />
              </Link>

              <Link to="/services" className="medical-secondary-btn">
                Explore Services
              </Link>
            </div>

            {/* Trust Items */}
            <div className="medical-trust-items">
              <div className="medical-trust-item">
                <CheckCircle2 size={14} />
                <span>Experienced Doctors</span>
              </div>

              <div className="medical-trust-item">
                <CheckCircle2 size={14} />
                <span>Modern Facilities</span>
              </div>

              <div className="medical-trust-item">
                <CheckCircle2 size={14} />
                <span>Patient-Focused Care</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            className="medical-hero-visual"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Doctor Image */}
            <div className="medical-doctor-image">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=90"
                alt="Experienced doctor"
              />

              <div className="medical-image-overlay"></div>
            </div>

            {/* Experience Card */}
            <div className="medical-experience-card">
              <div className="medical-floating-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>15+</strong>
                <span>Years Experience</span>
              </div>
            </div>

            {/* Appointment Card */}
            <div className="medical-available-card">
              <div className="medical-floating-icon">
                <CalendarDays size={17} />
              </div>

              <div>
                <span>Next Available</span>
                <strong>Today · 04:30 PM</strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= STATS ================= */}
        <div className="medical-stats">
          <div className="medical-stat">
            <div className="medical-stat-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <strong>15+</strong>
              <span>Years Experience</span>
            </div>
          </div>

          <div className="medical-stat">
            <div className="medical-stat-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <strong>10K+</strong>
              <span>Patients Served</span>
            </div>
          </div>

          <div className="medical-stat">
            <div className="medical-stat-icon">
              <Stethoscope size={18} />
            </div>

            <div>
              <strong>25+</strong>
              <span>Medical Specialists</span>
            </div>
          </div>

          <div className="medical-stat">
            <div className="medical-stat-icon">
              <Clock3 size={18} />
            </div>

            <div>
              <strong>6 Days</strong>
              <span>Open Every Week</span>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
    MEDICAL SERVICES
===================================================== */}

      <section className="medical-services">
        <div className="medical-services-container">
          {/* Section Header */}
          <motion.div
            className="medical-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="medical-section-label">OUR MEDICAL SERVICES</span>

            <h2>
              Complete Care for
              <span>Every Stage of Life.</span>
            </h2>

            <p>
              From routine checkups to specialized treatment, our experienced
              medical team is here to provide personalized care for you and your
              family.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="medical-services-grid">
            {/* Card 1 */}
            <motion.div
              className="medical-service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="medical-service-icon">
                <Stethoscope size={24} />
              </div>

              <h3>General Medicine</h3>

              <p>
                Comprehensive medical care for common illnesses, routine
                checkups and ongoing health management.
              </p>

              <Link to="/services" className="medical-service-link">
                Learn More
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="medical-service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <div className="medical-service-icon">
                <ShieldCheck size={24} />
              </div>

              <h3>Preventive Care</h3>

              <p>
                Regular screenings and preventive health programs designed to
                help you stay healthy and active.
              </p>

              <Link to="/services" className="medical-service-link">
                Learn More
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="medical-service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <div className="medical-service-icon">
                <CalendarDays size={24} />
              </div>

              <h3>Health Checkups</h3>

              <p>
                Complete health assessments to understand your current health
                and identify potential concerns early.
              </p>

              <Link to="/services" className="medical-service-link">
                Learn More
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              className="medical-service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.24 }}
            >
              <div className="medical-service-icon">
                <CheckCircle2 size={24} />
              </div>

              <h3>Family Healthcare</h3>

              <p>
                Reliable healthcare for every member of your family with a focus
                on long-term wellbeing.
              </p>

              <Link to="/services" className="medical-service-link">
                Learn More
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* View All */}
          <div className="medical-services-action">
            <Link to="/services" className="medical-view-services">
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      {/* =====================================================
    WHY CHOOSE US
===================================================== */}

      <section className="medical-why">
        <div className="medical-why-container">
          {/* LEFT CONTENT */}
          <motion.div
            className="medical-why-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="medical-section-label">WHY CHOOSE US</span>

            <h2>
              Healthcare Built
              <span>Around You.</span>
            </h2>

            <p className="medical-why-description">
              We believe quality healthcare should be personal, accessible, and
              built around the individual needs of every patient.
            </p>

            {/* FEATURES */}

            <div className="medical-why-features">
              <div className="medical-why-feature">
                <div className="medical-why-icon">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h3>Experienced Medical Team</h3>

                  <p>
                    Skilled doctors and healthcare professionals committed to
                    providing dependable care.
                  </p>
                </div>
              </div>

              <div className="medical-why-feature">
                <div className="medical-why-icon">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <h3>Patient-Centered Care</h3>

                  <p>
                    Every treatment plan is designed around your health,
                    comfort, and individual needs.
                  </p>
                </div>
              </div>

              <div className="medical-why-feature">
                <div className="medical-why-icon">
                  <Clock3 size={24} />
                </div>

                <div>
                  <h3>Convenient Appointments</h3>

                  <p>
                    Easy appointment booking with flexible scheduling for your
                    convenience.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}

          <motion.div
            className="medical-why-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="medical-why-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=90"
                alt="Doctor consulting patient"
              />
            </div>

            {/* Experience Card */}

            <div className="medical-why-experience">
              <strong>15+</strong>

              <span>
                Years of
                <br />
                Trusted Care
              </span>
            </div>

            {/* Small Card */}

            <div className="medical-why-rating">
              <div className="medical-why-rating-icon">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <strong>10K+</strong>
                <span>Happy Patients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* =====================================================
    OUR DOCTORS
===================================================== */}

      <section className="medical-doctors">
        <div className="medical-doctors-container">
          {/* HEADER */}
          <motion.div
            className="medical-doctors-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="medical-section-label">OUR SPECIALISTS</span>

              <h2>
                Meet Our
                <span>Experienced Doctors.</span>
              </h2>
            </div>

            <p>
              Our dedicated team of experienced healthcare professionals is
              committed to providing thoughtful and personalized medical care.
            </p>
          </motion.div>

          {/* DOCTORS GRID */}
          <div className="medical-doctors-grid">
            {/* DOCTOR 1 */}
            <motion.article
              className="medical-doctor-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="medical-doctor-photo">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=90"
                  alt="Dr. Sarah Mitchell"
                />

                <span className="medical-doctor-status">Available Today</span>
              </div>

              <div className="medical-doctor-info">
                <span className="medical-doctor-speciality">
                  General Physician
                </span>

                <h3>Dr. Sarah Mitchell</h3>

                <p>MBBS, MD · 15+ Years Experience</p>

                <Link to="/book-appointment" className="medical-doctor-button">
                  Book Appointment
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>

            {/* DOCTOR 2 */}
            <motion.article
              className="medical-doctor-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <div className="medical-doctor-photo">
                <img
                  src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=700&q=90"
                  alt="Dr. James Wilson"
                />

                <span className="medical-doctor-status">Available Today</span>
              </div>

              <div className="medical-doctor-info">
                <span className="medical-doctor-speciality">Cardiologist</span>

                <h3>Dr. James Wilson</h3>

                <p>MBBS, DM · 18+ Years Experience</p>

                <Link to="/book-appointment" className="medical-doctor-button">
                  Book Appointment
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>

            {/* DOCTOR 3 */}
            <motion.article
              className="medical-doctor-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <div className="medical-doctor-photo">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=90"
                  alt="Dr. Emily Carter"
                />

                <span className="medical-doctor-status">Available Today</span>
              </div>

              <div className="medical-doctor-info">
                <span className="medical-doctor-speciality">Pediatrician</span>

                <h3>Dr. Emily Carter</h3>

                <p>MBBS, MD · 12+ Years Experience</p>

                <Link to="/book-appointment" className="medical-doctor-button">
                  Book Appointment
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>
          </div>

          {/* VIEW ALL */}
          <div className="medical-doctors-action">
            <Link to="/doctors" className="medical-view-doctors">
              View All Doctors
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      {/* =====================================================
    APPOINTMENT CTA
===================================================== */}

      <section className="medical-appointment-cta">
        <div className="medical-appointment-container">
          {/* LEFT CONTENT */}
          <motion.div
            className="medical-appointment-content"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="medical-appointment-label">
              NEED MEDICAL CARE?
            </span>

            <h2>
              Your Health
              <span>Can't Wait.</span>
            </h2>

            <p>
              Schedule an appointment with our experienced medical team and take
              the next step toward better health.
            </p>

            <div className="medical-appointment-actions">
              <Link
                to="/book-appointment"
                className="medical-appointment-primary"
              >
                <CalendarDays size={18} />

                <span>Book an Appointment</span>

                <ArrowRight size={17} />
              </Link>

              <a href="tel:+911234567890" className="medical-appointment-phone">
                <div className="medical-phone-icon">
                  <Clock3 size={17} />
                </div>

                <div>
                  <span>Call us today</span>
                  <strong>+91 12345 67890</strong>
                </div>
              </a>
            </div>
          </motion.div>

          {/* RIGHT INFO */}
          <motion.div
            className="medical-appointment-info"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="medical-appointment-info-icon">
              <CalendarDays size={25} />
            </div>

            <div>
              <span>Next Available Appointment</span>

              <strong>Today · 04:30 PM</strong>

              <small>Monday – Saturday · 9:00 AM – 7:00 PM</small>
            </div>
          </motion.div>
        </div>
      </section>
      {/* =====================================================
    PATIENT TESTIMONIALS
===================================================== */}

      <section className="medical-testimonials">
        <div className="medical-testimonials-container">
          {/* HEADER */}
          <motion.div
            className="medical-testimonials-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="medical-section-label">PATIENT STORIES</span>

            <h2>
              Trusted by Patients,
              <span>Loved by Families.</span>
            </h2>

            <p>
              Real experiences from people who have trusted our doctors and
              healthcare team with their wellbeing.
            </p>
          </motion.div>

          {/* REVIEWS */}
          <div className="medical-testimonials-grid">
            {/* REVIEW 1 */}
            <motion.article
              className="medical-testimonial-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="medical-testimonial-top">
                <div className="medical-testimonial-avatar">AM</div>

                <div>
                  <h3>Arjun Mehta</h3>

                  <span>General Medicine Patient</span>
                </div>

                <div className="medical-testimonial-quote">“</div>
              </div>

              <div className="medical-testimonial-stars">★★★★★</div>

              <p className="medical-testimonial-text">
                The entire experience was smooth and comfortable. The doctor
                listened carefully and explained the treatment clearly. I truly
                felt well cared for.
              </p>

              <span className="medical-testimonial-date">
                Patient since 2023
              </span>
            </motion.article>

            {/* REVIEW 2 */}
            <motion.article
              className="medical-testimonial-card medical-testimonial-featured"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <div className="medical-testimonial-top">
                <div className="medical-testimonial-avatar">SK</div>

                <div>
                  <h3>Sneha Kapoor</h3>

                  <span>Family Healthcare Patient</span>
                </div>

                <div className="medical-testimonial-quote">“</div>
              </div>

              <div className="medical-testimonial-stars">★★★★★</div>

              <p className="medical-testimonial-text">
                From booking the appointment to meeting the doctor, everything
                was handled professionally. The staff was friendly and the care
                was excellent.
              </p>

              <span className="medical-testimonial-date">
                Patient since 2022
              </span>
            </motion.article>

            {/* REVIEW 3 */}
            <motion.article
              className="medical-testimonial-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <div className="medical-testimonial-top">
                <div className="medical-testimonial-avatar">RK</div>

                <div>
                  <h3>Rahul Kumar</h3>

                  <span>Preventive Care Patient</span>
                </div>

                <div className="medical-testimonial-quote">“</div>
              </div>

              <div className="medical-testimonial-stars">★★★★★</div>

              <p className="medical-testimonial-text">
                I appreciate how much time the medical team takes to understand
                the patient's concerns. The clinic is modern, organized, and
                very welcoming.
              </p>

              <span className="medical-testimonial-date">
                Patient since 2024
              </span>
            </motion.article>
          </div>

          {/* BOTTOM TRUST */}
          <div className="medical-testimonial-trust">
            <div className="medical-trust-rating">
              <strong>4.9</strong>

              <div>
                <div className="medical-rating-stars">★★★★★</div>

                <span>Average Patient Rating</span>
              </div>
            </div>

            <div className="medical-trust-divider"></div>

            <div className="medical-trust-number">
              <strong>10,000+</strong>

              <span>Patients Served</span>
            </div>

            <div className="medical-trust-divider"></div>

            <div className="medical-trust-number">
              <strong>15+</strong>

              <span>Years of Experience</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
