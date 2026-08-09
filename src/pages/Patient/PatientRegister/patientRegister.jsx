import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import "./PatientRegister.css";

const PatientRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /*
  =====================================================
  HANDLE INPUT CHANGE
  =====================================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove old error when user starts typing
    setError("");
  };

  /*
  =====================================================
  HANDLE REGISTER
  =====================================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /*
    -----------------------------------------------------
    PASSWORD VALIDATION
    -----------------------------------------------------
    */

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /*
    -----------------------------------------------------
    PASSWORD LENGTH
    -----------------------------------------------------
    */

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    /*
    -----------------------------------------------------
    API REQUEST
    -----------------------------------------------------
    */

    try {
      setLoading(true);

      const response = await fetch(
        "https://vitality-backend-2mr4.onrender.com/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      /*
      -----------------------------------------------------
      API ERROR
      -----------------------------------------------------
      */

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      /*
      -----------------------------------------------------
      SUCCESS
      -----------------------------------------------------
      */

      setSuccess(data.message || "Patient registration successful.");

      /*
      -----------------------------------------------------
      REDIRECT TO LOGIN
      -----------------------------------------------------
      */

      setTimeout(() => {
        navigate("/patient/login");
      }, 1200);
    } catch (error) {
      console.error("Patient registration error:", error);

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="patient-auth-page">
      <section className="patient-auth-section">
        <div className="patient-auth-container">
          {/* ================= LEFT ================= */}

          <motion.div
            className="patient-auth-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="patient-auth-label">
              <UserRound size={15} />
              PATIENT REGISTRATION
            </span>

            <h1>
              Start Your
              <span>Healthcare Journey.</span>
            </h1>

            <p>
              Create your patient account to manage appointments, stay connected
              with your healthcare team, and keep your visits organized in one
              secure place.
            </p>

            <div className="patient-auth-features">
              <div className="patient-auth-feature">
                <div className="patient-feature-icon">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <strong>Easy Appointment Management</strong>

                  <span>Book and manage your clinic appointments easily.</span>
                </div>
              </div>

              <div className="patient-auth-feature">
                <div className="patient-feature-icon">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <strong>Stay Organized</strong>

                  <span>
                    Keep your upcoming healthcare visits in one place.
                  </span>
                </div>
              </div>

              <div className="patient-auth-feature">
                <div className="patient-feature-icon">
                  <LockKeyhole size={19} />
                </div>

                <div>
                  <strong>Secure Account</strong>

                  <span>
                    Your account information is designed to stay protected.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= REGISTER CARD ================= */}

          <motion.div
            className="patient-login-card patient-register-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="patient-login-header">
              <div className="patient-login-icon">
                <UserRound size={22} />
              </div>

              <span>CREATE ACCOUNT</span>

              <h2>Create Patient Account</h2>

              <p>Enter your basic details to get started.</p>
            </div>

            {/* ================= API ERROR ================= */}

            {error && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "11px 14px",
                  borderRadius: "9px",
                  background: "#fff1f1",
                  border: "1px solid #ffd4d4",
                  color: "#c0392b",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                {error}
              </div>
            )}

            {/* ================= API SUCCESS ================= */}

            {success && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "11px 14px",
                  borderRadius: "9px",
                  background: "#eefaf8",
                  border: "1px solid #ccefeb",
                  color: "#16868a",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}

              <div className="patient-input-group">
                <label htmlFor="fullName">Full Name</label>

                <div className="patient-input-wrapper">
                  <UserRound size={17} />

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="patient-input-group">
                <label htmlFor="registerEmail">Email Address</label>

                <div className="patient-input-wrapper">
                  <Mail size={17} />

                  <input
                    id="registerEmail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}

              <div className="patient-input-group">
                <label htmlFor="phone">Phone Number</label>

                <div className="patient-input-wrapper">
                  <Phone size={17} />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="patient-input-group">
                <div className="patient-password-label">
                  <label htmlFor="registerPassword">Password</label>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="patient-input-wrapper">
                  <LockKeyhole size={17} />

                  <input
                    id="registerPassword"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="patient-input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="patient-input-wrapper">
                  <LockKeyhole size={17} />

                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* TERMS */}

              <label className="patient-terms">
                <input type="checkbox" required />

                <span>I agree to the clinic's terms and privacy policy.</span>
              </label>

              {/* BUTTON */}

              <button
                type="submit"
                className="patient-login-button"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            {/* LOGIN */}

            <div className="patient-register-link">
              <span>Already have an account?</span>

              <Link to="/patient/login">
                Sign In
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* ADMIN */}

            <div className="patient-admin-link">
              <span>Are you clinic staff?</span>

              <Link to="/admin/login">Admin Login</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PatientRegister;
