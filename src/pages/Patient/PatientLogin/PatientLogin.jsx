import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "./PatientLogin.css";

const API_URL = "http://localhost:5000";

const PatientLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // CHECK ALREADY LOGGED-IN PATIENT
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedPatient = localStorage.getItem("patient");

    if (token && storedPatient) {
      navigate("/patient/dashboard", {
        replace: true,
      });

      return;
    }

    setCheckingAuth(false);
  }, [navigate]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // LOGIN API
      // =================================================

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Patient Login Response:", data);

      // =================================================
      // API ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // =================================================
      // TOKEN CHECK
      // =================================================

      if (!data.token) {
        throw new Error(
          "Login successful, but authentication token was not received.",
        );
      }

      // =================================================
      // GET PATIENT DATA
      // =================================================

      /*
        Depending on your backend response,
        patient may come as:

        data.patient
        OR
        data.user
      */

      const patientData = data.patient || data.user || null;

      if (!patientData) {
        throw new Error(
          "Login successful, but patient information was not received.",
        );
      }

      // =================================================
      // SAVE AUTH DATA
      // =================================================

      localStorage.setItem("token", data.token);

      localStorage.setItem("patient", JSON.stringify(patientData));

      // =================================================
      // NOTIFY NAVBAR
      // =================================================

      window.dispatchEvent(new Event("patientAuthChanged"));

      // =================================================
      // REDIRECT
      // =================================================

      navigate("/patient/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Patient login error:", error);

      // Remove incomplete authentication
      localStorage.removeItem("token");
      localStorage.removeItem("patient");

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // AUTH CHECK LOADING
  // =====================================================

  if (checkingAuth) {
    return (
      <main className="patient-auth-page">
        <section className="patient-auth-section">
          <div className="patient-auth-loading">
            <div className="patient-auth-spinner"></div>
            <span>Checking your account...</span>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="patient-auth-page">
      <section className="patient-auth-section">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <motion.div
          className="patient-auth-content"
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <span className="patient-auth-label">
            <UserRound size={15} />
            PATIENT PORTAL
          </span>

          <h1>
            Welcome Back.
            <span>Take Care of Your Health.</span>
          </h1>

          <p>
            Sign in to manage your appointments, view your upcoming visits, and
            stay connected with your healthcare team.
          </p>

          <div className="patient-auth-features">
            <div className="patient-auth-feature">
              <div className="patient-feature-icon">
                <CalendarIcon />
              </div>

              <div>
                <strong>Manage Appointments</strong>

                <span>View and manage your upcoming appointments.</span>
              </div>
            </div>

            <div className="patient-auth-feature">
              <div className="patient-feature-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Secure Patient Portal</strong>

                <span>Your account information is protected.</span>
              </div>
            </div>

            <div className="patient-auth-feature">
              <div className="patient-feature-icon">
                <UserRound size={19} />
              </div>

              <div>
                <strong>Your Health, Your Account</strong>

                <span>Keep your healthcare information organized.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <motion.div
          className="patient-login-card"
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="patient-login-header">
            <div className="patient-login-icon">
              <UserRound size={22} />
            </div>

            <span>PATIENT LOGIN</span>

            <h2>Sign In to Your Account</h2>

            <p>Enter your details to access your patient portal.</p>
          </div>

          {/* ERROR */}

          {error && <div className="patient-login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="patient-input-group">
              <label htmlFor="email">Email Address</label>

              <div className="patient-input-wrapper">
                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="patient-input-group">
              <div className="patient-password-label">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="patient-input-wrapper">
                <LockKeyhole size={17} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* OPTIONS */}

            <div className="patient-login-options">
              <label className="patient-remember">
                <input type="checkbox" disabled={loading} />

                <span>Remember me</span>
              </label>

              <Link to="/patient/forgot-password">Forgot Password?</Link>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="patient-login-button"
              disabled={loading}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* REGISTER */}

          <div className="patient-register-link">
            <span>Don't have an account?</span>

            <Link to="/patient/register">
              Create Patient Account
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* ADMIN */}

          <div className="patient-admin-link">
            <span>Are you clinic staff?</span>

            <Link to="/admin/login">Admin Login</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

// =====================================================
// CALENDAR ICON
// =====================================================

const CalendarIcon = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />

      <line x1="16" y1="2" x2="16" y2="6" />

      <line x1="8" y1="2" x2="8" y2="6" />

      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
};

export default PatientLogin;
