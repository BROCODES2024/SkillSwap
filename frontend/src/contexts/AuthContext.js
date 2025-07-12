import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockUsers } from '../data/mockData';
import { tokenStorage } from '../utils/helpers';

// Action types
const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      // In a real app, you would validate the token with the server
      // For demo purposes, we'll simulate finding a user
      const user = mockUsers.find(u => u.email === 'sarah.johnson@email.com');
      if (user) {
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });
      } else {
        tokenStorage.remove();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // In a real app, you would verify the password with the server
      // For demo purposes, we'll accept any password
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Generate a mock JWT token
      const token = `mock-jwt-token-${Date.now()}`;
      tokenStorage.set(token);

      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });
      
      return { success: true, user };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        rating: 0,
        totalSwaps: 0,
        joinDate: new Date().toISOString().split('T')[0],
        isVerified: false,
        isAdmin: false
      };

      // In a real app, you would save the user to the database
      // For demo purposes, we'll just simulate success
      mockUsers.push(newUser);

      // Generate a mock JWT token
      const token = `mock-jwt-token-${Date.now()}`;
      tokenStorage.set(token);

      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: newUser });
      
      return { success: true, user: newUser };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    tokenStorage.remove();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update user in mock data
      const userIndex = mockUsers.findIndex(u => u.id === state.user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData };
      }

      dispatch({ type: AUTH_ACTIONS.UPDATE_PROFILE, payload: profileData });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('No user found with this email address');
      }

      // In a real app, you would send a password reset email
      // For demo purposes, we'll just simulate success
      
      return { success: true, message: 'Password reset email sent successfully' };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would validate the token and update the password
      // For demo purposes, we'll just simulate success
      
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 