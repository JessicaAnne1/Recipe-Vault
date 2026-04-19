/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Capture from './pages/Capture';
import Review from './pages/Review';
import Library from './pages/Library';
import RecipeDetail from './pages/RecipeDetail';
import RecipeEdit from './pages/RecipeEdit';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';

export default function App() {
  // Use a mock auth state for now to allow development before Firebase is fully ready
  // In real app, this would use useAuth()
  const isAuthenticated = true; 

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route element={<Layout />}>
        <Route path="/capture" element={isAuthenticated ? <Capture /> : <Navigate to="/signin" />} />
        <Route path="/review" element={isAuthenticated ? <Review /> : <Navigate to="/signin" />} />
        <Route path="/library" element={isAuthenticated ? <Library /> : <Navigate to="/signin" />} />
        <Route path="/recipe/:id" element={isAuthenticated ? <RecipeDetail /> : <Navigate to="/signin" />} />
        <Route path="/recipe/:id/edit" element={isAuthenticated ? <RecipeEdit /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />} />
      </Route>
    </Routes>
  );
}
