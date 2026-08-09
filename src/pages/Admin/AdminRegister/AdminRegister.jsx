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
} from "lucide-react";

import "./AdminRegister.css";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    // Remove previous error while typing
    if (error) {
      setError("");
    }
  };

  // =====================================================
  // ADMIN REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/admin/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      console.log("Admin Registration Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Admin registration failed.");
      }

      setSuccess(data.message || "Admin account created successfully.");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to Admin Login
      setTimeout(() => {
        navigate("/admin/login");
      }, 1200);
    } catch (error) {
      console.error("Admin Registration Error:", error);

      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-register-page">
      {/* =====================================================
          LEFT CONTENT
      ===================================================== */}

      <section className="admin-register-info">
        <div className="admin-register-info-inner">
          <div className="admin-register-badge">
            <ShieldCheck size={16} />
            ADMINISTRATION
          </div>

          <h1>
            Create Your
            <span>Admin Account.</span>
          </h1>

          <p>
            Create a secure administrator account to manage appointments,
            doctors, patients, services, and clinic operations.
          </p>

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

      {/* =====================================================
          REGISTER FORM
      ===================================================== */}

      <section className="admin-register-form-section">
        <motion.div
          className="admin-register-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* HEADER */}

          <div className="admin-register-heading">
            <div className="admin-register-icon">
              <ShieldCheck size={22} />
            </div>

            <span>ADMIN REGISTRATION</span>

            <h2>Create Account</h2>

            <p>Enter your details to create an administrator account.</p>
          </div>

          {/* SUCCESS MESSAGE */}

          {success && (
            <div className="admin-register-success">
              <CheckCircle2 size={17} />
              <span>{success}</span>
            </div>
          )}

          {/* ERROR MESSAGE */}

          {error && (
            <div className="admin-register-error">
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleSubmit}>
            {/* NAME */}

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
                  required
                />
              </div>
            </div>

            {/* EMAIL */}

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
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

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
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

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
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="admin-register-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Admin Account"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* LOGIN */}

          <div className="admin-register-login">
            <span>Already have an admin account?</span>

            <Link to="/admin/login">Admin Login</Link>
          </div>

          {/* SECURITY */}

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
