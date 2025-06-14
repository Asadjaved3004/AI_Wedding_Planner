import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Paper,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import {
  LocalFlorist,
  Diamond,
  CameraAlt,
  Cake,
  DirectionsCar,
  MenuBook,
  MusicNote,
  Spa,
  Hotel,
  Celebration,
  ExpandMore,
  Star,
  Computer
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Wedding theme (consistent with your app)
const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60', // Romantic pink
    },
    secondary: {
      main: '#5e35b1', // Royal purple
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif, "Great Vibes", cursive',
    h4: {
      fontFamily: '"Great Vibes", cursive',
    },
  },
});

const servicesData = [
  {
    id: 1,
    title: "AI Wedding Design",
    category: "ai",
    description: "Our AI creates a complete wedding vision based on your preferences",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    price: "Starting at $299",
    rating: 4.9,
    features: [
      "Personalized style analysis",
      "3D venue visualization",
      "Color palette generator",
      "Theme matching algorithm"
    ],
    aiDescription: "Uses machine learning to analyze your Pinterest boards and create cohesive designs"
  },
  {
    id: 2,
    title: "Bridal Attire AI",
    category: "ai",
    description: "Find your perfect dress with virtual try-on and style recommendations",
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b",
    price: "Free consultation",
    rating: 4.8,
    features: [
      "Body shape analysis",
      "Virtual fitting room",
      "Designer matching",
      "Accessory pairing"
    ],
    aiDescription: "Computer vision helps visualize dresses on your body type before purchase"
  },
  {
    id: 3,
    title: "Floral Arrangements",
    category: "decor",
    description: "Beautiful flowers tailored to your wedding theme",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac",
    price: "$500-$3000",
    rating: 4.7,
    features: [
      "Seasonal flower selection",
      "Centerpiece designs",
      "Bridal bouquet",
      "Aisle decorations"
    ]
  },
  {
    id: 4,
    title: "AI Photography Planning",
    category: "ai",
    description: "Algorithmically optimized photo timeline and shot list",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
    price: "$150 add-on",
    rating: 4.9,
    features: [
      "Optimal lighting analysis",
      "Guest facial recognition",
      "Auto-generated shot list",
      "Timeline optimization"
    ],
    aiDescription: "Computer vision analyzes your venue to plan perfect photo opportunities"
  },
  {
    id: 5,
    title: "Wedding Cake Design",
    category: "food",
    description: "Custom cakes designed to match your wedding style",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    price: "$300-$1500",
    rating: 4.6,
    features: [
      "Flavor pairing suggestions",
      "Allergy-friendly options",
      "Theme matching",
      "Tasting sessions"
    ]
  },
  {
    id: 6,
    title: "AI Guest Manager",
    category: "ai",
    description: "Smart tools for guest list and seating arrangements",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    price: "Included in Premium",
    rating: 4.8,
    features: [
      "Relationship mapping",
      "Seating algorithm",
      "Dietary restriction tracking",
      "RSVP automation"
    ],
    aiDescription: "Network analysis creates optimal seating based on guest relationships"
  },
  {
    id: 7,
    title: "Venue Selection",
    category: "venue",
    description: "Find the perfect location for your ceremony and reception",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    price: "Varies by location",
    rating: 4.7,
    features: [
      "Capacity matching",
      "Style recommendations",
      "Vendor partnerships",
      "Virtual tours"
    ]
  },
  {
    id: 8,
    title: "AI Wedding Planner Assistant",
    category: "ai",
    description: "24/7 virtual assistant for all your planning needs",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    price: "$99/month",
    rating: 4.9,
    features: [
      "Natural language processing",
      "Vendor communication",
      "Timeline management",
      "Budget tracking"
    ],
    aiDescription: "Chatbot handles vendor coordination and answers planning questions instantly"
  }
];

