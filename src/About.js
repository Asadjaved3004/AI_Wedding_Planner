import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import { 
  Favorite,
  LocalFlorist,
  PhotoCamera,
  Cake,
  MusicNote,
  LocationOn,
  Palette,
  Groups,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Wedding images for slider
const weddingImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74'
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60',
    },
    secondary: {
      main: '#5e35b1',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif, "Great Vibes", cursive',
    h2: {
      fontFamily: '"Great Vibes", cursive',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Great Vibes", cursive',
    },
  },
});

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  // Auto slide effect
  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % weddingImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weddingImages.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weddingImages.length) % weddingImages.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,249,251,0.9), rgba(255,249,251,0.9))',
        minHeight: '100vh',
        py: 6
      }}>
        <Container maxWidth="lg">
          {/* Image Slider Section */}
          <Box sx={{ 
            position: 'relative', 
            height: '400px', 
            width: '100%',
            overflow: 'hidden',
            borderRadius: '16px',
            boxShadow: 3,
            mb: 6
          }}>
            {/* Slider Images */}
            <Box sx={{
              display: 'flex',
              height: '100%',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentSlide * 100}%)`
            }}>
              {weddingImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </Box>
            
            {/* Navigation Arrows */}
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              <NavigateBefore sx={{ color: '#d81b60', fontSize: '2rem' }} />
            </IconButton>
            
            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              <NavigateNext sx={{ color: '#d81b60', fontSize: '2rem' }} />
            </IconButton>
            
            {/* Dots Indicator */}
            <Box sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1
            }}>
              {weddingImages.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setAutoSlide(false);
                    setTimeout(() => setAutoSlide(true), 10000);
                  }}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: index === currentSlide ? '#d81b60' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <LocalFlorist sx={{ 
              color: '#d81b60', 
              fontSize: '4rem',
              mb: -3
            }} />
            <Typography variant="h2" sx={{ 
              color: '#d81b60',
              mb: 2
            }}>
              AI Wedding Planner
            </Typography>
            <Typography variant="h4" sx={{ 
              color: '#5e35b1',
              fontFamily: '"Great Vibes", cursive'
            }}>
              Your Perfect Wedding, Powered by AI
            </Typography>
          </Box>

          {/* Mission Section */}
          <Paper elevation={4} sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,245,0.9))'
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Avatar
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
                  variant="rounded"
                  sx={{ 
                    width: '100%', 
                    height: 300,
                    boxShadow: 3
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: '#d81b60' }}>
                  Our Mission
                </Typography>
                <Typography paragraph>
                  At AI Wedding Planner, we believe every love story deserves a perfect celebration. 
                  Our intelligent platform combines artificial intelligence with wedding expertise 
                  to create personalized, stress-free planning experiences.
                </Typography>
                <Typography paragraph>
                  From venue selection to floral arrangements, our AI learns your preferences 
                  and suggests options tailored just for you, saving you time and ensuring your 
                  wedding reflects your unique love story.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Favorite sx={{ color: '#d81b60', mr: 1 }} />
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "Making dream weddings a reality through technology and love"
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Features Section */}
          <Typography variant="h4" align="center" sx={{ 
            color: '#5e35b1',
            mb: 4,
            fontFamily: '"Great Vibes", cursive',
            fontSize: '2.2rem'
          }}>
            How Our AI Helps You
          </Typography>
          
          <Grid container spacing={4} mb={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Box textAlign="center">
                  <PhotoCamera sx={{ 
                    fontSize: '3rem', 
                    color: '#d81b60',
                    mb: 2
                  }} />
                  <Typography variant="h6" gutterBottom sx={{ color: '#5e35b1' }}>
                    Vision Board
                  </Typography>
                  <Typography>
                    Our AI creates visual concepts based on your preferences and Pinterest inspirations
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Box textAlign="center">
                  <Cake sx={{ 
                    fontSize: '3rem', 
                    color: '#d81b60',
                    mb: 2
                  }} />
                  <Typography variant="h6" gutterBottom sx={{ color: '#5e35b1' }}>
                    Vendor Matching
                  </Typography>
                  <Typography>
                    Intelligent recommendations for caterers, florists, photographers based on your budget and style
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Box textAlign="center">
                  <MusicNote sx={{ 
                    fontSize: '3rem', 
                    color: '#d81b60',
                    mb: 2
                  }} />
                  <Typography variant="h6" gutterBottom sx={{ color: '#5e35b1' }}>
                    Timeline Wizard
                  </Typography>
                  <Typography>
                    Automated scheduling for rehearsals, ceremonies, and receptions with reminders
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Box textAlign="center">
                  <Groups sx={{ 
                    fontSize: '3rem', 
                    color: '#d81b60',
                    mb: 2
                  }} />
                  <Typography variant="h6" gutterBottom sx={{ color: '#5e35b1' }}>
                    Guest Manager
                  </Typography>
                  <Typography>
                    AI-assisted seating charts, RSVP tracking, and meal preference collection
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Team Section */}
          <Paper elevation={4} sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,240,245,0.9), rgba(255,255,255,0.9))'
          }}>
            <Typography variant="h4" align="center" sx={{ 
              color: '#d81b60',
              mb: 4
            }}>
              Behind the Magic
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    sx={{ 
                      width: 150, 
                      height: 150,
                      mb: 2,
                      margin: '0 auto',
                      border: '3px solid #e0b0ff'
                    }}
                  />
                  <Typography variant="h6" sx={{ color: '#5e35b1' }}>
                    Sarah Chen
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#d81b60' }}>
                    Lead Wedding Designer
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    15+ years creating dream weddings worldwide
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    sx={{ 
                      width: 150, 
                      height: 150,
                      mb: 2,
                      margin: '0 auto',
                      border: '3px solid #e0b0ff'
                    }}
                  />
                  <Typography variant="h6" sx={{ color: '#5e35b1' }}>
                    David Park
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#d81b60' }}>
                    AI Architect
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Machine learning specialist focused on personalization
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    sx={{ 
                      width: 150, 
                      height: 150,
                      mb: 2,
                      margin: '0 auto',
                      border: '3px solid #e0b0ff'
                    }}
                  />
                  <Typography variant="h6" sx={{ color: '#5e35b1' }}>
                    Priya Patel
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#d81b60' }}>
                    Customer Experience
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Ensures every couple feels special throughout their journey
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Technology Section */}
          <Typography variant="h4" align="center" sx={{ 
            color: '#5e35b1',
            mb: 4,
            fontFamily: '"Great Vibes", cursive',
            fontSize: '2.2rem'
          }}>
            Our Technology
          </Typography>
          
          <List sx={{ 
            width: '100%', 
            bgcolor: 'background.paper',
            borderRadius: '12px',
            p: 3,
            boxShadow: 1
          }}>
            <ListItem>
              <ListItemIcon>
                <Palette sx={{ color: '#d81b60', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Style Recognition AI" 
                secondary="Analyzes your Pinterest boards and inspiration images to identify your perfect style, color palette, and theme preferences" 
                primaryTypographyProps={{ variant: 'h6', color: '#5e35b1' }}
                secondaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ my: 2 }} />
            <ListItem>
              <ListItemIcon>
                <LocationOn sx={{ color: '#d81b60', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Venue Match Algorithm" 
                secondary="Matches you with venues that fit your guest count, budget, aesthetic, and accessibility needs with 95% accuracy" 
                primaryTypographyProps={{ variant: 'h6', color: '#5e35b1' }}
                secondaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ my: 2 }} />
            <ListItem>
              <ListItemIcon>
                <LocalFlorist sx={{ color: '#d81b60', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Floral Design Generator" 
                secondary="Creates custom floral arrangements based on seasonality, your color palette, and local flower availability" 
                primaryTypographyProps={{ variant: 'h6', color: '#5e35b1' }}
                secondaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
          </List>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default About;