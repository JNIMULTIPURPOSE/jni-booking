import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

/* MAIN HOME */
import Home from "./Home";

/* ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

/* PROPERTY PAGES */
import Hotels from "./pages/Hotels";
import Motels from "./pages/Motels";
import Hostels from "./pages/Hostels";
import Apartments from "./pages/Apartments";
import AirbnbStays from "./pages/AirbnbStays";
import VacationHomes from "./pages/VacationHomes";
import Resorts from "./pages/Resorts";
import GuestHouses from "./pages/GuestHouses";
import MeetingRooms from "./pages/MeetingRooms";
import OfficeSpaces from "./pages/OfficeSpaces";
import EventVenues from "./pages/EventVenues";
import ConferenceRooms from "./pages/ConferenceRooms";
import StudioRentals from "./pages/StudioRentals";

/* HOSTEL SUBPAGES */
import QwetuHostels from "./pages/QwetuHostels";
import QejaniHostels from "./pages/QejaniHostels";
import OtherHostels from "./pages/OtherHostels";

export default function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* AUTH */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* USER HOME */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* PROPERTY PAGES */}
      <Route
        path="/hotels"
        element={<Hotels />}
      />

      <Route
        path="/motels"
        element={<Motels />}
      />

      <Route
        path="/hostels"
        element={<Hostels />}
      />

      <Route
        path="/apartments"
        element={<Apartments />}
      />

      <Route
        path="/airbnb"
        element={<AirbnbStays />}
      />

      <Route
        path="/vacation-homes"
        element={<VacationHomes />}
      />

      <Route
        path="/resorts"
        element={<Resorts />}
      />

      <Route
        path="/guest-houses"
        element={<GuestHouses />}
      />

      <Route
        path="/meeting-rooms"
        element={<MeetingRooms />}
      />

      <Route
        path="/office-spaces"
        element={<OfficeSpaces />}
      />

      <Route
        path="/event-venues"
        element={<EventVenues />}
      />

      <Route
        path="/conference-rooms"
        element={<ConferenceRooms />}
      />

      <Route
        path="/studio-rentals"
        element={<StudioRentals />}
      />

      {/* HOSTEL BRANDS */}
      <Route
        path="/qwetu-hostels"
        element={<QwetuHostels />}
      />

      <Route
        path="/qejani-hostels"
        element={<QejaniHostels />}
      />

      <Route
        path="/other-hostels"
        element={<OtherHostels />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
              color: "white",
              fontFamily: "Arial",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1>404</h1>

            <p>Page not found</p>
          </div>
        }
      />
    </Routes>
  );
}