const categories = [
  { id: 'all', label: 'All Services', icon: <MenuBook /> },
  { id: 'ai', label: 'AI Services', icon: <Computer /> },
  { id: 'decor', label: 'Decorations', icon: <LocalFlorist /> },
  { id: 'food', label: 'Food & Cake', icon: <Cake /> },
  { id: 'venue', label: 'Venues', icon: <Hotel /> },
  { id: 'photo', label: 'Photography', icon: <CameraAlt /> }
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedService, setExpandedService] = useState(null);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleExpandService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(service => service.category === selectedCategory);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,249,251,0.9), rgba(255,249,251,0.9))',
        minHeight: '100vh',
        py: 4
      }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" sx={{
            color: '#d81b60',
            mb: 2,
            fontFamily: '"Great Vibes", cursive',
            fontSize: '2.5rem'
          }}>
            Our Wedding Services
          </Typography>

          <Typography variant="h6" align="center" sx={{
            color: '#5e35b1',
            mb: 4,
            fontFamily: '"Playfair Display", serif'
          }}>
            Traditional Excellence Enhanced with AI Innovation
          </Typography>

          {/* Category Tabs */}
          <Paper elevation={2} sx={{ mb: 4, p: 1, borderRadius: '12px' }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#d81b60',
                  height: 3
                }
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  value={category.id}
                  icon={category.icon}
                  iconPosition="start"
                  label={category.label}
                  sx={{
                    textTransform: 'none',
                    color: selectedCategory === category.id ? '#d81b60' : '#5e35b1',
                    '&.Mui-selected': {
                      color: '#d81b60'
                    }
                  }}
                />
              ))}
            </Tabs>
          </Paper>

          {/* Services Grid */}
          <Grid container spacing={4}>
            {filteredServices.map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#5e35b1' }}>
                        {service.title}
                      </Typography>
                      {service.category === 'ai' && (
                        <Chip
                          label="AI Powered"
                          color="primary"
                          size="small"
                          avatar={<Avatar sx={{ bgcolor: 'white' }}><Computer sx={{ color: '#d81b60', fontSize: '1rem' }} /></Avatar>}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star sx={{ color: '#ffb400', mr: 0.5 }} />
                      <Typography variant="body2">
                        {service.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                      {service.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleExpandService(service.id)}
                      sx={{
                        color: '#5e35b1',
                        borderColor: '#e0b0ff',
                        '&:hover': {
                          borderColor: '#5e35b1'
                        }
                      }}
                    >
                      {expandedService === service.id ? 'Show Less' : 'Learn More'}
                    </Button>
                  </CardActions>
                  {expandedService === service.id && (
                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle2" gutterBottom sx={{ color: '#5e35b1' }}>
                        Features:
                      </Typography>
                      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                        {service.features.map((feature, index) => (
                          <li key={index} style={{ marginBottom: '8px', color: '#5e35b1' }}>
                            <Typography variant="body2">{feature}</Typography>
                          </li>
                        ))}
                      </ul>
                      {service.aiDescription && (
                        <>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: '#5e35b1' }}>
                            AI Technology:
                          </Typography>
                          <Paper elevation={0} sx={{ 
                            p: 2, 
                            mb: 2,
                            backgroundColor: 'rgba(216, 27, 96, 0.05)',
                            borderLeft: '3px solid #d81b60'
                          }}>
                            <Typography variant="body2" sx={{ color: '#5e35b1' }}>
                              {service.aiDescription}
                            </Typography>
                          </Paper>
                        </>
                      )}
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(to right, #d81b60, #5e35b1)',
                          '&:hover': {
                            background: 'linear-gradient(to right, #c2185b, #4a148c)',
                          }
                        }}
                      >
                        Book This Service
                      </Button>
                    </AccordionDetails>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* AI Advantage Section */}
          <Paper elevation={4} sx={{ 
            mt: 6, 
            p: 4, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(216,27,96,0.1), rgba(94,53,177,0.1))'
          }}>
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ 
                  color: '#d81b60',
                  fontFamily: '"Great Vibes", cursive'
                }}>
                  The AI Advantage
                </Typography>
                <Typography paragraph sx={{ color: '#5e35b1' }}>
                  Our proprietary AI technology transforms wedding planning by:
                </Typography>
                <ul style={{ color: '#5e35b1', paddingLeft: '20px' }}>
                  <li><Typography>Analyzing thousands of weddings to predict what you'll love</Typography></li>
                  <li><Typography>Reducing decision fatigue with smart recommendations</Typography></li>
                  <li><Typography>Saving you 40+ hours of planning time on average</Typography></li>
                  <li><Typography>Preventing costly mistakes with predictive budgeting</Typography></li>
                  <li><Typography>Creating personalized experiences at scale</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                  borderRadius: '12px',
                  boxShadow: 3
                }} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Services;