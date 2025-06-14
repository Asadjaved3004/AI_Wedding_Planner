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
    Paper,
    CssBaseline,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider
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
    DirectionsCar,
    ExitToApp
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import NavigationTabs from './NavigationTabs';
import { useAuth } from './AuthContext';

// Wedding theme
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
    // ... (keep all other service objects)
];

const categories = [
    { id: 'all', name: 'All Services', icon: <MenuBook /> },
    // ... (keep all other category objects)
];

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [navValue, setNavValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
        handleMenuClose();
    };

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
                {/* Navigation Bar with User Menu */}
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
                        
                        {/* User Avatar and Menu */}
                        <IconButton
                            onClick={handleMenuOpen}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ 
                                width: 40, 
                                height: 40,
                                bgcolor: 'white',
                                color: '#d81b60'
                            }}>
                                {user?.email?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Avatar /> My Account
                            </MenuItem>
                            <Divider />
                            <MenuItem 
                                onClick={handleLogout}
                                sx={{ color: '#d81b60' }}
                            >
                                <ExitToApp sx={{ mr: 1 }} /> Logout
                            </MenuItem>
                        </Menu>
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