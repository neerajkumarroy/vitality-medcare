import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

import "./AdminRegister.css";

const AdminRegister = () => {
  const navigate = useNavigate();

  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages while user is typing
    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // =====================================================
  // ADMIN REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ===================================================
    // BASIC VALIDATION
    // ===================================================

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all required fields.");
      return;
    }

    // ===================================================
    // PASSWORD LENGTH
    // ===================================================

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // ===================================================
    // PASSWORD MATCH
    // ===================================================

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // ADMIN REGISTER API
      // =================================================

      const response = await fetch(
        "https://vitality-backend-2mr4.onrender.com/api/auth/admin/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
          }),
        },
      );

      // =================================================
      // READ RESPONSE
      // =================================================

      const data = await response.json();

      console.log("Admin Registration Response:", data);

      // =================================================
      // API ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(data.message || "Unable to create admin account.");
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(data.message || "Admin account created successfully.");

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Reset password visibility
      setShowPassword(false);
      setShowConfirmPassword(false);

      // =================================================
      // REDIRECT TO ADMIN LOGIN
      // =================================================

      setTimeout(() => {
        navigate("/admin/login");
      }, 1200);
    } catch (error) {
      console.error("Admin Registration Error:", error);

      setError(
        error.message || "Something went wrong while creating admin account.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <main className="admin-register-page">
      {/* =================================================
          LEFT CONTENT
      ================================================= */}

      <section className="admin-register-info">
        <div className="admin-register-info-inner">
          {/* BADGE */}

          <div className="admin-register-badge">
            <ShieldCheck size={16} />
            <span>ADMINISTRATION</span>
          </div>

          {/* HEADING */}

          <h1>
            Create Your
            <span>Admin Account.</span>
          </h1>

          {/* DESCRIPTION */}

          <p>
            Create a secure administrator account to manage appointments,
            doctors, patients, services, and clinic operations.
          </p>

          {/* FEATURES */}

          <div className="admin-register-features">
            <div>
              <CheckCircle2 size={17} />
              <span>Secure administrator access</span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>Manage clinic operations</span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>Access patient information</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          REGISTER FORM
      ================================================= */}

      <section className="admin-register-form-section">
        <motion.div
          className="admin-register-card"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="admin-register-heading">
            <div className="admin-register-icon">
              <ShieldCheck size={22} />
            </div>

            <span>ADMIN REGISTRATION</span>

            <h2>Create Account</h2>

            <p>Enter your details to create an administrator account.</p>
          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (
            <motion.div
              className="admin-register-success"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <CheckCircle2 size={17} />

              <span>{success}</span>
            </motion.div>
          )}

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <motion.div
              className="admin-register-error"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <CircleAlert size={17} />

              <span>{error}</span>
            </motion.div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>
            {/* =================================================
                NAME
            ================================================= */}

            <div className="admin-register-input-group">
              <label htmlFor="name">Full Name</label>

              <div className="admin-register-input">
                <UserRound size={17} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="admin-register-input-group">
              <label htmlFor="email">Email Address</label>

              <div className="admin-register-input">
                <Mail size={17} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="admin-register-input-group">
              <label htmlFor="password">Password</label>

              <div className="admin-register-input">
                <Lock size={17} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <small className="admin-register-hint">
                Password must be at least 6 characters.
              </small>
            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="admin-register-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="admin-register-input">
                <Lock size={17} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* =================================================
                SUBMIT BUTTON
            ================================================= */}

            <button
              type="submit"
              className="admin-register-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="admin-register-spinner" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Admin Account
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="admin-register-login">
            <span>Already have an admin account?</span>

            <Link to="/admin/login">Admin Login</Link>
          </div>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="admin-register-security">
            <ShieldCheck size={14} />

            <span>
              This area is restricted to authorized clinic administrators.
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AdminRegister;
