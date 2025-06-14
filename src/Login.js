import React, { useState, useEffect } from 'react';
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
  Alert,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Business,
  AdminPanelSettings,
  People,
  Favorite,
  LocalFlorist
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from './AuthContext'; // Adjust path as needed
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; // Adjust path to your firebase config

const theme = createTheme({
  // ... (keep your existing theme)
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    role: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      role: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Dummy admin credentials check (keep your existing admin flow)
    if (formData.role === 'admin') {
      if (formData.email === 'admin' && formData.password === 'admin123') {
        setTimeout(() => {
          localStorage.setItem('adminToken', 'dummy-admin-token');
          navigate('/admin/AdminPanel');
          setLoading(false);
        }, 1000);
        return;
      } else {
        setError('Invalid admin credentials. Use username: admin, password: admin123');
        setLoading(false);
        return;
      }
    }

    // Firebase authentication for normal users
    try {
      await login(formData.email, formData.password);
      
      // Store rememberMe preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Navigate based on role
      switch(formData.role) {
        case 'customer':
          navigate('/dashboard');
          break;
        case 'vendor':
          navigate('/vendor-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Handle specific Firebase errors
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Account temporarily disabled due to too many failed attempts');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerType) => {
    try {
      setSocialLoading(prev => ({ ...prev, [providerType]: true }));
      setError(null);

      let provider;
      if (providerType === 'google') {
        provider = new GoogleAuthProvider();
      } else if (providerType === 'facebook') {
        provider = new FacebookAuthProvider();
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Determine if user is a vendor (you might need a better way to determine this)
      const isVendor = user.email?.endsWith('@vendordomain.com'); // Example check

      // Navigate based on user type
      if (isVendor) {
        navigate('/vendor-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Social login error:', err);
      setError(err.message || 'Social login failed');
    } finally {
      setSocialLoading(prev => ({ ...prev, [providerType]: false }));
    }
  };

  // Auto-focus admin credentials when admin tab selected
  useEffect(() => {
    if (formData.role === 'admin') {
      setFormData(prev => ({
        ...prev,
        email: 'admin',
        password: 'admin123'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        email: '',
        password: ''
      }));
    }

    // Check for rememberMe preference
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
      setFormData(prev => ({
        ...prev,
        rememberMe: true
      }));
    }
  }, [formData.role]);

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
                mb: 2,
                fontFamily: '"Playfair Display", serif'
              }}>
                {formData.role === 'customer' && 'Couple Login'}
                {formData.role === 'vendor' && 'Vendor Portal'}
                {formData.role === 'admin' && 'Admin Dashboard'}
              </Typography>

              <Tabs
                value={formData.role}
                onChange={handleRoleChange}
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab 
                  icon={<People />} 
                  label="Couple" 
                  value="customer" 
                  sx={{ minHeight: 48 }}
                />
                <Tab 
                  icon={<Business />} 
                  label="Vendor" 
                  value="vendor" 
                  sx={{ minHeight: 48 }}
                />
                <Tab 
                  icon={<AdminPanelSettings />} 
                  label="Admin" 
                  value="admin" 
                  sx={{ minHeight: 48 }}
                />
              </Tabs>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={formData.role === 'admin' ? 'Admin Username' : 'Email'}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Favorite sx={{ color: '#d81b60', fontSize: '1rem' }} />
                          </InputAdornment>
                        ),
                        readOnly: formData.role === 'admin'
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
                        readOnly: formData.role === 'admin'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          name="rememberMe"
                          color="primary"
                        />
                      }
                      label="Remember me"
                      sx={{ color: '#5e35b1' }}
                    />
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
                    formData.role === 'customer' ? 'Continue Planning' : 
                    formData.role === 'vendor' ? 'Access Vendor Portal' : 
                    'Admin Login'
                  )}
                </Button>
              </Box>

              {formData.role !== 'admin' && (
                <>
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
                        disabled={socialLoading.google}
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
                        {socialLoading.google ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Google'
                        )}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Facebook />}
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={socialLoading.facebook}
                        sx={{
                          py: 1.5,
                          color: '#5e35b1',
                          borderColor: '#e0b0ff',
                          '&:hover': {
                            borderColor: '#5e35b1',
                            backgroundColor: 'rgba(24, 119, 242, 0.08)'
                          }
                        }}
                      >
                        {socialLoading.facebook ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Facebook'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {formData.role !== 'admin' && (
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
                  Don't have an account?{' '}
                  <Link href={`/signup?role=${formData.role}`}>
                    Sign up as {formData.role === 'customer' ? 'a couple' : 'a vendor'}
                  </Link>
                </Typography>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;