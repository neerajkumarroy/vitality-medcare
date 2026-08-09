import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import "./AdminLogin.css";

const API_BASE_URL = "http://localhost:5000/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      // Safe response parsing
      const contentType = response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error("Non JSON response:", text);

        throw new Error(
          "Server returned an invalid response. Please check backend API.",
        );
      }

      console.log("Admin Login Response:", data);

      // API error
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid admin email or password.");
      }

      // Token check
      if (!data.token) {
        throw new Error(
          "Login successful, but authentication token was not received.",
        );
      }

      // Admin role check
      if (!data.user || data.user.role !== "admin") {
        throw new Error("You are not authorized as an administrator.");
      }

      // =====================================================
      // SAVE ADMIN AUTH
      // =====================================================

      localStorage.setItem("adminToken", data.token);

      localStorage.setItem("adminUser", JSON.stringify(data.user));

      localStorage.setItem("adminRememberMe", rememberMe ? "true" : "false");

      console.log("Admin token saved:", data.token);
      console.log("Admin user saved:", data.user);

      // =====================================================
      // REDIRECT
      // =====================================================

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      {/* LEFT */}

      <section className="admin-login-info">
        <motion.div
          className="admin-login-info-inner"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="admin-login-brand">
            <div className="admin-login-brand-icon">
              <Stethoscope size={21} />
            </div>

            <strong>Vitality MedCare</strong>
          </Link>

          <span className="admin-login-label">ADMINISTRATOR ACCESS</span>

          <h1>
            Manage Your
            <span>Clinic With Ease.</span>
          </h1>

          <p>
            Access appointments, patients, doctors, medical services, and clinic
            information from your secure administration dashboard.
          </p>

          <div className="admin-login-features">
            <div>
              <ShieldCheck size={17} />
              <span>Secure Admin Access</span>
            </div>

            <div>
              <ShieldCheck size={17} />
              <span>Manage Clinic Operations</span>
            </div>

            <div>
              <ShieldCheck size={17} />
              <span>Patient & Appointment Management</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RIGHT */}

      <section className="admin-login-form-section">
        <motion.div
          className="admin-login-card"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="admin-login-card-header">
            <div className="admin-login-card-icon">
              <LockKeyhole size={21} />
            </div>

            <span>ADMIN LOGIN</span>

            <h2>Welcome Back</h2>

            <p>Sign in to access the clinic administration panel.</p>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="admin-login-input-group">
              <label htmlFor="admin-email">Email Address</label>

              <div className="admin-login-input">
                <Mail size={16} />

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="admin@vitalitymedcare.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="admin-login-input-group">
              <label htmlFor="admin-password">Password</label>

              <div className="admin-login-input">
                <LockKeyhole size={16} />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}

            <div className="admin-login-options">
              <label className="admin-login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <button type="button" className="admin-login-forgot">
                Forgot Password?
              </button>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="admin-login-register">
            <span>Don't have an admin account?</span>

            <Link to="/admin/register">Create Account</Link>
          </div>

          <div className="admin-login-security">
            <ShieldCheck size={14} />

            <span>
              Your administrator account is protected with secure
              authentication.
            </span>
          </div>

          <Link to="/" className="admin-login-back">
            ← Back to Website
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default AdminLogin;
