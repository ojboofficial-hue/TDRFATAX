import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VATManagement from './pages/VATManagement';
import CorporateTax from './pages/CorporateTax';
import Payments from './pages/Payments';
import Profile from './pages/Profile';

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/vat-management" element={<ProtectedRoute><VATManagement /></ProtectedRoute>} />
                <Route path="/corporate-tax" element={<ProtectedRoute><CorporateTax /></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;