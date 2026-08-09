import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// COMMON WEBSITE LAYOUT
// =====================================================

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Doctors from "../pages/Doctors/Doctors";
import BookAppointment from "../pages/BookAppointment/BookAppointment";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";

// =====================================================
// PATIENT
// =====================================================

import PatientLogin from "../pages/Patient/PatientLogin/PatientLogin";
import PatientRegister from "../pages/Patient/PatientRegister/patientRegister";
import PatientDashboard from "../pages/Patient/PatientDashboard/PatientDashboard";

// =====================================================
// ADMIN
// =====================================================

import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";

import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";

// =====================================================
// PUBLIC WEBSITE LAYOUT
// Navbar + Page + Footer
// =====================================================

const PublicLayout = ({ children }) => {
  return (
    <div className="website-layout">
      <Navbar />

      <main className="website-main">{children}</main>

      <Footer />
    </div>
  );
};

// =====================================================
// PATIENT DASHBOARD LAYOUT
// Navbar + Dashboard + Footer
// =====================================================

const PatientDashboardLayout = ({ children }) => {
  return (
    <div className="website-layout patient-dashboard-layout">
      <Navbar />

      <main className="website-main patient-dashboard-main-layout">
        {children}
      </main>

      <Footer />
    </div>
  );
};

// =====================================================
// APP ROUTES
// =====================================================

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================================
            PUBLIC WEBSITE
            Navbar + Footer
        ================================================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/doctors"
          element={
            <PublicLayout>
              <Doctors />
            </PublicLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <PublicLayout>
              <BlogDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* =================================================
            BOOK APPOINTMENT

            Login mandatory nahi hai
        ================================================= */}

        <Route
          path="/book-appointment"
          element={
            <PublicLayout>
              <BookAppointment />
            </PublicLayout>
          }
        />

        {/* =================================================
            PATIENT AUTH

            No normal Navbar/Footer
        ================================================= */}

        <Route path="/patient/login" element={<PatientLogin />} />

        <Route path="/patient/register" element={<PatientRegister />} />

        {/* =================================================
            PATIENT DASHBOARD

            Normal Website Navbar + Dashboard + Footer
        ================================================= */}

        <Route
          path="/patient/dashboard"
          element={
            <PatientDashboardLayout>
              <PatientDashboard />
            </PatientDashboardLayout>
          }
        />

        {/* =================================================
            ADMIN AUTH

            No normal Navbar/Footer /and morden footer
        ================================================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* =================================================
            ADMIN DASHBOARD

            Existing admin dashboard structure preserved
        ================================================= */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
