import React, { useState } from 'react';
// Add to your imports
import theme from './Theme';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Divider,
  IconButton,
  InputAdornment,
  
  Box,
  Paper,
  CssBaseline,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google,
  LinkedIn,
  Favorite,
  LocalFlorist
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from './AuthContext'; // Adjust path as needed

// ... keep your existing theme configuration ...

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password);
      setSuccess('Account created successfully! Redirecting...');
      // You might want to save additional user data to Firestore here
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
      // Handle specific Firebase errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please login instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
              {/* Decorative elements */}
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
                Create Your Wedding Account
              </Typography>

              {/* Error and Success Messages */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Favorite sx={{ color: '#d81b60', fontSize: '1rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      required
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
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
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
                      error={!!errors.password}
                      helperText={errors.password}
                      required
                      InputProps={{
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: '#5e35b1' }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
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
                    }
                  }}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Creating Account...' : 'Begin Your Wedding Journey'}
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
                      sx={{ 
                        py: 1.5,
                        color: '#5e35b1',
                        borderColor: '#e0b0ff',
                        '&:hover': {
                          borderColor: '#5e35b1',
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
                      sx={{ 
                        py: 1.5,
                        color: '#5e35b1',
                        borderColor: '#e0b0ff',
                        '&:hover': {
                          borderColor: '#5e35b1',
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
                  Already planning with us?{' '}
                  <RouterLink to="/login">
                    Sign in
                  </RouterLink>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;