import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { THEME } from './theme';

import { ModalsProvider, SnackbarsProvider } from './providers';

import { CheckoutPage, ReviewPage } from './pages';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={THEME}>
        <QueryClientProvider client={queryClient}>
          <ModalsProvider>
            <SnackbarsProvider>
              <CssBaseline />
              <BrowserRouter>
                <Routes>
                  <Route path="reviews" element={<ReviewPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                </Routes>
              </BrowserRouter>
            </SnackbarsProvider>
          </ModalsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};
