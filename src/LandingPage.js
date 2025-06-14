import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Favorite, ArrowForward, LocalFlorist, CalendarToday, MonetizationOn, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Enhanced Wedding Theme with better contrast
const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60', // Romantic pink
      contrastText: '#ffffff' // White text for better readability
    },
    secondary: {
      main: '#5e35b1', // Royal purple
      contrastText: '#ffffff'
    },
    background: {
      default: '#fff9fb', // Very light pink
      paper: '#ffffff'
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Great Vibes", cursive',
      fontWeight: 400,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.4rem',
      },
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        },
      },
    },
  },
});

// Beautiful wedding couple images for slider
const sliderImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1529632316986-333537b31e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Simplified App Bar */}
        <AppBar position="static" elevation={0} sx={{ 
          backgroundColor: 'transparent',
          boxShadow: 'none',
          py: 2
        }}>
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'center', px: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalFlorist sx={{ 
                  color: '#d81b60', 
                  fontSize: '2.5rem',
                  mr: 1
                }} />
                <Typography variant="h2" sx={{ 
                  fontFamily: '"Great Vibes", cursive',
                  fontWeight: 400,
                  color: '#5e35b1'
                }}>
                  AI Wedding Planner
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Slider Section */}
        <Box sx={{
          position: 'relative',
          height: isMobile ? '70vh' : '85vh',
          overflow: 'hidden',
          width: '100%',
          mb: 8
        }}>
          {/* Slider Images */}
          {sliderImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(rgba(94, 53, 177, 0.3), rgba(216, 27, 96, 0.3)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Container maxWidth="md">
                <Box sx={{ 
                  color: 'white',
                  textAlign: 'center',
                  p: isMobile ? 2 : 4,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(5px)',
                  mx: 'auto',
                  maxWidth: '800px'
                }}>
                  <Typography variant="h1" sx={{ 
                    mb: 3,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    Your Perfect Wedding
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    mb: 4,
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    px: isMobile ? 0 : 4
                  }}>
                    Let our AI-powered planner create your dream wedding with personalized recommendations
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size={isMobile ? 'medium' : 'large'}
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      px: isMobile ? 4 : 6,
                      py: isMobile ? 1 : 1.5,
                      background: 'linear-gradient(45deg, #d81b60 30%, #5e35b1 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #c2185b 30%, #4a148c 90%)'
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Container>
            </Box>
          ))}
          
          {/* Slider Indicators */}
          <Box sx={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5
          }}>
            {sliderImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ 
          py: 8,
          backgroundColor: 'background.paper'
        }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ 
              textAlign: 'center',
              color: 'primary.main',
              mb: 6
            }}>
              How It Works
            </Typography>
            
            <Grid container spacing={4}>
              {[
                { 
                  icon: <LocalFlorist sx={{ fontSize: '3rem', color: 'primary.main' }} />,
                  title: 'Theme Selection',
                  desc: 'Discover beautiful wedding themes tailored to your style'
                },
                { 
                  icon: <CalendarToday sx={{ fontSize: '3rem', color: 'primary.main' }} />,
                  title: 'Timeline Planning',
                  desc: 'Automated scheduling for stress-free preparation'
                },
                { 
                  icon: <MonetizationOn sx={{ fontSize: '3rem', color: 'primary.main' }} />,
                  title: 'Budget Management',
                  desc: 'Smart tools to track and optimize your spending'
                },
                { 
                  icon: <People sx={{ fontSize: '3rem', color: 'primary.main' }} />,
                  title: 'Vendor Matching',
                  desc: 'Find the perfect professionals for your special day'
                }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card elevation={0} sx={{ 
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    border: '1px solid rgba(216, 27, 96, 0.1)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 10px 20px rgba(216, 27, 96, 0.1)'
                    }
                  }}>
                    <CardContent>
                      {feature.icon}
                      <Typography variant="h5" sx={{ 
                        color: 'secondary.main',
                        my: 2,
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.7
                      }}>
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA Section */}
        <Box sx={{ 
          py: 10,
          background: 'linear-gradient(135deg, #fff9fb 0%, #f8f0ff 100%)',
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <LocalFlorist sx={{ 
              color: 'primary.main', 
              fontSize: '4rem',
              mb: -3,
              transform: 'rotate(-15deg)'
            }} />
            <Typography variant="h2" sx={{ 
              color: 'secondary.main',
              mb: 3
            }}>
              Ready to Begin Your Journey?
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Join thousands of couples who created their perfect wedding with our AI planner
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/dashboard')}
              sx={{
                px: 6,
                py: 1.5,
                background: 'linear-gradient(45deg, #d81b60 30%, #5e35b1 90%)',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #c2185b 30%, #4a148c 90%)'
                }
              }}
            >
              Start Planning Now
            </Button>
          </Container>
        </Box>

        {/* Simple Footer */}
        <Box sx={{ 
          py: 4,
          backgroundColor: 'secondary.main',
          color: 'white',
          textAlign: 'center'
        }}>
          <Container maxWidth="lg">
            <Typography variant="body2">
              © {new Date().getFullYear()} AI Wedding Planner. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;