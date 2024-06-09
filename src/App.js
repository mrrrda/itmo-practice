import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Review } from './components/review/Review';
import reviewData from './data/ReviewData.json';

const theme = createTheme({
  palette: {
    text: {
      primary: '#333333',
      secondary: '#777777',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: '20px' }}>
          {reviewData.map(data => (
            <div key={data.id} style={{ marginBottom: '20px' }}>
              <Review {...data} />
            </div>
          ))}
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
};
