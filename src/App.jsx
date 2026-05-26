import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* AUTH */
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

/* MAIN */
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

/* HOSTELS */
import QwetuHostels from "./pages/QwetuHostels";
import QejaniHostels from "./pages/QejaniHostels";
import OtherHostels from "./pages/OtherHostels";

export default function App() {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
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
        element={
          <ProtectedRoute>
            <Hotels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/motels"
        element={
          <ProtectedRoute>
            <Motels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hostels"
        element={
          <ProtectedRoute>
            <Hostels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apartments"
        element={
          <ProtectedRoute>
            <Apartments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb"
        element={
          <ProtectedRoute>
            <AirbnbStays />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vacation-homes"
        element={
          <ProtectedRoute>
            <VacationHomes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resorts"
        element={
          <ProtectedRoute>
            <Resorts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/guest-houses"
        element={
          <ProtectedRoute>
            <GuestHouses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meeting-rooms"
        element={
          <ProtectedRoute>
            <MeetingRooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/office-spaces"
        element={
          <ProtectedRoute>
            <OfficeSpaces />
          </ProtectedRoute>
        }
      />

      <Route
        path="/event-venues"
        element={
          <ProtectedRoute>
            <EventVenues />
          </ProtectedRoute>
        }
      />

      <Route
        path="/conference-rooms"
        element={
          <ProtectedRoute>
            <ConferenceRooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/studio-rentals"
        element={
          <ProtectedRoute>
            <StudioRentals />
          </ProtectedRoute>
        }
      />

      {/* HOSTEL BRANDS */}
      <Route
        path="/qwetu-hostels"
        element={
          <ProtectedRoute>
            <QwetuHostels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/qejani-hostels"
        element={
          <ProtectedRoute>
            <QejaniHostels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/other-hostels"
        element={
          <ProtectedRoute>
            <OtherHostels />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Navigate to="/home" />
        }
      />
    </Routes>
  );
}