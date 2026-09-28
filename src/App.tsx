import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { RoutesPage } from './pages/RoutesPage';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans bg-[#FAF8F2] text-[#1C2523] selection:bg-[#123C35] selection:text-[#E8D8B8]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <FloatingWhatsApp />
          <Footer />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
