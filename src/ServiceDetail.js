import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardMedia,
  Button,
  Paper,
  Rating,
  Divider,
  Snackbar,
  Alert,
  Badge
} from '@mui/material';
import { ArrowBack, Favorite, Share, ShoppingCart } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';

const ServiceDetail = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const service = state?.service;
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  //const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('weddingCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weddingCart', JSON.stringify(cart));
  }, [cart]);

  if (!service) {
    navigate('/dashboard');
    return null;
  }

  const handleAddToCart = () => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === service.id);

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      setSnackbarMessage('Item quantity updated in cart');
    } else {
      // Add new item to cart
      setCart([...cart, { ...service, quantity: 1 }]);
      setSnackbarMessage('Item added to cart');
    }

    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,249,251,0.9), rgba(255,249,251,0.9))',
        minHeight: '100vh',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                color: '#5e35b1',
                '&:hover': {
                  backgroundColor: 'rgba(94, 53, 177, 0.1)'
                }
              }}
            >
              Back to Services
            </Button>


            <Button
              startIcon={
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              }
              onClick={() => navigate('/cart')}  // Just navigate to /cart without passing state
              sx={{
                color: '#5e35b1',
                '&:hover': {
                  backgroundColor: 'rgba(94, 53, 177, 0.1)'
                }
              }}
            >
              View Cart
            </Button>

          </Box>

          <Paper elevation={4} sx={{
            p: 4,
            borderRadius: '16px',
            background: 'white'
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="400"
                  image={service.image}
                  alt={service.title}
                  sx={{ borderRadius: '12px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h1" sx={{
                  fontFamily: '"Great Vibes", cursive',
                  color: '#d81b60',
                  mb: 2
                }}>
                  {service.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    value={service.rating}
                    precision={0.1}
                    readOnly
                    sx={{ color: '#5e35b1' }}
                  />
                  <Typography variant="body2" sx={{ ml: 1, color: '#5e35b1' }}>
                    {service.rating} Stars
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ color: '#5e35b1', mb: 2 }}>
                  {service.price}
                </Typography>

                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  {service.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ color: '#5e35b1', mb: 2 }}>
                  Package Includes:
                </Typography>
                <ul style={{ color: '#5e35b1', paddingLeft: '20px' }}>
                  <li>Custom design consultation</li>
                  <li>Professional service delivery</li>
                  <li>Quality assurance</li>
                  <li>After-service support</li>
                </ul>

                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{
                      backgroundColor: '#d81b60',
                      '&:hover': {
                        backgroundColor: '#c2185b'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Favorite />}
                    sx={{
                      color: '#d81b60',
                      borderColor: '#d81b60',
                      '&:hover': {
                        borderColor: '#c2185b'
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    sx={{
                      color: '#5e35b1',
                      borderColor: '#5e35b1',
                      '&:hover': {
                        borderColor: '#4a148c'
                      }
                    }}
                  >
                    Share
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default ServiceDetail;