import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { THEME } from './theme';

import { ModalsProvider } from './providers';

import { ReviewForm } from './components/review';
import { ReviewPage } from './pages';

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={THEME}>
        <ModalsProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="reviews" element={<ReviewPage />} />
              <Route path="reviews-form" element={<ReviewFormPage />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

const ReviewFormPage = () => (
  <div style={{ padding: '50px' }}>
    <ReviewForm />
  </div>
);
