import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import components
import Header from './components/layout/Header';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Import pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import BrowseUsersPage from './pages/BrowseUsersPage';
import UserProfilePage from './pages/UserProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import SwapRequestsPage from './pages/SwapRequestsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';

// Protected route component
function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Main app content
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Header />}
        
        <main className={isAuthenticated ? 'pt-16' : ''}>
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
            />
            <Route 
              path="/forgot-password" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />} 
            />
            <Route 
              path="/reset-password" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPasswordPage />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/browse" 
              element={
                <ProtectedRoute>
                  <BrowseUsersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/:userId" 
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/edit" 
              element={
                <ProtectedRoute>
                  <ProfileEditPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/swap-requests" 
              element={
                <ProtectedRoute>
                  <SwapRequestsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminUsersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminAnalyticsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
            />
            <Route 
              path="*" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </main>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 