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
  IconButton,
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        py: isMobile ? 4 : 6,
        pb: isMobile ? 8 : 6
      }}>
        <Container maxWidth="lg">
          {/* Image Slider Section */}
          <Box sx={{ 
            position: 'relative', 
            height: isMobile ? '250px' : '400px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '16px',
            boxShadow: 3,
            mb: isMobile ? 4 : 6
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
            
            {/* Navigation Arrows - Hidden on small mobile */}
            {!isSmallMobile && (
              <>
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
              </>
            )}
            
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
          <Box textAlign="center" mb={isMobile ? 4 : 6}>
            <LocalFlorist sx={{ 
              color: '#d81b60', 
              fontSize: isMobile ? '3rem' : '4rem',
              mb: isMobile ? -2 : -3
            }} />
            <Typography variant="h2" sx={{ 
              color: '#d81b60',
              mb: 2,
              fontSize: isMobile ? '2.5rem' : '3.5rem'
            }}>
              AI Wedding Planner
            </Typography>
            <Typography variant="h4" sx={{ 
              color: '#5e35b1',
              fontFamily: '"Great Vibes", cursive',
              fontSize: isMobile ? '1.5rem' : '2rem'
            }}>
              Your Perfect Wedding, Powered by AI
            </Typography>
          </Box>

          {/* Mission Section */}
          <Paper elevation={4} sx={{ 
            p: isMobile ? 3 : 4, 
            mb: isMobile ? 4 : 6, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,245,0.9))'
          }}>
            <Grid container spacing={4} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
              <Grid item xs={12} md={6}>
                <Avatar
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
                  variant="rounded"
                  sx={{ 
                    width: '100%', 
                    height: isMobile ? 200 : 300,
                    boxShadow: 3
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ 
                  color: '#d81b60',
                  fontSize: isMobile ? '1.8rem' : '2.2rem'
                }}>
                  Our Mission
                </Typography>
                <Typography paragraph sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  At AI Wedding Planner, we believe every love story deserves a perfect celebration. 
                  Our intelligent platform combines artificial intelligence with wedding expertise 
                  to create personalized, stress-free planning experiences.
                </Typography>
                <Typography paragraph sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  From venue selection to floral arrangements, our AI learns your preferences 
                  and suggests options tailored just for you, saving you time and ensuring your 
                  wedding reflects your unique love story.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Favorite sx={{ color: '#d81b60', mr: 1 }} />
                  <Typography variant="body1" sx={{ 
                    fontStyle: 'italic',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
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
            fontSize: isMobile ? '1.8rem' : '2.2rem'
          }}>
            How Our AI Helps You
          </Typography>
          
          <Grid container spacing={isMobile ? 2 : 4} mb={isMobile ? 4 : 6}>
            {[
              { icon: <PhotoCamera />, title: "Vision Board", desc: "Our AI creates visual concepts based on your preferences and Pinterest inspirations" },
              { icon: <Cake />, title: "Vendor Matching", desc: "Intelligent recommendations for caterers, florists, photographers based on your budget and style" },
              { icon: <MusicNote />, title: "Timeline Wizard", desc: "Automated scheduling for rehearsals, ceremonies, and receptions with reminders" },
              { icon: <Groups />, title: "Guest Manager", desc: "AI-assisted seating charts, RSVP tracking, and meal preference collection" }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ 
                  p: isMobile ? 2 : 3, 
                  height: '100%', 
                  borderRadius: '12px',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: isMobile ? 'none' : 'translateY(-5px)'
                  }
                }}>
                  <Box textAlign="center">
                    {React.cloneElement(feature.icon, { 
                      sx: { 
                        fontSize: isMobile ? '2.5rem' : '3rem', 
                        color: '#d81b60',
                        mb: 1
                      } 
                    })}
                    <Typography variant="h6" gutterBottom sx={{ 
                      color: '#5e35b1',
                      fontSize: isMobile ? '1.1rem' : '1.2rem'
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                      {feature.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Team Section */}
          <Paper elevation={4} sx={{ 
            p: isMobile ? 3 : 4, 
            mb: isMobile ? 4 : 6, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,240,245,0.9), rgba(255,255,255,0.9))'
          }}>
            <Typography variant="h4" align="center" sx={{ 
              color: '#d81b60',
              mb: 4,
              fontSize: isMobile ? '1.8rem' : '2.2rem'
            }}>
              Behind the Magic
            </Typography>
            <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
              {[
                { img: "https://randomuser.me/api/portraits/women/44.jpg", name: "Sarah Chen", role: "Lead Wedding Designer", desc: "15+ years creating dream weddings worldwide" },
                { img: "https://randomuser.me/api/portraits/men/32.jpg", name: "David Park", role: "AI Architect", desc: "Machine learning specialist focused on personalization" },
                { img: "https://randomuser.me/api/portraits/women/68.jpg", name: "Priya Patel", role: "Customer Experience", desc: "Ensures every couple feels special throughout their journey" }
              ].map((person, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box textAlign="center">
                    <Avatar
                      src={person.img}
                      sx={{ 
                        width: isMobile ? 100 : 150, 
                        height: isMobile ? 100 : 150,
                        mb: 2,
                        margin: '0 auto',
                        border: '3px solid #e0b0ff'
                      }}
                    />
                    <Typography variant="h6" sx={{ 
                      color: '#5e35b1',
                      fontSize: isMobile ? '1.1rem' : '1.2rem'
                    }}>
                      {person.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ 
                      color: '#d81b60',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      {person.role}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      mt: 1,
                      fontSize: isMobile ? '0.8rem' : '0.9rem'
                    }}>
                      {person.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Technology Section */}
          <Typography variant="h4" align="center" sx={{ 
            color: '#5e35b1',
            mb: 4,
            fontFamily: '"Great Vibes", cursive',
            fontSize: isMobile ? '1.8rem' : '2.2rem'
          }}>
            Our Technology
          </Typography>
          
          <List sx={{ 
            width: '100%', 
            bgcolor: 'background.paper',
            borderRadius: '12px',
            p: isMobile ? 2 : 3,
            boxShadow: 1
          }}>
            {[
              { icon: <Palette />, title: "Style Recognition AI", desc: "Analyzes your Pinterest boards and inspiration images to identify your perfect style, color palette, and theme preferences" },
              { icon: <LocationOn />, title: "Venue Match Algorithm", desc: "Matches you with venues that fit your guest count, budget, aesthetic, and accessibility needs with 95% accuracy" },
              { icon: <LocalFlorist />, title: "Floral Design Generator", desc: "Creates custom floral arrangements based on seasonality, your color palette, and local flower availability" }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ 
                    minWidth: isMobile ? '40px' : '56px',
                    mt: isMobile ? 1 : 0
                  }}>
                    {React.cloneElement(item.icon, { 
                      sx: { 
                        color: '#d81b60', 
                        fontSize: isMobile ? '1.5rem' : '2rem' 
                      } 
                    })}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title} 
                    secondary={item.desc} 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      color: '#5e35b1',
                      fontSize: isMobile ? '1.1rem' : '1.2rem'
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'body1',
                      fontSize: isMobile ? '0.85rem' : '0.95rem'
                    }}
                  />
                </ListItem>
                {index < 2 && <Divider variant="inset" component="li" sx={{ my: isMobile ? 1 : 2 }} />}
              </React.Fragment>
            ))}
          </List>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default About;