import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, LocalShipping, Receipt, Celebration } from '@mui/icons-material';

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  });
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing (replace with actual API call)
    setTimeout(() => {
      setIsProcessing(false);
      setOpenSuccessDialog(true);
      localStorage.removeItem('weddingCart'); // Clear cart
    }, 1500);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ 
        mb: 4, 
        fontFamily: '"Great Vibes", cursive', 
        color: '#d81b60',
        textAlign: 'center'
      }}>
        Complete Your Booking
      </Typography>
      
      <Grid container spacing={4}>
        {/* Payment and Shipping Information */}
        <Grid item xs={12} md={7}>
          <form onSubmit={handleSubmit}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              {/* ... (keep all your existing form fields) ... */}
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
              {/* ... (keep all your existing payment fields) ... */}
              
              <Button 
                fullWidth 
                variant="contained"
                size="large"
                type="submit"
                disabled={isProcessing}
                sx={{
                  backgroundColor: '#d81b60',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#c2185b'
                  },
                  '&:disabled': {
                    backgroundColor: '#f8bbd0'
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                    Processing...
                  </>
                ) : 'Complete Order'}
              </Button>
            </Paper>
          </form>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, position: isMobile ? 'static' : 'sticky', top: 20 }}>
            {/* ... (keep your existing order summary) ... */}
          </Paper>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', pt: 4 }}>
          <Celebration color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" sx={{ fontFamily: '"Great Vibes", cursive', color: '#d81b60' }}>
            Order Placed Successfully!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{ 
              textAlign: 'center', 
              fontSize: '1.1rem',
              color: '#5e35b1',
              px: 2
            }}
          >
            Your wedding plans are now complete! We've sent a confirmation to your email.
            <br />
            Thank you for trusting us with your special day.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4, px: 3 }}>
          <Button 
            onClick={handleCloseSuccessDialog} 
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#d81b60',
              py: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#c2185b'
              }
            }}
          >
            Continue to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;