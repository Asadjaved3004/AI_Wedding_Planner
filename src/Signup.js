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
  CssBaseline
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
import { Link as RouterLink } from 'react-router-dom';

// Wedding-themed color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60', // Romantic pink
    },
    secondary: {
      main: '#5e35b1', // Royal purple
    },
    background: {
      default: '#fff9fb', // Very light pink
      paper: '#ffffff', // White for paper elements
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ... (keep all the validation functions from previous code)

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... (keep the same validation logic from previous code)
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
              
              <Box component="form" onSubmit={handleSubmit}>
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
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      error={!!errors.username}
                      helperText={errors.username}
                      required
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
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    py: 1.5,
                    background: 'linear-gradient(to right, #d81b60, #5e35b1)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #c2185b, #4a148c)',
                    }
                  }}
                >
                  Begin Your Wedding Journey
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
  <RouterLink to="/login" style={{
    color: '#d81b60',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }}>
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