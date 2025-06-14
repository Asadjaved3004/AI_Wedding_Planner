import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Import your new landing page component
import Signup from './Signup';
import Dashboard from './Dashboard';
import ServiceDetail from './ServiceDetail';
//import ProtectedRoute from './ProtectedRoute'; // Add this import
import AdminPanel from './AdminPanel'; // Add this import
import About from './About';
import Profile from './Profile';
import Services from './Services';
import Checkout from './Checkout';
import Login from './Login';
import Cart from './Cart'; // Make sure to import your Cart component

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/vendor-dashboard" element={<VendorDashboard />} />
<Route path="/dashboard" element={<UserDashboard />} /> */}
        
        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Main app routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
        
        {/* Optional: Redirect any unknown paths to landing page */}
        <Route path="*" element={<LandingPage />} />
        <Route path="/admin/AdminPanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;