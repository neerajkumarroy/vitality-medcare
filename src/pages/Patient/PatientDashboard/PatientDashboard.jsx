import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Stethoscope,
  UserRound,
  X,
  LogOut,
  ClipboardList,
  CircleAlert,
  Ban,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./PatientDashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Appointment modal
  const [showAppointments, setShowAppointments] = useState(false);

  /*
  =====================================================
  FETCH PATIENT + APPOINTMENTS
  =====================================================
  */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        /*
        TOKEN CHECK
        */

        if (!token) {
          navigate("/patient/login");
          return;
        }

        /*
        PATIENT FROM LOCAL STORAGE
        */

        const storedPatient = localStorage.getItem("patient");

        if (storedPatient) {
          try {
            setPatient(JSON.parse(storedPatient));
          } catch (error) {
            console.error("Patient localStorage data error:", error);
          }
        }

        /*
        FETCH APPOINTMENTS
        */

        const response = await fetch(
          "https://vitality-backend-2mr4.onrender.com/api/appointments/my",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        console.log("Patient Appointments:", data);

        /*
        AUTH ERROR
        */

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("patient");

          navigate("/patient/login");
          return;
        }

        /*
        API ERROR
        */

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch appointment data.");
        }

        /*
        APPOINTMENT DATA
        */

        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        } else if (Array.isArray(data.data)) {
          setAppointments(data.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Dashboard data error:", error);

        setError(error.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  /*
  =====================================================
  LOGOUT
  =====================================================
  */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patient");

    navigate("/patient/login");
  };

  /*
  =====================================================
  APPOINTMENT HELPERS
  =====================================================
  */

  const getAppointmentDate = (appointment) => {
    return (
      appointment.date ||
      appointment.appointmentDate ||
      appointment.bookingDate ||
      ""
    );
  };

  const getAppointmentTime = (appointment) => {
    return appointment.time || appointment.appointmentTime || "";
  };

  const getDoctorName = (appointment) => {
    if (appointment.doctor?.name) {
      return appointment.doctor.name;
    }

    if (appointment.doctorName) {
      return appointment.doctorName;
    }

    if (typeof appointment.doctor === "string") {
      return appointment.doctor;
    }

    return "Doctor";
  };

  const getDoctorSpecialization = (appointment) => {
    if (appointment.doctor?.specialization) {
      return appointment.doctor.specialization;
    }

    if (appointment.specialization) {
      return appointment.specialization;
    }

    if (appointment.department) {
      return appointment.department;
    }

    return "Medical Consultation";
  };

  const getAppointmentStatus = (appointment) => {
    return appointment.status || "Pending";
  };

  /*
  =====================================================
  STATUS CLASS
  =====================================================
  */

  const getStatusClass = (status) => {
    const normalized = String(status).toLowerCase();

    if (normalized === "completed") {
      return "status-completed";
    }

    if (normalized === "cancelled" || normalized === "canceled") {
      return "status-cancelled";
    }

    if (
      normalized === "confirmed" ||
      normalized === "approved" ||
      normalized === "scheduled"
    ) {
      return "status-confirmed";
    }

    return "status-pending";
  };

  /*
  =====================================================
  APPOINTMENT FILTERING
  =====================================================
  */

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const status = getAppointmentStatus(appointment).toLowerCase();

      return (
        status !== "completed" &&
        status !== "cancelled" &&
        status !== "canceled"
      );
    });
  }, [appointments]);

  const completedAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        getAppointmentStatus(appointment).toLowerCase() === "completed",
    );
  }, [appointments]);

  const cancelledAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const status = getAppointmentStatus(appointment).toLowerCase();

      return status === "cancelled" || status === "canceled";
    });
  }, [appointments]);

  const nextAppointment =
    upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  /*
  =====================================================
  PATIENT INFORMATION
  =====================================================
  */

  const patientName = patient?.name || patient?.fullName || "Patient";

  const patientEmail = patient?.email || "";

  /*
  =====================================================
  CLOSE MODAL
  =====================================================
  */

  const closeAppointmentsModal = () => {
    setShowAppointments(false);
  };

  /*
  =====================================================
  ESCAPE KEY
  =====================================================
  */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowAppointments(false);
      }
    };

    if (showAppointments) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAppointments]);

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div className="patient-dashboard-loading">
        <div className="patient-loading-spinner"></div>

        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard-page">
      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section className="patient-dashboard-header">
        <div className="patient-dashboard-container">
          <motion.div
            className="patient-dashboard-welcome"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <span>YOUR HEALTH DASHBOARD</span>

            <h1>
              Hello, <strong>{patientName}</strong>
            </h1>

            <p>
              Manage your appointments and keep track of your healthcare journey
              from one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <section className="patient-dashboard-section">
        <div className="patient-dashboard-container">
          {/* ERROR */}

          {error && (
            <div className="patient-dashboard-error">
              <CircleAlert size={17} />

              <span>{error}</span>
            </div>
          )}

          {/* =====================================================
              QUICK STATS
          ===================================================== */}

          <div className="patient-dashboard-stats">
            {/* UPCOMING */}

            <div className="patient-dashboard-stat">
              <div className="patient-dashboard-stat-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <strong>
                  {upcomingAppointments.length.toString().padStart(2, "0")}
                </strong>

                <span>Upcoming</span>
              </div>
            </div>

            {/* COMPLETED */}

            <div className="patient-dashboard-stat">
              <div className="patient-dashboard-stat-icon">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <strong>
                  {completedAppointments.length.toString().padStart(2, "0")}
                </strong>

                <span>Completed</span>
              </div>
            </div>

            {/* TOTAL */}

            <div className="patient-dashboard-stat">
              <div className="patient-dashboard-stat-icon">
                <ClipboardList size={19} />
              </div>

              <div>
                <strong>
                  {appointments.length.toString().padStart(2, "0")}
                </strong>

                <span>Total Visits</span>
              </div>
            </div>

            {/* CANCELLED */}

            <div className="patient-dashboard-stat">
              <div className="patient-dashboard-stat-icon cancelled">
                <Ban size={19} />
              </div>

              <div>
                <strong>
                  {cancelledAppointments.length.toString().padStart(2, "0")}
                </strong>

                <span>Cancelled</span>
              </div>
            </div>
          </div>

          {/* =====================================================
              CONTENT GRID
          ===================================================== */}

          <div className="patient-dashboard-grid">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="patient-dashboard-main">
              {/* =================================================
                  NEXT APPOINTMENT
              ================================================= */}

              <motion.div
                className="patient-dashboard-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <div className="patient-card-header">
                  <div>
                    <span>NEXT VISIT</span>

                    <h2>Upcoming Appointment</h2>
                  </div>

                  {nextAppointment && (
                    <span
                      className={`patient-status-badge ${getStatusClass(
                        getAppointmentStatus(nextAppointment),
                      )}`}
                    >
                      {getAppointmentStatus(nextAppointment)}
                    </span>
                  )}
                </div>

                {nextAppointment ? (
                  <>
                    {/* DOCTOR */}

                    <div className="patient-appointment-card">
                      <div className="patient-doctor-avatar">
                        <Stethoscope size={25} />
                      </div>

                      <div className="patient-doctor-info">
                        <strong>{getDoctorName(nextAppointment)}</strong>

                        <span>{getDoctorSpecialization(nextAppointment)}</span>
                      </div>
                    </div>

                    {/* DETAILS */}

                    <div className="patient-appointment-details">
                      <div>
                        <CalendarDays size={17} />

                        <span>
                          <small>Date</small>

                          <strong>
                            {getAppointmentDate(nextAppointment) ||
                              "Not available"}
                          </strong>
                        </span>
                      </div>

                      <div>
                        <Clock3 size={17} />

                        <span>
                          <small>Time</small>

                          <strong>
                            {getAppointmentTime(nextAppointment) ||
                              "Not available"}
                          </strong>
                        </span>
                      </div>

                      <div>
                        <MapPin size={17} />

                        <span>
                          <small>Location</small>

                          <strong>
                            {nextAppointment.location ||
                              nextAppointment.clinic ||
                              "Clinic"}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="patient-appointment-actions">
                      <button
                        type="button"
                        className="patient-primary-action"
                        onClick={() => setShowAppointments(true)}
                      >
                        View Appointment
                        <ArrowRight size={14} />
                      </button>

                      <Link
                        to="/book-appointment"
                        className="patient-secondary-action"
                      >
                        Book Another
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="patient-empty-state">
                    <div className="patient-empty-icon">
                      <CalendarDays size={30} />
                    </div>

                    <h3>No upcoming appointment</h3>

                    <p>You currently don't have any upcoming appointments.</p>

                    <Link to="/book-appointment">
                      Book an Appointment
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* =================================================
                  RECENT HISTORY
              ================================================= */}

              <motion.div
                className="patient-dashboard-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <div className="patient-card-header">
                  <div>
                    <span>RECENT ACTIVITY</span>

                    <h2>Appointment History</h2>
                  </div>

                  <button
                    type="button"
                    className="patient-view-all-btn"
                    onClick={() => setShowAppointments(true)}
                  >
                    View All
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="patient-history-list">
                  {appointments.length > 0 ? (
                    appointments.slice(0, 5).map((appointment) => (
                      <button
                        className="patient-history-item"
                        key={appointment._id}
                        type="button"
                        onClick={() => setShowAppointments(true)}
                      >
                        <div className="patient-history-icon">
                          <Stethoscope size={17} />
                        </div>

                        <div className="patient-history-info">
                          <strong>{getDoctorName(appointment)}</strong>

                          <span>
                            {appointment.reason ||
                              appointment.service ||
                              getDoctorSpecialization(appointment)}
                          </span>
                        </div>

                        <div className="patient-history-date">
                          <strong>
                            {getAppointmentDate(appointment) || "—"}
                          </strong>

                          <span
                            className={getStatusClass(
                              getAppointmentStatus(appointment),
                            )}
                          >
                            {getAppointmentStatus(appointment)}
                          </span>
                        </div>

                        <ArrowRight
                          className="patient-history-arrow"
                          size={15}
                        />
                      </button>
                    ))
                  ) : (
                    <div className="patient-history-empty">
                      No appointment history found.
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="patient-dashboard-sidebar">
              {/* PROFILE */}

              <div className="patient-dashboard-card patient-profile-card">
                <div className="patient-profile-avatar">
                  <UserRound size={27} />
                </div>

                <span>MY PROFILE</span>

                <h2>{patientName}</h2>

                <p>{patientEmail || "Patient account"}</p>

                <Link to="/patient/profile" className="patient-profile-btn">
                  Manage Profile
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* QUICK ACTIONS */}

              <div className="patient-dashboard-card">
                <div className="patient-card-header">
                  <div>
                    <span>QUICK ACCESS</span>

                    <h2>Quick Actions</h2>
                  </div>
                </div>

                <div className="patient-quick-actions">
                  {/* MY APPOINTMENTS */}

                  <button
                    type="button"
                    onClick={() => setShowAppointments(true)}
                  >
                    <CalendarDays size={17} />

                    <span>
                      My Appointments
                      <small>View your appointment history</small>
                    </span>

                    <ArrowRight size={14} />
                  </button>

                  {/* BOOK APPOINTMENT */}

                  <Link to="/book-appointment">
                    <Clock3 size={17} />

                    <span>
                      Book Appointment
                      <small>Schedule a new visit</small>
                    </span>

                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* HELP */}

              <div className="patient-dashboard-help">
                <div>
                  <Stethoscope size={20} />
                </div>

                <span>NEED HELP?</span>

                <h3>Talk to Our Team</h3>

                <p>Have questions about your appointment or healthcare?</p>

                <Link to="/contact">
                  Contact Clinic
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* LOGOUT */}

              <button
                className="patient-logout-btn"
                onClick={handleLogout}
                type="button"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPOINTMENTS MODAL
      ===================================================== */}

      {showAppointments && (
        <div
          className="patient-appointments-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAppointmentsModal();
            }
          }}
        >
          <motion.div
            className="patient-appointments-modal"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
          >
            {/* MODAL HEADER */}

            <div className="patient-modal-header">
              <div>
                <span>YOUR RECORD</span>

                <h2>My Appointments</h2>

                <p>
                  {appointments.length} appointment
                  {appointments.length !== 1 ? "s" : ""} found in your account.
                </p>
              </div>

              <button
                type="button"
                className="patient-modal-close"
                onClick={closeAppointmentsModal}
                aria-label="Close appointments"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="patient-modal-content">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div
                    className="patient-modal-appointment"
                    key={appointment._id}
                  >
                    {/* TOP */}

                    <div className="patient-modal-appointment-top">
                      <div className="patient-modal-doctor">
                        <div className="patient-modal-doctor-icon">
                          <Stethoscope size={19} />
                        </div>

                        <div>
                          <strong>{getDoctorName(appointment)}</strong>

                          <span>{getDoctorSpecialization(appointment)}</span>
                        </div>
                      </div>

                      <span
                        className={`patient-modal-status ${getStatusClass(
                          getAppointmentStatus(appointment),
                        )}`}
                      >
                        {getAppointmentStatus(appointment)}
                      </span>
                    </div>

                    {/* DETAILS */}

                    <div className="patient-modal-details">
                      <div>
                        <CalendarDays size={15} />

                        <span>
                          <small>Date</small>

                          <strong>
                            {getAppointmentDate(appointment) || "Not available"}
                          </strong>
                        </span>
                      </div>

                      <div>
                        <Clock3 size={15} />

                        <span>
                          <small>Time</small>

                          <strong>
                            {getAppointmentTime(appointment) || "Not available"}
                          </strong>
                        </span>
                      </div>

                      <div>
                        <MapPin size={15} />

                        <span>
                          <small>Location</small>

                          <strong>
                            {appointment.location ||
                              appointment.clinic ||
                              "Clinic"}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* REASON */}

                    {(appointment.reason || appointment.service) && (
                      <div className="patient-modal-reason">
                        <FileText size={15} />

                        <div>
                          <small>Appointment Purpose</small>

                          <strong>
                            {appointment.reason || appointment.service}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="patient-modal-empty">
                  <div>
                    <CalendarDays size={28} />
                  </div>

                  <h3>No appointments yet</h3>

                  <p>
                    You don't have any appointments associated with your
                    account.
                  </p>

                  <Link to="/book-appointment" onClick={closeAppointmentsModal}>
                    Book an Appointment
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}

            <div className="patient-modal-footer">
              <span>Appointment information is updated from your account.</span>

              <button type="button" onClick={closeAppointmentsModal}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
