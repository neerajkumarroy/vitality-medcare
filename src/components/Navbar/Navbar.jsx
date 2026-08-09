import { useEffect, useState } from "react";

import {
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  /* =====================================================
     STATES
  ===================================================== */

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  /* =====================================================
     NAVIGATION ITEMS
  ===================================================== */

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Doctors",
      path: "/doctors",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  /* =====================================================
     GET INITIALS
  ===================================================== */

  const getInitials = (name = "") => {
    const cleanName = name.trim();

    if (!cleanName) {
      return "U";
    }

    const parts = cleanName.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  /* =====================================================
     CHECK AUTHENTICATION
  ===================================================== */

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    const storedPatient = localStorage.getItem("patient");
    const storedAdmin = localStorage.getItem("admin");

    /* =================================================
       NO TOKEN
    ================================================= */

    if (!token) {
      setUser(null);
      setUserType(null);
      setIsLoggedIn(false);
      return;
    }

    /* =================================================
       PATIENT LOGIN
    ================================================= */

    if (storedPatient) {
      try {
        const parsedPatient = JSON.parse(storedPatient);

        setUser(parsedPatient);
        setUserType("patient");
        setIsLoggedIn(true);

        return;
      } catch (error) {
        console.error("Patient data parsing error:", error);

        localStorage.removeItem("patient");
      }
    }

    /* =================================================
       ADMIN LOGIN
    ================================================= */

    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);

        setUser(parsedAdmin);
        setUserType("admin");
        setIsLoggedIn(true);

        return;
      } catch (error) {
        console.error("Admin data parsing error:", error);

        localStorage.removeItem("admin");
      }
    }

    /* =================================================
       FALLBACK
    ================================================= */

    setUser(null);
    setUserType(null);
    setIsLoggedIn(false);
  };

  /* =====================================================
     INITIAL AUTH CHECK
  ===================================================== */

  useEffect(() => {
    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("patientAuthChanged", handleAuthChange);

    window.addEventListener("adminAuthChanged", handleAuthChange);

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("patientAuthChanged", handleAuthChange);

      window.removeEventListener("adminAuthChanged", handleAuthChange);

      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  /* =====================================================
     SCROLL LISTENER
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     LOCK BACKGROUND SCROLL ON MOBILE MENU
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =====================================================
     CLOSE MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patient");
    localStorage.removeItem("admin");

    setUser(null);
    setUserType(null);
    setIsLoggedIn(false);

    setAccountOpen(false);
    setMenuOpen(false);

    window.dispatchEvent(new Event("patientAuthChanged"));

    window.dispatchEvent(new Event("adminAuthChanged"));

    navigate("/");
  };

  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const userName =
    user?.name || user?.fullName || user?.username || user?.firstName || "User";

  const userEmail = user?.email || "Account";

  const initials = getInitials(userName);

  const shortUserName =
    userName.length > 16 ? `${userName.substring(0, 16)}...` : userName;

  /* =====================================================
     USER TYPE PATHS
  ===================================================== */

  const dashboardPath =
    userType === "admin" ? "/admin/dashboard" : "/patient/dashboard";

  const appointmentsPath =
    userType === "admin" ? "/admin/appointments" : "/patient/appointments";

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        {/* =================================================
            NAVBAR CONTAINER
        ================================================= */}

        <div className="navbar-container">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="navbar-logo-mark">+</div>

            <div className="navbar-logo-text">
              <strong>Vitality</strong>
              <span>MedCare</span>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="navbar-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* DASHBOARD */}

            {isLoggedIn && (
              <NavLink
                to={dashboardPath}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar-link navbar-dashboard-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="navbar-actions">
            {/* =================================================
                LOGGED-IN USER
            ================================================= */}

            {isLoggedIn ? (
              <div
                className="navbar-user-menu"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                {/* USER BUTTON */}

                <button
                  type="button"
                  className={`navbar-user-btn ${accountOpen ? "open" : ""}`}
                  onClick={() => {
                    setAccountOpen((previous) => !previous);
                  }}
                  aria-expanded={accountOpen}
                  aria-label="Open account menu"
                >
                  <span className="navbar-user-avatar">{initials}</span>

                  <span className="navbar-user-name">{shortUserName}</span>

                  <ChevronDown
                    size={14}
                    className={accountOpen ? "navbar-chevron-open" : ""}
                  />
                </button>

                {/* USER DROPDOWN */}

                <div
                  className={`navbar-user-dropdown ${
                    accountOpen ? "open" : ""
                  }`}
                >
                  {/* PROFILE HEADER */}

                  <div className="navbar-user-dropdown-header">
                    <div className="navbar-user-dropdown-avatar">
                      {initials}
                    </div>

                    <div>
                      <strong>{userName}</strong>
                      <span>{userEmail}</span>
                    </div>
                  </div>

                  <div className="navbar-dropdown-divider" />

                  {/* DASHBOARD */}

                  <Link
                    to={dashboardPath}
                    onClick={() => {
                      setAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    <LayoutDashboard size={17} />
                    <span>My Dashboard</span>
                  </Link>

                  {/* APPOINTMENTS */}

                  <Link
                    to={appointmentsPath}
                    onClick={() => {
                      setAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    <CalendarDays size={17} />
                    <span>My Appointments</span>
                  </Link>

                  <div className="navbar-dropdown-divider" />

                  {/* LOGOUT */}

                  <button
                    type="button"
                    className="navbar-logout-link"
                    onClick={handleLogout}
                  >
                    <LogOut size={17} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* =================================================
                 GUEST LOGIN
              ================================================= */

              <div
                className="navbar-login"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                {/* LOGIN BUTTON */}

                <button
                  type="button"
                  className={`navbar-login-btn ${accountOpen ? "open" : ""}`}
                  onClick={() => {
                    setAccountOpen((previous) => !previous);
                  }}
                  aria-expanded={accountOpen}
                  aria-label="Open login menu"
                >
                  Login
                  <ChevronDown
                    size={14}
                    className={accountOpen ? "navbar-chevron-open" : ""}
                  />
                </button>

                {/* =================================================
                    LOGIN DROPDOWN
                ================================================= */}

                <div
                  className={`navbar-login-dropdown ${
                    accountOpen ? "open" : ""
                  }`}
                >
                  {/* =================================================
                      PATIENT ACCOUNT
                  ================================================= */}

                  <div className="navbar-account-group">
                    <div className="navbar-account-heading">
                      <div className="navbar-account-icon patient">
                        <UserRound size={16} />
                      </div>

                      <strong>Patient Account</strong>
                    </div>

                    {/* PATIENT LOGIN */}

                    <Link to="/patient/login" onClick={closeMenu}>
                      Patient Login
                    </Link>

                    {/* PATIENT REGISTER */}

                    <Link to="/patient/register" onClick={closeMenu}>
                      Create Patient Account
                    </Link>
                  </div>

                  {/* DIVIDER */}

                  <div className="navbar-login-divider" />

                  {/* =================================================
                      ADMINISTRATOR
                  ================================================= */}

                  <div className="navbar-account-group">
                    <div className="navbar-account-heading">
                      <div className="navbar-account-icon admin">
                        <ShieldCheck size={16} />
                      </div>

                      <strong>Administrator</strong>
                    </div>

                    {/* ONLY ADMIN LOGIN */}

                    <Link to="/admin/login" onClick={closeMenu}>
                      Admin Login
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                BOOK APPOINTMENT
            ================================================= */}

            <Link
              to="/book-appointment"
              className="navbar-appointment-btn"
              onClick={closeMenu}
            >
              <span>Book Appointment</span>

              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => {
              setMenuOpen((previous) => !previous);

              setAccountOpen(false);
            }}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div className={`navbar-mobile-menu ${menuOpen ? "open" : ""}`}>
          {/* MOBILE NAVIGATION */}

          <nav>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar-mobile-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* MOBILE DASHBOARD */}

            {isLoggedIn && (
              <NavLink
                to={dashboardPath}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar-mobile-link navbar-mobile-dashboard ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <LayoutDashboard size={17} />
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* =================================================
              MOBILE LOGGED-IN USER
          ================================================= */}

          {isLoggedIn ? (
            <div className="navbar-mobile-user">
              {/* USER INFO */}

              <div className="navbar-mobile-user-info">
                <div className="navbar-mobile-user-avatar">{initials}</div>

                <div>
                  <strong>{userName}</strong>
                  <span>{userEmail}</span>
                </div>
              </div>

              {/* DASHBOARD */}

              <Link
                to={dashboardPath}
                onClick={closeMenu}
                className="navbar-mobile-account-link"
              >
                <LayoutDashboard size={16} />
                My Dashboard
              </Link>

              {/* APPOINTMENTS */}

              <Link
                to={appointmentsPath}
                onClick={closeMenu}
                className="navbar-mobile-account-link"
              >
                <CalendarDays size={16} />
                My Appointments
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                className="navbar-mobile-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            /* =================================================
               MOBILE GUEST
            ================================================= */

            <div className="navbar-mobile-login">
              <span className="navbar-mobile-login-title">ACCOUNT ACCESS</span>

              {/* =================================================
                  PATIENT
              ================================================= */}

              <div className="navbar-mobile-account">
                <div className="navbar-mobile-account-title">
                  <UserRound size={16} />

                  <strong>Patient Account</strong>
                </div>

                <Link
                  to="/patient/login"
                  className="navbar-mobile-login-link"
                  onClick={closeMenu}
                >
                  Patient Login
                </Link>

                <Link
                  to="/patient/register"
                  className="navbar-mobile-login-link"
                  onClick={closeMenu}
                >
                  Create Patient Account
                </Link>
              </div>

              {/* =================================================
                  ADMIN
              ================================================= */}

              <div className="navbar-mobile-account">
                <div className="navbar-mobile-account-title">
                  <ShieldCheck size={16} />

                  <strong>Administrator</strong>
                </div>

                {/* ONLY ADMIN LOGIN */}

                <Link
                  to="/admin/login"
                  className="navbar-mobile-login-link"
                  onClick={closeMenu}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          )}

          {/* =================================================
              MOBILE BOOK APPOINTMENT
          ================================================= */}

          <Link
            to="/book-appointment"
            className="navbar-mobile-appointment"
            onClick={closeMenu}
          >
            Book Appointment
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      {/* =====================================================
          NAVBAR SPACER
      ===================================================== */}

      <div className="navbar-spacer" aria-hidden="true" />
    </>
  );
};

export default Navbar;
