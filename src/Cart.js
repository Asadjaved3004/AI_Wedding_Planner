import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
  TextField,
  Badge,
  Snackbar,
  Alert
} from '@mui/material';
import { useEffect } from 'react';
import {
  ShoppingCart,
  Delete,
  ArrowBack,
  Add,
  Remove,
  Payment
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Initialize cart from either location state or localStorage
  useEffect(() => {
    const initializeCart = () => {
      if (state?.cart) {
        setCart(state.cart);
      } else {
        const savedCart = localStorage.getItem('weddingCart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };
    
    initializeCart();
  }, [state]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('weddingCart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('weddingCart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('weddingCart', JSON.stringify(updatedCart));
    setSnackbarMessage('Item removed from cart');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Continue Shopping
      </Button>

      <Typography variant="h3" sx={{ mb: 3, fontFamily: '"Great Vibes", cursive', color: '#d81b60' }}>
        Your Wedding Cart
      </Typography>

      {cart.length === 0 ? (
        <Box textAlign="center" sx={{ py: 10 }}>
          <ShoppingCart sx={{ fontSize: 80, color: '#e0b0ff', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained"
            onClick={() => navigate('/services')}
            sx={{
              backgroundColor: '#d81b60',
              '&:hover': {
                backgroundColor: '#c2185b'
              }
            }}
          >
            Browse Services
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Paper key={item.id} elevation={2} sx={{ mb: 3, p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} md={3}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '100%', borderRadius: '8px' }} 
                    />
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">{item.title}</Typography>
                      <IconButton onClick={() => handleRemoveItem(item.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ my: 1 }}>{item.price}</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      
                      <TextField
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        type="number"
                        inputProps={{ min: 1 }}
                        sx={{ 
                          width: '60px',
                          '& .MuiOutlinedInput-root': {
                            '& input': {
                              textAlign: 'center',
                              padding: '8.5px 8px'
                            }
                          }
                        }}
                      />
                      
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              
              {cart.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>
                    {item.title} × {item.quantity}
                  </Typography>
                  <Typography>
                    ${(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${calculateSubtotal()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>FREE</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax (estimated)</Typography>
                <Typography>${(calculateSubtotal() * 0.1).toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${(parseFloat(calculateSubtotal()) * 1.1).toFixed(2)}
                </Typography>
              </Box>
              
              <Button 
                fullWidth 
                variant="contained"
                startIcon={<Payment />}
                onClick={handleCheckout}
                size="large"
                sx={{
                  backgroundColor: '#d81b60',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#c2185b'
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
      
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
    </Container>
  );
};

export default Cart;