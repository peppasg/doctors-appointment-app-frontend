import { Navigate, Route, Routes } from "react-router-dom";
import RouterLayout from "@/components/RouterLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import SpecialtySelectionPage from "@/pages/patient/SpecialtySelectionPage";
import AppointmentBookingPage from "@/pages/patient/AppointmentBookingPage";
import PatientRoute from "@/router/PatientProtectedRoute";
import GuestRoute from "@/router/GuestRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RouterLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />

          <Route element={<GuestRoute />}>
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          <Route element={<PatientRoute />}>
            <Route path="/users/specialties" element={<SpecialtySelectionPage />} />
            <Route path="/users/appointments" element={<AppointmentBookingPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
