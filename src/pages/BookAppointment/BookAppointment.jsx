import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Phone,
  Mail,
  X,
} from "lucide-react";

import "./BookAppointment.css";

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "General Physician",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Cardiologist",
  },
  {
    name: "Dr. Emily Carter",
    specialty: "Pediatrician",
  },
  {
    name: "Dr. James Miller",
    specialty: "Internal Medicine",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:30 PM",
  "04:30 PM",
  "06:00 PM",
];

const API_URL = "https://vitality-backend-2mr4.onrender.com";

const BookAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT HANDLER
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDoctor) {
      newErrors.doctor = "Please select a doctor.";
    }

    if (!selectedDate) {
      newErrors.date = "Please select an appointment date.";
    }

    if (!selectedTime) {
      newErrors.time = "Please select an available time.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.age) {
      newErrors.age = "Please enter patient age.";
    } else if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = "Please enter a valid age.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please enter the reason for your visit.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT APPOINTMENT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors((prev) => ({
      ...prev,
      submit: "",
    }));

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    const selectedDoctorData = doctors.find(
      (doctor) => doctor.name === selectedDoctor,
    );

    if (!selectedDoctorData) {
      setErrors((prev) => ({
        ...prev,
        submit: "Selected doctor could not be found.",
      }));

      return;
    }

    try {
      setLoading(true);

      /*
      =====================================================
      LOGGED-IN vs GUEST BOOKING
      =====================================================

      Logged-in patient:
      /api/appointments

      Guest:
      /api/appointments/guest
      */

      const endpoint = token
        ? `${API_URL}/api/appointments`
        : `${API_URL}/api/appointments/guest`;

      const headers = {
        "Content-Type": "application/json",
      };

      /*
      Add JWT only when patient is logged in.
      */

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const appointmentPayload = {
        doctor: selectedDoctorData.name,
        specialty: selectedDoctorData.specialty,

        appointmentDate: selectedDate,
        appointmentTime: selectedTime,

        patientName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        age: Number(formData.age),
        reason: formData.reason.trim(),

        /*
        Useful for identifying guest appointments.
        Backend can store this as well.
        */

        bookingType: token ? "registered" : "guest",
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(appointmentPayload),
      });

      const data = await response.json();

      console.log("Appointment Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to book appointment.");
      }

      /*
      =====================================================
      SUCCESS
      =====================================================
      */

      setSubmitted(true);
    } catch (error) {
      console.error("Appointment booking error:", error);

      setErrors((prev) => ({
        ...prev,
        submit:
          error.message ||
          "Something went wrong while booking your appointment.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLOSE SUCCESS MODAL
  // =====================================================

  const handleCloseConfirmation = () => {
    setSubmitted(false);

    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");

    setFormData({
      name: "",
      phone: "",
      email: "",
      age: "",
      reason: "",
    });

    setErrors({});
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <main className="book-appointment-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="appointment-hero">
        <div className="appointment-hero-container">
          <motion.div
            className="appointment-hero-content"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="appointment-label">ONLINE APPOINTMENT</span>

            <h1>
              Schedule Your
              <span>Visit With Us.</span>
            </h1>

            <p>
              Choose your preferred doctor, date, and time. Our team will make
              sure your visit is simple, comfortable, and convenient.
            </p>

            <div className="appointment-trust">
              <div>
                <CheckCircle2 size={15} />
                <span>Easy Booking</span>
              </div>

              <div>
                <CheckCircle2 size={15} />
                <span>Verified Doctors</span>
              </div>

              <div>
                <CheckCircle2 size={15} />
                <span>Quick Confirmation</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="appointment-hero-visual"
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=90"
              alt="Doctor appointment"
            />

            <div className="appointment-hero-card">
              <div className="appointment-hero-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <strong>Appointments Available</strong>

                <span>Monday – Saturday</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          BOOKING SECTION
      ===================================================== */}

      <section className="appointment-section">
        <div className="appointment-container">
          {/* =================================================
              FORM
          ================================================= */}

          <motion.form
            className="appointment-form-card"
            onSubmit={handleSubmit}
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
          >
            {/* LOGIN STATUS */}

            <div
              style={{
                marginBottom: "25px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: isLoggedIn ? "#eaf7f4" : "#f5f7f8",
                border: "1px solid",
                borderColor: isLoggedIn ? "#d3ebe6" : "#e4e8e9",
                fontSize: "12px",
                color: "#5f706f",
              }}
            >
              {isLoggedIn ? (
                <>
                  <strong style={{ color: "#16817c" }}>
                    Patient account connected
                  </strong>
                  <br />
                  This appointment will appear in your patient dashboard.
                </>
              ) : (
                <>
                  <strong style={{ color: "#405756" }}>Guest Booking</strong>
                  <br />
                  You can book without creating an account.
                </>
              )}
            </div>

            {/* STEP 01 */}

            <div className="appointment-form-heading">
              <span>STEP 01</span>

              <h2>Choose Your Doctor</h2>

              <p>Select the specialist you would like to consult.</p>
            </div>

            <div className="appointment-doctors">
              {doctors.map((doctor) => (
                <button
                  type="button"
                  key={doctor.name}
                  className={`appointment-doctor-option ${
                    selectedDoctor === doctor.name ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDoctor(doctor.name);

                    setErrors((prev) => ({
                      ...prev,
                      doctor: "",
                      submit: "",
                    }));
                  }}
                >
                  <div className="appointment-doctor-icon">
                    <Stethoscope size={17} />
                  </div>

                  <div>
                    <strong>{doctor.name}</strong>

                    <span>{doctor.specialty}</span>
                  </div>

                  {selectedDoctor === doctor.name && (
                    <CheckCircle2
                      className="appointment-selected-icon"
                      size={18}
                    />
                  )}
                </button>
              ))}
            </div>

            {errors.doctor && (
              <span className="appointment-error">{errors.doctor}</span>
            )}

            {/* STEP 02 */}

            <div className="appointment-form-heading appointment-date-heading">
              <span>STEP 02</span>

              <h2>Select Date & Time</h2>

              <p>Choose a convenient appointment slot.</p>
            </div>

            <div className="appointment-date-wrapper">
              <label>
                <CalendarDays size={15} />
                Appointment Date
              </label>

              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    date: "",
                    submit: "",
                  }));
                }}
              />
            </div>

            {errors.date && (
              <span className="appointment-error">{errors.date}</span>
            )}

            <div className="appointment-time-heading">
              <Clock3 size={16} />

              <span>Available Time Slots</span>
            </div>

            <div className="appointment-time-grid">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={selectedTime === time ? "active" : ""}
                  onClick={() => {
                    setSelectedTime(time);

                    setErrors((prev) => ({
                      ...prev,
                      time: "",
                      submit: "",
                    }));
                  }}
                >
                  {time}
                </button>
              ))}
            </div>

            {errors.time && (
              <span className="appointment-error">{errors.time}</span>
            )}

            {/* STEP 03 */}

            <div className="appointment-form-heading appointment-patient-heading">
              <span>STEP 03</span>

              <h2>Patient Details</h2>

              <p>Please provide basic information for your visit.</p>
            </div>

            <div className="appointment-input-grid">
              {/* NAME */}

              <div className="appointment-input-group">
                <label>Full Name</label>

                <div className="appointment-input">
                  <UserRound size={15} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {errors.name && (
                  <span className="appointment-error">{errors.name}</span>
                )}
              </div>

              {/* PHONE */}

              <div className="appointment-input-group">
                <label>Phone Number</label>

                <div className="appointment-input">
                  <Phone size={15} />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                {errors.phone && (
                  <span className="appointment-error">{errors.phone}</span>
                )}
              </div>

              {/* EMAIL */}

              <div className="appointment-input-group">
                <label>Email Address</label>

                <div className="appointment-input">
                  <Mail size={15} />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>

                {errors.email && (
                  <span className="appointment-error">{errors.email}</span>
                )}
              </div>

              {/* AGE */}

              <div className="appointment-input-group">
                <label>Patient Age</label>

                <div className="appointment-input">
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                </div>

                {errors.age && (
                  <span className="appointment-error">{errors.age}</span>
                )}
              </div>
            </div>

            {/* REASON */}

            <div className="appointment-message">
              <label>Reason for Visit</label>

              <textarea
                name="reason"
                rows="4"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly describe your concern..."
              />

              {errors.reason && (
                <span className="appointment-error">{errors.reason}</span>
              )}
            </div>

            {/* API ERROR */}

            {errors.submit && (
              <div className="appointment-submit-error">{errors.submit}</div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="appointment-submit"
              disabled={loading}
            >
              {loading ? "Booking Appointment..." : "Confirm Appointment"}

              {!loading && <ArrowRight size={17} />}
            </button>

            <div className="appointment-secure-note">
              <ShieldCheck size={15} />

              <span>Your information is kept private and secure.</span>
            </div>
          </motion.form>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside className="appointment-summary">
            <div className="appointment-summary-header">
              <span>YOUR APPOINTMENT</span>

              <h2>Booking Summary</h2>
            </div>

            <div className="appointment-summary-doctor">
              <div className="appointment-summary-icon">
                <Stethoscope size={20} />
              </div>

              <div>
                <span>Selected Doctor</span>

                <strong>{selectedDoctor || "Select a doctor"}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <CalendarDays size={17} />

              <div>
                <span>Date</span>

                <strong>{selectedDate || "Select appointment date"}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <Clock3 size={17} />

              <div>
                <span>Time</span>

                <strong>{selectedTime || "Select available time"}</strong>
              </div>
            </div>

            <div className="appointment-summary-divider" />

            <div className="appointment-summary-note">
              <CheckCircle2 size={16} />

              <p>
                Your appointment request will be reviewed by our clinic team
                before confirmation.
              </p>
            </div>

            <div className="appointment-help">
              <span>NEED HELP?</span>

              <strong>Call our clinic</strong>

              <a href="tel:+911234567890">+91 12345 67890</a>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      {submitted && (
        <div className="appointment-success-overlay">
          <motion.div
            className="appointment-success-modal"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <button
              type="button"
              className="appointment-success-close"
              onClick={handleCloseConfirmation}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="appointment-success-icon">
              <CheckCircle2 size={32} />
            </div>

            <span className="appointment-success-label">
              APPOINTMENT REQUEST RECEIVED
            </span>

            <h2>You're All Set!</h2>

            <p>
              Your appointment request has been successfully submitted. Our
              clinic team will contact you to confirm your visit.
            </p>

            <div className="appointment-success-details">
              <div>
                <span>Doctor</span>

                <strong>{selectedDoctor}</strong>
              </div>

              <div>
                <span>Date</span>

                <strong>{selectedDate}</strong>
              </div>

              <div>
                <span>Time</span>

                <strong>{selectedTime}</strong>
              </div>
            </div>

            <button
              type="button"
              className="appointment-success-button"
              onClick={handleCloseConfirmation}
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default BookAppointment;
