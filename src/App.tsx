import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { TourDetailsPage } from "@/pages/TourDetailsPage";
import { AboutPage } from "@/pages/AboutPage";
import { BookingPage } from "@/pages/BookingPage";
import { UserDashboardPage } from "@/pages/UserDashboardPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours/:id" element={<TourDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
