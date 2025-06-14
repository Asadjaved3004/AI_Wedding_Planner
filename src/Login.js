import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Divider,
  Box,
  Paper,
  CssBaseline,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  LinkedIn,
  Favorite,
  LocalFlorist
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60',
    },
    secondary: {
      main: '#5e35b1',
    },
    background: {
      default: '#fff9fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Playfair Display"',
      'serif',
      '"Great Vibes"',
      'cursive'
    ].join(','),
    h4: {
      fontFamily: '"Great Vibes", cursive',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Great Vibes", cursive',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: '#e0b0ff',
            },
            '&:hover fieldset': {
              borderColor: '#d81b60',
            },
          },
        },
      },
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Immediately navigate to dashboard without validation
    setTimeout(() => {
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,249,251,0.9), rgba(255,249,251,0.9)), url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 8,
      }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(to right, #d81b60, #5e35b1)',
            }
          }}>
            <Box sx={{
              p: 4,
              textAlign: 'center',
              background: 'white',
            }}>
              <LocalFlorist sx={{
                color: '#d81b60',
                fontSize: '3rem',
                mb: -3,
                transform: 'rotate(-15deg)'
              }} />

              <Typography variant="h4" component="h1" gutterBottom sx={{
                color: '#d81b60',
                mt: 2,
                position: 'relative',
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(to right, #d81b60, #5e35b1)',
                  margin: '16px auto',
                }
              }}>
                AI Wedding Planner
              </Typography>

              <Typography variant="h5" component="h2" gutterBottom sx={{
                color: '#5e35b1',
                mb: 4,
                fontFamily: '"Playfair Display", serif'
              }}>
                Welcome Back
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Favorite sx={{ color: '#d81b60', fontSize: '1rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Favorite sx={{ color: '#d81b60', fontSize: '1rem' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: '#5e35b1' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Link 
                      href="/forgot-password" 
                      sx={{
                        color: '#5e35b1',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: '#d81b60'
                        }
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(to right, #d81b60, #5e35b1)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #c2185b, #4a148c)',
                    },
                    '&.Mui-disabled': {
                      background: '#e0b0ff',
                      color: 'white'
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Continue Planning'
                  )}
                </Button>

                <Divider sx={{
                  my: 3,
                  '&:before, &:after': {
                    borderColor: '#e0b0ff',
                  }
                }}>
                  <Typography variant="body2" sx={{ color: '#5e35b1' }}>
                    Or continue with
                  </Typography>
                </Divider>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      onClick={() => handleSocialLogin('google')}
                      sx={{
                        py: 1.5,
                        color: '#5e35b1',
                        borderColor: '#e0b0ff',
                        '&:hover': {
                          borderColor: '#5e35b1',
                          backgroundColor: 'rgba(66, 133, 244, 0.08)'
                        }
                      }}
                    >
                      Google
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<LinkedIn />}
                      onClick={() => handleSocialLogin('linkedin')}
                      sx={{
                        py: 1.5,
                        color: '#5e35b1',
                        borderColor: '#e0b0ff',
                        '&:hover': {
                          borderColor: '#5e35b1',
                          backgroundColor: 'rgba(0, 119, 181, 0.08)'
                        }
                      }}
                    >
                      LinkedIn
                    </Button>
                  </Grid>
                </Grid>

                <Typography variant="body2" sx={{
                  color: '#5e35b1',
                  '& a': {
                    color: '#d81b60',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }
                }}>
                  New to our planner?{' '}
                  <Link href="/signup">
                    Create account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;