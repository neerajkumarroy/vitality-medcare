import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Doctors.css";

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "General Physician",
    experience: "15+ Years Experience",
    description:
      "Dedicated to providing comprehensive primary care with a focus on prevention, diagnosis, and long-term wellbeing.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=90",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Cardiologist",
    experience: "18+ Years Experience",
    description:
      "Experienced cardiologist providing focused heart care, preventive guidance, diagnosis, and personalized treatment planning.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=90",
  },
  {
    name: "Dr. Emily Carter",
    specialty: "Pediatrician",
    experience: "12+ Years Experience",
    description:
      "Compassionate pediatric care focused on children's health, development, preventive care, and family guidance.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=90",
  },
  {
    name: "Dr. James Miller",
    specialty: "Internal Medicine",
    experience: "16+ Years Experience",
    description:
      "Focused on adult healthcare, complex medical conditions, preventive medicine, and personalized treatment strategies.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=90",
  },
];

const Doctors = () => {
  return (
    <main className="doctors-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="doctors-hero">
        <div className="doctors-hero-container">
          <motion.div
            className="doctors-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="doctors-label">OUR MEDICAL TEAM</span>

            <h1>
              Experienced Doctors.
              <span>Personalized Care.</span>
            </h1>

            <p>
              Meet our experienced healthcare professionals dedicated to
              providing thoughtful, reliable, and patient-focused medical care
              for you and your family.
            </p>

            <div className="doctors-hero-actions">
              <Link to="/book-appointment" className="doctors-primary-btn">
                Book Appointment
                <ArrowRight size={16} />
              </Link>

              <div className="doctors-trust">
                <CheckCircle2 size={16} />

                <span>Trusted medical professionals</span>
              </div>
            </div>
          </motion.div>

          {/* HERO VISUAL */}

          <motion.div
            className="doctors-hero-visual"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="doctors-hero-image">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=90"
                alt="Medical professionals"
              />
            </div>

            <div className="doctors-hero-card">
              <div className="doctors-hero-card-icon">
                <Stethoscope size={18} />
              </div>

              <div>
                <strong>Expert Medical Team</strong>
                <span>Focused on your wellbeing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DOCTORS GRID
      ===================================================== */}

      <section className="doctors-section">
        <div className="doctors-container">
          <div className="doctors-section-header">
            <div>
              <span className="doctors-label">MEET OUR DOCTORS</span>

              <h2>
                Care From People
                <span>You Can Trust.</span>
              </h2>
            </div>

            <p>
              Our team combines clinical experience, modern medical practices,
              and a patient-first approach to deliver dependable healthcare.
            </p>
          </div>

          <div className="doctors-grid">
            {doctors.map((doctor, index) => (
              <motion.article
                className="doctor-card"
                key={doctor.name}
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
                  delay: index * 0.08,
                }}
              >
                {/* IMAGE */}

                <div className="doctor-card-image">
                  <img src={doctor.image} alt={doctor.name} />

                  <div className="doctor-card-experience">
                    {doctor.experience}
                  </div>
                </div>

                {/* CONTENT */}

                <div className="doctor-card-content">
                  <div className="doctor-card-specialty">
                    <HeartPulse size={14} />
                    {doctor.specialty}
                  </div>

                  <h3>{doctor.name}</h3>

                  <p>{doctor.description}</p>

                  <Link to="/book-appointment" className="doctor-card-button">
                    Book Consultation
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY OUR DOCTORS
      ===================================================== */}

      <section className="doctors-care">
        <div className="doctors-care-container">
          <div className="doctors-care-icon">
            <CheckCircle2 size={25} />
          </div>

          <div className="doctors-care-content">
            <span>PATIENT-FIRST APPROACH</span>

            <h2>
              Medical Expertise With
              <strong>Compassionate Care.</strong>
            </h2>

            <p>
              We believe good healthcare starts with listening. Our doctors take
              time to understand your concerns and help you make informed
              decisions about your health.
            </p>
          </div>

          <Link to="/book-appointment" className="doctors-care-button">
            Meet With a Doctor
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="doctors-final">
        <div className="doctors-final-container">
          <div>
            <span>YOUR HEALTH MATTERS</span>

            <h2>
              The Right Care Starts
              <strong>With the Right Doctor.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="doctors-final-button">
            Book an Appointment
            <CalendarDays size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Doctors;
