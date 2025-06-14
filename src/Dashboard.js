import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Paper,
    CssBaseline
} from '@mui/material';
import {
    Home,
    Info,
    Work,
    Person,
    LocalFlorist,
    Diamond,
    CameraAlt,
    MenuBook,
    MusicNote,
    Cake,
    DirectionsCar
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import NavigationTabs from './NavigationTabs';

// Wedding theme (same as before)
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
        fontFamily: '"Playfair Display", serif, "Great Vibes", cursive',
    },
});

const weddingServices = [
    {
        id: 1,
        title: "Bridal Dresses",
        category: "dresses",
        description: "Exquisite collection of bridal gowns for your special day",
        image: "https://images.unsplash.com/photo-1537832816519-689ad163238b",
        price: "$500 - $5000",
        rating: 4.8
    },
    {
        id: 2,
        title: "Groom Suits",
        category: "dresses",
        description: "Elegant suits and tuxedos for the groom",
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
        price: "$300 - $2000",
        rating: 4.6
    },
    {
        id: 3,
        title: "Stage Decorations",
        category: "decor",
        description: "Beautiful stage setups to make your ceremony magical",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
        price: "$1000 - $10000",
        rating: 4.9
    },
    {
        id: 4,
        title: "Bridal Jewelry",
        category: "jewelry",
        description: "Stunning jewelry sets to complement your bridal look",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        price: "$200 - $10000",
        rating: 4.7
    },
    {
        id: 5,
        title: "Photography",
        category: "photography",
        description: "Professional wedding photography packages",
        image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
        price: "$1500 - $8000",
        rating: 4.9
    },
    {
        id: 6,
        title: "Wedding Cake",
        category: "food",
        description: "Custom-designed wedding cakes for your celebration",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        price: "$300 - $2000",
        rating: 4.8
    },
    {
        id: 7,
        title: "Bridal Bouquet",
        category: "florals",
        description: "Beautiful floral arrangements for the bride",
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac",
        price: "$100 - $500",
        rating: 4.5
    },
    {
        id: 8,
        title: "Wedding Car",
        category: "transport",
        description: "Luxury vehicles for your wedding day transportation",
        image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f",
        price: "$500 - $3000",
        rating: 4.4
    }
];

const categories = [
    { id: 'all', name: 'All Services', icon: <MenuBook /> },
    { id: 'dresses', name: 'Dresses', icon: <LocalFlorist /> },
    { id: 'jewelry', name: 'Jewelry', icon: <Diamond /> },
    { id: 'photography', name: 'Photography', icon: <CameraAlt /> },
    { id: 'decor', name: 'Decorations', icon: <Home /> },
    { id: 'food', name: 'Food & Cake', icon: <Cake /> },
    { id: 'transport', name: 'Transportation', icon: <DirectionsCar /> }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [navValue, setNavValue] = useState(0);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleNavChange = (event, newValue) => {
        setNavValue(newValue);
    };

    const filteredServices = selectedCategory === 'all'
        ? weddingServices
        : weddingServices.filter(service => service.category === selectedCategory);

    const viewDetails = (service) => {
        navigate(`/service/${service.id}`, { state: { service } });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                backgroundImage: 'linear-gradient(to bottom, rgba(255,249,251,0.9), rgba(255,249,251,0.9))',
                minHeight: '100vh'
            }}>
                {/* Navigation Bar */}
                <AppBar position="static" sx={{
                    background: 'linear-gradient(to right, #d81b60, #5e35b1)',
                    boxShadow: 'none'
                }}>
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{
                            flexGrow: 1,
                            fontFamily: '"Great Vibes", cursive',
                            fontWeight: 'bold'
                        }}>
                            AI Wedding Planner
                        </Typography>
                        <NavigationTabs />
                    </Toolbar>
                </AppBar>

                <Container maxWidth="xl" sx={{ py: 4 }}>
                    {/* Category Selection */}
                    <Paper elevation={0} sx={{
                        p: 2,
                        mb: 4,
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.8)'
                    }}>
                        <Typography variant="h5" gutterBottom sx={{
                            fontFamily: '"Great Vibes", cursive',
                            color: '#d81b60',
                            mb: 2
                        }}>
                            Browse Categories
                        </Typography>
                        <Grid container spacing={2}>
                            {categories.map((category) => (
                                <Grid item key={category.id}>
                                    <Button
                                        variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                                        startIcon={category.icon}
                                        onClick={() => handleCategoryChange(category.id)}
                                        sx={{
                                            borderRadius: '20px',
                                            textTransform: 'none',
                                            backgroundColor: selectedCategory === category.id ? '#d81b60' : 'transparent',
                                            color: selectedCategory === category.id ? 'white' : '#5e35b1',
                                            borderColor: '#e0b0ff',
                                            '&:hover': {
                                                backgroundColor: selectedCategory === category.id ? '#c2185b' : 'rgba(216, 27, 96, 0.1)',
                                                borderColor: '#d81b60'
                                            }
                                        }}
                                    >
                                        {category.name}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    {/* Services Grid */}
                    <Typography variant="h4" gutterBottom sx={{
                        fontFamily: '"Great Vibes", cursive',
                        color: '#5e35b1',
                        mb: 3
                    }}>
                        {selectedCategory === 'all' ? 'All Wedding Services' : `${categories.find(c => c.id === selectedCategory).name}`}
                    </Typography>

                    <Grid container spacing={4}>
                        {filteredServices.map((service) => (
                            <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s',
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
                                        <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#5e35b1' }}>
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                                            {service.price}
                                        </Typography>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => viewDetails(service)}
                                            sx={{
                                                backgroundColor: '#5e35b1',
                                                '&:hover': {
                                                    backgroundColor: '#4a148c'
                                                }
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;