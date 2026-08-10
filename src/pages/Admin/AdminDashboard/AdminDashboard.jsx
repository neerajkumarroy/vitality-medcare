/* =====================================================
   ADMIN DASHBOARD - MODERN
   ===================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  HeartPulse,
  LogOut,
  RefreshCw,
  Search,
  Stethoscope,
  Users,
  UserRound,
  X,
  XCircle,
  Ban,
  ChevronDown,
  MoreVertical,
  Trash2,
  Check,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

const API_BASE_URL = "https://vitality-backend-2mr4.onrender.com/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* =====================================================
     STATE
     ===================================================== */

  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  const [error, setError] = useState("");
  const [appointmentError, setAppointmentError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const profileMenuRef = useRef(null);
  const actionMenuRef = useRef(null);

  /* =====================================================
     TOKEN
     ===================================================== */

  const getToken = useCallback(() => {
    return localStorage.getItem("adminToken");
  }, []);

  /* =====================================================
     ADMIN USER
     ===================================================== */

  const getAdminUser = useCallback(() => {
    try {
      const user = localStorage.getItem("adminUser");

      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Admin user parse error:", error);
      return null;
    }
  }, []);

  /* =====================================================
     AUTH HEADERS
     ===================================================== */

  const getHeaders = useCallback(() => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [getToken]);

  /* =====================================================
     LOGOUT
     ===================================================== */

  const handleLogout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminRememberMe");

    navigate("/admin/login", {
      replace: true,
    });
  }, [navigate]);

  /* =====================================================
     AUTH CHECK
     ===================================================== */

  const checkAdminAuth = useCallback(() => {
    const token = getToken();
    const adminUser = getAdminUser();

    if (!token || !adminUser) {
      navigate("/admin/login", {
        replace: true,
      });

      return false;
    }

    if (adminUser.role !== "admin") {
      handleLogout();
      return false;
    }

    return true;
  }, [getToken, getAdminUser, navigate, handleLogout]);

  /* =====================================================
     PARSE API RESPONSE
     ===================================================== */

  const parseResponse = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();

    console.error("Invalid API response:", text);

    throw new Error("Server returned an invalid response.");
  };

  /* =====================================================
     FETCH DASHBOARD
     ===================================================== */

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!checkAdminAuth()) {
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await parseResponse(response);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load admin dashboard.");
      }

      setDashboardData(data);
    } catch (error) {
      console.error("Dashboard Error:", error);

      setError(error.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [checkAdminAuth, getHeaders, handleLogout]);

  /* =====================================================
     FETCH APPOINTMENTS
     ===================================================== */

  const fetchAppointments = useCallback(async () => {
    try {
      setAppointmentsLoading(true);
      setAppointmentError("");

      if (!checkAdminAuth()) {
        return;
      }

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await parseResponse(response);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load appointments.");
      }

      const appointmentList =
        data.appointments || data.data || (Array.isArray(data) ? data : []);

      setAppointments(Array.isArray(appointmentList) ? appointmentList : []);
    } catch (error) {
      console.error("Appointments Error:", error);

      setAppointmentError(error.message || "Unable to load appointments.");
    } finally {
      setAppointmentsLoading(false);
    }
  }, [checkAdminAuth, getHeaders, handleLogout]);

  /* =====================================================
     INITIAL LOAD
     ===================================================== */

  useEffect(() => {
    if (!checkAdminAuth()) {
      return;
    }

    fetchDashboard();
    fetchAppointments();
  }, [checkAdminAuth, fetchDashboard, fetchAppointments]);

  /* =====================================================
     CLOSE MENUS WHEN CLICKING OUTSIDE
     ===================================================== */

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  /* =====================================================
     REFRESH
     ===================================================== */

  const handleRefresh = async () => {
    setOpenActionMenu(null);

    await Promise.all([fetchDashboard(), fetchAppointments()]);
  };

  /* =====================================================
     UPDATE APPOINTMENT STATUS
     ===================================================== */

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      setUpdatingId(appointmentId);
      setAppointmentError("");
      setOpenActionMenu(null);

      if (!checkAdminAuth()) {
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await parseResponse(response);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to update appointment status.");
      }

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment._id === appointmentId
            ? {
                ...appointment,
                status,
              }
            : appointment,
        ),
      );

      setSelectedAppointment((previous) =>
        previous && previous._id === appointmentId
          ? {
              ...previous,
              status,
            }
          : previous,
      );

      await fetchDashboard();
    } catch (error) {
      console.error("Status Update Error:", error);

      setAppointmentError(
        error.message || "Unable to update appointment status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================================================
     DELETE APPOINTMENT
     ===================================================== */

  const handleDeleteAppointment = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this appointment?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(appointmentId);
      setAppointmentError("");
      setOpenActionMenu(null);

      if (!checkAdminAuth()) {
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        },
      );

      const data = await parseResponse(response);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete appointment.");
      }

      setAppointments((previous) =>
        previous.filter((appointment) => appointment._id !== appointmentId),
      );

      setSelectedAppointment((previous) =>
        previous && previous._id === appointmentId ? null : previous,
      );

      await fetchDashboard();
    } catch (error) {
      console.error("Delete Appointment Error:", error);

      setAppointmentError(error.message || "Unable to delete appointment.");
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
     STATUS ACTIONS
     ===================================================== */

  const handleConfirm = (id) => {
    updateAppointmentStatus(id, "confirmed");
  };

  const handleReject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this appointment?",
    );

    if (!confirmed) {
      return;
    }

    updateAppointmentStatus(id, "rejected");
  };

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) {
      return;
    }

    updateAppointmentStatus(id, "cancelled");
  };

  const handleComplete = (id) => {
    updateAppointmentStatus(id, "completed");
  };

  /* =====================================================
     FORMAT DATE
     ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =====================================================
     FORMAT STATUS
     ===================================================== */

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "pending":
        return "status-pending";

      case "rejected":
        return "status-rejected";

      case "cancelled":
      case "canceled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  /* =====================================================
     NORMALIZE APPOINTMENT
     ===================================================== */

  const normalizeAppointment = (appointment) => {
    const patient = appointment.patient || appointment.user || {};

    const doctor = appointment.doctor || {};

    return {
      ...appointment,

      patientName:
        patient.name ||
        appointment.patientName ||
        appointment.name ||
        "Patient",

      patientEmail:
        patient.email || appointment.patientEmail || appointment.email || "N/A",

      patientPhone:
        patient.phone ||
        patient.mobile ||
        appointment.patientPhone ||
        appointment.phone ||
        appointment.mobile ||
        "N/A",

      doctorName: doctor.name || appointment.doctorName || "Doctor",

      doctorEmail: doctor.email || appointment.doctorEmail || "",

      doctorPhone: doctor.phone || appointment.doctorPhone || "",

      service:
        appointment.service ||
        appointment.reason ||
        appointment.department ||
        "Medical Consultation",

      date: appointment.date || appointment.appointmentDate,

      time: appointment.time || appointment.appointmentTime,

      reason:
        appointment.reason ||
        appointment.message ||
        appointment.notes ||
        appointment.description ||
        "No additional notes provided.",

      status: appointment.status || "pending",
    };
  };

  /* =====================================================
     FILTER APPOINTMENTS
     ===================================================== */

  const filteredAppointments = useMemo(() => {
    const normalized = appointments.map(normalizeAppointment);

    return normalized.filter((appointment) => {
      const search = searchTerm.toLowerCase().trim();

      const patientName = appointment.patientName?.toLowerCase() || "";

      const patientEmail = appointment.patientEmail?.toLowerCase() || "";

      const patientPhone = appointment.patientPhone?.toLowerCase() || "";

      const doctorName = appointment.doctorName?.toLowerCase() || "";

      const service = appointment.service?.toLowerCase() || "";

      const matchesSearch =
        !search ||
        patientName.includes(search) ||
        patientEmail.includes(search) ||
        patientPhone.includes(search) ||
        doctorName.includes(search) ||
        service.includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  /* =====================================================
     STATS
     ===================================================== */

  const apiStats = dashboardData?.stats || {};

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.status?.toLowerCase() === "pending",
  ).length;

  const totalPatients = dashboardData?.stats?.totalPatients ?? 0;

  const totalDoctors = dashboardData?.stats?.totalDoctors ?? 0;

  /* =====================================================
     TODAY
     ===================================================== */

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* =====================================================
     ADMIN
     ===================================================== */

  const adminUser = getAdminUser();

  const adminName =
    dashboardData?.admin?.name || adminUser?.name || "Vitality MedCare Admin";

  /* =====================================================
     ADMIN INITIALS
     ===================================================== */

  const getInitials = (name) => {
    if (!name) {
      return "VA";
    }

    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const adminInitials = getInitials(adminName);

  /* =====================================================
     ACTION MENU
     ===================================================== */

  const renderActionMenu = (appointment) => {
    const status = appointment.status?.toLowerCase();

    const isUpdating = updatingId === appointment._id;
    const isDeleting = deletingId === appointment._id;

    return (
      <AnimatePresence>
        {openActionMenu === appointment._id && (
          <motion.div
            className="admin-action-menu"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: -6,
            }}
            transition={{
              duration: 0.14,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="admin-action-menu-header">
              <small>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
              </small>
            </div>

            {/* VIEW DETAILS */}
            <motion.button
              type="button"
              className="admin-menu-action admin-menu-view"
              onClick={() => {
                setSelectedAppointment(appointment);
                setOpenActionMenu(null);
              }}
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                <Eye size={15} />
              </span>

              <span>View Details</span>

              <ArrowRight size={13} className="admin-menu-arrow" />
            </motion.button>

            <div className="admin-menu-divider" />

            {/* PENDING */}
            <motion.button
              type="button"
              className={`admin-menu-action admin-menu-pending ${
                status === "pending" ? "current-status" : ""
              }`}
              disabled={isUpdating}
              onClick={() =>
                updateAppointmentStatus(appointment._id, "pending")
              }
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                <Clock3 size={15} />
              </span>

              <span>Pending</span>

              {status === "pending" && (
                <Check size={13} className="admin-current-check" />
              )}
            </motion.button>

            {/* CONFIRMED */}
            <motion.button
              type="button"
              className={`admin-menu-action admin-menu-confirm ${
                status === "confirmed" ? "current-status" : ""
              }`}
              disabled={isUpdating}
              onClick={() =>
                updateAppointmentStatus(appointment._id, "confirmed")
              }
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                <Check size={15} />
              </span>

              <span>Confirmed</span>

              {status === "confirmed" && (
                <Check size={13} className="admin-current-check" />
              )}
            </motion.button>

            {/* CANCELLED */}
            <motion.button
              type="button"
              className={`admin-menu-action admin-menu-cancel ${
                status === "cancelled" || status === "canceled"
                  ? "current-status"
                  : ""
              }`}
              disabled={isUpdating}
              onClick={() =>
                updateAppointmentStatus(appointment._id, "cancelled")
              }
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                <Ban size={15} />
              </span>

              <span>Cancelled</span>

              {(status === "cancelled" || status === "canceled") && (
                <Check size={13} className="admin-current-check" />
              )}
            </motion.button>

            {/* COMPLETED */}
            <motion.button
              type="button"
              className={`admin-menu-action admin-menu-complete ${
                status === "completed" ? "current-status" : ""
              }`}
              disabled={isUpdating}
              onClick={() =>
                updateAppointmentStatus(appointment._id, "completed")
              }
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                <CheckCircle2 size={15} />
              </span>

              <span>Completed</span>

              {status === "completed" && (
                <Check size={13} className="admin-current-check" />
              )}
            </motion.button>

            <div className="admin-menu-divider" />

            {/* DELETE */}
            <motion.button
              type="button"
              className="admin-menu-action admin-menu-delete"
              disabled={isDeleting}
              onClick={() => handleDeleteAppointment(appointment._id)}
              whileHover={{ x: 2 }}
            >
              <span className="admin-menu-action-icon">
                {isDeleting ? (
                  <RefreshCw size={15} className="admin-action-spinner" />
                ) : (
                  <Trash2 size={15} />
                )}
              </span>

              <span>Delete Appointment</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <main className="admin-dashboard-page">
        <div className="admin-loading-screen">
          <div className="admin-loading-spinner">
            <RefreshCw size={22} />
          </div>

          <h3>Loading dashboard</h3>

          <p>Preparing your clinic administration workspace...</p>
        </div>
      </main>
    );
  }

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <main className="admin-dashboard-page">
      {/* =================================================
          TOPBAR
      ================================================= */}

      <header className="admin-topbar">
        <div className="admin-container admin-topbar-inner">
          {/* BRAND */}

          <div className="admin-brand">
            <div className="admin-brand-icon">
              <Stethoscope size={21} />
            </div>

            <div>
              <strong>Vitality MedCare</strong>

              <span>Administration</span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="admin-topbar-right">
            {/* REFRESH */}
            <motion.button
              type="button"
              className="admin-refresh-button"
              onClick={handleRefresh}
              title="Refresh Dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={15} />

              <span>Refresh</span>
            </motion.button>

            {/* PROFILE */}
            <div className="admin-profile-wrapper" ref={profileMenuRef}>
              <motion.button
                type="button"
                className="admin-profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                whileHover={{ backgroundColor: "#f5f8f9" }}
              >
                <div className="admin-profile-avatar-small">
                  {adminInitials}
                </div>

                <div className="admin-profile-text">
                  <strong>{adminName.split(" ")[0]}</strong>

                  <span>Admin</span>
                </div>

                <ChevronDown
                  size={14}
                  style={{
                    transform: showProfileMenu
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </motion.button>

              {/* PROFILE MENU */}

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    className="admin-profile-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="admin-menu-user">
                      <strong>{adminName}</strong>

                      <span>{adminUser?.email || "admin@clinic.com"}</span>
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleLogout}
                      whileHover={{ backgroundColor: "#fff2f2" }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="admin-dashboard-hero">
        <div className="admin-container admin-hero-inner">
          <div>
            <span className="admin-eyebrow">ADMINISTRATION PANEL</span>

            <h1>
              Clinic <strong>Dashboard</strong>
            </h1>

            <p>
              Manage appointments, patients, doctors and daily clinic operations
              from one secure workspace.
            </p>
          </div>

          <div className="admin-today-card">
            <CalendarDays size={16} />

            <div>
              <span>Today</span>

              <strong>{today}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="admin-dashboard-content">
        <div className="admin-container">
          {/* ERROR */}

          {error && (
            <motion.div
              className="admin-alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <XCircle size={17} />

              <span>{error}</span>
            </motion.div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          <div className="admin-stats-grid">
            {/* TOTAL */}

            <motion.div
              className="admin-stat-card"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(30, 50, 70, 0.08)",
              }}
            >
              <div className="admin-stat-icon">
                <CalendarDays size={20} />
              </div>

              <div className="admin-stat-content">
                <span>Total Appointments</span>

                <strong>{totalAppointments}</strong>

                <small>All bookings</small>
              </div>
            </motion.div>

            {/* PENDING */}

            <motion.div
              className="admin-stat-card"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.05,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(30, 50, 70, 0.08)",
              }}
            >
              <div className="admin-stat-icon">
                <Clock3 size={20} />
              </div>

              <div className="admin-stat-content">
                <span>Pending</span>

                <strong>{pendingAppointments}</strong>

                <small>Require attention</small>
              </div>
            </motion.div>

            {/* PATIENTS */}

            <motion.div
              className="admin-stat-card"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(30, 50, 70, 0.08)",
              }}
            >
              <div className="admin-stat-icon">
                <Users size={20} />
              </div>

              <div className="admin-stat-content">
                <span>Total Patients</span>

                <strong>{totalPatients}</strong>

                <small>Registered patients</small>
              </div>
            </motion.div>

            {/* DOCTORS */}

            <motion.div
              className="admin-stat-card"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(30, 50, 70, 0.08)",
              }}
            >
              <div className="admin-stat-icon">
                <Stethoscope size={20} />
              </div>

              <div className="admin-stat-content">
                <span>Medical Specialists</span>

                <strong>{totalDoctors}</strong>

                <small>Active doctors</small>
              </div>
            </motion.div>
          </div>

          {/* =================================================
              APPOINTMENT PANEL
          ================================================= */}

          <motion.section
            className="admin-appointment-panel"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            {/* HEADER */}

            <div className="admin-appointment-header">
              <div>
                <span className="admin-eyebrow">APPOINTMENT MANAGEMENT</span>

                <h2>Appointment Requests</h2>

                <p>Review and manage every appointment from here.</p>
              </div>

              <div className="admin-live-badge">
                <span></span>
                Live
              </div>
            </div>

            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="admin-appointment-toolbar">
              <div className="admin-search-box">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search patient, doctor or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {searchTerm && (
                  <motion.button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </div>

              <div className="admin-status-filter">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>

                  <option value="pending">Pending</option>

                  <option value="confirmed">Confirmed</option>

                  <option value="completed">Completed</option>

                  <option value="rejected">Rejected</option>

                  <option value="cancelled">Cancelled</option>
                </select>

                <ChevronDown size={14} />
              </div>
            </div>

            {/* ERROR */}

            {appointmentError && (
              <motion.div
                className="admin-appointment-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertTriangle size={16} />

                <span>{appointmentError}</span>
              </motion.div>
            )}

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="admin-table">
              {/* TABLE HEAD */}

              <div className="admin-table-head">
                <span>Patient</span>

                <span>Appointment</span>

                <span>Doctor / Service</span>

                <span>Status</span>
              </div>

              {/* LOADING */}

              {appointmentsLoading ? (
                <div className="admin-table-loading">
                  <RefreshCw size={23} />

                  <span>Loading appointments...</span>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="admin-no-appointments">
                  <CalendarDays size={30} />

                  <h3>No appointments found</h3>

                  <p>Try changing your search or status filter.</p>
                </div>
              ) : (
                filteredAppointments.slice(0, 10).map((appointment) => {
                  const status = appointment.status?.toLowerCase();

                  const isUpdating = updatingId === appointment._id;

                  const isDeleting = deletingId === appointment._id;

                  return (
                    <motion.div
                      className="admin-table-row"
                      key={appointment._id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      onClick={() => setSelectedAppointment(appointment)}
                      whileHover={{ backgroundColor: "#fbfdfd" }}
                    >
                      {/* PATIENT */}

                      <div className="admin-patient-cell">
                        <div className="admin-patient-avatar">
                          <UserRound size={16} />
                        </div>

                        <div>
                          <strong>{appointment.patientName}</strong>

                          <small>{appointment.patientEmail}</small>
                        </div>
                      </div>

                      {/* APPOINTMENT */}

                      <div className="admin-date-cell">
                        <strong>{formatDate(appointment.date)}</strong>

                        <small>{appointment.time || "N/A"}</small>
                      </div>

                      {/* DOCTOR */}

                      <div className="admin-doctor-cell">
                        <strong>{appointment.doctorName}</strong>

                        <small>{appointment.service}</small>
                      </div>

                      {/* STATUS */}

                      <div>
                        <span
                          className={`admin-status ${getStatusClass(status)}`}
                        >
                          <span></span>

                          {status}
                        </span>
                      </div>

                      {/* ACTION */}

                      <div
                        className="admin-row-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* VIEW */}

                        <motion.button
                          type="button"
                          className="admin-view-button"
                          title="View Appointment"
                          onClick={() => setSelectedAppointment(appointment)}
                          whileHover={{ scale: 1.08, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye size={15} />
                        </motion.button>

                        {/* THREE DOTS */}

                        <div
                          className="admin-action-dropdown"
                          ref={
                            openActionMenu === appointment._id
                              ? actionMenuRef
                              : null
                          }
                        >
                          <motion.button
                            type="button"
                            className={`admin-more-button ${
                              openActionMenu === appointment._id ? "active" : ""
                            }`}
                            title="More Actions"
                            aria-label="More appointment actions"
                            aria-expanded={openActionMenu === appointment._id}
                            onClick={(event) => {
                              event.stopPropagation();
                              setOpenActionMenu((previous) =>
                                previous === appointment._id
                                  ? null
                                  : appointment._id,
                              );
                            }}
                            whileHover={{ scale: 1.08, y: -1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isUpdating || isDeleting ? (
                              <RefreshCw
                                size={15}
                                className="admin-action-spinner"
                              />
                            ) : (
                              <MoreVertical size={16} />
                            )}
                          </motion.button>

                          {renderActionMenu(appointment)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* FOOTER */}

            {!appointmentsLoading && filteredAppointments.length > 0 && (
              <div className="admin-table-footer">
                <span>
                  Showing {Math.min(filteredAppointments.length, 10)} of{" "}
                  {filteredAppointments.length} appointments
                </span>

                <span>
                  Use the <strong>⋮</strong> menu for actions
                </span>
              </div>
            )}
          </motion.section>

          {/* =================================================
              BOTTOM CARDS
          ================================================= */}

          <div className="admin-bottom-grid">
            {/* CLINIC STATUS */}

            <motion.div
              className="admin-clinic-status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={{ y: -2 }}
            >
              <div className="admin-clinic-status-icon">
                <HeartPulse size={21} />
              </div>

              <div>
                <span>CLINIC STATUS</span>

                <h3>Everything is running smoothly.</h3>

                <p>All major clinic services are currently operational.</p>
              </div>

              <div className="admin-online">
                <span></span>
                Clinic Online
              </div>
            </motion.div>

            {/* WORKSPACE */}

            <motion.div
              className="admin-quick-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <div className="admin-quick-icon">
                <Activity size={20} />
              </div>

              <div>
                <span>ADMIN WORKSPACE</span>

                <h3>Manage your clinic efficiently.</h3>

                <p>
                  Use appointment requests to review and manage patient
                  bookings.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FIXED ADMIN STATUS BAR
      ===================================================== */}
      <div className="admin-fixed-status-bar">
        <div className="admin-fixed-status-inner">
          <span className="admin-fixed-status-dot"></span>
          <span>Admin workspace active</span>
          <span className="admin-fixed-status-separator"></span>
          <span>{filteredAppointments.length} visible appointments</span>
        </div>
      </div>

      {/* =====================================================
          APPOINTMENT DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedAppointment && (
          <motion.div
            className="admin-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedAppointment(null)}
          >
            <motion.div
              className="admin-appointment-modal"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}

              <div className="admin-modal-header">
                <div>
                  <span>APPOINTMENT DETAILS</span>

                  <h2>{selectedAppointment.patientName}</h2>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="admin-modal-close"
                  whileHover={{ scale: 1.08, backgroundColor: "#fff6f6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* STATUS */}

              <div className="admin-modal-status-row">
                <span
                  className={`admin-status ${getStatusClass(
                    selectedAppointment.status,
                  )}`}
                >
                  <span></span>

                  {selectedAppointment.status}
                </span>

                <span className="admin-modal-id">
                  ID: {selectedAppointment._id || "N/A"}
                </span>
              </div>

              {/* MODAL BODY */}

              <div className="admin-modal-body">
                {/* PATIENT */}

                <div className="admin-detail-section">
                  <div className="admin-detail-title">
                    <UserRound size={16} />

                    <h3>Patient Information</h3>
                  </div>

                  <div className="admin-detail-grid">
                    <div>
                      <span>Full Name</span>

                      <strong>{selectedAppointment.patientName}</strong>
                    </div>

                    <div>
                      <span>Email Address</span>

                      <strong>{selectedAppointment.patientEmail}</strong>
                    </div>

                    <div>
                      <span>Phone Number</span>

                      <strong>{selectedAppointment.patientPhone}</strong>
                    </div>

                    {selectedAppointment.patient?.gender && (
                      <div>
                        <span>Gender</span>

                        <strong>{selectedAppointment.patient.gender}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* APPOINTMENT */}

                <div className="admin-detail-section">
                  <div className="admin-detail-title">
                    <CalendarDays size={16} />

                    <h3>Appointment Information</h3>
                  </div>

                  <div className="admin-detail-grid">
                    <div>
                      <span>Date</span>

                      <strong>{formatDate(selectedAppointment.date)}</strong>
                    </div>

                    <div>
                      <span>Time</span>

                      <strong>{selectedAppointment.time || "N/A"}</strong>
                    </div>

                    <div>
                      <span>Service</span>

                      <strong>{selectedAppointment.service}</strong>
                    </div>

                    <div>
                      <span>Doctor</span>

                      <strong>{selectedAppointment.doctorName}</strong>
                    </div>
                  </div>
                </div>

                {/* DOCTOR */}

                <div className="admin-detail-section">
                  <div className="admin-detail-title">
                    <Stethoscope size={16} />

                    <h3>Doctor Information</h3>
                  </div>

                  <div className="admin-detail-grid">
                    <div>
                      <span>Doctor</span>

                      <strong>{selectedAppointment.doctorName}</strong>
                    </div>

                    {selectedAppointment.doctorEmail && (
                      <div>
                        <span>Doctor Email</span>

                        <strong>{selectedAppointment.doctorEmail}</strong>
                      </div>
                    )}

                    {selectedAppointment.doctorPhone && (
                      <div>
                        <span>Doctor Phone</span>

                        <strong>{selectedAppointment.doctorPhone}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* NOTES */}

                <div className="admin-detail-section">
                  <div className="admin-detail-title">
                    <FileText size={16} />

                    <h3>Patient Notes</h3>
                  </div>

                  <div className="admin-notes">
                    {selectedAppointment.reason}
                  </div>
                </div>
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="admin-modal-footer">
                {/* CLOSE */}

                <motion.button
                  type="button"
                  className="admin-modal-secondary"
                  onClick={() => setSelectedAppointment(null)}
                  whileHover={{ backgroundColor: "#f6f8fa" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>

                {/* DELETE */}

                <motion.button
                  type="button"
                  className="admin-modal-delete"
                  disabled={deletingId === selectedAppointment._id}
                  onClick={() =>
                    handleDeleteAppointment(selectedAppointment._id)
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {deletingId === selectedAppointment._id ? (
                    <RefreshCw size={15} className="admin-action-spinner" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                  Delete
                </motion.button>

                {/* PENDING */}

                {selectedAppointment.status?.toLowerCase() === "pending" && (
                  <>
                    <motion.button
                      type="button"
                      className="admin-modal-reject"
                      disabled={updatingId === selectedAppointment._id}
                      onClick={() => handleReject(selectedAppointment._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <XCircle size={15} />
                      Reject
                    </motion.button>

                    <motion.button
                      type="button"
                      className="admin-modal-confirm"
                      disabled={updatingId === selectedAppointment._id}
                      onClick={() => handleConfirm(selectedAppointment._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle2 size={15} />
                      Confirm
                    </motion.button>
                  </>
                )}

                {/* CONFIRMED */}

                {selectedAppointment.status?.toLowerCase() === "confirmed" && (
                  <>
                    <motion.button
                      type="button"
                      className="admin-modal-reject"
                      disabled={updatingId === selectedAppointment._id}
                      onClick={() => handleCancel(selectedAppointment._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Ban size={15} />
                      Cancel
                    </motion.button>

                    <motion.button
                      type="button"
                      className="admin-modal-confirm"
                      disabled={updatingId === selectedAppointment._id}
                      onClick={() => handleComplete(selectedAppointment._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle2 size={15} />
                      Mark Completed
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminDashboard;
