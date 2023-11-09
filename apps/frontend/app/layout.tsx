import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TasksComponent from './components/TasksComponent';
import TaskManager from './components/TaskManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        <TaskManager />
        <Box sx={{ my: 4 }}> 
          <TasksComponent />
        </Box>
        <Box component="footer" sx={{ py: 3, mt: 4, bgcolor: 'background.paper' }}>
          {children} 
        </Box>
      </Container>
    </>
  );
}
