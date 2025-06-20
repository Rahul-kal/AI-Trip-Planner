import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId/index.jsx';
import MyTrips from './my-trips/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path='/view-trip/:tripId' element={<Viewtrip />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
