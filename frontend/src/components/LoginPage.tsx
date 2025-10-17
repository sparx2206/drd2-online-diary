import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import { Login as LoginIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const LoginPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt for email:', loginEmail);
    // Note: Password should be sent securely to backend, never logged
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Registration attempt for email:', registerEmail);
    // Note: Password should be sent securely to backend, never logged
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/fantasy-battle-bg.jpg), linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 3, color: 'text.primary' }}
          >
            Online Deník
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab icon={<LoginIcon />} label="Přihlášení" iconPosition="start" />
            <Tab icon={<PersonAddIcon />} label="Registrace" iconPosition="start" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  inputProps={{
                    'aria-label': 'E-mailová adresa pro přihlášení',
                  }}
                />
                <TextField
                  label="Heslo"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  inputProps={{
                    'aria-label': 'Heslo pro přihlášení',
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<LoginIcon />}
                >
                  Přihlásit se
                </Button>
              </Stack>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleRegister}>
              <Stack spacing={3}>
                <TextField
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  autoComplete="email"
                  inputProps={{
                    'aria-label': 'E-mailová adresa pro registraci',
                  }}
                />
                <TextField
                  label="Heslo"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  autoComplete="new-password"
                  inputProps={{
                    'aria-label': 'Heslo pro registraci',
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<PersonAddIcon />}
                >
                  Registrovat se
                </Button>
              </Stack>
            </form>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
