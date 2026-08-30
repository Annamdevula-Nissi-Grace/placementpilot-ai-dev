import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import SkillGap from './pages/SkillGap';
import Roadmap from './pages/Roadmap';
import DSA from './pages/DSA';
import MockInterview from './pages/MockInterview';
import CompanyPrep from './pages/CompanyPrep';
import Jobs from './pages/Jobs';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Coach from './pages/Coach';
import Placeholder from './pages/Placeholder';

import Login from './pages/Login';
import Signup from './pages/Signup';

import './styles.css';

createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/resume"
              element={<Resume />}
            />

            <Route
              path="/skill-gap"
              element={<SkillGap />}
            />

            <Route
              path="/roadmap"
              element={<Roadmap />}
            />

            <Route
              path="/dsa"
              element={<DSA />}
            />

            <Route
              path="/mock-interview"
              element={<MockInterview />}
            />

            <Route
              path="/company-prep"
              element={<CompanyPrep />}
            />

            <Route
              path="/jobs"
              element={<Jobs />}
            />

            <Route
              path="/coach"
              element={<Coach />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="*"
              element={<Placeholder />}
            />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);